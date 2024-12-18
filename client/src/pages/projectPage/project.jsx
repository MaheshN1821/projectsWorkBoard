import { useState } from "react";
import ProjectDisplay from "../../components/card/project-display/projectDisplay";
import "./project.css";

function Project() {
  const [toDisplay, setToDisplay] = useState(!false);
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
            <ProjectDisplay />
            <ProjectDisplay />
            <ProjectDisplay />
          </div>
          <div
            className="additional-info"
            style={{ display: toDisplay ? "block" : "none" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Project;
