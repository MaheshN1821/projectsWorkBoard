import { useEffect, useState } from "react";
import "./requestCard.css";
import api from "../../../utils/api";

function RequestCard({ request }) {
  const [otherData, setOtherData] = useState([]);
  useEffect(() => {
    async function getDetails() {
      const studId = request?.student;
      try {
        const info = await api.get(`/student/single/${studId}`);
        // console.log(info.data.studentInfo);
        setOtherData(info.data.studentInfo);
      } catch (err) {
        console.log(err);
      }
    }
    getDetails();
  }, []);
  return (
    <div className="reqCont">
      <div className="req-dis-box">
        <span className="req-title">Name: </span>
        <span className="req-val">{otherData?.username}</span>
      </div>
      <div className="req-dis-box">
        <span className="req-title">Phone Number: </span>
        <span className="req-val">{otherData?.phone_number}</span>
      </div>
      <div className="req-dis-box">
        <span className="req-title">Email: </span>
        <span className="req-val">{otherData?.email}</span>
      </div>
      <div className="req-dis-box">
        <span className="req-title">Date: </span>
        <span className="req-val">{request?.date}</span>
      </div>
    </div>
  );
}

export default RequestCard;
