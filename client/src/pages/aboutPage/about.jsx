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
          <h1>USER MANUAL</h1>
          <p>
            <strong>ProjectsWorkBoard</strong> is a one-stop platform for
            freelancers and clients. It facilitates seamless collaboration by
            allowing clients to list projects and freelancers to quote estimated
            costs and delivery times. Clients can choose freelancers based on
            their preferences and connect with them effortlessly.
          </p>
          <ol>
            <li>
              <strong>Step 1:</strong> Login either as a freelancer or a client.
            </li>
            <li>
              <strong>Step 2:</strong> Based on your role:
              <ul>
                <li>
                  <strong>Client:</strong> You can list a new project, check
                  listed projects, and manage other activities.
                </li>
                <li>
                  <strong>Freelancer:</strong> You can view listed projects,
                  quote for projects, set deadlines, etc.
                </li>
              </ul>
            </li>
            <li>
              <strong>Step 3:</strong> Freelancers and clients can chat in
              real-time to discuss queries and finalize details.
            </li>
          </ol>
          <p>
            Whether you're a client with a vision or a freelancer with
            expertise, ProjectsWorkBoard is the ideal platform to bring your
            ideas to life.
          </p>
          <div className="video-container">
            <video controls>
              <source src="/path-to-demo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div></div>
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq">
              <h3>What is ProjectsWorkBoard?</h3>
              <p>
                ProjectsWorkBoard is a platform where clients can list their
                projects and freelancers can bid on them. It facilitates
                collaboration between clients and freelancers.
              </p>
            </div>
            <div className="faq">
              <h3>How do I create an account?</h3>
              <p>
                You can create an account by clicking on the "Sign Up" button on
                the homepage and filling out the required details.
              </p>
            </div>
            <div className="faq">
              <h3>Is there a fee for using ProjectsWorkBoard?</h3>
              <p>
                While signing up is free, there might be platform fees based on
                the services used. Check the pricing page for more details.
              </p>
            </div>
            <div className="faq">
              <h3>How can I contact a freelancer/client?</h3>
              <p>
                Once a project is listed and a freelancer is chosen, both
                parties can chat in real-time using the platform's messaging
                feature.
              </p>
            </div>
            <div className="faq">
              <h3>Can I edit or delete a project after listing it?</h3>
              <p>
                Yes, clients can edit or delete their projects through their
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

// import Header from "../../components/header/header";
// import Navbar from "../../components/navbar/navbar";
// import "./about.css";

// function About() {
//   return (
//     <div className="aboutPageContainer">
//       <Header />
//       <Navbar />
//       <div className="about-page-wrapper">
//         <div className="about-content">
//           <h1>This is About Page!</h1>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;
