import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./ongoingProject.css";
import api from "../../utils/api";
import ViewOngoing from "./viewOngoing";

function OngoingProject() {
  const [ongoingData, setOngoingData] = useState([]);
  const [count, setCount] = useState(0);

  const freeId = sessionStorage.getItem("freelancerId");
  useEffect(() => {
    async function getDetails() {
      try {
        const response = await api.get(`/selected/get/freelancer/${freeId}`);
        const filteredData = response?.data?.response?.filter(
          (value) => value.status !== "Completed"
        );
        console.log("filtered : ", filteredData);
        setOngoingData(filteredData);
      } catch (err) {
        console.log(err);
      }
    }

    getDetails();
  }, [freeId, count]);

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
          {ongoingData.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <h1>You do not have any Ongoing Projects!</h1>
              <h2>Go to New Project Section and Explore!</h2>
            </div>
          ) : (
            ongoingData.map((ongoing, index) => (
              <ViewOngoing
                key={index}
                ongoing={ongoing}
                index={index}
                count={count}
                setCount={setCount}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OngoingProject;
