import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Filter,
  ArrowLeft,
  Code,
  Calendar,
  DollarSign,
  User,
  Heart,
  Clock,
  Star,
  ChevronRight,
  Briefcase,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const projectRefs = useRef([]);

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/pwb/login");
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        "https://projects-work-board.vercel.app/api/pwb/projects/available"
      );
      setProjectData(response.data);
      projectRefs.current = response.data.map(() => null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      if (error.response?.status === 401) {
        navigate("/pwb/login");
      }
      setLoading(false);
    }
  };

  const handleApplyToProject = async (project) => {
    try {
      await axios.post(
        `https://projects-work-board.vercel.app/api/pwb/projects/${project._id}/apply`
      );
      alert("Application submitted successfully!");
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error("Error applying to project:", error);
      alert("Failed to apply to project. Please try again.");
    }
  };

  const filteredProjects = projectData.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.stack?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "high-budget" && project.maxprice > 5000) ||
      (filterBy === "urgent" &&
        new Date(project.completion) - new Date() < 7 * 24 * 60 * 60 * 1000) ||
      (filterBy === "recent" &&
        new Date() - new Date(project.createdAt) < 7 * 24 * 60 * 60 * 1000);

    return matchesSearch && matchesFilter;
  });

  const ProjectCard = ({ project, index, onClick, isSelected }) => {
    const daysLeft = Math.ceil(
      (new Date(project?.completion) - new Date()) / (1000 * 60 * 60 * 24)
    );
    const isUrgent = daysLeft <= 7;

    return (
      <div
        ref={(el) => (projectRefs.current[index] = el)}
        className={`group w-120 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
          isSelected ? "scale-[1.02]" : ""
        }`}
        onClick={() => onClick(project, index)}
      >
        <div
          className={`bg-white/60 backdrop-blur-lg rounded-3xl p-6 border transition-all duration-300 hover:shadow-2xl ${
            isSelected
              ? "border-blue-500 shadow-2xl ring-2 ring-blue-500 ring-opacity-50"
              : "border-gray-300 hover:border-blue-300"
          }`}
        >
          {/* Project Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">
                  {project.title?.charAt(0) || "P"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-300">
                  {project?.title}
                </h3>
                <p className="text-sm text-gray-500">
                  by {project?.client?.username}
                </p>
              </div>
            </div>
            {isUrgent && (
              <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full">
                Urgent
              </span>
            )}
          </div>

          {/* Project Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {project?.description}
          </p>

          {/* Project Meta */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700 font-medium">Tech:</span>
              <div className="flex flex-wrap gap-1">
                {project?.stack
                  ?.split(",")
                  .slice(0, 3)
                  .map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                {project?.stack?.split(",").length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{project?.stack.split(",").length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-700">
                  ₹{project?.minprice} - ₹{project?.maxprice}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">
                  {daysLeft < 0 ? 0 : daysLeft} days left
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-700">
            <span className="font-semibold">View Details</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    );
  };

  const ProjectDetail = ({ project, onClose, onApply }) => {
    if (!project) return null;

    const daysLeft = Math.ceil(
      (new Date(project?.completion) - new Date()) / (1000 * 60 * 60 * 24)
    );
    const hasApplied = project?.applications?.some(
      (app) => app._id === localStorage.getItem("userId")
    );

    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/30 overflow-hidden shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold">
                {project?.title?.charAt(0) || "P"}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">{project?.title}</h2>
              <p className="text-blue-100">by {project?.client?.username}</p>
            </div>
          </div>

          <div className="flex items-center flex-wrap space-x-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span className="font-bold text-lg">
                ₹{project?.minprice} - ₹{project?.maxprice}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{daysLeft} days remaining</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{project?.applications?.length || 0} applicants</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Project Description
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {project?.description}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <Code className="w-5 h-5 mr-2 text-purple-600" />
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {project?.stack?.split(",").map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium shadow-md"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-4 border border-green-100">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-800">Deadline</span>
              </div>
              <p className="text-gray-700">
                {new Date(project?.completion).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-100">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-gray-800">Time Left</span>
              </div>
              <p className="text-gray-700">{daysLeft} days</p>
            </div>
          </div>

          {/* Client Info */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2 text-indigo-600" />
              Client Information
            </h3>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-4 border border-indigo-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {project?.client?.username?.charAt(0) || "C"}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {project?.client?.username}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {project?.client?.email}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      4.8 rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => onApply(project)}
            disabled={hasApplied}
            className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              hasApplied
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-2xl hover:from-green-600 hover:to-teal-600 transform hover:-translate-y-1"
            }`}
          >
            {hasApplied ? (
              <>
                <CheckCircle className="w-6 h-6" />
                <span>Application Submitted</span>
              </>
            ) : (
              <>
                <Heart className="w-6 h-6" />
                <span>Apply for This Project</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-x-scroll">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() =>
                  user?.userType == "freelancer"
                    ? navigate("/pwb/freelancers")
                    : navigate("/pwb")
                }
                className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Discover Projects
                </h1>
                <p className="text-sm text-gray-600">
                  {filteredProjects.length} projects available
                </p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/80 transition-all duration-300"
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { key: "all", label: "All Projects" },
                { key: "high-budget", label: "High Budget" },
                { key: "urgent", label: "Urgent" },
                { key: "recent", label: "Recently Posted" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setFilterBy(filter.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    filterBy === filter.key
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "bg-white/60 text-gray-700 hover:bg-white/80"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-12 border border-white/30 max-w-2xl mx-auto">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No Projects Found
              </h2>
              <p className="text-gray-600 mb-8">
                {searchTerm || filterBy !== "all"
                  ? "Try adjusting your search or filters to find more projects."
                  : "No projects are currently available. Check back later for new opportunities!"}
              </p>
              {(searchTerm || filterBy !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterBy("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-row lg:flex-row gap-8">
            {/* Projects List */}
            <div
              className={`${
                selectedProject ? "lg:w-1/2" : "w-full"
              } transition-all duration-500`}
            >
              <div className="flex flex-row flex-wrap justify-center gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={index}
                    onClick={(proj) => setSelectedProject(proj)}
                    isSelected={selectedProject?._id === project._id}
                  />
                ))}
              </div>
            </div>

            {/* Project Detail */}
            {selectedProject && (
              <div className="lg:w-1/2 lg:sticky lg:top-24 lg:self-start">
                <ProjectDetail
                  project={selectedProject}
                  onClose={() => setSelectedProject(null)}
                  onApply={handleApplyToProject}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;

// import { GlobalContext } from "../../components/context/context";
// import { useState, useEffect, useContext, useRef } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ProjectCard from "../components/ProjectCard";
// import ProjectDetail from "../components/ProjectDetail";
// import api from "../../utils/api";

// function ProjectsPage() {
//   const [projectData, setProjectData] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { setSingleProjectData } = useContext(GlobalContext);
//   const projectRefs = useRef([]);

//   // Toast notifications
//   const notifySuccess = () => toast.success("Response Sent Successfully!");
//   const notifyError = () =>
//     toast.error("Login through Freelancer Account to Continue!");
//   const notifyInfo = () => toast.info("Please try again after sometime!");

//   useEffect(() => {
//     async function getDetails() {
//       try {
//         setLoading(true);
//         const response = await api.get("/project/details");
//         setProjectData(response.data.info);
//         // Initialize refs array
//         projectRefs.current = response.data.info.map(() => null);
//       } catch (err) {
//         console.log(err);
//         toast.error("Failed to load projects. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     getDetails();
//   }, []);

//   const handleProjectClick = (project, index) => {
//     setSelectedProject(project);
//     setSelectedProjectIndex(index);
//     setSingleProjectData(project);

//     // Scroll to project's position on mobile
//     if (window.innerWidth < 768) {
//       setTimeout(() => {
//         if (projectRefs.current[index]) {
//           const yOffset = -100; // Offset to account for sticky header
//           const element = projectRefs.current[index];
//           const y =
//             element.getBoundingClientRect().top + window.pageYOffset + yOffset;
//           window.scrollTo({ top: y, behavior: "smooth" });
//         }
//       }, 100);
//     }
//   };

//   const handleInterested = async () => {
//     const fid = sessionStorage.getItem("freelancerId");

//     if (fid) {
//       try {
//         const response = await api.post("/selected/save", {
//           ...selectedProject,
//           freeId: fid,
//         });
//         console.log(response);
//         notifySuccess();
//       } catch (err) {
//         console.log(err);
//         notifyInfo();
//       }
//     } else {
//       notifyError();
//     }
//   };

//   const renderProjectGrid = () => {
//     if (loading) {
//       return (
//         <div className="flex justify-center items-center h-64">
//           <div className="flex flex-col items-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
//             <p className="mt-4 text-gray-600">Loading projects...</p>
//           </div>
//         </div>
//       );
//     }

//     if (projectData.length === 0) {
//       return (
//         <div className="flex justify-center items-center h-64 bg-gray-50 rounded-xl border border-gray-200 p-8">
//           <div className="text-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-16 w-16 text-gray-400 mx-auto mb-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//             <h3 className="text-xl font-medium text-gray-900 mb-2">
//               No projects available
//             </h3>
//             <p className="text-gray-600">
//               Check back later for new project listings.
//             </p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       // <div className="grid md:grid-cols-2 gap-6">
//       <div className="flex flex-row flex-wrap justify-center">
//         {projectData.map((project, index) => {
//           // For mobile view, inject the ProjectDetail component after the clicked project
//           const isMobile = true;
//           const isSelected = selectedProjectIndex === index;

//           // Decide whether to show detail below this card on mobile
//           const showDetailHere = isMobile && isSelected;

//           return (
//             <div
//               key={index}
//               ref={(el) => (projectRefs.current[index] = el)}
//               className={`flex flex-col ${
//                 showDetailHere ? "md:col-span-1" : ""
//               }m-4 md:w-1/3 md:${isSelected ? "w-[76%]" : ""}`}
//             >
//               <ProjectCard
//                 project={project}
//                 onClick={() => handleProjectClick(project, index)}
//                 isActive={isSelected}
//               />

//               {/* Mobile view: Show detail below the selected card */}
//               {showDetailHere && (
//                 <div className="mt-4">
//                   <ProjectDetail
//                     project={selectedProject}
//                     onClose={() => setSelectedProject(null)}
//                     onInterested={handleInterested}
//                   />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="container mx-auto px-4 py-8">
//         <div className="mb-8 text-center">
//           <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-4 rounded-full"></div>
//           <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
//             Discover New Projects
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Find the perfect match for your skills and expertise from our latest
//             freelance opportunities.
//           </p>
//         </div>

//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Projects grid - left side on desktop */}
//           <div
//             className={`w-full ${
//               selectedProject && window.innerWidth >= 768
//                 ? "md:w-1/2"
//                 : "md:w-full"
//             } transition-all duration-500`}
//           >
//             {renderProjectGrid()}
//           </div>

//           {/* Detail view - right side on desktop */}
//           {selectedProject && window.innerWidth >= 768 && (
//             <div className="hidden md:block w-1/2 md:sticky md:top-24 md:self-start">
//               <ProjectDetail
//                 project={selectedProject}
//                 onClose={() => setSelectedProject(null)}
//                 onInterested={handleInterested}
//               />
//             </div>
//           )}
//         </div>
//       </main>

//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </div>
//   );
// }

// export default ProjectsPage;
