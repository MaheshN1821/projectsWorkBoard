import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../../../hooks/useAuth";
import BrowseProjects from "../components/BrowseProjects";
import PostProject from "../components/PostProject";
import ProjectDetails from "../components/ProjectDetails";
import Dashboard from "../components/Dashboard";
import LandingPage from "../components/LandingPage";
import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from "../components/Navbar";
// import ProtectedRoute from "../components/ProtectedRoute";
import ProjectApplications from "../components/ProjectApplications";
import EditProject from "../components/EditProject";
import { Loader2 } from "lucide-react";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
          <span className="text-lg font-medium text-zinc-600">Loading...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/collaborate/login" replace />
  );
}

// Public Route Component (redirect to dashboard if authenticated)
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
          <span className="text-lg font-medium text-zinc-600">Loading...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <Navigate to="/collaborate/dashboard" replace />
  ) : (
    children
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Public Browse (can be viewed without auth) */}
        <Route path="browse" element={<BrowseProjects />} />
        <Route path="project/:id" element={<ProjectDetails />} />

        {/* Protected Routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="post"
          element={
            <ProtectedRoute>
              <PostProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectId/applications"
          element={
            <ProtectedRoute>
              <ProjectApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectId/edit"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-black text-zinc-800 mb-4">404</h1>
                <p className="text-zinc-600 mb-6">Page not found</p>
                <a
                  href="/collaborate/browse"
                  className="px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

///////////////////////////////////////////////////////////
// import { Routes, Route } from "react-router-dom";
// import Header from "../components/Header";
// import LandingPage from "../components/LandingPage";
// import BrowseProjects from "../components/BrowseProjects";
// import PostProject from "../components/PostProject";
// import ProjectDetails from "../components/ProjectDetails";
// import Dashboard from "../components/Dashboard";

// export default function App() {
//   return (
//     <div className="min-h-screen">
//       <Header />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/browse" element={<BrowseProjects />} />
//         <Route path="/post" element={<PostProject />} />
//         <Route path="/project/:id" element={<ProjectDetails />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </div>
//   );
// }
