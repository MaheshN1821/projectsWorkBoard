import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  aadhar: {
    type: String,
  },
  college_address: {
    type: String,
  },
  college_name: {
    type: String,
  },
  company_name: {
    type: String,
  },
  job_role: {
    type: String,
  },
  student_usn: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
