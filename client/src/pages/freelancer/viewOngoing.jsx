import { useState } from "react";
import "./viewOngoing.css";
import Chat from "../../components/chat/chat";

function ViewOngoing({ ongoing, index }) {
  const [displayChat, setDisplayChat] = useState(false);
  const [displayKeyPoints, setDisplayKeyPoints] = useState(false);

  const room = ongoing?._id;
  const fid = ongoing?.freelancer;

  function handleChatClick() {
    setDisplayChat(!displayChat);
  }

  function handleKeyPointsClick() {
    setDisplayKeyPoints(!displayKeyPoints);
  }

  return (
    <div className="ongoing-track-container">
      <div className="ongoing-contents">
        <div className="on-sl">{index + 1}</div>
        <div className="on-pt">{ongoing?.project_title}</div>
        <div className="on-sn">{ongoing?.student}</div>
        <div className="on-a">
          <span onClick={handleChatClick} className="on-chat">
            Chat
          </span>
          <span onClick={handleKeyPointsClick} className="key-points">
            Key Points
          </span>
          <span className="on-complete">Completed</span>
        </div>
      </div>
      <div
        className="key-points-1"
        style={{ display: displayKeyPoints ? "flex" : "none" }}
      >
        <div className="add-note">Add Note</div>
        <div className="display-note">Display Notes</div>
      </div>
      <div
        className="ongoing-chat"
        style={{ display: displayChat ? "flex" : "none" }}
      >
        <Chat room={room} sid={""} fid={fid} />
      </div>
    </div>
  );
}

export default ViewOngoing;
