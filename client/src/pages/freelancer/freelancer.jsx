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
            <div className="free-subFeature">New Projects</div>
            <div className="free-subFeature">Ongoing Projects</div>
          </div>
          <div>
            <div className="free-subFeature">View Requests</div>
            <div className="free-subFeature">Completed Projects</div>
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
