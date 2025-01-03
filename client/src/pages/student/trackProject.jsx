import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./track.css";
import api from "../../utils/api";
import ViewTrack from "../../components/card/track-project/viewTrack";

function TrackProject() {
  const [trackData, setTrackData] = useState([]);
  const [count, setCount] = useState(0);

  const userId = sessionStorage.getItem("studentId");
  useEffect(() => {
    async function getDetails() {
      try {
        const response = await api.get(`/selected/get/user/${userId}`);
        console.log(response.data.response);
        setTrackData(response.data.response);
      } catch (err) {
        console.log(err);
      }
    }

    getDetails();
  }, [userId, count]);

  return (
    <div className="trackContainer">
      <Header />
      <div className="track-project-details-container">
        <div className="t-title">Ongoing Projects</div>
        <div className="track-out">
          <div className="track-head">
            <span className="t-sl">Sl no</span>
            <span className="t-pt">Project Title</span>
            <span className="t-fn">Freelancer Name</span>
            <span className="t-a">Action</span>
          </div>
          {trackData.map((singleTrack, index) => (
            <ViewTrack
              key={index}
              singleTrack={singleTrack}
              index={index}
              count={count}
              setCount={setCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrackProject;
