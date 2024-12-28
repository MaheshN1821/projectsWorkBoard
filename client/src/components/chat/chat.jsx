import "./chat.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function Chat({ room, sid, fid }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (sid && room) {
      socket.emit("join_room", room);
    }

    if (fid && room) {
      socket.emit("join_room", room);
    }

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
      });
    };
  }, [room]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: sid,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          " : " +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage(" ");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-body">
        {messageList.map((messageContent, index) => (
          <div
            key={index + 1}
            className="message"
            id={sid === messageContent.author ? "you" : "other"}
          >
            <div>
              <div className="message-content">
                <p>{messageContent.message}</p>
              </div>
              <div className="message-meta">
                <p id="time">{messageContent.time}</p>
                <p id="author">{messageContent.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-send-cont">
        <input
          className="chat-in"
          type="text"
          placeholder="Enter a message!"
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="chat-send">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
