import express from "express";
import Project from "../model/pwbproject.js";
import SessionRequest from "../model/SessionRequest.js";
import { authenticateToken } from "../middleware/pwbauth.js";

const router = express.Router();

// Get all projects (for freelancers)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({ status: "Open" })
      .populate("client", "username email")
      .populate("applications", "username email techStack")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get client's projects
router.get("/client", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({ client: req.user.userId })
      .populate("applications", "username email techStack")
      .populate("selectedFreelancer", "username email phone_number")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching client projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/client/:clientId", authenticateToken, async (req, res) => {
  try {
    // Use authenticated user's ID for security
    const projects = await Project.find({ client: req.user.userId })
      .populate("applications", "username email techStack")
      .populate("selectedFreelancer", "username email phone_number")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching client projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get freelancer's projects
router.get("/freelancer", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({ selectedFreelancer: req.user.userId })
      .populate("client", "username email phone_number")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching freelancer projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new project
router.post("/", authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== "client") {
      return res
        .status(403)
        .json({ message: "Only clients can create projects" });
    }

    const { title, description, stack, minprice, maxprice, completion } =
      req.body;

    const project = new Project({
      title,
      description,
      stack,
      minprice: Number(minprice),
      maxprice: Number(maxprice),
      completion: new Date(completion),
      client: req.user.userId,
      status: "Open",
    });

    await project.save();
    await project.populate("client", "username email");

    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get available projects for freelancers
router.get("/available", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({ status: "Open" })
      .populate("client", "username email")
      .populate("applications", "username email techStack")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching available projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get freelancer's ongoing projects
router.get("/freelancer/ongoing", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({
      selectedFreelancer: req.user.userId,
      status: { $in: ["In Progress"] },
    })
      .populate("client", "username email phone_number")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching ongoing projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get client's ongoing projects
router.get("/client/ongoing", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({
      client: req.user.userId,
      status: { $in: ["In Progress"] },
    })
      .populate("selectedFreelancer", "username email phone_number")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("Error client ongoing projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/client/ongoing/:clientId", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({
      client: req.user.userId, // Use authenticated user's ID for security
      status: { $in: ["Open", "In Progress"] },
    })
      .populate("selectedFreelancer", "username email phone_number")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching client ongoing projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/client/completed", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({
      client: req.user.userId,
      status: "Completed",
    })
      .populate("selectedFreelancer", "username email phone_number")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching client completed projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get freelancer's completed projects
router.get("/freelancer/completed", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({
      selectedFreelancer: req.user.userId,
      status: "Completed",
    })
      .populate("client", "username email phone_number")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching completed projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Apply to project
router.post("/:id/apply", authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== "freelancer") {
      return res
        .status(403)
        .json({ message: "Only freelancers can apply to projects" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.applications.includes(req.user.userId)) {
      return res
        .status(400)
        .json({ message: "Already applied to this project" });
    }

    project.applications.push(req.user.userId);
    await project.save();

    res.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying to project:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Select freelancer for project
router.post("/:id/select", authenticateToken, async (req, res) => {
  try {
    const { freelancerId } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.client.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    project.selectedFreelancer = freelancerId;
    project.status = "In Progress";
    await project.save();

    res.json({ message: "Freelancer selected successfully" });
  } catch (error) {
    console.error("Error selecting freelancer:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update project status
router.patch("/:id/status", authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is authorized to update status
    const isFreelancer =
      project.selectedFreelancer &&
      project.selectedFreelancer.toString() === req.user.userId;
    const isClient = project.client.toString() === req.user.userId;

    if (!isFreelancer && !isClient) {
      return res.status(403).json({ message: "Not authorized" });
    }

    project.status = status;
    if (status === "Completed") {
      project.progress = 100;
    }

    await project.save();

    res.json({ message: "Project status updated successfully" });
  } catch (error) {
    console.error("Error updating project status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single project details
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("client", "username email company")
      .populate("applications", "username email techStack")
      .populate("selectedFreelancer", "username email techStack phone_number")
      .populate("notes.author", "username");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add note to project
router.post("/:id/notes", authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is authorized (client or selected freelancer)
    const isClient = project.client.toString() === req.user.userId;
    const isFreelancer =
      project.selectedFreelancer &&
      project.selectedFreelancer.toString() === req.user.userId;

    if (!isClient && !isFreelancer) {
      return res.status(403).json({ message: "Not authorized to add notes" });
    }

    project.notes.push({
      content,
      author: req.user.userId,
      createdAt: new Date(),
    });

    await project.save();
    await project.populate("notes.author", "username");

    res.json({ message: "Note added successfully", notes: project.notes });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update project progress
router.patch("/:id/progress", authenticateToken, async (req, res) => {
  try {
    const { progress } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only selected freelancer can update progress
    if (
      !project.selectedFreelancer ||
      project.selectedFreelancer.toString() !== req.user.userId
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update progress" });
    }

    project.progress = Math.min(100, Math.max(0, Number.parseInt(progress)));
    await project.save();

    res.json({
      message: "Progress updated successfully",
      progress: project.progress,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.client.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this project" });
    }

    if (project.status === "In Progress") {
      return res.status(400).json({
        message: "Cannot delete project that is in progress",
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/save-request", authenticateToken, async (req, res) => {
  try {
    const { client, freelancer, requestDate } = req.body;
    const request = new SessionRequest({
      client: client,
      freelancer: freelancer,
      requestDate: requestDate,
    });
    console.log(request);
    console.log(client, freelancer, requestDate);
    await request.save();

    res.json({ message: "Request saved successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getdata/:id", authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("client", "username email company")
      .populate("applications", "username email techStack")
      .populate("selectedFreelancer", "username email techStack phone_number")
      .populate("notes.author", "username");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { status, freelancer } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.status = status;
    project.selectedFreelancer = freelancer;
    if (status === "Completed") {
      project.progress = 100;
    }

    await project.save();

    res.json({ message: "Project status updated successfully" });
  } catch (error) {
    console.error("Error updating project status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update project details (PUT request)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { title, description, stack, minprice, maxprice, completion } =
      req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.client.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        stack,
        minprice: Number(minprice),
        maxprice: Number(maxprice),
        completion: new Date(completion),
        updatedAt: new Date(),
      },
      {
        new: true,
      }
    ).populate("client", "username email");

    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
