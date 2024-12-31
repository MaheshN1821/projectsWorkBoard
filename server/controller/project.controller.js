import Project from "../model/project.js";

const handleProjectInfo = async (req, res) => {
  try {
    const info = await Project.find();

    res.status(200).json({ info });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleUserProjectDetails = async (req, res) => {
  const userId = req.params.userId;

  try {
    const info = await Project.find({ student: userId });

    res.status(200).json({ info });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

export { handleProjectInfo, handleUserProjectDetails };
