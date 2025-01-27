import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  time: {
    type: String,
  },
  role: {
    type: String,
  },
  projID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  freeID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  studID: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Message = mongoose.model("message", messageSchema);

export default Message;
