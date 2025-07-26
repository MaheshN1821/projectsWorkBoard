import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectCollab",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserCollab",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Application message is required"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "withdrawn"],
      default: "pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: Date,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserCollab",
    },
    reviewMessage: String,
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    availability: {
      hoursPerWeek: {
        type: Number,
        min: 1,
        max: 40,
      },
      startDate: Date,
      endDate: Date,
    },
    portfolio: {
      githubUrl: String,
      portfolioUrl: String,
      linkedinUrl: String,
      additionalLinks: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate applications
applicationSchema.index({ project: 1, applicant: 1 }, { unique: true });

// Index for querying applications by status and date
applicationSchema.index({ status: 1, appliedAt: -1 });
applicationSchema.index({ applicant: 1, status: 1 });
applicationSchema.index({ project: 1, status: 1 });

// Method to accept application
applicationSchema.methods.accept = async function (reviewerId, message) {
  this.status = "accepted";
  this.reviewedAt = new Date();
  this.reviewedBy = reviewerId;
  this.reviewMessage = message;

  // Add user to project team members
  const Project = mongoose.model("ProjectCollab");
  await Project.findByIdAndUpdate(this.project, {
    $addToSet: {
      teamMembers: {
        user: this.applicant,
        role: "member",
        joinedAt: new Date(),
      },
    },
  });

  await this.save();
  return this;
};

// Method to reject application
applicationSchema.methods.reject = async function (reviewerId, message) {
  this.status = "rejected";
  this.reviewedAt = new Date();
  this.reviewedBy = reviewerId;
  this.reviewMessage = message;
  await this.save();
  return this;
};

const ApplicationCollab = mongoose.model(
  "ApplicationCollab",
  applicationSchema
);

export default ApplicationCollab;
