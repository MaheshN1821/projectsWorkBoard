import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import "./student.css";
import { useEffect, useState } from "react";
import api from "../../utils/api";

function Student() {
  const Navigate = useNavigate();
  const studId = sessionStorage.getItem("studentId");
  const [username, setUsername] = useState("User");
  const [displayLogout, setDisplayLogout] = useState(false);

  useEffect(() => {
    async function toGetName() {
      try {
        const val = await api.get(`/student/get-name/${studId}`);
        // console.log(val.data.student_name);
        setUsername(val?.data?.student_name);
      } catch (err) {
        console.log(err);
      }
    }

    toGetName();
  }, [studId]);

  function handleClick() {
    setDisplayLogout(!displayLogout);
  }

  async function handleLogout() {
    try {
      await api.get("/auth/student/logout", {
        withCredentials: true,
      });
      sessionStorage.clear();
      Navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="studentContainer">
      <Header />
      <div className="feat-wrapper">
        <div className="features">
          <div>
            <div
              className="subFeature"
              onClick={() => {
                Navigate("/student/list-project");
              }}
            >
              List a Project
            </div>
            <div
              className="subFeature"
              onClick={() => {
                Navigate("/student/view-project");
              }}
            >
              View Listed Projects
            </div>
          </div>
          <div>
            <div
              className="subFeature"
              onClick={() => {
                Navigate("/student/track-project");
              }}
            >
              Track a Project
            </div>
            <div
              className="subFeature"
              onClick={() => {
                Navigate("/student/request");
              }}
            >
              Book a 1:1 session
            </div>
          </div>
        </div>
      </div>
      <div className="manage-s" onClick={handleClick}>
        Welcome {username}!
      </div>
      <div
        className="manage-s-l"
        style={{ display: displayLogout ? "flex" : "none" }}
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
}

export default Student;
