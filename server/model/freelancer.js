import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  workedProjects: {
    type: String,
    default: "Not Specified",
  },
  techStack: {
    type: String,
    default: "Not Specified",
  },
  fimage: {
    type: String,
    default: "https://via.placeholder.com/120",
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

const Freelancer = mongoose.model("freelancer", freelancerSchema);

export default Freelancer;
