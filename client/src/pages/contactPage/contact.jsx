import { useForm } from "react-hook-form";
import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import "./contact.css";
import api from "../../utils/api";

function Contact() {
  const { register, handleSubmit } = useForm();

  const onFormSubmit = async (data) => {
    try {
      const val = await api.post("/notify/email", data);

      val.status === 200
        ? alert("Submitted Successfully!")
        : alert("Try again later!");
    } catch (err) {
      console.log(err);
    }
  };

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
            <form
              className="contact-form"
              onSubmit={handleSubmit(onFormSubmit)}
            >
              <label htmlFor="role">I am a:</label>
              <select id="role" {...register("role", { required: true })}>
                <option value="">Select...</option>
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
              </select>

              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                {...register("name", { required: true })}
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                {...register("email", { required: true })}
              />

              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                placeholder="Your Phone Number"
                {...register("phone", { required: true })}
              />

              <label htmlFor="feedback">Feedback:</label>
              <textarea
                id="feedback"
                placeholder="Your feedback here..."
                rows="5"
                {...register("feedback", { required: true })}
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
