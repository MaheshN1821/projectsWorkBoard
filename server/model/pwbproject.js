import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    stack: {
      type: String,
      required: true,
    },
    minprice: {
      type: Number,
      required: true,
    },
    maxprice: {
      type: Number,
      required: true,
    },
    completion: {
      type: Date,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PwbUser",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PwbUser",
      },
    ],
    selectedFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PwbUser",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed", "Cancelled"],
      default: "Open",
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    notes: [
      {
        content: String,
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PwbUser",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PwbProject = mongoose.model("PwbProject", projectSchema);

export default PwbProject;
