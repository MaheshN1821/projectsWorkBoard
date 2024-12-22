import "./chat.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// import api from "../../utils/api";

const socket = io.connect("http://localhost:3000");

function Chat({ room, sid, fid }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    // async function getMessage() {
    //   const response = await api.post("/chat/getMessages");
    //   console.log(response);
    // }

    // getMessage();

    if (sid && room) {
      socket.emit("join_room", room);
    }

    socket.on("receive_message", (data) => {
      console.log(messageList);
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("receive_message", (data) => {
        console.log(messageList);
        setMessageList((list) => [...list, data]);
      });
    };
  }, [room]);

  // const joinRoom = () => {

  // };

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
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-container">
      {/* <div onClick={joinRoom}>Start</div> */}
      <div className="chat-title">Connect!</div>
      <div className="chat-body">
        {messageList.map((messageContent, index) => (
          <h1 key={index + 1}>{messageContent.message}</h1>
        ))}
      </div>
      <div className="chat-send">
        <input
          type="text"
          placeholder="Enter a message!"
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
