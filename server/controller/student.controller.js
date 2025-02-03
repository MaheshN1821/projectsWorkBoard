import Project from "../model/project.js";
import User from "../model/user.js";
import Selected from "../model/selected.js";

const handleProjectDetails = async (req, res) => {
  const info = req.body;

  try {
    const record = await Project.create({
      project_title: info.title,
      project_description: info.description,
      techStack: info.stack,
      deadline: info.completion,
      min_price: info.minprice,
      max_price: info.maxprice,
      student: info.userID,
    });
    const response = await record.save();

    res.status(201).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleProjectDetailsUpdation = async (req, res) => {
  const info = req.body;

  try {
    const response = await Project.updateOne(
      { _id: info.listId },
      {
        project_title: info.title,
        project_description: info.description,
        techStack: info.stack,
        deadline: info.completion,
        min_price: info.minprice,
        max_price: info.maxprice,
        student: info.userID,
      },
      { new: true }
    );

    res.status(200).json({ message: "Successfully Updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleProjectDetailsDeletion = async (req, res) => {
  const info = req.body;
  try {
    const response = await Project.findByIdAndDelete(info?._id);

    res.status(200).json({ message: "Deletion was Successfull!", response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleStudentName = async (req, res) => {
  const studId = req.params.sId;

  try {
    const studentName = await User.findById(studId);

    if (!studentName) {
      return res.status(404).json({ error: "Invalid Id" });
    }

    res.status(200).json({ student_name: studentName.username });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again Later!" });
  }
};

const handleSingleStudentInfo = async (req, res) => {
  const studId = req.params.studId;

  try {
    const studentInfo = await User.findById(studId);

    if (!studentInfo) {
      return res.status(404).json({ error: "Invalid Id" });
    }

    res.status(200).json({ studentInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again Later!" });
  }
};

const handleDecline = async (req, res) => {
  const { projId, freeId, studId } = req.body;

  try {
    const wait = await Selected.findByIdAndDelete(projId);

    if (!wait) {
      return res.status(401).json({ error: "Try again later!" });
    }

    res.status(200).json({ message: "Done", wait });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again Later!" });
  }
};

const handleAccept = async (req, res) => {
  const { projId, freeId, studId } = req.body;

  try {
    const wait = await Selected.findByIdAndUpdate(
      projId,
      { status: "Accepted" },
      { new: true }
    );
    console.log(wait);
    res.status(200).json({ message: "Done", wait });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again Later!" });
  }
};

export {
  handleProjectDetails,
  handleProjectDetailsUpdation,
  handleProjectDetailsDeletion,
  handleStudentName,
  handleDecline,
  handleAccept,
  handleSingleStudentInfo,
};
