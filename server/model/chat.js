import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  message: {
    type: Array,
  },
  sent_date: {
    type: String,
  },
});

const Chat = mongoose.model("chat", chatSchema);

export default Chat;
