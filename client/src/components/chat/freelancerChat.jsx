import { useState } from "react";
import "./commonChat.css";
import api from "../../utils/api";

function FreelancerChat({ projId, freeId, studId }) {
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState([]);

  const getMessage = async () => {
    try {
      const data = {
        projID: projId,
        freeID: freeId,
        studID: studId,
      };
      const val = await api.post("/chat/freelancer/get-messages", data);
      setMessageList(val.data.response);
      // console.log(val.data.response);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    if (currentMessage !== "" || currentMessage.trim()) {
      const messageData = {
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          " : " +
          new Date(Date.now()).getMinutes(),
        role: "freelancer",
      };

      try {
        const data = {
          ...messageData,
          projID: projId,
          freeID: freeId,
          studID: studId,
        };

        const val = await api.post("/chat/freelancer/send-messages", data);
        if (val) {
          alert("sent Successfully");
        }
        // console.log(val);
      } catch (err) {
        console.log(err);
      }
      setCurrentMessage("");
    }
  };

  return (
    <div className="UserChatCont">
      <div className="uCC-1">
        <div className="chat-frame">
          <div className="chat-body-1">
            {messageList.length === 0 ? (
              <>
                <p className="empty-message">
                  There are no messages yet,Start a Converstion!
                </p>
                <span className="tip-message">
                  <div>
                    Tip: Click on Get Messages to load previous messages,
                  </div>{" "}
                  <div className="last-margin">if conversation is done!</div>
                </span>
              </>
            ) : (
              messageList.map((messageContent, index) => (
                <div
                  key={index + 1}
                  className="message-1"
                  id={messageContent.role === "user" ? "you-1" : "other-1"}
                >
                  <div>
                    <div className="message-content-1">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta-1">
                      <p id="time-1">{messageContent.time}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="chat-send-cont-1">
            <input
              className="chat-in-1"
              type="text"
              placeholder="Enter a message!"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="chat-box-cont-00">
          <span className="get-messages" onClick={getMessage}>
            Get Messages
          </span>
          <span className="send-messages" onClick={sendMessage}>
            Send Messages
          </span>
        </div>
      </div>
    </div>
  );
}

export default FreelancerChat;
