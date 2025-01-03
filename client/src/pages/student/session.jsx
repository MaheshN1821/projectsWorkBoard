import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./session.css";
import api from "../../utils/api";

function Session() {
  const [freelancerData, setFreelancerData] = useState([]);

  const userId = sessionStorage.getItem("studentId");
  useEffect(() => {
    async function getFreelancers() {
      try {
        const response = await api.get("/freelancer/u/general-info");
        setFreelancerData(response?.data?.freelancerInfo);
      } catch (err) {
        console.log(err);
      }
    }
    getFreelancers();
  }, []);

  async function handleSendingRequest(freeData) {
    const data = {
      studId: userId,
      freeId: freeData,
      date: new Date(Date.now()).toString(),
    };
    try {
      const result = await api.post("/request/save-request", data);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="sessionContainer">
      <Header />
      <div className="session-wrapper">
        {freelancerData.map((freeData, index) => (
          <div className="twoCont-1-s" key={index + 1}>
            <div className="acc-cont-1-1-s">
              <div
                className="profile-image-s"
                style={{
                  backgroundImage: `url(${freeData?.fimage})`,
                }}
              ></div>
              <div className="info-item-s">
                <label>Name:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder={freeData.username}
                  disabled
                />
              </div>
              <div className="info-item-s">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder={freeData.email}
                  disabled
                />
              </div>
              <div className="info-item-s">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder={freeData.phone_number}
                  disabled
                />
              </div>
              <div className="info-item-s">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder={freeData.address}
                  disabled
                />
              </div>
            </div>
            <div className="acc-cont-2-2-s">
              <div className="info-head-1-2-s">
                <h1>Experience</h1>
              </div>
              <div className="form-item-container-s">
                <label htmlFor="projects">Previously Worked Projects:</label>
                <textarea
                  id="projects"
                  name="projects"
                  placeholder={freeData.workedProjects}
                  disabled
                ></textarea>
              </div>
              <div className="form-item-container-s">
                <label htmlFor="techStack">Proficiency in Tech Stack:</label>
                <input
                  type="text"
                  id="techStack"
                  name="techStack"
                  placeholder={freeData.techStack}
                  disabled
                />
              </div>
              <div
                className="request-btn"
                onClick={() => handleSendingRequest(freeData._id)}
              >
                Send A Request
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Session;
