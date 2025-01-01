import { useEffect, useState } from "react";
import "./viewTrack.css";
import Chat from "../../chat/chat";
import api from "../../../utils/api";

function ViewTrack({ singleTrack, index }) {
  const [displayChat, setDisplayChat] = useState(false);
  const [freename, setFreeName] = useState("M");

  const room = singleTrack?._id;
  const sid = singleTrack?.student;

  function handleChatClick() {
    setDisplayChat(!displayChat);
  }

  useEffect(() => {
    async function getName() {
      try {
        const result = await api.get(
          `/freelancer/get-name/${singleTrack?.freelancer}`
        );
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
        <div className="t-fn-c">{freename}</div>
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
