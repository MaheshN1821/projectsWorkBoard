import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./ongoingProject.css";
import api from "../../utils/api";
import ViewOngoing from "./viewOngoing";

function OngoingProject() {
  const [ongoingData, setOngoingData] = useState([]);

  useEffect(() => {
    async function getDetails() {
      try {
        const response = await api.get("/selected/get");
        console.log(response.data.response);
        setOngoingData(response.data.response);
      } catch (err) {
        console.log(err);
      }
    }

    getDetails();
  }, []);

  return (
    <div className="ongoing-container">
      <Header />
      <div className="ongoing-project-details-container">
        <div className="o-title">Ongoing Projects</div>
        <div className="o-c">
          <div className="ongoing-head">
            <span className="on-p-sl">Sl no</span>
            <span className="on-p-pt">Project Title</span>
            <span className="on-p-sn">Student Name</span>
            <span className="on-p-a">Action</span>
          </div>
          {ongoingData.map((ongoing, index) => (
            <ViewOngoing key={index} ongoing={ongoing} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OngoingProject;
