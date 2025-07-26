import mongoose from "mongoose";

const sessionRequestSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PwbUser",
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PwbUser",
      required: true,
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "completed"],
      default: "pending",
    },
    type: {
      type: String,
      default: "session_request",
    },
  },
  {
    timestamps: true,
  }
);

const SessionRequest = mongoose.model("SessionRequest", sessionRequestSchema);

export default SessionRequest;
