import { useContext, useEffect, useState } from "react";
import ProjectDisplay from "../../components/card/project-display/projectDisplay";
import "./project.css";
import api from "../../utils/api";
import { GlobalContext } from "../../components/context/context";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Project() {
  const [projectData, setProjectData] = useState([]);
  const { singleProjectData } = useContext(GlobalContext);
  const [toDisplay, setToDisplay] = useState(false);

  const notifySuccess = () => toast.success("Response Sent Successfully!");
  const notifyError = () =>
    toast.error("Login through Freelancer Account to Continue!");
  const notifyInfo = () => toast.info("Please try again after sometime!");

  function handleInfoClose() {
    setToDisplay(false);
  }

  async function handleClick() {
    const fid = sessionStorage.getItem("freelancerId");

    if (fid) {
      try {
        const response = await api.post("/selected/save", {
          ...singleProjectData,
          freeId: fid,
        });
        console.log(response);
        notifySuccess();
      } catch (err) {
        console.log(err);
        notifyInfo();
      }
    } else {
      notifyError();
    }
  }

  useEffect(() => {
    async function getDetails() {
      try {
        const response = await api.get("/project/details");
        console.log(response.data.info);
        setProjectData(response.data.info);
      } catch (err) {
        console.log(err);
      }
    }

    getDetails();
  }, []);

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
            {projectData.map((projData, index) => (
              <ProjectDisplay
                key={index}
                toDisplay={toDisplay}
                setToDisplay={setToDisplay}
                projData={projData}
              />
            ))}
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
            <div className="side-container">
              <div className="side-title">
                {singleProjectData?.project_title}
              </div>
              <div className="side-desc">
                <span className="dd">Description: </span>
                {singleProjectData?.project_description}
              </div>
              <div className="ad">
                <div className="side-stack">
                  <span className="dd">Tech Stack: </span>
                  {singleProjectData?.techStack}
                </div>
                <div className="side-deadline">
                  <span className="dd">Deadline: </span>
                  {singleProjectData?.deadline}
                </div>
              </div>
              <div className="ab">
                <div className="pp">
                  <span className="dd">Price Range: </span>
                  &#8377;{singleProjectData?.min_price} - &#8377;
                  {singleProjectData?.max_price}
                </div>
                <div className="side-deadline">
                  <span className="dd">Status: </span>
                  {singleProjectData?.status}
                </div>
              </div>
              <div className="btnn">
                <span className="int-btn" onClick={handleClick}>
                  Interested!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
}

export default Project;
