import { useState } from "react";
import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import "./about.css";

function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is ProjectsWorkBoard?",
      answer:
        "ProjectsWorkBoard is a platform where clients can list their projects and freelancers can bid on them. It facilitates collaboration between clients and freelancers.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on the 'Sign Up' button on the homepage and filling out the required details.",
    },
    {
      question: "Is there a fee for using ProjectsWorkBoard?",
      answer:
        "While signing up is free, there might be platform fees based on the services used. Check the pricing page for more details.",
    },
    {
      question: "How can I contact a freelancer/client?",
      answer:
        "Once a project is listed and a freelancer is chosen, both parties can chat in real-time using the platform's messaging feature.",
    },
    {
      question: "Can I edit or delete a project after listing it?",
      answer:
        "Yes, clients can edit or delete their projects through their dashboard.",
    },
  ];

  return (
    <div className="aboutPageContainer">
      <Header />
      <Navbar />
      <div className="about-page-wrapper">
        <div className="about-content">
          <p>
            <strong>ProjectsWorkBoard</strong> is a one-stop platform for
            freelancers and clients. It facilitates seamless collaboration by
            allowing clients to list projects and freelancers to quote estimated
            costs and delivery times. Clients can choose freelancers based on
            their preferences and connect with them effortlessly.
          </p>
          <div className="outer">
            <div className="manual">
              <h1>USER MANUAL</h1>
              <ol>
                <li>
                  <strong>Step 1:</strong> Login either as a freelancer or a
                  client.
                </li>
                <li>
                  <strong>Step 2:</strong> Based on your role:
                  <ul>
                    <li className="abc">
                      <strong>Client:</strong> You can list a new project, check
                      listed projects, and manage other activities.
                    </li>
                    <li className="abc">
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
            </div>
          </div>
          <p>
            Whether you are a client with a vision or a freelancer with
            expertise, ProjectsWorkBoard is the ideal platform to bring your
            ideas to life.
          </p>
          <p>Here is a demo video for freelancers</p>
          <div className="video-container">
            <video controls>
              <source src="/path-to-demo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p>Here is a demo video for clients</p>
          <div className="video-container two">
            <video controls>
              <source src="/path-to-demo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="faqCont">
            <div className="faq-section">
              <h2>Frequently Asked Questions</h2>
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className={`faq ${openFaq === index ? "open" : ""}`}
                >
                  <h3 onClick={() => toggleFaq(index)}>
                    {faq.question}
                    <span>{openFaq === index ? "▲" : "▼"}</span>
                  </h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
