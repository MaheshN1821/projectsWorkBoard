import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle,
  User,
  Calendar,
  DollarSign,
  ArrowLeft,
  AlertCircle,
  Star,
  Award,
} from "lucide-react";

const Completed = () => {
  const navigate = useNavigate();
  const [completedData, setCompletedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedProjects();
  }, []);

  const fetchCompletedProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/pwb/login");
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        "https://projects-work-board.vercel.app/api/pwb/projects/freelancer"
      );

      // Filter for completed projects
      const completedProjects = response.data.filter(
        (project) => project.status === "Completed"
      );
      setCompletedData(completedProjects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching completed projects:", error);
      if (error.response?.status === 401) {
        navigate("/pwb/login");
      }
      setLoading(false);
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/pwb/freelancers")}
                className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Completed Projects
                </h1>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {completedData.length}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 flex items-center">
                  <Star className="w-6 h-6 mr-1" />
                  4.8
                </div>
                <div className="text-sm text-gray-500">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {completedData.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-12 border border-white/30 max-w-2xl mx-auto">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No Completed Projects
              </h2>
              <p className="text-gray-600 mb-8">
                You haven't completed any projects yet. Start working on
                projects to build your portfolio!
              </p>
              <button
                onClick={() => navigate("/projects")}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Browse Projects
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Achievement Banner */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                  <p className="text-green-100">
                    You've successfully completed {completedData.length}{" "}
                    projects
                  </p>
                </div>
                <Award className="w-16 h-16 text-green-200" />
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {completedData.map((project, index) => (
                <div
                  key={project._id || index}
                  className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/30 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs rounded-full">
                          Completed
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < 4
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
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
                        ${project.minprice} - ${project.maxprice}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">
                        Completed:{" "}
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.stack?.split(",").map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-lg"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Completion Badge */}
                  <div className="flex items-center justify-center p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-semibold text-green-700">
                      Project Completed Successfully
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Completed;

////////////////////////////////////////
// import { useEffect, useState } from "react";
// import "./completed.css";
// import api from "../../utils/api";
// import CompleteCard from "../../components/card/completionCard/completeCard";

// function Completed() {
//   const [completeData, setCompleteData] = useState([]);

//   const freeId = sessionStorage.getItem("freelancerId");
//   useEffect(() => {
//     async function getData() {
//       try {
//         const info = await api.get(`/freelancer/get-completed/${freeId}`);
//         console.log(info.data.response);
//         setCompleteData(info.data.response);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     getData();
//   }, [freeId]);

//   return (
//     <div className="completeContainer">
//       <div className="complete-wrapper">
//         <div className="complete-features">
//           <div className="complete-layout">
//             {completeData.map((complete, index) => (
//               <CompleteCard complete={complete} key={index + 1} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Completed;
