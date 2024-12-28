import mongoose from "mongoose";

const selectedProjectSchema = new mongoose.Schema({
  project_title: {
    type: String,
    required: true,
  },
  project_description: {
    type: String,
    required: true,
  },
  deadline: {
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
    default: "Waiting",
  },
  min_price: {
    type: Number,
    default: 500,
  },
  max_price: {
    type: Number,
    default: 500,
  },
  room_string: {
    type: String,
  },
});

const Selected = mongoose.model("selected", selectedProjectSchema);

export default Selected;
