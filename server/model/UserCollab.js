import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: [
        "Computer Science",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Information Technology",
        "Design",
        "Business",
        "Psychology",
        "Environmental Engineering",
        "Digital Media",
        "Data Science",
        "Other",
      ],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      enum: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"],
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    avatar: {
      type: String,
      default: function () {
        return this.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();
      },
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    interests: [
      {
        type: String,
        trim: true,
      },
    ],
    experience: [
      {
        title: {
          type: String,
          required: true,
        },
        company: String,
        duration: String,
        description: String,
        type: {
          type: String,
          enum: ["work", "project", "education"],
          default: "work",
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    projectsCompleted: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      projectUpdates: {
        type: Boolean,
        default: true,
      },
      weeklyDigest: {
        type: Boolean,
        default: false,
      },
      profileVisible: {
        type: Boolean,
        default: true,
      },
      allowDirectMessages: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
userSchema.index({ name: "text", bio: "text", skills: "text" });
userSchema.index({ department: 1, year: 1 });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update rating method
userSchema.methods.updateRating = async function () {
  const Project = mongoose.model("Project");
  const projects = await Project.find({
    author: this._id,
    status: "completed",
  });

  if (projects.length > 0) {
    const totalRating = projects.reduce(
      (sum, project) => sum + (project.rating || 0),
      0
    );
    this.rating = totalRating / projects.length;
    this.projectsCompleted = projects.length;
    await this.save();
  }
};

// Remove sensitive data from JSON output
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserCollab = mongoose.model("UserCollab", userSchema);

export default UserCollab;
