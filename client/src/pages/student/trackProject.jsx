import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  DollarSign,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
} from "lucide-react";

const TrackProject = () => {
  const navigate = useNavigate();
  const [trackData, setTrackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const clientId = localStorage.getItem("token");

  useEffect(() => {
    fetchTrackingData();
  }, [clientId, count]);

  const fetchTrackingData = async () => {
    try {
      const decodedToken = jwtDecode(clientId);
      const response = await axios.get(
        `https://projects-work-board.vercel.app/api/pwb/projects/client/ongoing/${decodedToken.userId}`,
        {
          headers: {
            Authorization: `Bearer ${clientId}`,
          },
        }
      );
      // console.log(response);
      setTrackData(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      setLoading(false);
    }
  };

  const handleCompleteProject = async (projectId) => {
    try {
      await axios.patch(
        `https://projects-work-board.vercel.app/api/pwb/projects/${projectId}/status`,
        {
          status: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${clientId}`,
          },
        }
      );
      setCount(count + 1);
      alert("Project marked as completed!");
    } catch (error) {
      console.error("Error completing project:", error);
      alert("Failed to update project status");
    }
  };

  const ProjectTrackCard = ({ project, index }) => {
    const daysLeft = Math.ceil(
      (new Date(project?.completion) - new Date()) / (1000 * 60 * 60 * 24)
    );
    // const isUrgent = daysLeft <= 7;
    const progress = project?.progress;

    return (
      <div className="bg-white/60 w-120 backdrop-blur-lg rounded-3xl p-6 border border-black hover:shadow-xl transition-all duration-300">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">
                {project?.title?.charAt(0) || "P"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-800 truncate">
                {project?.title}
              </h3>
              <p className="text-sm text-gray-500">Project #{index + 1}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-500 text-white text-xs rounded-full">
            {project?.status}
          </span>
        </div>

        {/* Freelancer Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-4 border border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {project?.selectedFreelancer?.username?.charAt(0) || "F"}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">
                {project?.selectedFreelancer?.username || "Freelancer"}
              </h4>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-blue-400 fill-current"
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">4.8</span>
              </div>
            </div>
            {/* <button className="p-2 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300">
              <MessageCircle className="w-4 h-4 text-blue-600" />
            </button> */}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Progress
            </span>
            <span className="text-sm text-gray-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Project Meta */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">
                ₹{project?.minprice || 0} - ₹{project?.maxprice || 0}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">
                {daysLeft} days left
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">
              Started:{" "}
              {new Date(project.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/pwb/project/${project._id}`)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-300"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="font-semibold">View Details</span>
          </button>

          {progress >= 100 && (
            <button
              onClick={() => handleCompleteProject(project._id)}
              className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
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
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/pwb/client")}
              className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8 text-orange-600" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent">
                  Track Projects
                </h1>
                <p className="text-sm text-gray-600">
                  {trackData?.length} ongoing projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {trackData?.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-12 border border-white/30 max-w-2xl mx-auto">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No Ongoing Projects
              </h2>
              <p className="text-gray-600 mb-8">
                You don't have any ongoing projects to track at the moment.
              </p>
              <button
                onClick={() => navigate("/client/view-project")}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                View Your Projects
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap justify-center gap-8">
            {trackData?.map((project, index) => (
              <ProjectTrackCard
                key={project._id || index}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackProject;

// import { useEffect, useState } from "react";
// import "./track.css";
// import api from "../../utils/api";
// import ViewTrack from "../../components/card/track-project/viewTrack";

// function TrackProject() {
//   const [trackData, setTrackData] = useState([]);
//   const [count, setCount] = useState(0);

//   const userId = sessionStorage.getItem("studentId");
//   useEffect(() => {
//     async function getDetails() {
//       try {
//         const response = await api.get(`/selected/get/user/${userId}`);
//         console.log(response.data.response);
//         setTrackData(response.data.response);
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     getDetails();
//   }, [userId, count]);

//   return (
//     <div className="trackContainer">
//       <div className="track-project-details-container">
//         <div className="t-title">Ongoing Projects</div>
//         <div className="track-out">
//           <div className="track-head">
//             <span className="t-sl">Sl no</span>
//             <span className="t-pt">Project Title</span>
//             <span className="t-fn">Freelancer Name</span>
//             <span className="t-a">Action</span>
//           </div>
//           {trackData.map((singleTrack, index) => (
//             <ViewTrack
//               key={index}
//               singleTrack={singleTrack}
//               index={index}
//               count={count}
//               setCount={setCount}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TrackProject;
