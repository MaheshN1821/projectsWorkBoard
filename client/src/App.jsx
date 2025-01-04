import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import LandingPage from "./pages/landingPage/landingPage";
import { Routes, Route } from "react-router-dom";
import About from "./pages/aboutPage/about";
import Contact from "./pages/contactPage/contact";
import StudentRegis from "./pages/studentAuth/studentRegis";
import StudentLogin from "./pages/studentAuth/studentLogin";
import Student from "./pages/student/student";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/student/register" element={<StudentRegis />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/freelancer/register" element={<FreelancerRegis />} />
        <Route path="/freelancer/login" element={<FreelancerLogin />} />
        <Route path="/student" element={<Student />} />
        <Route path="/freelancer" element={<Freelancer />} />
        <Route path="/freelancer/manage-account" element={<ManageAccount />} />
        <Route path="/freelancer/view-project" element={<FreelancerView />} />
        <Route path="/freelancer/completed" element={<Completed />} />
        <Route path="/freelancer/request" element={<Request />} />
        <Route
          path="/freelancer/ongoing-project"
          element={<OngoingProject />}
        />
        <Route path="/student/list-project" element={<ListProject />} />
        <Route path="/student/view-project" element={<ViewProject />} />
        <Route path="/student/track-project" element={<TrackProject />} />
        <Route path="/student/request" element={<Session />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
