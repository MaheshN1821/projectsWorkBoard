import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import Project from "../projectPage/project";
import "./landingPage.css";

function LandingPage() {
  return (
    <div className="landingPageContainer">
      <Header />
      <Navbar />
      <Project />
    </div>
  );
}

export default LandingPage;
