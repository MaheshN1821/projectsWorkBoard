import express from "express";
import ProjectCollab from "../model/ProjectCollab.js";
import ApplicationCollab from "../model/ApplicationCollab.js";
import UserCollab from "../model/UserCollab.js";
import NotificationCollab from "../model/NotificationCollab.js";
import { auth, projectOwner } from "../middleware/auth.js";
import { validateObjectId } from "../middleware/validation.js";

const router = express.Router();

// @route   GET /api/project-management/:projectId/applications
// @desc    Get all applications for a specific project (Project Owner Only)
// @access  Private
router.get(
  "/:projectId/applications",
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

      if (project.author?.toString() !== req.user._id?.toString()) {
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
          "name department year avatar bio skills rating projectsCompleted email"
        )
        .populate("reviewedBy", "name")
        .sort({ appliedAt: -1 })
        .skip(skip)
        .limit(Number.parseInt(limit));

      const total = await ApplicationCollab.countDocuments(filter);

      // Get application statistics
      const stats = {
        total: await ApplicationCollab.countDocuments({
          project: req.params.projectId,
        }),
        pending: await ApplicationCollab.countDocuments({
          project: req.params.projectId,
          status: "pending",
        }),
        accepted: await ApplicationCollab.countDocuments({
          project: req.params.projectId,
          status: "accepted",
        }),
        rejected: await ApplicationCollab.countDocuments({
          project: req.params.projectId,
          status: "rejected",
        }),
      };

      res.json({
        success: true,
        data: {
          applications,
          stats,
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

// @route   PUT /api/project-management/applications/:applicationId/accept
// @desc    Accept an application
// @access  Private (Project Owner)
router.put(
  "/applications/:applicationId/accept",
  validateObjectId("applicationId"),
  auth,
  async (req, res) => {
    try {
      const { message } = req.body;

      const application = await ApplicationCollab.findById(
        req.params.applicationId
      )
        .populate("applicant", "name email")
        .populate("project", "title author");

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }

      // Check if user is project owner
      if (application.project.author?.toString() !== req.user._id?.toString()) {
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

      // Accept application using the model method
      await application.accept(req.user._id, message);

      // Update project applicants status
      await ProjectCollab.findByIdAndUpdate(
        application.project._id,
        {
          $set: {
            "applicants.$[elem].status": "accepted",
          },
        },
        {
          arrayFilters: [{ "elem.user": application.applicant._id }],
        }
      );

      // Create notification for applicant
      await NotificationCollab.createNotification({
        recipient: application.applicant._id,
        sender: req.user._id,
        type: "application_accepted",
        title: "Application Accepted! 🎉",
        message: `Congratulations! Your application to "${application.project.title}" has been accepted.`,
        relatedProject: application.project._id,
        relatedApplication: application._id,
        priority: "high",
      });

      // Populate the updated application
      await application.populate([
        {
          path: "applicant",
          select: "name department year avatar bio skills rating",
        },
        { path: "reviewedBy", select: "name" },
      ]);

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
  }
);

// @route   PUT /api/project-management/applications/:applicationId/reject
// @desc    Reject an application
// @access  Private (Project Owner)
router.put(
  "/applications/:applicationId/reject",
  validateObjectId("applicationId"),
  auth,
  async (req, res) => {
    try {
      const { message } = req.body;

      const application = await ApplicationCollab.findById(
        req.params.applicationId
      )
        .populate("applicant", "name email")
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

      // Reject application using the model method
      await application.reject(req.user._id, message);

      // Update project applicants status
      await ProjectCollab.findByIdAndUpdate(
        application.project._id,
        {
          $set: {
            "applicants.$[elem].status": "rejected",
          },
        },
        {
          arrayFilters: [{ "elem.user": application.applicant._id }],
        }
      );

      // Create notification for applicant
      await NotificationCollab.createNotification({
        recipient: application.applicant._id,
        sender: req.user._id,
        type: "application_rejected",
        title: "Application Update",
        message: `Your application to "${application.project.title}" has been reviewed.`,
        relatedProject: application.project._id,
        relatedApplication: application._id,
        priority: "medium",
      });

      // Populate the updated application
      await application.populate([
        {
          path: "applicant",
          select: "name department year avatar bio skills rating",
        },
        { path: "reviewedBy", select: "name" },
      ]);

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
  }
);

// @route   GET /api/project-management/:projectId/team-members
// @desc    Get team members for a project
// @access  Private (Project Owner)
router.get(
  "/:projectId/team-members",
  validateObjectId("projectId"),
  auth,
  async (req, res) => {
    try {
      const project = await ProjectCollab.findById(
        req.params.projectId
      ).populate(
        "teamMembers.user",
        "name department year avatar bio skills rating projectsCompleted email"
      );

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      if (project.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to view team members",
        });
      }

      res.json({
        success: true,
        data: {
          teamMembers: project.teamMembers,
          totalMembers: project.teamMembers.length,
        },
      });
    } catch (error) {
      console.error("Get team members error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @route   DELETE /api/project-management/:projectId/team-members/:userId
// @desc    Remove team member from project
// @access  Private (Project Owner)
router.delete(
  "/:projectId/team-members/:userId",
  validateObjectId("projectId"),
  validateObjectId("userId"),
  auth,
  async (req, res) => {
    try {
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
          message: "Not authorized to remove team members",
        });
      }

      // Remove team member
      project.teamMembers = project.teamMembers.filter(
        (member) => member.user.toString() !== req.params.userId
      );

      await project.save();

      // Create notification for removed member
      await NotificationCollab.createNotification({
        recipient: req.params.userId,
        sender: req.user._id,
        type: "team_member_left",
        title: "Removed from Project",
        message: `You have been removed from the project "${project.title}".`,
        relatedProject: project._id,
        priority: "medium",
      });

      res.json({
        success: true,
        message: "Team member removed successfully",
      });
    } catch (error) {
      console.error("Remove team member error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

export default router;
