import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Project from "./pages/projectPage/project";
import LandingPage from "./pages/landingPage/landingPage";
import Freelancer from "./pages/freelancer/freelancer";
import Client from "./pages/student/Client";
import ListProject from "./pages/student/listProject";
import Session from "./pages/student/session";
import TrackProject from "./pages/student/trackProject";
import ViewProject from "./pages/student/viewProject";
import PwbProjectDetails from "./pages/student/PwbProjectDetails";
import OngoingProjects from "./pages/freelancer/ongoingProject";
import EditProject from "./pages/student/EditProject";
import ManageClientAccount from "./pages/student/ManageClientAccount";
import About from "./pages/aboutPage/about";
import Contact from "./pages/contactPage/contact";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="projects" element={<Project />} />
          <Route path="freelancers" element={<Freelancer />} />
          <Route
            path="freelancer/ongoing-project"
            element={<OngoingProjects />}
          />
          <Route path="project/:id" element={<PwbProjectDetails />} />
          <Route path="client" element={<Client />} />
          <Route
            path="/client/manage-account"
            element={<ManageClientAccount />}
          />
          <Route path="/client/list-project" element={<ListProject />} />
          <Route path="/client/view-project" element={<ViewProject />} />
          <Route path="/client/track-project" element={<TrackProject />} />
          <Route
            path="/client/edit-project/:projectId"
            element={<EditProject />}
          />
          <Route path="/client/request" element={<Session />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coming-soon" element={<ManageClientAccount />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
