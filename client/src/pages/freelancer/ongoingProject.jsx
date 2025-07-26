import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Clock,
  User,
  Calendar,
  DollarSign,
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const OngoingProjects = () => {
  const navigate = useNavigate();
  const [ongoingData, setOngoingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOngoingProjects();
  }, []);

  const fetchOngoingProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/pwb/login");
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        "https://projects-work-board.vercel.app/api/pwb/projects/freelancer/ongoing"
      );

      // Filter for ongoing projects (In Progress status)
      // const filteredData = response.data.filter(
      //   (project) => project.status === "In Progress"
      // );
      // console.log(response);

      setOngoingData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ongoing projects:", error);
      if (error.response?.status === 401) {
        navigate("/pwb/login");
      }
      setLoading(false);
    }
  };

  const handleCompleteProject = async (projectId) => {
    try {
      await axios.patch(
        `https://projects-work-board.vercel.app/api/pwb/projects/${projectId}/status`,
        {
          status: "Completed",
        }
      );
      // Refresh the list
      fetchOngoingProjects();
      alert("Project marked as completed!");
    } catch (error) {
      console.error("Error completing project:", error);
      alert("Failed to update project status");
    }
  };

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
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/pwb/freelancers")}
              className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-orange-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Ongoing Projects
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {ongoingData.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-12 border border-white/30 max-w-2xl mx-auto">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No Ongoing Projects
              </h2>
              <p className="text-gray-600 mb-8">
                You don't have any ongoing projects at the moment.
              </p>
              <button
                onClick={() => navigate("/projects")}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Browse New Projects
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap justify-center gap-6">
            {ongoingData.map((project, index) => (
              <div
                key={project._id}
                className="bg-white/60 w-100 backdrop-blur-lg rounded-3xl p-6 border border-gray-400 hover:shadow-xl hover:border-white/70 transition-all duration-300 group"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-xs rounded-full">
                        In Progress
                      </span>
                      <span className="text-sm text-gray-500">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Project Meta */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">
                      Client: {project.client?.username}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">
                      ₹{project.minprice} - ₹{project.maxprice}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-700">
                      Due: {new Date(project.completion).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.stack?.split(",").map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Progress
                    </span>
                    <span className="text-sm text-gray-600">
                      {project.progress || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress || 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/pwb/project/${project._id}`)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-semibold">View Details</span>
                  </button>

                  <button
                    onClick={() => handleCompleteProject(project._id)}
                    className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OngoingProjects;

//////////////////////////////////////
// import { useEffect, useState } from "react";
// import "./ongoingProject.css";
// import api from "../../utils/api";
// import ViewOngoing from "./viewOngoing";

// function OngoingProject() {
//   const [ongoingData, setOngoingData] = useState([]);
//   const [count, setCount] = useState(0);

//   const freeId = sessionStorage.getItem("freelancerId");
//   useEffect(() => {
//     async function getDetails() {
//       try {
//         const response = await api.get(`/selected/get/freelancer/${freeId}`);
//         const filteredData = response?.data?.response?.filter(
//           (value) => value.status !== "Completed"
//         );
//         console.log("filtered : ", filteredData);
//         setOngoingData(filteredData);
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     getDetails();
//   }, [freeId, count]);

//   return (
//     <div className="ongoing-container">
//       <div className="ongoing-project-details-container">
//         <div className="o-title">Ongoing Projects</div>
//         <div className="o-c">
//           <div className="ongoing-head">
//             <span className="on-p-sl">Sl no</span>
//             <span className="on-p-pt">Project Title</span>
//             <span className="on-p-sn">Student Name</span>
//             <span className="on-p-a">Action</span>
//           </div>
//           {ongoingData.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "20px" }}>
//               <h1>You do not have any Ongoing Projects!</h1>
//               <h2>Go to New Project Section and Explore!</h2>
//             </div>
//           ) : (
//             ongoingData.map((ongoing, index) => (
//               <ViewOngoing
//                 key={index}
//                 ongoing={ongoing}
//                 index={index}
//                 count={count}
//                 setCount={setCount}
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OngoingProject;
