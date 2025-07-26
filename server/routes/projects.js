import express from "express";
import ProjectCollab from "../model/ProjectCollab.js";
import UserCollab from "../model/UserCollab.js";
import NotificationCollab from "../model/NotificationCollab.js";
import { auth, optionalAuth, projectOwner } from "../middleware/auth.js";
import {
  validateProjectCreation,
  validateProjectUpdate,
  validateObjectId,
  validateProjectFilters,
} from "../middleware/validation.js";

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects with filtering and pagination
// @access  Public
router.get("/", validateProjectFilters, optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      location,
      status = "active",
      search,
      featured,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build filter object
    const filter = { status };

    if (category && category !== "all") {
      filter.category = category;
    }

    if (location) {
      filter.location = location;
    }

    if (featured === "true") {
      filter.featured = true;
    }

    // Search functionality
    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query
    const projects = await ProjectCollab.find(filter)
      .populate(
        "author",
        "name department year avatar rating projectsCompleted"
      )
      .populate("interestedUsers", "name avatar")
      .sort(sort)
      .skip(skip)
      .limit(Number.parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await ProjectCollab.countDocuments(filter);

    // Add user-specific data if authenticated
    if (req.user) {
      projects.forEach((project) => {
        project.hasApplied = project.applicants.some(
          (app) => app.user.toString() === req.user._id.toString()
        );
        project.isInterested = project.interestedUsers.some(
          (user) => user._id.toString() === req.user._id.toString()
        );
        project.isOwner =
          project.author._id.toString() === req.user._id.toString();
      });
    }

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          current: Number.parseInt(page),
          pages: Math.ceil(total / Number.parseInt(limit)),
          total,
          limit: Number.parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project by ID
// @access  Public
router.get("/:id", validateObjectId("id"), optionalAuth, async (req, res) => {
  try {
    const project = await ProjectCollab.findById(req.params.id)
      .populate(
        "author",
        "name department year avatar bio rating projectsCompleted"
      )
      .populate("applicants.user", "name department avatar rating")
      .populate("teamMembers.user", "name department avatar rating")
      .populate("interestedUsers", "name department avatar rating skills");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Increment view count
    project.views += 1;
    await project.save();

    // Add user-specific data if authenticated
    let userData = {};
    if (req.user) {
      userData = {
        hasApplied: project.hasUserApplied(req.user._id),
        isInterested: project.isUserInterested(req.user._id),
        isTeamMember: project.isUserTeamMember(req.user._id),
        isOwner: project.author._id.toString() === req.user._id.toString(),
      };
    }

    res.json({
      success: true,
      data: {
        project,
        userData,
      },
    });
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
router.post("/", auth, validateProjectCreation, async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      author: req.user._id,
    };

    const project = await ProjectCollab.create(projectData);

    // Populate author data
    await project.populate("author", "name department year avatar");

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: { project },
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Project Owner)
router.put(
  "/:id",
  validateObjectId("id"),
  auth,
  projectOwner,
  validateProjectUpdate,
  async (req, res) => {
    try {
      const project = await ProjectCollab.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ).populate("author", "name department year avatar");

      res.json({
        success: true,
        message: "Project updated successfully",
        data: { project },
      });
    } catch (error) {
      console.error("Update project error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Project Owner)
router.delete(
  "/:id",
  validateObjectId("id"),
  auth,
  projectOwner,
  async (req, res) => {
    try {
      await ProjectCollab.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      console.error("Delete project error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @route   POST /api/projects/:id/interest
// @desc    Toggle interest in project
// @access  Private
router.post("/:id/interest", validateObjectId("id"), auth, async (req, res) => {
  try {
    const project = await ProjectCollab.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const isInterested = project.isUserInterested(req.user._id);

    if (isInterested) {
      // Remove interest
      project.interestedUsers = project.interestedUsers.filter(
        (user) => user.toString() !== req.user._id.toString()
      );
    } else {
      // Add interest
      project.interestedUsers.push(req.user._id);

      // Create notification for project author
      if (project.author.toString() !== req.user._id.toString()) {
        await NotificationCollab.createNotification({
          recipient: project.author,
          sender: req.user._id,
          type: "project_interest",
          title: "New Interest in Your Project",
          message: `${req.user.name} showed interest in your project "${project.title}"`,
          relatedProject: project._id,
        });
      }
    }

    await project.save();

    res.json({
      success: true,
      message: isInterested ? "Interest removed" : "Interest added",
      data: {
        isInterested: !isInterested,
        interestedCount: project.interestedUsers.length,
      },
    });
  } catch (error) {
    console.error("Toggle interest error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/projects/:id/interested-users
// @desc    Get users interested in project
// @access  Private (Project Owner)
router.get(
  "/:id/interested-users",
  validateObjectId("id"),
  auth,
  projectOwner,
  async (req, res) => {
    try {
      const project = await ProjectCollab.findById(req.params.id).populate(
        "interestedUsers",
        "name department year avatar bio skills rating projectsCompleted"
      );

      res.json({
        success: true,
        data: {
          interestedUsers: project.interestedUsers,
        },
      });
    } catch (error) {
      console.error("Get interested users error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @route   GET /api/projects/user/:userId
// @desc    Get projects by user
// @access  Public
router.get("/user/:userId", validateObjectId("userId"), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter = { author: req.params.userId };
    if (status) {
      filter.status = status;
    }

    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit);

    const projects = await ProjectCollab.find(filter)
      .populate("author", "name department year avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit));

    const total = await ProjectCollab.countDocuments(filter);

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          current: Number.parseInt(page),
          pages: Math.ceil(total / Number.parseInt(limit)),
          total,
          limit: Number.parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Get user projects error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
