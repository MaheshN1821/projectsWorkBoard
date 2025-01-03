import Request from "../model/request.js";

const handleSavingRequest = async (req, res) => {
  const { studId, freeId, date } = req.body;

  try {
    const newRequest = await Request.create({
      student: studId,
      freelancer: freeId,
      date: date,
    });

    const result = await newRequest.save();

    res.status(201).json({ message: "Done", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleGetRequest = async (req, res) => {
  const { freeId } = req.body;

  try {
    const info = await Request.find({ freelancer: freeId });
    res.status(200).json({ message: "Done", info });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

export { handleSavingRequest, handleGetRequest };
