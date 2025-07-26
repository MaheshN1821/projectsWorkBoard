import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Code,
  User,
  AlertCircle,
} from "lucide-react";

const ViewProject = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const clientId = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, [count, clientId]);

  const fetchProjects = async () => {
    try {
      const decodedToken = jwtDecode(clientId);
      const response = await axios.get(
        `https://projects-work-board.vercel.app/api/pwb/projects/client/${decodedToken.userId}`,
        {
          headers: {
            Authorization: `Bearer ${clientId}`,
          },
        }
      );
      setListData(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(
          `https://projects-work-board.vercel.app/api/pwb/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${clientId}`,
            },
          }
        );
        setCount(count + 1);
        alert("Project deleted successfully!");
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project");
      }
    }
  };

  const ProjectCard = ({ project, index }) => {
    const daysLeft = Math.ceil(
      (new Date(project?.completion) - new Date()) / (1000 * 60 * 60 * 24)
    );
    const isExpired = daysLeft < 0;

    return (
      <div className="bg-white/60 w-120 backdrop-blur-lg rounded-3xl p-6 border border-black hover:shadow-2xl hover:border-white transition-all duration-300 group">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">
                {project?.title?.charAt(0) || "P"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-300">
                {project?.title}
              </h3>
              <p className="text-sm text-gray-500">Project #{index + 1}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isExpired ? (
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                Expired
              </span>
            ) : (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {project?.status || "Active"}
              </span>
            )}
          </div>
        </div>

        {/* Project Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project?.description}
        </p>

        {/* Project Meta */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2">
            <Code className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-700 font-medium">Tech:</span>
            <div className="flex flex-wrap gap-1">
              {project?.stack
                ?.split(",")
                .slice(0, 3)
                .map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-lg"
                  >
                    {tech.trim()}
                  </span>
                ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">
                ₹{project?.minprice || 0} - ₹{project?.maxprice || 0}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-gray-600">
                {isExpired
                  ? `${Math.abs(daysLeft)} days ago`
                  : `${daysLeft} days left`}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">
              {project?.applications?.length || 0} applications received
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/pwb/client/track-project`)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            <span className="font-semibold">View Details</span>
          </button>

          <button
            onClick={() => navigate(`/pwb/client/edit-project/${project._id}`)}
            className="flex items-center justify-center px-4 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all duration-300"
          >
            <Edit className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleDeleteProject(project._id)}
            className="flex items-center justify-center px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
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
                onClick={() => navigate("/pwb/client")}
                className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <Eye className="w-8 h-8 text-green-600" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                    Your Projects
                  </h1>
                  <p className="text-sm text-gray-600">
                    {listData?.length} projects listed
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/pwb/client/list-project")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              List New Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {listData.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-12 border border-white/30 max-w-2xl mx-auto">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No Projects Listed
              </h2>
              <p className="text-gray-600 mb-8">
                You haven't listed any projects yet. Start by creating your
                first project!
              </p>
              <button
                onClick={() => navigate("/client/list-project")}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                List Your First Project
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap justify-center gap-6">
            {listData?.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProject;

// import { useEffect, useState } from "react";
// import ListedProject from "../../components/card/listed-project/listedProject";
// import "./viewProject.css";
// import api from "../../utils/api";

// function ViewProject() {
//   const [listData, setListData] = useState([]);
//   const [count, setCount] = useState(1);

//   const userId = sessionStorage.getItem("studentId");

//   useEffect(() => {
//     async function getDetails() {
//       try {
//         const response = await api.get(`/project/details/${userId}`);
//         console.log(response.data.info);
//         setListData(response.data.info);
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     getDetails();
//   }, [count, userId]);

//   return (
//     <div className="viewListContainer">
//       <div className="view-project-details-container">
//         <div className="p-title">Listed Projects</div>
//         <div className="some-cont">
//           <div className="view-project-head">
//             <span className="view-listed-slno">Sl no</span>
//             <span className="view-listed-title">Project Title</span>
//             <span className="view-listed-action">Action</span>
//           </div>
//           {listData.map((list, index) => (
//             <ListedProject
//               key={index}
//               list={list}
//               index={index}
//               setCount={setCount}
//               count={count}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewProject;
