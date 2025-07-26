import express from "express";
import User from "../model/pwbuser.js";
import SessionRequest from "../model/SessionRequest.js";
import { authenticateToken } from "../middleware/pwbauth.js";

const router = express.Router();

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/profile/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password updates through this route
    delete updates.email; // Don't allow email updates
    delete updates.profileImage;

    const user = await User.findByIdAndUpdate(req.user.userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all freelancers (for clients to browse)
router.get("/freelancers", authenticateToken, async (req, res) => {
  try {
    const freelancers = await User.find({ userType: "freelancer" })
      .select("-password")
      .sort({ rating: -1, completedProjects: -1 });

    res.json(freelancers);
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/freelancer/requests", authenticateToken, async (req, res) => {
  try {
    const requests = await SessionRequest.find({
      freelancer: req.user.userId,
    }).populate("client", "username email");
    if (!requests) {
      return res.status(404).json({ message: "No requests found!" });
    }

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching Requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/freelancer/requests/client",
  authenticateToken,
  async (req, res) => {
    try {
      const requests = await SessionRequest.find({
        client: req.user.userId,
      }).populate("freelancer", "username email");
      if (!requests) {
        return res.status(404).json({ message: "No requests found!" });
      }

      res.status(200).json(requests);
    } catch (error) {
      console.error("Error fetching Requests:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.patch("/requests/:id/accept", authenticateToken, async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await SessionRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "accepted";
    await request.save();

    res.status(200).json({ message: "Request accepted", request });
  } catch (error) {
    console.error("Error Accepting Requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/requests/:id/reject", authenticateToken, async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await SessionRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "declined";
    await request.save();

    res.status(200).json({ message: "Request Declined", request });
  } catch (error) {
    console.error("Error Accepting Requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
