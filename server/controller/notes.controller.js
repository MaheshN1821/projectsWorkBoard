import Note from "../model/notes.js";

const handleSaveNote = async (req, res) => {
  const { note, projectId, freelancer } = req.body;

  const now = new Date();
  const formattedDateTime = now.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  try {
    const newNote = await Note.create({
      note: note,
      projectId: projectId,
      freelancer: freelancer,
      date: formattedDateTime,
    });

    const result = await newNote.save();

    res.status(201).json({ message: "Created!", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again Later!" });
  }
};

const handleGetNote = async (req, res) => {
  const { projectId, freelancer } = req.body;

  try {
    const result = await Note.find({
      projectId: projectId,
      freelancer: freelancer,
    });

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again Later!" });
  }
};

export { handleGetNote, handleSaveNote };
