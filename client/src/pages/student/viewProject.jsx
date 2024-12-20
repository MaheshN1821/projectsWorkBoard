import ListedProject from "../../components/card/listed-project/listedProject";
import Header from "../../components/header/header";
import "./viewProject.css";

function ViewProject() {
  return (
    <div className="viewListContainer">
      <Header />
      <div className="view-project-details-container">
        <div className="p-title">Listed Projects</div>
        <div className="some-cont">
          <ListedProject />
          <ListedProject />
        </div>
      </div>
    </div>
  );
}

export default ViewProject;
