import Header from "../../components/header/header";
import "./student.css";

function Student() {
  return (
    <div className="studentContainer">
      <Header />
      <div className="feat-wrapper">
        <div className="features">
          <div>
            <div className="subFeature">List a Project</div>
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
