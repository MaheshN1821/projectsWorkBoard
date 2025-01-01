import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: String,
  },
});

const Note = mongoose.model("note", noteSchema);

export default Note;
