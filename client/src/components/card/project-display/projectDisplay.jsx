import { useContext } from "react";
import "./projectDisplay.css";
import { GlobalContext } from "../../context/context";

function ProjectDisplay({ toDisplay, setToDisplay, projData }) {
  const { setSingleProjectData } = useContext(GlobalContext);
  function handleInfoClick() {
    setToDisplay(true);
    setSingleProjectData(projData);
  }
  return (
    <div
      className="p-card-wrapper"
      style={{ width: toDisplay ? "100%" : "50%" }}
    >
      <div className="outer-cont">
        <div className="border-card">
          <div className="proj-title">{projData?.project_title}</div>
          <div className="p-desc">{projData?.project_description}</div>
          <div className="other-contents">
            <div className="p-stack">
              <div className="p-t">Tech Stack</div> {projData?.techStack}
            </div>
            <div className="p-time">
              <div className="p-d">Deadline</div> {projData?.deadline}
            </div>
            <div className="know-more" onClick={handleInfoClick}>
              Click here to know more!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDisplay;
