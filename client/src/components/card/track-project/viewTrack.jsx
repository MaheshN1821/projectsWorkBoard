import { useState } from "react";
import "./viewTrack.css";
import Chat from "../../chat/chat";

function ViewTrack({ singleTrack, index }) {
  const [displayChat, setDisplayChat] = useState(false);

  const room = singleTrack?._id;
  const sid = singleTrack?.student;
  const fid = singleTrack?.freelancer;

  function handleChatClick() {
    setDisplayChat(!displayChat);
  }

  return (
    <div className="view-track-container">
      <div className="track-head">
        <span>Sl no</span>
        <span>Project Title</span>
        <span>Freelancer Name</span>
        <span>Action</span>
      </div>
      <div className="track-contents">
        <div>{index + 1}</div>
        <div>{singleTrack?.project_title}</div>
        <div>{singleTrack?.freelancer}</div>
        <div className="track-options">
          <span onClick={handleChatClick}>Chat</span>
          <span>Accept</span>
          <span>Decline</span>
        </div>
      </div>
      <div
        className="track-chat"
        style={{ display: displayChat ? "block" : "none" }}
      >
        <Chat room={room} sid={sid} fid={fid} />
      </div>
    </div>
  );
}

export default ViewTrack;
