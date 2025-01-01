import Freelancer from "../model/freelancer.js";
import Selected from "../model/selected.js";

const handleGetFreelancerInfo = async (req, res) => {
  const freeId = req.params.freeId;

  try {
    const info = await Freelancer.find({ _id: freeId });
    res.status(200).json({ info });
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
        fimage: toString(info.fimage),
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

export {
  handleGetFreelancerInfo,
  handleFreelancerInfoUpdation,
  handleFreelancerName,
  handleProjectDeletion,
};
