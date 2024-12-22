import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./track.css";
import api from "../../utils/api";
import ViewTrack from "../../components/card/track-project/viewTrack";

function TrackProject() {
  const [trackData, setTrackData] = useState([]);
  useEffect(() => {
    async function getDetails() {
      try {
        const response = await api.get("/selected/get");
        console.log(response.data.response);
        setTrackData(response.data.response);
      } catch (err) {
        console.log(err);
      }
    }

    getDetails();
  }, []);

  return (
    <div className="trackContainer">
      <Header />
      <div className="track-project-details-container">
        <div className="t-title">Ongoing Projects</div>
        {trackData.map((singleTrack, index) => (
          <ViewTrack key={index} singleTrack={singleTrack} index={index} />
        ))}
      </div>
    </div>
  );
}

export default TrackProject;
