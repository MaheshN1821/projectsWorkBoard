import { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [todisplay, setToDisplay] = useState(false);
  const Navigate = useNavigate();

  return (
    <div className="nav-wrapper">
      <div className="nav-container">
        <div className="topic-container">
          <div
            className="topic"
            onClick={() => {
              Navigate("/");
            }}
          >
            Projects
          </div>
          <div
            className="topic"
            onClick={() => {
              Navigate("/about");
            }}
          >
            About Us
          </div>
          <div
            className="topic"
            onClick={() => {
              Navigate("/contact");
            }}
          >
            Contact Us
          </div>
          <div
            className="topic profile"
            onMouseOver={() => {
              setToDisplay(true);
            }}
          >
            <div>Profile</div>
            <div
              className="additional"
              onMouseOver={() => {
                setToDisplay(true);
              }}
              onMouseOut={() => {
                setToDisplay(false);
              }}
              style={{ display: todisplay ? "block" : "none" }}
            >
              <p
                className="sub"
                onClick={() => {
                  Navigate("/student/login");
                }}
              >
                Student
              </p>
              <p
                className="sub"
                onClick={() => {
                  Navigate("/freelancer/login");
                }}
              >
                Freelancer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
