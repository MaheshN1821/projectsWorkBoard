import Selected from "../model/selected.js";

const handleSaveSelected = async (req, res) => {
  const info = req.body;
  try {
    const record = await Selected.create({
      project_title: info.project_title,
      project_description: info.project_description,
      techStack: info.techStack,
      deadline: info.deadline,
      min_price: info.minprice,
      max_price: info.maxprice,
      status: "Approached",
      student: info.student,
      freelancer: info.freeId,
    });
    const response = await record.save();
    console.log(response);

    res.status(201).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleGetSelected = async (req, res) => {
  try {
    const response = await Selected.find();
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

export { handleGetSelected, handleSaveSelected };