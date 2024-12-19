import { useState } from "react";
import ProjectDisplay from "../../components/card/project-display/projectDisplay";
import "./project.css";

function Project() {
  const [toDisplay, setToDisplay] = useState(false);
  function handleInfoClose() {
    setToDisplay(false);
  }
  return (
    <div className="projectPageContainer">
      <div className="project-content">
        <h1 className="proj-head">Newly listed Projects!</h1>
        <div className="project-main">
          <div
            className="card-display"
            style={{
              width: !toDisplay ? "100%" : "50%",
              flexDirection: !toDisplay ? "row" : "column",
              flexWrap: !toDisplay ? "wrap" : "nowrap",
            }}
          >
            {/* {data.map((singleData, index) => {
              <ProjectDisplay
                data={singleData}
                key={index}
                toDisplay={toDisplay}
              />;
            })} */}
            <ProjectDisplay toDisplay={toDisplay} setToDisplay={setToDisplay} />
            <ProjectDisplay toDisplay={toDisplay} setToDisplay={setToDisplay} />
            <ProjectDisplay toDisplay={toDisplay} setToDisplay={setToDisplay} />
          </div>
          <div
            className="additional-info"
            style={{ display: toDisplay ? "block" : "none" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="36px"
              width="36px"
              viewBox="0 -960 960 960"
              fill="#5f6368"
              className="close-btn"
              onClick={handleInfoClose}
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
