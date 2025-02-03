import { useEffect, useState } from "react";
import "./complete.css";
import api from "../../../utils/api";

function CompleteCard({ complete }) {
  const [studentName, setStudentName] = useState("M");

  useEffect(() => {
    async function getName() {
      try {
        const result = await api.get(`/student/get-name/${complete?.student}`);
        setStudentName(result.data.student_name);
      } catch (err) {
        console.log(err);
      }
    }

    getName();
  }, [complete?.student]);

  return (
    <div className="completeCard-container">
      <div className="c-border-card">
        <div className="c-proj-title">{complete?.project_title}</div>
        <div className="c-p-desc">{complete?.project_description}</div>
        <div className="c-other-contents">
          <div className="c-p-stack">
            <div className="c-p-t">Tech Stack</div> {complete?.techStack}
          </div>
          <div className="c-p-time">
            <div className="c-p-d">Completed On</div>{" "}
            {complete?.completion_date}
          </div>
          <div className="c-know-more">
            <div className="u-n-c">Username</div>
            {studentName}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteCard;
