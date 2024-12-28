import { useState } from "react";
import "./viewTrack.css";
import Chat from "../../chat/chat";

// import { io } from "socket.io-client";
// const socket = io.connect("http://localhost:3000");

function ViewTrack({ singleTrack, index }) {
  const [displayChat, setDisplayChat] = useState(false);

  const room = singleTrack?._id;
  const sid = singleTrack?.student;

  function handleChatClick() {
    setDisplayChat(!displayChat);
    // if (sid && room) {
    //   socket.emit("join_room", room);
    // }
  }

  return (
    <div className="view-track-container">
      <div className="track-contents">
        <div className="t-sl-c">{index + 1}</div>
        <div className="t-pt-c">{singleTrack?.project_title}</div>
        <div className="t-fn-c">{singleTrack?.freelancer}</div>
        <div className="v-opt-container t-a-c">
          <span onClick={handleChatClick} className="v-listed-chat">
            Chat
          </span>
          <span className="v-listed-accept">Accept</span>
          <span className="v-listed-decline">Decline</span>
        </div>
      </div>
      <div
        className="track-chat"
        style={{ display: displayChat ? "flex" : "none" }}
      >
        <Chat room={room} sid={sid} fid={""} />
      </div>
    </div>
  );
}

export default ViewTrack;
