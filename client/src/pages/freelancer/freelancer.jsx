import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import "./freelancer.css";
import { useEffect, useState } from "react";
import freeApi from "../../utils/freeApi";

function Freelancer() {
  const Navigate = useNavigate();
  const freeId = sessionStorage.getItem("freelancerId");
  const [freename, setFreename] = useState("Freelancer");
  const [displayLogout, setDisplayLogout] = useState(false);

  useEffect(() => {
    async function toGetName() {
      try {
        const val = await freeApi.get(`/freelancer/get-name/${freeId}`);
        setFreename(val?.data?.freelancer_name);
      } catch (err) {
        console.log(err);
      }
    }

    toGetName();
  }, [freeId]);

  function handleClick() {
    setDisplayLogout(!displayLogout);
  }

  async function handleLogout() {
    try {
      await freeApi.get("/auth/freelancer/logout", {
        withCredentials: true,
      });
      sessionStorage.clear();
      Navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

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
      <div className="manage-s-f" onClick={handleClick}>
        Welcome {freename}!
      </div>
      <div
        className="manage"
        style={{ display: displayLogout ? "flex" : "none" }}
        onClick={() => Navigate("/freelancer/manage-account")}
      >
        Manage Account
      </div>
      <div
        className="manage-s-l-f"
        style={{ display: displayLogout ? "flex" : "none" }}
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
}

export default Freelancer;
