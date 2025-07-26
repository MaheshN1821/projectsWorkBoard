import { useState, useEffect } from "react";
import {
  ChevronDown,
  Users,
  Briefcase,
  MessageCircle,
  Shield,
  CheckCircle,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function About() {
  const [openFaq, setOpenFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    {
      question:
        "How to verify whether the student/professional or freelancer is genuine",
      answer: "You can verify by contacting the support team",
    },
  ];

  const features = [
    {
      icon: Briefcase,
      title: "Project Listings",
      desc: "Easy project posting and management",
    },
    {
      icon: Users,
      title: "Talent Matching",
      desc: "Connect with verified freelancers",
    },
    // {
    //   icon: MessageCircle,
    //   title: "Real-time Chat",
    //   desc: "Seamless communication tools",
    // },
    {
      icon: Shield,
      title: "Secure Platform",
      desc: "Protected transactions and data",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div
        className={`relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-100 to-blue-200 bg-clip-text text-transparent">
              ProjectsWorkBoard
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A one-stop platform for{" "}
              <span className="text-blue-300 font-semibold">freelancers</span>{" "}
              and <span className="text-blue-400 font-semibold">clients</span>.
              We facilitate seamless collaboration by allowing clients to list
              projects and freelancers to quote estimated costs and delivery
              times.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-medium">
                  Trusted by 10,000+ users worldwide
                </span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="flex flex-row flex-wrap justify-center gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                  isVisible ? "animate-fade-in-up" : ""
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* User Manual Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 mb-20 border border-white/20">
            <h2 className="text-4xl font-bold text-center text-white mb-12 bg-gradient-to-r from-blue-100 to-blue-200 bg-clip-text text-transparent">
              USER MANUAL
            </h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Login to Your Account
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Choose your role - either as a freelancer or a client to get
                    started.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Based on Your Role
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-6 border border-blue-400/30">
                      <h4 className="text-xl font-bold text-blue-100 mb-3">
                        Client
                      </h4>
                      <p className="text-gray-300">
                        List new projects, check existing listings, and manage
                        all your activities seamlessly.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6 border border-blue-500/30">
                      <h4 className="text-xl font-bold text-blue-100 mb-3">
                        Freelancer
                      </h4>
                      <p className="text-gray-300">
                        Browse projects, submit quotes, set deadlines, and
                        showcase your expertise.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Real-time Collaboration
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Chat in real-time to discuss queries, finalize details, and
                    bring your projects to life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-20">
            <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Whether you are a{" "}
              <span className="text-blue-300 font-semibold">
                client with a vision
              </span>{" "}
              or a
              <span className="text-blue-400 font-semibold">
                {" "}
                freelancer with expertise
              </span>
              , ProjectsWorkBoard is the ideal platform to bring your ideas to
              life.
            </p>
            <div className="flex flex-row flex-wrap sm:flex-row gap-4 justify-center">
              <button
                onClick={() => Navigate("/pwb/login")}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start as Client
              </button>
              <button
                onClick={() => Navigate("/pwb/register")}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300"
              >
                Join as Freelancer
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20">
            <h2 className="text-4xl font-bold text-center text-white mb-12 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                  >
                    <h3 className="text-xl font-bold text-white pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-6 h-6 text-blue-400 transition-transform duration-300 flex-shrink-0 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openFaq === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-8 pb-6">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default About;

///////////////////////////
// import { useState } from "react";

// function About() {
//   const [openFaq, setOpenFaq] = useState(null);

//   const toggleFaq = (index) => {
//     setOpenFaq(openFaq === index ? null : index);
//   };

//   const faqData = [
//     {
//       question: "What is ProjectsWorkBoard?",
//       answer:
//         "ProjectsWorkBoard is a platform where clients can list their projects and freelancers can bid on them. It facilitates collaboration between clients and freelancers.",
//     },
//     {
//       question: "How do I create an account?",
//       answer:
//         "You can create an account by clicking on the 'Sign Up' button on the homepage and filling out the required details.",
//     },
//     {
//       question: "Is there a fee for using ProjectsWorkBoard?",
//       answer:
//         "While signing up is free, there might be platform fees based on the services used. Check the pricing page for more details.",
//     },
//     {
//       question: "How can I contact a freelancer/client?",
//       answer:
//         "Once a project is listed and a freelancer is chosen, both parties can chat in real-time using the platform's messaging feature.",
//     },
//     {
//       question: "Can I edit or delete a project after listing it?",
//       answer:
//         "Yes, clients can edit or delete their projects through their dashboard.",
//     },
//     {
//       question:
//         "How to verify whether the student/professional or freelancer is genuine",
//       answer: "You can verify by contacting the support team",
//     },
//   ];

//   return (
//     <div className="aboutPageContainer">
//       <div className="about-page-wrapper">
//         <div className="about-content">
//           <p>
//             <strong>ProjectsWorkBoard</strong> is a one-stop platform for
//             freelancers and clients. It facilitates seamless collaboration by
//             allowing clients to list projects and freelancers to quote estimated
//             costs and delivery times. Clients can choose freelancers based on
//             their preferences and connect with them effortlessly.
//           </p>
//           <div className="outer">
//             <div className="manual">
//               <h1>USER MANUAL</h1>
//               <ol>
//                 <li>
//                   <strong>Step 1:</strong> Login either as a freelancer or a
//                   client.
//                 </li>
//                 <li>
//                   <strong>Step 2:</strong> Based on your role:
//                   <ul>
//                     <li className="abc">
//                       <strong>Client:</strong> You can list a new project, check
//                       listed projects, and manage other activities.
//                     </li>
//                     <li className="abc">
//                       <strong>Freelancer:</strong> You can view listed projects,
//                       quote for projects, set deadlines, etc.
//                     </li>
//                   </ul>
//                 </li>
//                 <li>
//                   <strong>Step 3:</strong> Freelancers and clients can chat in
//                   real-time to discuss queries and finalize details.
//                 </li>
//               </ol>
//             </div>
//           </div>
//           <p>
//             Whether you are a client with a vision or a freelancer with
//             expertise, ProjectsWorkBoard is the ideal platform to bring your
//             ideas to life.
//           </p>
//           {/* <p>Here is a demo video for freelancers</p>
//           <div className="video-container">
//             <video controls>
//               <source src="/path-to-demo-video.mp4" type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//           <p>Here is a demo video for clients</p>
//           <div className="video-container two">
//             <video controls>
//               <source src="/path-to-demo-video.mp4" type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div> */}
//           <div className="faqCont">
//             <div className="faq-section">
//               <h2>Frequently Asked Questions</h2>
//               {faqData.map((faq, index) => (
//                 <div
//                   key={index}
//                   className={`faq ${openFaq === index ? "open" : ""}`}
//                 >
//                   <h3 onClick={() => toggleFaq(index)}>
//                     {faq.question}
//                     <span>{openFaq === index ? "▲" : "▼"}</span>
//                   </h3>
//                   <p>{faq.answer}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;
