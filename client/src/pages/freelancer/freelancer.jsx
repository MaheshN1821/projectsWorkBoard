import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Briefcase,
  Clock,
  CheckCircle,
  MessageSquare,
  ChevronDown,
  LogOut,
  User,
  ChevronRight,
  BarChart,
  Activity,
} from "lucide-react";

const Freelancer = () => {
  const navigate = useNavigate();
  const [freelancerName, setFreelancerName] = useState("Freelancer");
  const [displayLogout, setDisplayLogout] = useState(false);
  const [stats, setStats] = useState({
    newProjects: 0,
    ongoingProjects: 0,
    completedProjects: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Get token from localStorage or sessionStorage
    // const token = localStorage.getItem("token");

    if (!token) {
      navigate("/pwb/login");
      return;
    }

    // Fetch user profile and dashboard stats
    fetchUserProfile();
    fetchDashboardStats();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "https://projects-work-board.vercel.app/api/pwb/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFreelancerName(response.data.username);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      if (error.response?.status === 401) {
        // Unauthorized - token expired or invalid
        localStorage.removeItem("token");
        navigate("/pwb/login");
      }
    }
  };

  const fetchDashboardStats = async () => {
    try {
      // Fetch all projects
      const [projectsRes, ongoingRes, completedRes] = await Promise.all([
        axios.get("https://projects-work-board.vercel.app/api/pwb/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(
          "https://projects-work-board.vercel.app/api/pwb/projects/freelancer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        axios.get(
          "https://projects-work-board.vercel.app/api/pwb/projects/freelancer/completed",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);

      // Filter ongoing projects
      const ongoing = ongoingRes.data.filter(
        (project) => project.status === "In Progress"
      );

      setStats({
        newProjects: projectsRes?.data.length || 0,
        ongoingProjects: ongoing?.length || 0,
        completedProjects: completedRes?.data.length || 0,
        pendingRequests: 0, // This would need a separate endpoint
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear token and navigate to login
      localStorage.removeItem("token");
      navigate("/pwb/login");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      navigate("/pwb/login");
    }
  };

  const dashboardItems = [
    {
      title: "New Projects",
      description: "Browse and apply to available projects",
      icon: <Briefcase className="w-6 h-6 text-white" />,
      count: stats.newProjects,
      path: "/projects",
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-50 to-purple-50",
    },
    {
      title: "Ongoing Projects",
      description: "Manage your current projects",
      icon: <Clock className="w-6 h-6 text-white" />,
      count: stats.ongoingProjects,
      path: "/freelancer/ongoing-project",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
    },
    {
      title: "View Requests",
      description: "Check client requests and sessions",
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      count: stats.pendingRequests,
      path: "/freelancer/request",
      gradient: "from-green-500 to-teal-500",
      bgGradient: "from-green-50 to-teal-50",
    },
    {
      title: "Completed Projects",
      description: "View your project history",
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      count: stats.completedProjects,
      path: "/freelancer/completed",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ProjectsWorkBoard
                </h1>
                <p className="text-sm text-gray-500">Freelancer Dashboard</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setDisplayLogout(!displayLogout)}
                className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/30 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {freelancerName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">
                    Welcome back!
                  </p>
                  <p className="text-xs text-gray-500">{freelancerName}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    displayLogout ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {displayLogout && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 py-2 z-50">
                  <button
                    onClick={() => navigate("/freelancer/manage-account")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Manage Account</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {freelancerName}!
              </h2>
              <p className="text-blue-100 text-lg">
                Ready to take on new challenges? Let's make today productive!
              </p>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="flex flex-row flex-wrap gap-8 mb-10 items-center justify-center">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="group w-100 cursor-pointer transform hover:scale-105 transition-all duration-300 "
            >
              <div
                className={`bg-gradient-to-br ${item.bgGradient} rounded-3xl p-6 border border-gray-300 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform rotate-12"></div>
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      {item.icon}
                    </div>
                    <div
                      className={`bg-gradient-to-r ${item.gradient} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md`}
                    >
                      {item.count}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Action Button */}
                  <div className="flex items-center text-sm font-semibold">
                    <span
                      className={`bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                    >
                      Explore now
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 ml-2 text-gray-400 group-hover:translate-x-1 transition-transform duration-300`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        {/* <div className="mt-8 bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/30">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart className="w-5 h-5 mr-2" />
            Quick Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.newProjects}
              </div>
              <div className="text-sm text-gray-500">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {stats.ongoingProjects}
              </div>
              <div className="text-sm text-gray-500">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.completedProjects}
              </div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.pendingRequests}
              </div>
              <div className="text-sm text-gray-500">Requests</div>
            </div>
          </div>
        </div> */}

        {/* Recent Activity */}
        {/* <div className="mt-8 bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/30">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                New project applications available
              </span>
              <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                Project milestone completed
              </span>
              <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                New client message received
              </span>
              <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default Freelancer;

// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// function Freelancer() {
//   const Navigate = useNavigate();
//   const freeId = sessionStorage.getItem("freelancerId");
//   const [freename, setFreename] = useState("Freelancer");
//   const [displayLogout, setDisplayLogout] = useState(false);

//   useEffect(() => {
//     async function toGetName() {
//       try {
//         const val = await freeApi.get(`/freelancer/get-name/${freeId}`);
//         setFreename(val?.data?.freelancer_name);
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     toGetName();
//   }, [freeId]);

//   function handleClick() {
//     setDisplayLogout(!displayLogout);
//   }

//   async function handleLogout() {
//     try {
//       await freeApi.get("/auth/freelancer/logout", {
//         withCredentials: true,
//       });
//       sessionStorage.clear();
//       Navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <div className="freelancerContainer">
//       <div className="free-wrapper">
//         <div className="free-features">
//           <div>
//             <div
//               className="free-subFeature"
//               onClick={() => {
//                 Navigate("/freelancer/view-project");
//               }}
//             >
//               New Projects
//             </div>
//             <div
//               className="free-subFeature"
//               onClick={() => {
//                 Navigate("/freelancer/ongoing-project");
//               }}
//             >
//               Ongoing Projects
//             </div>
//           </div>
//           <div>
//             <div
//               className="free-subFeature"
//               onClick={() => {
//                 Navigate("/freelancer/request");
//               }}
//             >
//               View Requests
//             </div>
//             <div
//               className="free-subFeature"
//               onClick={() => {
//                 Navigate("/freelancer/completed");
//               }}
//             >
//               Completed Projects
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="manage-s-f" onClick={handleClick}>
//         Welcome {freename}!
//       </div>
//       <div
//         className="manage"
//         style={{ display: displayLogout ? "flex" : "none" }}
//         onClick={() => Navigate("/freelancer/manage-account")}
//       >
//         Manage Account
//       </div>
//       <div
//         className="manage-s-l-f"
//         style={{ display: displayLogout ? "flex" : "none" }}
//         onClick={handleLogout}
//       >
//         Logout
//       </div>
//     </div>
//   );
// }

// export default Freelancer;
