import Freelancer from "../model/freelancer.js";
import Selected from "../model/selected.js";
import Completed from "../model/completed.js";
import mongoose from "mongoose";

const handleGetFreelancerInfo = async (req, res) => {
  const freeId = req?.params?.freeId;

  if (!freeId || !mongoose.Types.ObjectId.isValid(freeId)) {
    return res.status(400).json({ error: "Invalid freelancer ID" });
  }

  try {
    const info = await Freelancer.find({ _id: freeId });
    res.status(200).json({ info });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleGetAllFreelancerInfo = async (req, res) => {
  try {
    const freelancerInfo = await Freelancer.find();
    res.status(200).json({ freelancerInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleFreelancerInfoUpdation = async (req, res) => {
  const info = req.body.newData;
  try {
    const response = await Freelancer.findByIdAndUpdate(
      info.fId,
      {
        username: info.username,
        phone_number: info.phone_number,
        email: info.email,
        address: info.address,
        workedProjects: info.workedProjects,
        techStack: info.techStack,
        fimage: info.fimage.toString(),
      },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    console.log(response);
    res.status(200).json({ message: "Done", response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleFreelancerName = async (req, res) => {
  const freeId = req.params.fId;

  try {
    const freelancername = await Freelancer.findById(freeId);

    if (!freelancername) {
      return res.status(404).json({ error: "Invalid Id" });
    }

    res.status(200).json({ freelancer_name: freelancername.username });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again Later!" });
  }
};

const handleProjectDeletion = async (req, res) => {
  const { projId, freeId } = req.body;

  try {
    const value = await Selected.findByIdAndDelete(projId, {
      freelancer: freeId,
    });

    res.status(200).json({ message: "done", value });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleProgressUpdation = async (req, res) => {
  const { progress, projId } = req.body;

  try {
    const response = await Selected.findByIdAndUpdate(
      projId,
      {
        status: progress.toString(),
      },
      { new: true }
    );

    res.status(200).json({ message: "Done", response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleSaveCompletion = async (req, res) => {
  const {
    project_title,
    project_description,
    completion_date,
    techStack,
    freelancer,
    student,
  } = req.body;

  try {
    const newData = await Completed.create({
      project_title: project_title,
      project_description: project_description,
      completion_date: completion_date,
      techStack: techStack,
      freelancer: freelancer,
      student: student,
    });

    const response = await newData.save();

    res.status(201).json({ message: "Done", response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleGetCompleted = async (req, res) => {
  const freeId = req.params.freeId;
  try {
    const response = await Completed.find({ freelancer: freeId });
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again Later!" });
  }
};

export {
  handleGetFreelancerInfo,
  handleFreelancerInfoUpdation,
  handleFreelancerName,
  handleProjectDeletion,
  handleProgressUpdation,
  handleSaveCompletion,
  handleGetCompleted,
  handleGetAllFreelancerInfo,
};
