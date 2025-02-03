import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./completed.css";
import api from "../../utils/api";
import CompleteCard from "../../components/card/completionCard/completeCard";

function Completed() {
  const [completeData, setCompleteData] = useState([]);

  const freeId = sessionStorage.getItem("freelancerId");
  useEffect(() => {
    async function getData() {
      try {
        const info = await api.get(`/freelancer/get-completed/${freeId}`);
        console.log(info.data.response);
        setCompleteData(info.data.response);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [freeId]);

  return (
    <div className="completeContainer">
      <Header />
      <div className="complete-wrapper">
        <div className="complete-features">
          <div className="complete-layout">
            {completeData.map((complete, index) => (
              <CompleteCard complete={complete} key={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Completed;
