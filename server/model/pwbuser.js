import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone_number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["client", "freelancer"],
      required: true,
    },
    // Freelancer specific fields
    techStack: {
      type: String,
      required: function () {
        return this.userType === "freelancer";
      },
    },
    workedProjects: {
      type: String,
      required: function () {
        return this.userType === "freelancer";
      },
    },
    // Client specific fields
    company: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    completedProjects: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const PwbUser = mongoose.model("PwbUser", userSchema);

export default PwbUser;
