import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  phase: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "in-progress", "completed"],
    default: "upcoming",
  },
});

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserCollab",
      required: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "AI/ML",
        "Web Development",
        "Mobile App",
        "IoT",
        "Game Development",
        "Data Science",
        "Blockchain",
        "Other",
      ],
    },
    skillsNeeded: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    skillsOffered: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    teamSize: {
      type: String,
      required: [true, "Team size is required"],
      // enum: ["2-3 people", "3 people", "3-4 people", "4-5 people", "5+ people"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      // enum: ["1-2 months", "3 months", "3-4 months", "5-6 months", "6+ months"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      enum: ["Remote", "On-campus", "Hybrid", "Flexible"],
    },
    requirements: {
      type: String,
      maxlength: [1000, "Requirements cannot exceed 1000 characters"],
    },
    goals: {
      type: String,
      maxlength: [1000, "Goals cannot exceed 1000 characters"],
    },
    timeline: [timelineSchema],
    status: {
      type: String,
      enum: ["active", "in-progress", "completed", "cancelled"],
      default: "active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    applicants: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserCollab",
          },
          appliedAt: {
            type: Date,
            default: Date.now,
          },
          status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
          },
          message: String,
        },
      ],
      default: [],
    },
    teamMembers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserCollab",
        },
        role: {
          type: String,
          default: "member",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    interestedUsers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserCollab",
        },
      ],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    attachments: [
      {
        filename: String,
        originalName: String,
        mimetype: String,
        size: Number,
        uploadedAt: {
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

// Indexes for search and filtering
projectSchema.index({
  title: "text",
  description: "text",
  skillsNeeded: "text",
});
projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ author: 1, status: 1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ featured: -1, createdAt: -1 });

// Virtual for applicant count
projectSchema.virtual("applicantCount").get(function () {
  return Array.isArray(this.applicants) ? this.applicants.length : 0;
});

// Virtual for team member count
projectSchema.virtual("teamMemberCount").get(function () {
  return Array.isArray(this.teamMembers) ? this.teamMembers.length : 0;
});

// Virtual for interested user count
projectSchema.virtual("interestedCount").get(function () {
  return Array.isArray(this.interestedUsers) ? this.interestedUsers.length : 0;
});

// Method to check if user has applied
projectSchema.methods.hasUserApplied = function (userId) {
  return this.applicants.some(
    (applicant) => applicant.user?.toString() === userId.toString()
  );
};

// Method to check if user is interested
projectSchema.methods.isUserInterested = function (userId) {
  return this.interestedUsers.some(
    (user) => user.toString() === userId.toString()
  );
};

// Method to check if user is team member
projectSchema.methods.isUserTeamMember = function (userId) {
  return this.teamMembers.some(
    (member) => member.user.toString() === userId.toString()
  );
};

// Pre-save middleware to update featured status based on criteria
projectSchema.pre("save", function (next) {
  const interestedUsersLength = Array.isArray(this.interestedUsers)
    ? this.interestedUsers.length
    : 0;
  const applicantsLength = Array.isArray(this.applicants)
    ? this.applicants.length
    : 0;
  // Auto-feature projects with high interest or from highly rated authors
  if (this.interestedUsers.length >= 10 || this.applicants.length >= 15) {
    this.featured = true;
  }
  next();
});

// Ensure virtuals are included in JSON output
projectSchema.set("toJSON", { virtuals: true });
projectSchema.set("toObject", { virtuals: true });

const ProjectCollab = mongoose.model("ProjectCollab", projectSchema);

export default ProjectCollab;
