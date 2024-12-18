import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import "./about.css";

function About() {
  return (
    <div className="aboutPageContainer">
      <Header />
      <Navbar />
      <div className="about-page-wrapper">
        <div className="about-content">
          <h1>This is About Page!</h1>
          {/* add code here also remove the curly braces and above line*/}
        </div>
      </div>
    </div>
  );
}

export default About;
