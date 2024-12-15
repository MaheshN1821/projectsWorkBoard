import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import "./contact.css";

function Contact() {
  return (
    <div className="contactPageContainer">
      <Header />
      <Navbar />
      <div className="contact-page-wrapper">
        <div className="contact-content">
          <h1>This is Contact Page!</h1>
          {/* add code here also remove the curly braces and above line*/}
        </div>
      </div>
    </div>
  );
}

export default Contact;
