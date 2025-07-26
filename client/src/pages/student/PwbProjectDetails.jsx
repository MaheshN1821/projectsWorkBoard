import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  User,
  Mail,
  Code,
  CheckCircle,
  Clock,
  Phone,
  Users,
  X,
  Edit3,
  Save,
} from "lucide-react";
import NotesSection from "./NotesSection";
import Payment from "../../components/payment/payment";

const PwbProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [project, setProject] = useState(null);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [newProgress, setNewProgress] = useState("");
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);

  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const userType = user.userType;
  const projectId = id;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `https://projects-work-board.vercel.app/api/pwb/projects/getdata/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProject(res.data);
        setNotes(res.data.notes || []);
        setNewProgress(res.data.progress.toString());
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchProject();
  }, [id, token]);

  const handleProgressUpdate = async () => {
    if (!newProgress || newProgress < 0 || newProgress > 100) {
      alert("Please enter a valid progress value between 0 and 100");
      return;
    }

    setIsUpdatingProgress(true);
    try {
      const response = await axios.patch(
        `https://projects-work-board.vercel.app/api/pwb/projects/${id}/progress`,
        { progress: parseInt(newProgress) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the project state with new progress
      setProject((prev) => ({
        ...prev,
        progress: response.data.progress,
      }));

      setIsEditingProgress(false);
      alert("Progress updated successfully!");
    } catch (error) {
      console.error("Error updating progress:", error);
      alert("Failed to update progress. Please try again.");
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  const handleCancelEdit = () => {
    setNewProgress(project.progress.toString());
    setIsEditingProgress(false);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  const handleSelection = async (freelancerId) => {
    try {
      const response = await axios.post(
        `https://projects-work-board.vercel.app/api/pwb/projects/update-status/${id}`,
        {
          status: "In Progress",
          freelancer: freelancerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      alert("Success!");
    } catch (error) {
      console.log(error);
      alert("error in status updation!");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleNotesUpdate = (updatedNotes) => {
    setNotes(updatedNotes);
  };

  const isSelectedFreelancer =
    project.selectedFreelancer && project.selectedFreelancer._id === user._id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() =>
                userType == "client"
                  ? navigate("/pwb/client/track-project")
                  : navigate("/pwb/freelancer/ongoing-project")
              }
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {project.title}
            </h1>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
              <div className="flex items-center text-indigo-100">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{project.progress}% Complete</span>
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Project Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {project.description}
            </p>

            {/* Progress Bar */}
            {/* <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress
                </span>
                <span className="text-sm text-gray-500">
                  {project.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div> */}
            {/* Progress Bar with Edit Functionality */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress
                  </span>
                  {isSelectedFreelancer && project.status === "In Progress" && (
                    <button
                      onClick={() => setIsEditingProgress(true)}
                      className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 flex flex-row items-center"
                      title="Update Progress"
                    >
                      <span className="ml-2 mr-1">Edit Here </span>
                      <Edit3 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {project.progress}%
                </span>
              </div>

              {/* Progress Update Form */}
              {isEditingProgress && (
                <div className="mb-4 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newProgress}
                      onChange={(e) => setNewProgress(e.target.value)}
                      className="w-20 px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0-100"
                    />
                    <span className="text-sm text-gray-600">%</span>
                    <button
                      onClick={handleProgressUpdate}
                      disabled={isUpdatingProgress}
                      className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdatingProgress ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      <span>{isUpdatingProgress ? "Updating..." : "Save"}</span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center space-x-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Enter a value between 0 and 100 to update the project
                    progress.
                  </p>
                </div>
              )}

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <>
          {project?.selectedFreelancer ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8 p-4 pt-14">
              <div className="flex flex-row flex-wrap justify-center gap-4">
                <div className="w-150 rounded-2xl border border-gray-400">
                  <div className="rounded-t-2xl bg-gradient-to-r from-zinc-800 to-zinc-400 px-8 py-6 ">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Hi, {project?.selectedFreelancer?.username}
                    </h2>
                    <p className="text-emerald-100 text-sm">
                      Selected Freelancer
                    </p>
                  </div>

                  <div className="p-8">
                    <div className="flex flex-row justify-start items-center flex-wrap gap-12">
                      {/* Name */}
                      <div className="flex items-center space-x-4">
                        <div className="bg-emerald-100 rounded-full p-3">
                          <User className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            Full Name
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {project?.selectedFreelancer?.username}
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 rounded-full p-3">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            Email Address
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {project?.selectedFreelancer?.email}
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 rounded-full p-3">
                          <Phone className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            Phone Number
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {project?.selectedFreelancer?.phone_number}
                          </p>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex items-start space-x-4">
                        <div className="bg-indigo-100 rounded-full p-3">
                          <Code className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                            Tech Stack
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project?.selectedFreelancer?.techStack
                              ?.split(",")
                              .map((tech, index) => (
                                <span
                                  key={index}
                                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                                >
                                  {tech.trim()}
                                </span>
                              )) || (
                              <span className="text-lg font-semibold text-gray-900">
                                {project?.selectedFreelancer?.techStack}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-120 rounded-2xl border border-gray-400">
                  <div className="rounded-t-2xl bg-gradient-to-r from-zinc-800 to-zinc-400 px-8 py-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {project?.client?.username}
                    </h2>
                    <p className="text-emerald-100 text-sm">Client</p>
                  </div>

                  <div className="p-8">
                    <div className="flex flex-row flex-wrap gap-12">
                      {/* Name */}
                      <div className="flex items-center space-x-4">
                        <div className="bg-emerald-100 rounded-full p-3">
                          <User className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            Full Name
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {project?.client?.username}
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 rounded-full p-3">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            Email Address
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {project?.client?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <NotesSection
                projectId={projectId}
                notes={notes}
                onNotesUpdate={handleNotesUpdate}
              />
              {userType === "client" ? (
                <div className="flex justify-end">
                  <Payment />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Applications ({project.applications?.length || 0})
                  </h2>
                </div>
              </div>

              <div className="p-8">
                {project.applications?.length > 0 ? (
                  <div className="flex flex-row flex-wrap gap-6">
                    {project.applications.map((app, index) => (
                      <div
                        key={app._id || index}
                        className="bg-gradient-to-r w-80 from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="flex flex-col space-y-4 ">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="bg-indigo-100 p-2 rounded-full">
                                <User className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {app.username}
                                </h3>
                                <div className="flex items-center space-x-1 text-gray-600">
                                  <Mail className="h-4 w-4" />
                                  <span className="text-sm">{app.email}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Code className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-700 font-medium">
                                Tech Stack:
                              </span>
                              <span className="text-sm text-gray-600">
                                {app.techStack}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleSelection(app._id)}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 mt-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 self-end sm:self-center"
                          >
                            <CheckCircle className="h-5 w-5" />
                            <span>Accept</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                      <Users className="h-8 w-8 text-gray-400 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Applications Yet
                    </h3>
                    <p className="text-gray-500">
                      This project hasn't received any applications yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default PwbProjectDetails;

////////////////////////////
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const PwbProjectDetails = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const token = localStorage.getItem("token");
//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await axios.get(
//           `https://projects-work-board.vercel.app/api/pwb/projects/getdata/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setProject(res.data);
//         console.log(res.data);
//       } catch (err) {
//         console.error("Error fetching project:", err);
//       }
//     };

//     fetchProject();
//   }, [id, token]);

//   if (!project) return <div>Loading...</div>;

//   const handleSelection = async (freelancerId) => {
//     try {
//       const response = await axios.post(
//         `https://projects-work-board.vercel.app/api/pwb/projects/update-status/${id}`,
//         {
//           status: "In Progress",
//           freelancer: freelancerId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response);
//       alert("Success!");
//     } catch (error) {
//       console.log(error);
//       alert("error in status updation!");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">{project.title}</h1>
//       <p>{project.description}</p>
//       <p>{project.progress}%</p>
//       <p>{project.status}</p>
//       {project.applications?.length > 0 ? (
//         project?.applications?.map((app, index) => (
//           <div key={app._id || index}>
//             <p>{app.username}</p>
//             <p>{app.email}</p>
//             <p>{app.techStack}</p>
//             <button onClick={() => handleSelection(app._id)}>Accept</button>
//           </div>
//         ))
//       ) : (
//         <div>No Applications</div>
//       )}
//     </div>
//   );
// };

// export default PwbProjectDetails;
