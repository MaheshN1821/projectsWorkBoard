import express from "express";
import UserCollab from "../model/UserCollab.js";
import ProjectCollab from "../model/ProjectCollab.js";
import ApplicationCollab from "../model/ApplicationCollab.js";
import { auth } from "../middleware/auth.js";
import {
  validateUserUpdate,
  validateObjectId,
} from "../middleware/validation.js";

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await UserCollab.findById(req.user._id).select("-password");

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update current user profile
// @access  Private
router.put("/profile", auth, validateUserUpdate, async (req, res) => {
  try {
    const allowedUpdates = [
      "name",
      "bio",
      "skills",
      "interests",
      "department",
      "year",
      "preferences",
    ];

    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await UserCollab.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: { user },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public
router.get("/:id", validateObjectId("id"), async (req, res) => {
  try {
    const user = await UserCollab.findById(req.params.id)
      .select("-password -preferences")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get user's projects
    const projects = await ProjectCollab.find({
      author: req.params.id,
      status: { $in: ["active", "completed"] },
    })
      .select("title category status createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        user,
        recentProjects: projects,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/users
// @desc    Search users
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      search,
      department,
      year,
      skills,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = { isActive: true };

    // Search by name or bio
    if (search) {
      filter.$text = { $search: search };
    }

    // Filter by department
    if (department) {
      filter.department = department;
    }

    // Filter by year
    if (year) {
      filter.year = year;
    }

    // Filter by skills
    if (skills) {
      const skillsArray = skills.split(",").map((skill) => skill.trim());
      filter.skills = { $in: skillsArray };
    }

    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit);

    const users = await UserCollab.find(filter)
      .select("name department year avatar bio skills rating projectsCompleted")
      .sort({ rating: -1, projectsCompleted: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit));

    const total = await UserCollab.countDocuments(filter);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          current: Number.parseInt(page),
          pages: Math.ceil(total / Number.parseInt(limit)),
          total,
          limit: Number.parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Search users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   POST /api/users/experience
// @desc    Add experience to user profile
// @access  Private
router.post("/experience", auth, async (req, res) => {
  try {
    const { title, company, duration, description, type } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const user = await UserCollab.findById(req.user._id);

    user.experience.push({
      title,
      company,
      duration,
      description,
      type: type || "work",
    });

    await user.save();

    res.json({
      success: true,
      message: "Experience added successfully",
      data: { user },
    });
  } catch (error) {
    console.error("Add experience error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   PUT /api/users/experience/:experienceId
// @desc    Update experience
// @access  Private
router.put("/experience/:experienceId", auth, async (req, res) => {
  try {
    const user = await UserCollab.findById(req.user._id);
    const experience = user.experience.id(req.params.experienceId);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    // Update experience fields
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        experience[key] = req.body[key];
      }
    });

    await user.save();

    res.json({
      success: true,
      message: "Experience updated successfully",
      data: { user },
    });
  } catch (error) {
    console.error("Update experience error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   DELETE /api/users/experience/:experienceId
// @desc    Delete experience
// @access  Private
router.delete("/experience/:experienceId", auth, async (req, res) => {
  try {
    const user = await UserCollab.findById(req.user._id);
    user.experience.pull({ _id: req.params.experienceId });
    await user.save();

    res.json({
      success: true,
      message: "Experience deleted successfully",
      data: { user },
    });
  } catch (error) {
    console.error("Delete experience error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/users/dashboard/stats
// @desc    Get dashboard statistics for current user
// @access  Private
router.get("/dashboard/stats", auth, async (req, res) => {
  try {
    // Get user's projects
    const myProjects = await ProjectCollab.find({ author: req.user._id });

    // Get applications made by user
    const myApplications = await ApplicationCollab.find({
      applicant: req.user._id,
    });

    // Get applications received for user's projects
    const receivedApplications = await ApplicationCollab.find({
      project: { $in: myProjects.map((p) => p._id) },
    });

    // Calculate stats
    const stats = {
      myProjects: {
        total: myProjects.length,
        active: myProjects.filter((p) => p.status === "active").length,
        completed: myProjects.filter((p) => p.status === "completed").length,
        inProgress: myProjects.filter((p) => p.status === "in-progress").length,
      },
      applications: {
        sent: myApplications.length,
        pending: myApplications.filter((a) => a.status === "pending").length,
        accepted: myApplications.filter((a) => a.status === "accepted").length,
        rejected: myApplications.filter((a) => a.status === "rejected").length,
      },
      received: {
        total: receivedApplications.length,
        pending: receivedApplications.filter((a) => a.status === "pending")
          .length,
        accepted: receivedApplications.filter((a) => a.status === "accepted")
          .length,
        rejected: receivedApplications.filter((a) => a.status === "rejected")
          .length,
      },
      profile: {
        rating: req.user.rating,
        projectsCompleted: req.user.projectsCompleted,
        skillsCount: req.user.skills.length,
        interestsCount: req.user.interests.length,
      },
    };

    res.json({
      success: true,
      data: { stats },
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put("/preferences", auth, async (req, res) => {
  try {
    const allowedPreferences = [
      "emailNotifications",
      "projectUpdates",
      "weeklyDigest",
      "profileVisible",
      "allowDirectMessages",
    ];

    const preferences = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedPreferences.includes(key)) {
        preferences[`preferences.${key}`] = req.body[key];
      }
    });

    const user = await UserCollab.findByIdAndUpdate(
      req.user._id,
      { $set: preferences },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Preferences updated successfully",
      data: { user },
    });
  } catch (error) {
    console.error("Update preferences error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
