import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./request.css";
import api from "../../utils/api";
import RequestCard from "../../components/card/request/requestCard";

function Request() {
  const freeId = sessionStorage.getItem("freelancerId");
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    async function getRequestsFromUser() {
      const result = await api.post("/request/get-request", { freeId: freeId });
      setRequestData(result?.data?.info);
      console.log(result?.data?.info);
    }
    getRequestsFromUser();
  }, [freeId]);

  return (
    <div className="requestContainer">
      <Header />
      <div className="request-wrapper">
        <div className="request-features">
          {requestData.map((request, index) => (
            <RequestCard request={request} key={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Request;
