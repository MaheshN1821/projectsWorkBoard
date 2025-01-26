import { useEffect, useState } from "react";
import "./viewTrack.css";
import Chat from "../../chat/chat";
import api from "../../../utils/api";
import Payment from "../../payment/payment";

function ViewTrack({ singleTrack, index, count, setCount }) {
  const [displayChat, setDisplayChat] = useState(false);
  const [freelancerInfo, setFreelancerInfo] = useState([]);
  const [freename, setFreeName] = useState("M");
  const [displayNone, setDisplayNone] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(false);
  const [displayPay, setDisplayPay] = useState(false);
  const [displayProfile, setDisplayProfile] = useState(false);

  const room = singleTrack?._id;
  const sid = singleTrack?.student;

  function handleChatClick() {
    setDisplayChat(!displayChat);
  }

  async function handleDecline() {
    try {
      const data = {
        projId: singleTrack?._id,
        freeId: singleTrack?.freelancer,
        studId: singleTrack?.student,
      };

      const val = await api.post("/student/decline", data);

      console.log(val);
      if (val) {
        count < 1000 ? setCount(count + 1) : setCount(0);
      }
    } catch (err) {
      console.log(err);
      alert("something is wrong!");
    }
  }

  async function handleAccept() {
    try {
      const data = {
        projId: singleTrack?._id,
        freeId: singleTrack?.freelancer,
        studId: singleTrack?.student,
      };

      const val = await api.post("/student/accept", data);

      if (val.status === 200) {
        setDisplayNone(true);
      }
    } catch (err) {
      console.log(err);
      alert("something is wrong!");
    }
  }

  async function handleProgress() {
    setDisplayProgress(!displayProgress);
  }

  async function handlePay() {
    setDisplayPay(!displayPay);
  }

  async function handleFreelancerProfile() {
    const freeId = singleTrack?.freelancer;
    try {
      const result = await api.get(`/freelancer/${freeId}`);
      setFreelancerInfo(result.data.info);
      setDisplayProfile(!displayProfile);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getName() {
      try {
        const result = await api.get(
          `/freelancer/get-name/${singleTrack?.freelancer}`
        );
        singleTrack?.status === "Accepted"
          ? setDisplayNone(true)
          : singleTrack?.status === "Waiting" ||
            singleTrack?.status === "Approached"
          ? setDisplayNone(false)
          : setDisplayNone(true);
        setFreeName(result.data.freelancer_name);
      } catch (err) {
        console.log(err);
      }
    }

    getName();
  }, [singleTrack?.freelancer]);

  return (
    <div className="view-track-container">
      <div className="track-contents">
        <div className="t-sl-c">{index + 1}</div>
        <div className="t-pt-c">{singleTrack?.project_title}</div>
        <div
          className="t-fn-c"
          onClick={handleFreelancerProfile}
          style={{ cursor: "pointer" }}
        >
          {freename}
        </div>
        <div className="v-opt-container t-a-c">
          <span onClick={handleChatClick} className="v-listed-chat">
            Chat
          </span>
          <span
            style={{ display: displayNone ? "none" : "flex" }}
            className="v-listed-accept"
            onClick={handleAccept}
          >
            Accept
          </span>
          <span
            style={{ display: displayNone ? "none" : "flex" }}
            className="v-listed-decline"
            onClick={handleDecline}
          >
            Decline
          </span>
          <span
            style={{ display: !displayNone ? "none" : "flex" }}
            className="pp-cont"
          >
            <span className="v-listed-progress" onClick={handleProgress}>
              Progress
            </span>
            <span className="v-listed-pay" onClick={handlePay}>
              Pay
            </span>
          </span>
        </div>
      </div>
      <div
        className="vt-progress"
        style={{ display: displayProgress ? "flex" : "none" }}
      >
        {singleTrack?.status === "Completed" ? (
          <p>Project Progress : {singleTrack?.status} 100%</p>
        ) : (
          <p>Project Progress : {singleTrack?.status}%</p>
        )}
      </div>
      <div className="vt-pay" style={{ display: displayPay ? "flex" : "none" }}>
        <Payment />
      </div>
      <div
        className="track-chat"
        style={{ display: displayChat ? "flex" : "none" }}
      >
        <Chat userID={sid} />
      </div>
      <div
        style={{ display: displayProfile ? "flex" : "none" }}
        className="profileContainer"
      >
        <div className="twoCont-1">
          <div className="acc-cont-1-1">
            <div
              className="profile-image"
              style={{
                backgroundImage: `url(${freelancerInfo[0]?.fimage})`,
              }}
            ></div>
            <div className="info-item">
              <label>Name:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder={freelancerInfo[0]?.username}
                disabled
              />
            </div>
            <div className="info-item">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder={freelancerInfo[0]?.email}
                disabled
              />
            </div>
            <div className="info-item">
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder={freelancerInfo[0]?.phone_number}
                disabled
              />
            </div>
            <div className="info-item">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder={freelancerInfo[0]?.address}
                disabled
              />
            </div>
          </div>
          <div className="acc-cont-2-2">
            <div className="info-head-1-2">
              <h1>Experience</h1>
            </div>
            <div className="form-item-container">
              <label htmlFor="projects">Previously Worked Projects:</label>
              <textarea
                id="projects"
                name="projects"
                placeholder={freelancerInfo[0]?.workedProjects}
                disabled
              ></textarea>
            </div>
            <div className="form-item-container">
              <label htmlFor="techStack">Proficiency in Tech Stack:</label>
              <input
                type="text"
                id="techStack"
                name="techStack"
                placeholder={freelancerInfo[0]?.techStack}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTrack;
