import { useEffect, useState } from "react";
import ListedProject from "../../components/card/listed-project/listedProject";
import Header from "../../components/header/header";
import "./viewProject.css";
import api from "../../utils/api";

function ViewProject() {
  const [listData, setListData] = useState([]);
  const [count, setCount] = useState(1);

  const userId = sessionStorage.getItem("studentId");

  useEffect(() => {
    async function getDetails() {
      try {
        const response = await api.get(`/project/details/${userId}`);
        console.log(response.data.info);
        setListData(response.data.info);
      } catch (err) {
        console.log(err);
      }
    }

    getDetails();
  }, [count, userId]);

  return (
    <div className="viewListContainer">
      <Header />
      <div className="view-project-details-container">
        <div className="p-title">Listed Projects</div>
        <div className="some-cont">
          <div className="view-project-head">
            <span className="view-listed-slno">Sl no</span>
            <span className="view-listed-title">Project Title</span>
            <span className="view-listed-action">Action</span>
          </div>
          {listData.map((list, index) => (
            <ListedProject
              key={index}
              list={list}
              index={index}
              setCount={setCount}
              count={count}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewProject;
