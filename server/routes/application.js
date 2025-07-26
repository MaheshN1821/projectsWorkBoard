import express from "express";
import ApplicationCollab from "../model/ApplicationCollab.js";
import ProjectCollab from "../model/ProjectCollab.js";
import NotificationCollab from "../model/NotificationCollab.js";
import { auth, projectOwner } from "../middleware/auth.js";
import {
  validateApplication,
  validateObjectId,
} from "../middleware/validation.js";

const router = express.Router();

router.post("/", auth, validateApplication, async (req, res) => {
  try {
    const {
      project: projectId,
      message,
      skills,
      availability,
      portfolio,
    } = req.body;

    // Check if project exists and is active
    const project = await ProjectCollab.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Project is not accepting applications",
      });
    }

    // Check if user is project owner
    if (project.author.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot apply to your own project",
      });
    }

    // Check if user already applied
    const existingApplication = await ApplicationCollab.findOne({
      project: projectId,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this project",
      });
    }

    // Create application
    const application = await ApplicationCollab.create({
      project: projectId,
      applicant: req.user._id,
      message,
      skills,
      availability,
      portfolio,
    });

    // Add to project applicants
    project.applicants.push({
      user: req.user._id,
      appliedAt: new Date(),
      status: "pending",
    });
    await project.save();

    // Create notification for project author
    await NotificationCollab.createNotification({
      recipient: project.author,
      sender: req.user._id,
      type: "application_received",
      title: "New Application Received",
      message: `${req.user.name} applied to your project "${project.title}"`,
      relatedProject: projectId,
      relatedApplication: application._id,
    });

    // Populate application data
    await application.populate([
      {
        path: "applicant",
        select: "name department year avatar bio skills rating",
      },
      { path: "project", select: "title author" },
    ]);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: { application },
    });
  } catch (error) {
    console.error("Apply to project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/applications/my-applications
// @desc    Get current user's applications
// @access  Private
router.get("/my-applications", auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter = { applicant: req.user._id };
    if (status) {
      filter.status = status;
    }

    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit);

    const applications = await ApplicationCollab.find(filter)
      .populate({
        path: "project",
        select: "title description category author status",
        populate: {
          path: "author",
          select: "name department email",
        },
      })
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit));

    // const applications = await ApplicationCollab.find(filter)
    //   .populate("project", "title description category author status")
    //   .populate("project.author", "name department")
    //   .sort({ appliedAt: -1 })
    //   .skip(skip)
    //   .limit(Number.parseInt(limit));

    const total = await ApplicationCollab.countDocuments(filter);

    // console.log(applications);

    res.json({
      success: true,
      data: {
        applications,
        pagination: {
          current: Number.parseInt(page),
          pages: Math.ceil(total / Number.parseInt(limit)),
          total,
          limit: Number.parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Get my applications error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/applications/project/:projectId
// @desc    Get applications for a project
// @access  Private (Project Owner)
router.get(
  "/project/:projectId",
  validateObjectId("projectId"),
  auth,
  async (req, res) => {
    try {
      // Verify project ownership
      const project = await ProjectCollab.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      if (project.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to view these applications",
        });
      }

      const { status, page = 1, limit = 10 } = req.query;

      const filter = { project: req.params.projectId };
      if (status) {
        filter.status = status;
      }

      const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit);

      const applications = await ApplicationCollab.find(filter)
        .populate(
          "applicant",
          "name department year avatar bio skills rating projectsCompleted"
        )
        .sort({ appliedAt: -1 })
        .skip(skip)
        .limit(Number.parseInt(limit));

      const total = await ApplicationCollab.countDocuments(filter);

      res.json({
        success: true,
        data: {
          applications,
          pagination: {
            current: Number.parseInt(page),
            pages: Math.ceil(total / Number.parseInt(limit)),
            total,
            limit: Number.parseInt(limit),
          },
        },
      });
    } catch (error) {
      console.error("Get project applications error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @route   GET /api/applications/:id
// @desc    Get single application
// @access  Private (Applicant or Project Owner)
router.get("/:id", validateObjectId("id"), auth, async (req, res) => {
  try {
    const application = await ApplicationCollab.findById(req.params.id)
      .populate(
        "applicant",
        "name department year avatar bio skills rating projectsCompleted"
      )
      .populate("project", "title description author")
      .populate("reviewedBy", "name");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Check if user is applicant or project owner
    const isApplicant =
      application.applicant._id.toString() === req.user._id.toString();
    const isProjectOwner =
      application.project.author.toString() === req.user._id.toString();

    if (!isApplicant && !isProjectOwner) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this application",
      });
    }

    res.json({
      success: true,
      data: { application },
    });
  } catch (error) {
    console.error("Get application error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   PUT /api/applications/:id/accept
// @desc    Accept an application
// @access  Private (Project Owner)
router.put("/:id/accept", validateObjectId("id"), auth, async (req, res) => {
  try {
    const { message } = req.body;

    const application = await ApplicationCollab.findById(req.params.id)
      .populate("applicant", "name")
      .populate("project", "title author");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Check if user is project owner
    if (application.project.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to review this application",
      });
    }

    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Application has already been reviewed",
      });
    }

    // Accept application
    await application.accept(req.user._id, message);

    // Create notification for applicant
    await NotificationCollab.createNotification({
      recipient: application.applicant._id,
      sender: req.user._id,
      type: "application_accepted",
      title: "Application Accepted!",
      message: `Your application to "${application.project.title}" has been accepted`,
      relatedProject: application.project._id,
      relatedApplication: application._id,
    });

    res.json({
      success: true,
      message: "Application accepted successfully",
      data: { application },
    });
  } catch (error) {
    console.error("Accept application error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   PUT /api/applications/:id/reject
// @desc    Reject an application
// @access  Private (Project Owner)
router.put("/:id/reject", validateObjectId("id"), auth, async (req, res) => {
  try {
    const { message } = req.body;

    const application = await ApplicationCollab.findById(req.params.id)
      .populate("applicant", "name")
      .populate("project", "title author");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Check if user is project owner
    if (application.project.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to review this application",
      });
    }

    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Application has already been reviewed",
      });
    }

    // Reject application
    await application.reject(req.user._id, message);

    // Create notification for applicant
    await NotificationCollab.createNotification({
      recipient: application.applicant._id,
      sender: req.user._id,
      type: "application_rejected",
      title: "Application Update",
      message: `Your application to "${application.project.title}" has been reviewed`,
      relatedProject: application.project._id,
      relatedApplication: application._id,
    });

    res.json({
      success: true,
      message: "Application rejected",
      data: { application },
    });
  } catch (error) {
    console.error("Reject application error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   PUT /api/applications/:id/withdraw
// @desc    Withdraw an application
// @access  Private (Applicant)
router.put("/:id/withdraw", validateObjectId("id"), auth, async (req, res) => {
  try {
    const application = await ApplicationCollab.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Check if user is applicant
    if (application.applicant.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to withdraw this application",
      });
    }

    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot withdraw a reviewed application",
      });
    }

    // Withdraw application
    application.status = "withdrawn";
    await application.save();

    // Remove from project applicants
    await Project.findByIdAndUpdate(application.project, {
      $pull: { applicants: { user: req.user._id } },
    });

    res.json({
      success: true,
      message: "Application withdrawn successfully",
      data: { application },
    });
  } catch (error) {
    console.error("Withdraw application error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
