import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import "./freelancer.css";

function Freelancer() {
  const Navigate = useNavigate();
  return (
    <div className="freelancerContainer">
      <Header />
      <div className="free-wrapper">
        <div className="free-features">
          <div>
            <div
              className="free-subFeature"
              onClick={() => {
                Navigate("/freelancer/view-project");
              }}
            >
              New Projects
            </div>
            <div
              className="free-subFeature"
              onClick={() => {
                Navigate("/freelancer/ongoing-project");
              }}
            >
              Ongoing Projects
            </div>
          </div>
          <div>
            <div
              className="free-subFeature"
              onClick={() => {
                Navigate("/freelancer/request");
              }}
            >
              View Requests
            </div>
            <div
              className="free-subFeature"
              onClick={() => {
                Navigate("/freelancer/completed");
              }}
            >
              Completed Projects
            </div>
          </div>
        </div>
      </div>
      <div
        className="manage"
        onClick={() => Navigate("/freelancer/manage-account")}
      >
        Manage Account
      </div>
    </div>
  );
}

export default Freelancer;
