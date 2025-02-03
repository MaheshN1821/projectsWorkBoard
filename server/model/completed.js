import mongoose from "mongoose";

const completedSchema = new mongoose.Schema({
  project_title: {
    type: String,
    required: true,
  },
  project_description: {
    type: String,
    required: true,
  },
  completion_date: {
    type: String,
    required: true,
  },
  techStack: {
    type: String,
    required: true,
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
  },
  status: {
    type: String,
    default: "Completed",
  },
});

const Completed = mongoose.model("completed", completedSchema);

export default Completed;
