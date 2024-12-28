import { useState } from "react";
import "./viewOngoing.css";
import Chat from "../../components/chat/chat";

// import { io } from "socket.io-client";
// const socket = io.connect("http://localhost:3000");

function ViewOngoing({ ongoing, index }) {
  const [displayChat, setDisplayChat] = useState(false);

  const room = ongoing?._id;
  const fid = ongoing?.freelancer;

  function handleChatClick() {
    setDisplayChat(!displayChat);
    // if (fid && room) {
    //   socket.emit("join_room", room);
    // }
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
          <span className="on-complete">Completed</span>
        </div>
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
