import "./App.css";
import LandingPage from "./pages/landingPage/landingPage";
import { Routes, Route } from "react-router-dom";
import About from "./pages/aboutPage/about";
import Contact from "./pages/contactPage/contact";
import StudentRegis from "./pages/studentAuth/studentRegis";
import StudentLogin from "./pages/studentAuth/studentLogin";
import Student from "./pages/student/student";
import Freelancer from "./pages/freelancer/freelancer";
import ManageAccount from "./pages/freelancer/manageAccount";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/student/register" element={<StudentRegis />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student" element={<Student />} />
        <Route path="/freelancer" element={<Freelancer />} />
        <Route path="/freelancer/manage-account" element={<ManageAccount />} />
      </Routes>
    </>
  );
}

export default App;
