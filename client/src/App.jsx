import "./App.css";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import LandingPage from "./pages/landingPage/landingPage";
import { Routes, Route } from "react-router-dom";
import About from "./pages/aboutPage/about";
import Contact from "./pages/contactPage/contact";
import StudentRegis from "./pages/studentAuth/studentRegis";
import StudentLogin from "./pages/studentAuth/studentLogin";
// import Student from "./pages/student/Client";
import Freelancer from "./pages/freelancer/freelancer";
import ManageAccount from "./pages/freelancer/manageAccount";
import FreelancerLogin from "./pages/freelancerAuth/freelancerLogin";
import FreelancerRegis from "./pages/freelancerAuth/freelancerRegis";
import ListProject from "./pages/student/listProject";
import ViewProject from "./pages/student/viewProject";
import TrackProject from "./pages/student/trackProject";
import FreelancerView from "./pages/freelancer/freelancerView";
import OngoingProject from "./pages/freelancer/ongoingProject";
import Payment from "./components/payment/payment";
import Completed from "./pages/freelancer/completed";
import Request from "./pages/freelancer/request";
import Session from "./pages/student/session";
import Forgot from "./pages/studentAuth/forgot";
import PasswordReset from "./pages/studentAuth/passwordReset";
import Layout from "./components/Layout";
import Project from "./pages/projectPage/project";
import Collaborate from "./pages/collaboration/components/page";
import Pwb from "./pwb";
import Success from "./components/payment/Success";
import MainLandingPage from "./pages/MainLandingPage";
import ManageClientAccount from "./pages/student/ManageClientAccount";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/collaborate/*" element={<Collaborate />} />
          <Route path="/pwb/*" element={<Pwb />} />
          <Route path="/coming-soon" element={<ManageClientAccount />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/student/register" element={<StudentRegis />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/login/forgot-password" element={<Forgot />} />
          <Route
            path="/student/login/password-reset"
            element={<PasswordReset />}
          />
          <Route path="/freelancer/register" element={<FreelancerRegis />} />
          <Route path="/freelancer/login" element={<FreelancerLogin />} />
          <Route path="/freelancer/view-project" element={<FreelancerView />} />

          <Route path="/freelancers" element={<Freelancer />} />
          <Route
            path="/freelancer/manage-account"
            element={<ManageAccount />}
          />
          <Route path="/projects" element={<Project />} />
          <Route
            path="/freelancer/ongoing-project"
            element={<OngoingProject />}
          />
          <Route path="/freelancer/request" element={<Request />} />
          <Route path="/freelancer/completed" element={<Completed />} />

          <Route path="/student/list-project" element={<ListProject />} />
          <Route path="/student/view-project" element={<ViewProject />} />
          <Route path="/student/track-project" element={<TrackProject />} />
          <Route path="/student/request" element={<Session />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Layout>
      <Analytics />
    </>
  );
}

export default App;
