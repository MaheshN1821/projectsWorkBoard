import Project from "../model/project.js";

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

export { handleProjectDetails, handleProjectDetailsUpdation };
