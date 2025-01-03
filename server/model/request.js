import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: String,
  },
});

const Request = mongoose.model("request", requestSchema);

export default Request;
