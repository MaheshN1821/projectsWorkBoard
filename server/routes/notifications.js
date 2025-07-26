import express from "express";
import NotificationCollab from "../model/NotificationCollab.js";
import { auth } from "../middleware/auth.js";
import { validateObjectId } from "../middleware/validation.js";

const router = express.Router();

// @route   GET /api/notifications
// @desc    Get current user's notifications
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, unread, type } = req.query;

    const filter = { recipient: req.user._id };

    if (unread === "true") {
      filter.read = false;
    }

    if (type) {
      filter.type = type;
    }

    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit);

    const notifications = await NotificationCollab.find(filter)
      .populate("sender", "name avatar")
      .populate("relatedProject", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit));

    const total = await NotificationCollab.countDocuments(filter);
    const unreadCount = await NotificationCollab.countDocuments({
      recipient: req.user._id,
      read: false,
    });

    res.json({
      success: true,
      data: {
        notifications,
        unreadCount,
        pagination: {
          current: Number.parseInt(page),
          pages: Math.ceil(total / Number.parseInt(limit)),
          total,
          limit: Number.parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.put("/:id/read", validateObjectId("id"), auth, async (req, res) => {
  try {
    const notification = await NotificationCollab.findOne({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await notification.markAsRead();

    res.json({
      success: true,
      message: "Notification marked as read",
      data: { notification },
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   PUT /api/notifications/mark-all-read
// @desc    Mark all notifications as read
// @access  Private
router.put("/mark-all-read", auth, async (req, res) => {
  try {
    await NotificationCollab.markAllAsRead(req.user._id);

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Mark all notifications as read error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   DELETE /api/notifications/:id
// @desc    Delete notification
// @access  Private
router.delete("/:id", validateObjectId("id"), auth, async (req, res) => {
  try {
    const notification = await NotificationCollab.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete notification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/notifications/unread-count
// @desc    Get unread notifications count
// @access  Private
router.get("/unread-count", auth, async (req, res) => {
  try {
    const count = await NotificationCollab.countDocuments({
      recipient: req.user._id,
      read: false,
    });

    res.json({
      success: true,
      data: { count },
    });
  } catch (error) {
    console.error("Get unread count error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
