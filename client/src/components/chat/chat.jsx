import "./chat.css";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function Chat({ userID }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentUserChat, setCurrentUserChat] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    // socket.current = io("wss://projects-work-board.vercel.app");
    socket.current = io("https://projects-work-board.vercel.app", {
      withCredentials: true,
    });
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt:
          new Date(Date.now()).getHours() +
          " : " +
          new Date(Date.now()).getMinutes(),
      });
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentUserChat?.includes(arrivalMessage.sender) &&
  //     setMessageList((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentUserChat]);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentUserChat.some((user) => user.user === arrivalMessage.sender)
    ) {
      setMessageList((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentUserChat]);

  useEffect(() => {
    // setCurrentUserChat(...currentUserChat, { user: userID });
    setCurrentUserChat((prev) => [...prev, { user: userID }]);
    socket.current.emit("addUser", userID);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
    socket.current.on("disconnect", () => {
      setCurrentUserChat((prev) =>
        prev.filter((current) => current.user !== userID)
      );
    });
  }, [userID, currentUserChat]);

  const sendMessage = async () => {
    if (currentMessage !== "" || currentMessage.trim()) {
      const messageData = {
        sender: userID,
        text: currentMessage,
        createdAt:
          new Date(Date.now()).getHours() +
          " : " +
          new Date(Date.now()).getMinutes(),
      };

      // const receiverId = currentUserChat.find((member) => member !== userID);
      const receiverId = currentUserChat.find(
        (member) => member.user !== userID
      )?.user;
      if (receiverId) {
        socket.current.emit("sendMessage", {
          senderId: userID,
          receiverId,
          messageData,
        });
      }

      setMessageList((prev) => [
        ...prev,
        {
          sender: userID,
          text: currentMessage,
          createdAt:
            new Date().getHours() +
            ":" +
            String(new Date().getMinutes()).padStart(2, "0"),
        },
      ]);

      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-body">
        {messageList.map((messageContent, index) => (
          <div
            key={index + 1}
            className="message"
            id={userID === messageContent.sender ? "you" : "other"}
          >
            <div>
              <div className="message-content">
                <p>{messageContent.text}</p>
              </div>
              <div className="message-meta">
                <p id="time">{messageContent.createdAt}</p>
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
          value={currentMessage}
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

// import "./chat.css";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// function Chat({ room, sid, fid }) {
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [messageList, setMessageList] = useState([]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Initialize socket
//     const newSocket = io("https://projects-work-board.vercel.app", {
//       withCredentials: true,
//       transports: ["websocket"],
//     });
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect(); // Cleanup socket on component unmount
//     };
//   }, []);

//   useEffect(() => {
//     if (!socket) return;

//     // Join room
//     if (room) {
//       socket.emit("join_room", room);
//     }

//     // Listen for incoming messages
//     socket.on("receive_message", (data) => {
//       setMessageList((list) => [...list, data]);
//     });

//     // Cleanup listener on dependency changes
//     return () => {
//       socket.off("receive_message");
//     };
//   }, [socket, room]);

//   const sendMessage = async () => {
//     if (currentMessage.trim() !== "") {
//       const messageData = {
//         room: room,
//         author: sid,
//         message: currentMessage.trim(),
//         time:
//           new Date(Date.now()).getHours() +
//           " : " +
//           new Date(Date.now()).getMinutes(),
//       };

//       await socket.emit("send_message", messageData);
//       setMessageList((list) => [...list, messageData]);
//       setCurrentMessage(""); // Clear the input field
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-body">
//         {messageList.map((messageContent, index) => (
//           <div
//             key={index}
//             className="message"
//             id={sid === messageContent.author ? "you" : "other"}
//           >
//             <div>
//               <div className="message-content">
//                 <p>{messageContent.message}</p>
//               </div>
//               <div className="message-meta">
//                 <p id="time">{messageContent.time}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="chat-send-cont">
//         <input
//           className="chat-in"
//           type="text"
//           placeholder="Enter a message!"
//           value={currentMessage}
//           onChange={(e) => setCurrentMessage(e.target.value)}
//         />
//         <button onClick={sendMessage} className="chat-send">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;
