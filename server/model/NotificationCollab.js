import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserCollab",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserCollab",
    },
    type: {
      type: String,
      required: true,
      enum: [
        "application_received",
        "application_accepted",
        "application_rejected",
        "project_interest",
        "project_update",
        "team_member_joined",
        "team_member_left",
        "project_completed",
        "message_received",
        "project_deadline",
        "system_announcement",
      ],
    },
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
    relatedProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectCollab",
    },
    relatedApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApplicationCollab",
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
    read: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, type: 1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to mark as read
notificationSchema.methods.markAsRead = async function () {
  this.read = true;
  this.readAt = new Date();
  await this.save();
  return this;
};

// Static method to create notification
notificationSchema.statics.createNotification = async function (data) {
  const notification = new this(data);
  await notification.save();

  // Here you could add real-time notification logic (Socket.io, etc.)
  // or email notification logic

  return notification;
};

// Static method to mark all as read for a user
notificationSchema.statics.markAllAsRead = async function (userId) {
  return await this.updateMany(
    { recipient: userId, read: false },
    { read: true, readAt: new Date() }
  );
};

const NotificationCollab = mongoose.model(
  "NotificationCollab",
  notificationSchema
);

export default NotificationCollab;
