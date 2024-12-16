import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import "./student.css";

function Student() {
  const Navigate = useNavigate();
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
            <div className="subFeature">View previous listed Projects</div>
          </div>
          <div>
            <div className="subFeature">View Responses</div>
            <div className="subFeature">Book a 1:1 session</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
