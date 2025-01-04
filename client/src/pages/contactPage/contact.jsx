import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import "./contact.css";

function Contact() {
  return (
    <div className="contactPageContainer">
      <Header />
      <Navbar />
      <div className="extra-outer">
        <div className="contact-page-wrapper">
          <div className="contact-content">
            <h1>Contact Us</h1>
            <p>
              Have questions or feedback? We would love to hear from you! Please
              fill out the form below and we will get back to you as soon as
              possible.
            </p>
            <form className="contact-form">
              <label htmlFor="role">I am a:</label>
              <select id="role" name="role" required>
                <option value="">Select...</option>
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
              </select>

              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
              />

              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your Phone Number"
                required
              />

              <label htmlFor="feedback">Feedback:</label>
              <textarea
                id="feedback"
                name="feedback"
                placeholder="Your feedback here..."
                rows="5"
                required
              ></textarea>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

// import Header from "../../components/header/header";
// import Navbar from "../../components/navbar/navbar";
// import "./contact.css";

// function Contact() {
//   return (
//     <div className="contactPageContainer">
//       <Header />
//       <Navbar />
//       <div className="contact-page-wrapper">
//         <div className="contact-content">
//           <h1>This is Contact Page!</h1>
//           {/* add code here also remove the curly braces and above line*/}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact;
