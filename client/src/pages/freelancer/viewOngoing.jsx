import { useEffect, useState } from "react";
import "./viewOngoing.css";
import Chat from "../../components/chat/chat";
import api from "../../utils/api";

function ViewOngoing({ ongoing, index, count, setCount }) {
  const [displayChat, setDisplayChat] = useState(false);
  const [displayAddNote, setDisplayAddNote] = useState(false);
  const [toDisplayNotes, setToDisplayNotes] = useState(false);
  const [displayKeyPoints, setDisplayKeyPoints] = useState(false);
  const [studentName, setStudentName] = useState("M");
  const [notes, setNotes] = useState("");
  const [notesToRender, setNotesToRender] = useState([]);
  const [projprogress, setProjProgress] = useState(1);
  const [studPhoneNum, setStudPhoneNum] = useState("");
  const [studEmail, setStudEmail] = useState("");
  const [displayStudent, setDisplayStudent] = useState(false);

  const room = ongoing?._id;
  const fid = ongoing?.freelancer;

  function handleChatClick() {
    setDisplayChat(!displayChat);
  }

  function handleKeyPointsClick() {
    setDisplayKeyPoints(!displayKeyPoints);
  }

  async function handleDeletion() {
    try {
      const response = await api.post("/freelancer/delete-project", {
        projId: ongoing._id,
        freeId: ongoing?.freelancer,
      });

      console.log(response);
    } catch (err) {
      console.log(err);
      alert("Try again Later!");
    }
  }

  async function handleNotesSave() {
    const data = {
      note: notes,
      projectId: ongoing._id,
      freelancer: ongoing.freelancer,
    };
    try {
      const result = await api.post("/notes/save-note", data);

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDisplayNotes() {
    setToDisplayNotes(!toDisplayNotes);
    const data = {
      projectId: ongoing._id,
      freelancer: ongoing.freelancer,
    };
    try {
      const val = await api.post("/notes/get-notes", data);
      setNotesToRender(val.data.result);
    } catch (err) {
      console.log(err);
      alert("Try again Later!");
    }
  }

  async function handleStudentInfo() {
    const studId = ongoing?.student;
    try {
      const val = await api.get(`/student/single/${studId}`);
      const data = val.data.studentInfo;
      setDisplayStudent(!displayStudent);
      setStudEmail(data.email);
      setStudPhoneNum(data.phone_number);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleProgressUpdation() {
    try {
      const data = {
        progress: projprogress,
        projId: ongoing?._id,
      };
      const val = await api.post("/freelancer/progress-updation", data);

      console.log(val);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleComplete() {
    try {
      const data = {
        project_title: ongoing?.project_title,
        project_description: ongoing?.project_description,
        completion_date: new Date(Date.now()).toString(),
        techStack: ongoing?.techStack,
        freelancer: ongoing?.freelancer,
        student: ongoing?.student,
      };

      const val1 = await api.post("/freelancer/save-completed", data);

      console.log(val1.data);

      const data2 = {
        progress: "Completed",
        projId: ongoing?._id,
      };
      const val2 = await api.post("/freelancer/progress-updation", data2);

      console.log(val2.data);

      count > 1000 ? setCount(0) : setCount(count + 1);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getName() {
      try {
        const result = await api.get(`/student/get-name/${ongoing?.student}`);
        setStudentName(result.data.student_name);
      } catch (err) {
        console.log(err);
      }
    }

    getName();
  }, [ongoing?.student]);

  return (
    <div className="ongoing-track-container">
      <div className="ongoing-contents">
        <div className="on-sl">{index + 1}</div>
        <div className="on-pt">{ongoing?.project_title}</div>
        <div className="on-sn" onClick={handleStudentInfo}>
          {studentName}
        </div>
        <div className="on-a">
          <span onClick={handleChatClick} className="on-chat">
            Chat
          </span>
          <span onClick={handleKeyPointsClick} className="key-points">
            KeyPoints
          </span>
          <span className="on-delete" onClick={handleDeletion}>
            Delete
          </span>
          <span className="on-complete" onClick={handleComplete}>
            Completed
          </span>
        </div>
      </div>
      <div
        style={{ display: displayStudent ? "flex" : "none" }}
        className="stud-info-display"
      >
        <p className="stud-pn">Phone number: {studPhoneNum}</p>
        <p className="stud-em">Email: {studEmail}</p>
      </div>
      <div
        className="key-points-1"
        style={{ display: displayKeyPoints ? "flex" : "none" }}
      >
        <div
          className="add-note"
          onClick={() => setDisplayAddNote(!displayAddNote)}
        >
          Add Note
        </div>
        <div className="display-note" onClick={handleDisplayNotes}>
          Display Notes
        </div>
        <div className="progress">
          <label>Progress %</label>
          <input
            type="number"
            name="progress"
            id="progress"
            value={projprogress}
            onChange={(e) => setProjProgress(e.target.value)}
          />
          <span onClick={handleProgressUpdation} className="p-up">
            Update
          </span>
        </div>
      </div>
      <div
        className="adding-notes"
        style={{ display: displayAddNote ? "flex" : "none" }}
      >
        <span className="adding-notes-input">
          <label htmlFor="notes">Add your Notes</label>
          <textarea
            type="text"
            name="notes"
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </span>
        <span onClick={handleNotesSave} className="notes-saving-btn">
          Save
        </span>
      </div>
      <div
        style={{ display: toDisplayNotes ? "flex" : "none" }}
        className="note-dis"
      >
        {notesToRender.map((savedNote, index) => (
          <div key={index + 1} className="note-rendering">
            <span>{savedNote?.note}</span>
            <span>{savedNote?.date}</span>
          </div>
        ))}
      </div>
      <div
        className="ongoing-chat"
        style={{ display: displayChat ? "flex" : "none" }}
      >
        <Chat userID={fid} />
      </div>
    </div>
  );
}

export default ViewOngoing;
