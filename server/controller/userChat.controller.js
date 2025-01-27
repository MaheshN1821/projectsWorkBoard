import Message from "../model/message.js";

const handleUserChatSaving = async (req, res) => {
  const { message, time, role, projID, freeID, studID } = req.body;

  try {
    const newMessage = await Message.create({
      message: message,
      time: time,
      role: role,
      projID: projID,
      freeID: freeID,
      studID: studID,
    });
    const response = await newMessage.save();

    if (response) {
      return res.status(201).json({ message: "Created Successfully!" });
    }
    res.status(500).json({ error: "Try again later" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

const handleUserChatRetreiving = async (req, res) => {
  const { projID, freeID, studID } = req.body;

  try {
    const response = await Message.find({
      projID: projID,
      freeID: freeID,
      studID: studID,
    });

    if (response) {
      return res.status(201).json({ response });
    }
    res.status(500).json({ error: "Try again later" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

export { handleUserChatSaving, handleUserChatRetreiving };
