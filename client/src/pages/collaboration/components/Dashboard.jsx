import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Clock,
  MessageCircle,
  User,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { useMyApplications } from "../../../hooks/useApplication";
import projectService from "../../../services/projectService";
import userService from "../../../services/userService";
import Navbar from "./Navbar";

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("my-projects");
  const [myProjects, setMyProjects] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get applications using custom hook
  const { applications: appliedProjects, loading: applicationsLoading } =
    useMyApplications();
  // console.log(appliedProjects);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch user's projects
        const projectsData = await projectService.getUserProjects(user._id);
        setMyProjects(projectsData.projects);

        // Fetch dashboard stats
        const statsData = await userService.getDashboardStats();
        setDashboardStats(statsData.stats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await projectService.deleteProject(projectId);
      setMyProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      alert("Failed to delete project: " + err.message);
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const updatedUser = await userService.updateProfile(profileData);
      updateUser(updatedUser.user);
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "from-zinc-700 to-black";
      case "completed":
        return "from-zinc-600 to-zinc-800";
      case "pending":
        return "from-zinc-500 to-zinc-700";
      case "accepted":
        return "from-black to-zinc-800";
      case "rejected":
        return "from-zinc-800 to-zinc-900";
      default:
        return "from-zinc-600 to-zinc-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const tabItems = [
    { id: "my-projects", label: "My Projects", icon: Users },
    { id: "applied", label: "Applied Projects", icon: Eye },
    { id: "profile", label: "Profile", icon: User },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
          <span className="text-lg font-medium text-zinc-600">
            Loading dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 font-['Inter',sans-serif]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl mt-32 md:text-6xl font-black bg-gradient-to-r from-black via-zinc-800 to-black bg-clip-text text-transparent mb-4 tracking-tight">
              Dashboard
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 font-light tracking-wide">
              Manage your projects and collaborations
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Stats Cards */}
          {dashboardStats && (
            <div className="flex flex-row flex-wrap justify-center gap-8 mb-8 border-b border-black pb-4">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 p-4 text-center">
                <div className="text-2xl font-black text-zinc-800">
                  {dashboardStats.myProjects.total}
                </div>
                <div className="text-sm text-zinc-600 font-medium">
                  My Projects
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 p-4 text-center">
                <div className="text-2xl font-black text-zinc-800">
                  {dashboardStats.applications.sent}
                </div>
                <div className="text-sm text-zinc-600 font-medium">
                  Applications Sent
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 p-4 text-center">
                <div className="text-2xl font-black text-zinc-800">
                  {dashboardStats.received.total}
                </div>
                <div className="text-sm text-zinc-600 font-medium">
                  Applications Received
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 p-4 text-center">
                <div className="text-2xl font-black text-zinc-800">
                  {dashboardStats.profile.projectsCompleted}
                </div>
                <div className="text-sm text-zinc-600 font-medium">
                  Completed Projects
                </div>
              </div>
            </div>
          )}

          <div className="lg:grid lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar */}
            <div className="lg:col-span-1">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-black overflow-hidden sticky top-8">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-zinc-600 to-black"></div>
                <div className="p-8">
                  <nav className="space-y-3">
                    {tabItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full text-left px-4 py-4 rounded-2xl font-semibold transition-all duration-500 flex items-center justify-between ${
                            activeTab === item.id
                              ? "bg-gradient-to-r from-black to-zinc-800 text-white transform scale-105"
                              : "text-zinc-700 hover:bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50"
                          }`}
                        >
                          <div className="flex items-center">
                            <Icon className="h-5 w-5 mr-3" />
                            <span className="tracking-wide">{item.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 mt-8">
              {/* My Projects Tab */}
              {activeTab === "my-projects" && (
                <div className="space-y-6 md:space-y-8">
                  <div className="flex flex-row sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
                      My Projects
                    </h2>
                    <Link
                      to="/collaborate/post"
                      className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500 transform hover:scale-105 inline-flex items-center justify-center"
                    >
                      <span className="relative flex items-center tracking-wide">
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </span>
                    </Link>
                  </div>

                  <div className="grid gap-6">
                    {myProjects.map((project) => (
                      <div key={project._id} className="group relative">
                        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-black overflow-hidden hover:bg-white/90 transition-all duration-700 transform group-hover:-translate-y-2">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-zinc-600 to-black"></div>
                          <div className="p-6 md:p-8">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-0 mb-6">
                              <div className="flex-1">
                                <div className="flex w-full flex-row justify-between">
                                  <h3 className="text-xl md:text-2xl font-black text-zinc-800 mb-4 tracking-tight">
                                    {project.title}
                                  </h3>
                                  <div
                                    className={`px-4 py-2 h-8 ml-4 mb-4 bg-gradient-to-r ${getStatusColor(
                                      project.status
                                    )} text-white rounded-2xl text-sm font-bold tracking-wide`}
                                  >
                                    {project.status?.toUpperCase()}
                                  </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm text-zinc-600">
                                  <div className="px-3 py-1 bg-gradient-to-r from-zinc-700 to-black text-white rounded-xl text-xs font-bold tracking-wide">
                                    {project.category}
                                  </div>
                                  <div className="flex items-center bg-zinc-50/80 backdrop-blur-xl px-3 py-1 rounded-xl border border-zinc-200/50">
                                    <Users className="h-4 w-4 mr-1" />
                                    <span className="font-semibold">
                                      {project.applicantCount || 0} applicants
                                    </span>
                                  </div>
                                  <div className="flex items-center bg-zinc-50/80 backdrop-blur-xl px-3 py-1 rounded-xl border border-zinc-200/50">
                                    <Users className="h-4 w-4 mr-1" />
                                    <span className="font-semibold">
                                      {project.teamMemberCount || 0} members
                                    </span>
                                  </div>
                                  <div className="flex items-center bg-zinc-50/80 backdrop-blur-xl px-3 py-1 rounded-xl border border-zinc-200/50">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span className="font-semibold">
                                      Posted {formatDate(project.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row flex-wrap sm:flex-row gap-3 sm:gap-4">
                              <Link
                                to={`/collaborate/project/${project._id}`}
                                className="px-6 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black text-zinc-700 rounded-2xl hover:bg-zinc-100/80 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                              <Link
                                to={`/collaborate/project/${project._id}/edit`}
                                className="px-6 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black text-zinc-700 rounded-2xl hover:bg-zinc-100/80 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                              <Link
                                to={`/collaborate/project/${project._id}/applications`}
                                className="px-6 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black text-zinc-700 rounded-2xl hover:bg-zinc-100/80 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Manage
                              </Link>
                              <button
                                onClick={() => handleDeleteProject(project._id)}
                                className="px-6 py-3 bg-zinc-100/80 backdrop-blur-xl text-zinc-600 rounded-2xl hover:bg-red-100/80 hover:text-red-600 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide border border-zinc-300"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {myProjects.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <Plus className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-800 mb-3">
                          No projects yet
                        </h3>
                        <p className="text-zinc-600 font-medium mb-6">
                          Create your first project to start collaborating with
                          other students.
                        </p>
                        <Link
                          to="/collaborate/post"
                          className="px-8 py-4 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500 transform hover:scale-105 inline-flex items-center"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create Project
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Applied Projects Tab */}
              {activeTab === "applied" && (
                <div className="space-y-6 md:space-y-8">
                  <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
                    Applied Projects
                  </h2>

                  {applicationsLoading ? (
                    <div className="flex justify-center py-12">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-6 w-6 animate-spin text-zinc-600" />
                        <span className="text-zinc-600 font-medium">
                          Loading applications...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {appliedProjects.map((application) => (
                        <div key={application._id} className="group relative">
                          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-black overflow-hidden hover:bg-white/90 transition-all duration-700 transform group-hover:-translate-y-2">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-zinc-600 to-black"></div>
                            <div className="p-6 md:p-8">
                              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-0 mb-6">
                                <div className="flex-1">
                                  <h3 className="text-xl md:text-2xl font-black text-zinc-800 mb-4 tracking-tight">
                                    {application.project.title}
                                  </h3>
                                  <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm text-zinc-600">
                                    <span className="font-bold mb-2">
                                      by{" "}
                                      {application.project.author?.name ||
                                        "Unknown"}
                                    </span>
                                    <div className="px-3 py-1 bg-gradient-to-r from-zinc-700 to-black text-white rounded-xl text-xs font-bold tracking-wide">
                                      {application.project.category}
                                    </div>
                                    <div className="flex items-center bg-zinc-50/80 backdrop-blur-xl px-3 py-1 rounded-xl border border-zinc-200/50">
                                      <Clock className="h-4 w-4 mr-1" />
                                      <span className="font-semibold">
                                        Applied{" "}
                                        {formatDate(application.appliedAt)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={`px-4 py-2 bg-gradient-to-r ${getStatusColor(
                                    application.status
                                  )} text-white rounded-2xl text-sm font-bold tracking-wide`}
                                >
                                  {application.status}
                                </div>
                              </div>
                              <div className="flex flex-row sm:flex-row gap-3 sm:gap-4">
                                <Link
                                  to={`/collaborate/project/${application.project._id}`}
                                  className="px-6 py-3 bg-gradient-to-r from-zinc-800 to-black text-white rounded-2xl hover:from-black hover:to-zinc-800 transition-all duration-500 transform hover:scale-105 inline-flex items-center justify-center font-bold tracking-wide"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Project
                                </Link>
                                {application.status === "accepted" && (
                                  <button className="px-6 py-3 bg-zinc-100/80 backdrop-blur-xl text-zinc-700 rounded-2xl hover:bg-zinc-200/80 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide border border-zinc-300/50">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Contact:{" "}
                                    {application?.project?.author?.email}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {appliedProjects.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Eye className="h-10 w-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-zinc-800 mb-3">
                            No applications yet
                          </h3>
                          <p className="text-zinc-600 font-medium mb-6">
                            Browse projects and apply to ones that interest you.
                          </p>
                          <Link
                            to="/collaborate/browse"
                            className="px-8 py-4 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500 transform hover:scale-105 inline-flex items-center"
                          >
                            Browse Projects
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <ProfileTab user={user} onUpdateProfile={handleUpdateProfile} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Profile Tab Component
function ProfileTab({ user, onUpdateProfile }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    skills: user?.skills || [],
    interests: user?.interests || [],
    department: user?.department || "",
    year: user?.year || "",
  });
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const addInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest],
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpdateProfile(formData);
    } catch (err) {
      console.error("Profile update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
        Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-black overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-zinc-600 to-black"></div>
          <div className="p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-black text-zinc-800 mb-6 tracking-tight">
              Basic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
                  Department
                </label>
                <select
                  name="department"
                  className="w-full px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Environmental Engineering">
                    Environmental Engineering
                  </option>
                  <option value="Digital Media">Digital Media</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
                  Year
                </label>
                <select
                  name="year"
                  className="w-full px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
                  value={formData.year}
                  onChange={handleInputChange}
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
                Bio
              </label>
              <textarea
                name="bio"
                rows={4}
                className="w-full px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 resize-none font-medium"
                placeholder="Tell others about yourself, your interests, and what you're passionate about..."
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-black overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-600 via-black to-zinc-600"></div>
          <div className="p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-black text-zinc-800 mb-6 tracking-tight">
              Skills & Expertise
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-3 tracking-wide">
                  Technical Skills
                </label>
                <div className="flex flex-wrap gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Add a skill..."
                    className="flex-1 px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkill())
                    }
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500 transform hover:scale-105"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-zinc-100/80 backdrop-blur-xl text-zinc-700 px-4 py-2 rounded-xl font-bold border border-black tracking-wide flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-zinc-500 hover:text-zinc-700 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-3 tracking-wide">
                  Interests
                </label>
                <div className="flex flex-wrap gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Add an interest..."
                    className="flex-1 px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addInterest())
                    }
                  />
                  <button
                    type="button"
                    onClick={addInterest}
                    className="px-6 py-3 bg-gradient-to-r from-zinc-700 to-black text-white rounded-2xl font-bold hover:from-black hover:to-zinc-800 transition-all duration-500 transform hover:scale-105"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest) => (
                    <span
                      key={interest}
                      className="bg-zinc-50/80 backdrop-blur-xl text-zinc-600 px-4 py-2 rounded-xl font-bold border border-zinc-200/50 tracking-wide flex items-center"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => removeInterest(interest)}
                        className="ml-2 text-zinc-400 hover:text-zinc-600 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500 transform hover:scale-105 flex items-center tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

///////////////////////////////////////////////////////
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   Users,
//   Clock,
//   MessageCircle,
//   Bell,
//   Settings,
//   Sparkles,
//   Menu,
//   User,
// } from "lucide-react";

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("my-projects");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const myProjects = [
//     {
//       id: 1,
//       title: "Smart Campus Navigation System",
//       status: "Active",
//       applicants: 12,
//       teamMembers: 2,
//       postedDate: "2024-01-15",
//       category: "AI/ML",
//     },
//     {
//       id: 2,
//       title: "Sustainable Energy Dashboard",
//       status: "Completed",
//       applicants: 8,
//       teamMembers: 4,
//       postedDate: "2023-12-10",
//       category: "Data Science",
//     },
//   ];

//   const appliedProjects = [
//     {
//       id: 3,
//       title: "IoT-Based Smart Garden Monitor",
//       author: "Mike Rodriguez",
//       status: "Pending",
//       appliedDate: "2024-01-18",
//       category: "IoT",
//     },
//     {
//       id: 4,
//       title: "Mental Health Support Chatbot",
//       author: "Priya Patel",
//       status: "Accepted",
//       appliedDate: "2024-01-12",
//       category: "AI/ML",
//     },
//     {
//       id: 5,
//       title: "Virtual Reality Campus Tour",
//       author: "Emma Wilson",
//       status: "Rejected",
//       appliedDate: "2024-01-08",
//       category: "Game Development",
//     },
//   ];

//   const notifications = [
//     {
//       id: 1,
//       type: "application",
//       message: "New application for Smart Campus Navigation System",
//       time: "2 hours ago",
//       unread: true,
//     },
//     {
//       id: 2,
//       type: "acceptance",
//       message: "You've been accepted to Mental Health Support Chatbot project",
//       time: "1 day ago",
//       unread: true,
//     },
//     {
//       id: 3,
//       type: "message",
//       message: "New message from Mike Rodriguez",
//       time: "2 days ago",
//       unread: false,
//     },
//   ];

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "active":
//         return "from-zinc-700 to-black";
//       case "completed":
//         return "from-zinc-600 to-zinc-800";
//       case "pending":
//         return "from-zinc-500 to-zinc-700";
//       case "accepted":
//         return "from-black to-zinc-800";
//       case "rejected":
//         return "from-zinc-800 to-zinc-900";
//       default:
//         return "from-zinc-600 to-zinc-800";
//     }
//   };

//   const tabItems = [
//     { id: "my-projects", label: "My Projects", icon: Users },
//     { id: "applied", label: "Applied Projects", icon: Eye },
//     { id: "profile", label: "Profile", icon: User },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 font-['Inter',sans-serif]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
//         {/* Header */}
//         <div className="text-center mb-8 md:mb-12">
//           <h1 className="text-4xl mt-18 md:text-6xl font-black bg-gradient-to-r from-black via-zinc-800 to-black bg-clip-text text-transparent mb-4 tracking-tight">
//             Dashboard
//           </h1>
//           <p className="text-lg md:text-xl text-zinc-600 font-light tracking-wide">
//             Manage your projects and collaborations
//           </p>
//         </div>

//         {/* Mobile Layout */}
//         {/* <div className="lg:hidden">
//           <div className="flex items-center justify-between mb-6">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="flex items-center px-4 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50"
//             >
//               <Menu className="h-5 w-5 text-zinc-700 mr-2" />
//               <span className="font-semibold text-zinc-700">Menu</span>
//             </button>

//             <div className="px-4 py-2 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl font-semibold text-sm">
//               {tabItems.find((item) => item.id === activeTab)?.label}
//             </div>
//           </div>

//           {sidebarOpen && (
//             <div className="fixed inset-0 z-50 lg:hidden">
//               <div
//                 className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//                 onClick={() => setSidebarOpen(false)}
//               ></div>
//               <div className="fixed left-0 top-0 bottom-0 w-80 bg-white/95 backdrop-blur-xl border-r border-zinc-200/50 p-6">
//                 <div className="flex items-center justify-between mb-8">
//                   <h2 className="text-xl font-black text-zinc-800">
//                     Navigation
//                   </h2>
//                   <button
//                     onClick={() => setSidebarOpen(false)}
//                     className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 transition-colors"
//                   >
//                     ✕
//                   </button>
//                 </div>

//                 <nav className="space-y-3">
//                   {tabItems.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                       <button
//                         key={item.id}
//                         onClick={() => {
//                           setActiveTab(item.id);
//                           setSidebarOpen(false);
//                         }}
//                         className={`w-full text-left px-6 py-4 rounded-2xl font-semibold transition-all duration-500 flex items-center justify-between ${
//                           activeTab === item.id
//                             ? "bg-gradient-to-r from-black to-zinc-800 text-white"
//                             : "text-zinc-700 hover:bg-zinc-100/80 backdrop-blur-xl border border-zinc-200/50"
//                         }`}
//                       >
//                         <div className="flex items-center">
//                           <Icon className="h-5 w-5 mr-3" />
//                           <span className="tracking-wide">{item.label}</span>
//                         </div>
//                         {item.badge > 0 && (
//                           <span className="bg-gradient-to-r from-zinc-700 to-black text-white text-xs px-2 py-1 rounded-full font-bold">
//                             {item.badge}
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div> */}

//         {/* Desktop Layout */}
//         <div className="lg:grid lg:grid-cols-4 gap-8">
//           {/* Desktop Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-black overflow-hidden sticky top-8">
//               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-zinc-600 to-black"></div>
//               <div className="p-8">
//                 <nav className="space-y-3">
//                   {tabItems.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                       <button
//                         key={item.id}
//                         onClick={() => setActiveTab(item.id)}
//                         className={`w-full text-left px-4 py-4 rounded-2xl font-semibold transition-all duration-500 flex items-center justify-between ${
//                           activeTab === item.id
//                             ? "bg-gradient-to-r from-black to-zinc-800 text-white transform scale-105"
//                             : "text-zinc-700 hover:bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50"
//                         }`}
//                       >
//                         <div className="flex items-center">
//                           <Icon className="h-5 w-5 mr-3" />
//                           <span className="tracking-wide">{item.label}</span>
//                         </div>
//                         {item.badge > 0 && (
//                           <span className="bg-gradient-to-r from-zinc-700 to-black text-white text-xs px-2 py-1 rounded-full font-bold">
//                             {item.badge}
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </nav>
//               </div>
//             </div>
//           </div>

//           {/* Desktop Main Content */}
//           <div className="lg:col-span-3">{renderTabContent()}</div>
//         </div>

//         {/* Mobile Main Content */}
//         <div className="hidden sm:flex">{renderTabContent()}</div>
//       </div>
//     </div>
//   );

//   function renderTabContent() {
//     return (
//       <>
//         {/* My Projects Tab */}
//         {activeTab === "my-projects" && (
//           <div className="space-y-6 md:space-y-8">
//             <div className="flex flex-row sm:flex-row sm:justify-between sm:items-center gap-4">
//               <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
//                 My Projects
//               </h2>
//               <Link
//                 to="/post"
//                 className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500 transform hover:scale-105 inline-flex items-center justify-center"
//               >
//                 <span className="relative flex items-center tracking-wide">
//                   <Plus className="h-4 w-4 mr-2" />
//                   New Project
//                 </span>
//               </Link>
//             </div>

//             <div className="grid gap-6">
//               {myProjects.map((project) => (
//                 <div key={project.id} className="group relative">
//                   <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-black overflow-hidden hover:bg-white/90 transition-all duration-700 transform group-hover:-translate-y-2">
//                     <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-zinc-600 to-black"></div>

//                     <div className="p-6 md:p-8">
//                       <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-0 mb-6">
//                         <div className="flex-1">
//                           <div className="flex w-full flex-row justify-between">
//                             <h3 className="text-xl md:text-2xl font-black text-zinc-800 mb-4 tracking-tight">
//                               {project.title}
//                             </h3>
//                             <div
//                               className={`px-4 py-2 mb-4 bg-gradient-to-r ${getStatusColor(
//                                 project.status
//                               )} text-white rounded-2xl text-sm font-bold tracking-wide`}
//                             >
//                               {project.status}
//                             </div>
//                           </div>
//                           <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm text-zinc-600">
//                             <div className="px-3 py-1 bg-gradient-to-r from-zinc-700 to-black text-white rounded-xl text-xs font-bold tracking-wide">
//                               {project.category}
//                             </div>
//                             <div className="flex items-center bg-zinc-50/80 backdrop-blur-xl px-3 py-1 rounded-xl border border-zinc-200/50">
//                               <Users className="h-4 w-4 mr-1" />
//                               <span className="font-semibold">
//                                 {project.applicants} applicants
//                               </span>
//                             </div>
//                             <div className="flex items-center bg-zinc-50/80 backdrop-blur-xl px-3 py-1 rounded-xl border border-zinc-200/50">
//                               <Users className="h-4 w-4 mr-1" />
//                               <span className="font-semibold">
//                                 {project.teamMembers} members
//                               </span>
//                             </div>
//                             <div className="flex items-center bg-zinc-50/80 backdrop-blur-xl px-3 py-1 rounded-xl border border-zinc-200/50">
//                               <Clock className="h-4 w-4 mr-1" />
//                               <span className="font-semibold">
//                                 Posted{" "}
//                                 {new Date(
//                                   project.postedDate
//                                 ).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         {/* <div
//                           className={`px-4 py-2 my-2 bg-gradient-to-r ${getStatusColor(
//                             project.status
//                           )} text-white rounded-2xl text-sm font-bold tracking-wide`}
//                         >
//                           {project.status}
//                         </div> */}
//                       </div>

//                       <div className="flex flex-row sm:flex-row gap-3 sm:gap-4">
//                         <Link
//                           to={`/project/${project.id}`}
//                           className="px-6 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black text-zinc-700 rounded-2xl hover:bg-zinc-100/80 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide"
//                         >
//                           <Eye className="h-4 w-4 mr-2" />
//                           View
//                         </Link>
//                         <button className="px-6 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black text-zinc-700 rounded-2xl hover:bg-zinc-100/80 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide">
//                           <Edit className="h-4 w-4 mr-2" />
//                           Edit
//                         </button>
//                         <button className="px-6 py-3 bg-zinc-100/80 backdrop-blur-xl text-zinc-600 rounded-2xl hover:bg-zinc-200/80 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide border border-red">
//                           <Trash2 className="h-4 w-4 mr-2" />
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Applied Projects Tab */}
//         {activeTab === "applied" && (
//           <div className="space-y-6 md:space-y-8">
//             <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
//               Applied Projects
//             </h2>

//             <div className="grid gap-6">
//               {appliedProjects.map((project) => (
//                 <div key={project.id} className="group relative">
//                   <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-black overflow-hidden hover:bg-white/90 transition-all duration-700 transform group-hover:-translate-y-2">
//                     <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-zinc-600 to-black"></div>

//                     <div className="p-6 md:p-8">
//                       <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-0 mb-6">
//                         <div className="flex-1">
//                           <h3 className="text-xl md:text-2xl font-black text-zinc-800 mb-4 tracking-tight">
//                             {project.title}
//                           </h3>
//                           <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm text-zinc-600">
//                             <span className="font-bold">
//                               by {project.author}
//                             </span>
//                             <div className="px-3 py-1 bg-gradient-to-r from-zinc-700 to-black text-white rounded-xl text-xs font-bold tracking-wide">
//                               {project.category}
//                             </div>
//                             <div className="flex items-center bg-zinc-50/80 backdrop-blur-xl px-3 py-1 rounded-xl border border-zinc-200/50">
//                               <Clock className="h-4 w-4 mr-1" />
//                               <span className="font-semibold">
//                                 Applied{" "}
//                                 {new Date(
//                                   project.appliedDate
//                                 ).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className={`px-4 py-2 bg-gradient-to-r ${getStatusColor(
//                             project.status
//                           )} text-white rounded-2xl text-sm font-bold tracking-wide`}
//                         >
//                           {project.status}
//                         </div>
//                       </div>

//                       <div className="flex flex-row sm:flex-row gap-3 sm:gap-4">
//                         <Link
//                           to={`/project/${project.id}`}
//                           className="px-6 py-3 bg-gradient-to-r from-zinc-800 to-black text-white rounded-2xl hover:from-black hover:to-zinc-800 transition-all duration-500 transform hover:scale-105 inline-flex items-center justify-center font-bold tracking-wide"
//                         >
//                           <Eye className="h-4 w-4 mr-2" />
//                           View Project
//                         </Link>
//                         {project.status === "Accepted" && (
//                           <button className="px-6 py-3 bg-zinc-100/80 backdrop-blur-xl text-zinc-700 rounded-2xl hover:bg-zinc-200/80 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide border border-zinc-300/50">
//                             <MessageCircle className="h-4 w-4 mr-2" />
//                             Contact Team
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Notifications Tab */}
//         {/* {activeTab === "notifications" && (
//           <div className="space-y-6 md:space-y-8">
//             <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
//               Notifications
//             </h2>

//             <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden">
//               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-zinc-600 to-black"></div>
//               {notifications.map((notification, index) => (
//                 <div
//                   key={notification.id}
//                   className={`p-6 ${
//                     index !== notifications.length - 1
//                       ? "border-b border-zinc-200/50"
//                       : ""
//                   } ${
//                     notification.unread
//                       ? "bg-gradient-to-r from-zinc-50/50 to-white/50"
//                       : ""
//                   } transition-all duration-500 hover:bg-gradient-to-r hover:from-zinc-50/80 hover:to-white/80`}
//                 >
//                   <div className="flex items-start space-x-4">
//                     <div className="p-3 rounded-2xl bg-gradient-to-r from-zinc-700 to-black">
//                       {notification.type === "application" && (
//                         <Users className="h-5 w-5 text-white" />
//                       )}
//                       {notification.type === "acceptance" && (
//                         <Users className="h-5 w-5 text-white" />
//                       )}
//                       {notification.type === "message" && (
//                         <MessageCircle className="h-5 w-5 text-white" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <p
//                         className={`text-sm leading-relaxed ${
//                           notification.unread
//                             ? "font-bold text-zinc-800"
//                             : "text-zinc-600 font-medium"
//                         }`}
//                       >
//                         {notification.message}
//                       </p>
//                       <p className="text-xs text-zinc-500 mt-2 font-medium">
//                         {notification.time}
//                       </p>
//                     </div>
//                     {notification.unread && (
//                       <div className="w-3 h-3 bg-gradient-to-r from-zinc-700 to-black rounded-full"></div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )} */}

//         {/* Profile Tab */}
//         {activeTab === "profile" && (
//           <div className="space-y-6 md:space-y-8">
//             <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
//               Profile
//             </h2>

//             <div className="space-y-6">
//               {/* Basic Info */}
//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden">
//                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-zinc-600 to-black"></div>
//                 <div className="p-6 md:p-8">
//                   <h3 className="text-lg md:text-xl font-black text-zinc-800 mb-6 tracking-tight">
//                     Basic Information
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         className="w-full px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
//                         defaultValue="John Doe"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         className="w-full px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
//                         defaultValue="john.doe@university.edu"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
//                         Department
//                       </label>
//                       <select className="w-full px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium">
//                         <option>Computer Science</option>
//                         <option>Electrical Engineering</option>
//                         <option>Mechanical Engineering</option>
//                         <option>Design</option>
//                         <option>Business</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
//                         Year
//                       </label>
//                       <select className="w-full px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium">
//                         <option>1st Year</option>
//                         <option>2nd Year</option>
//                         <option>3rd Year</option>
//                         <option>4th Year</option>
//                         <option>Graduate</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="mt-6">
//                     <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
//                       Bio
//                     </label>
//                     <textarea
//                       rows={4}
//                       className="w-full px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 resize-none font-medium"
//                       placeholder="Tell others about yourself, your interests, and what you're passionate about..."
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Skills */}
//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden">
//                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-600 via-black to-zinc-600"></div>
//                 <div className="p-6 md:p-8">
//                   <h3 className="text-lg md:text-xl font-black text-zinc-800 mb-6 tracking-tight">
//                     Skills & Expertise
//                   </h3>
//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-bold text-zinc-800 mb-3 tracking-wide">
//                         Technical Skills
//                       </label>
//                       <div className="flex flex-wrap gap-2">
//                         {[
//                           "React",
//                           "Python",
//                           "JavaScript",
//                           "Machine Learning",
//                           "Node.js",
//                         ].map((skill) => (
//                           <span
//                             key={skill}
//                             className="bg-zinc-100/80 backdrop-blur-xl text-zinc-700 px-4 py-2 rounded-xl font-bold border border-zinc-300/50 tracking-wide"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                         <button className="px-4 py-2 bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 text-zinc-600 rounded-xl font-bold hover:bg-zinc-100/80 transition-all duration-500 tracking-wide">
//                           + Add Skill
//                         </button>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-zinc-800 mb-3 tracking-wide">
//                         Interests
//                       </label>
//                       <div className="flex flex-wrap gap-2">
//                         {["AI/ML", "Web Development", "Mobile Apps", "IoT"].map(
//                           (interest) => (
//                             <span
//                               key={interest}
//                               className="bg-zinc-50/80 backdrop-blur-xl text-zinc-600 px-4 py-2 rounded-xl font-bold border border-zinc-200/50 tracking-wide"
//                             >
//                               {interest}
//                             </span>
//                           )
//                         )}
//                         <button className="px-4 py-2 bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 text-zinc-600 rounded-xl font-bold hover:bg-zinc-100/80 transition-all duration-500 tracking-wide">
//                           + Add Interest
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Experience */}
//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden">
//                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-500 via-zinc-700 to-zinc-500"></div>
//                 <div className="p-6 md:p-8">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg md:text-xl font-black text-zinc-800 tracking-tight">
//                       Experience & Projects
//                     </h3>
//                     <button className="px-4 py-2 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500 transform hover:scale-105 tracking-wide">
//                       <Plus className="h-4 w-4 mr-2 inline" />
//                       Add Experience
//                     </button>
//                   </div>
//                   <div className="space-y-4">
//                     <div className="bg-zinc-50/80 backdrop-blur-xl p-6 rounded-2xl border border-zinc-200/50">
//                       <div className="flex items-start justify-between mb-3">
//                         <h4 className="font-black text-zinc-800 tracking-tight">
//                           Mobile App Development Intern
//                         </h4>
//                         <span className="text-sm text-zinc-500 font-semibold">
//                           Summer 2023
//                         </span>
//                       </div>
//                       <p className="text-zinc-600 font-medium mb-3">
//                         TechCorp Inc.
//                       </p>
//                       <p className="text-sm text-zinc-600 leading-relaxed">
//                         Developed React Native applications and worked on
//                         backend APIs using Node.js and MongoDB.
//                       </p>
//                     </div>
//                     <div className="bg-zinc-50/80 backdrop-blur-xl p-6 rounded-2xl border border-zinc-200/50">
//                       <div className="flex items-start justify-between mb-3">
//                         <h4 className="font-black text-zinc-800 tracking-tight">
//                           Personal Portfolio Website
//                         </h4>
//                         <span className="text-sm text-zinc-500 font-semibold">
//                           2023
//                         </span>
//                       </div>
//                       <p className="text-zinc-600 font-medium mb-3">
//                         Personal Project
//                       </p>
//                       <p className="text-sm text-zinc-600 leading-relaxed">
//                         Built a responsive portfolio website using React,
//                         Tailwind CSS, and deployed on Vercel.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Settings Tab */}
//         {/* {activeTab === "settings" && (
//           <div className="space-y-6 md:space-y-8">
//             <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
//               Settings
//             </h2>

//             <div className="space-y-6">
//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden">
//                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-zinc-600 to-black"></div>
//                 <div className="p-6 md:p-8">
//                   <h3 className="text-lg md:text-xl font-black text-zinc-800 mb-6 tracking-tight">
//                     Account Settings
//                   </h3>
//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
//                         Display Name
//                       </label>
//                       <input
//                         type="text"
//                         className="w-full px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
//                         defaultValue="John Doe"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         className="w-full px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 rounded-2xl focus: outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
//                         defaultValue="john.doe@university.edu"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-zinc-800 mb-2 tracking-wide">
//                         Password
//                       </label>
//                       <button className="px-6 py-3 bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/50 text-zinc-700 rounded-2xl hover:bg-zinc-100/80 transition-all duration-500 font-bold tracking-wide">
//                         Change Password
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden">
//                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-600 via-black to-zinc-600"></div>
//                 <div className="p-6 md:p-8">
//                   <h3 className="text-lg md:text-xl font-black text-zinc-800 mb-6 tracking-tight">
//                     Notification Preferences
//                   </h3>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-zinc-700 font-semibold">
//                         Email notifications for new applications
//                       </span>
//                       <input
//                         type="checkbox"
//                         className="w-5 h-5 text-zinc-800 rounded"
//                         defaultChecked
//                       />
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-zinc-700 font-semibold">
//                         Email notifications for project updates
//                       </span>
//                       <input
//                         type="checkbox"
//                         className="w-5 h-5 text-zinc-800 rounded"
//                         defaultChecked
//                       />
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-zinc-700 font-semibold">
//                         Weekly digest of new projects
//                       </span>
//                       <input
//                         type="checkbox"
//                         className="w-5 h-5 text-zinc-800 rounded"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden">
//                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-500 via-zinc-700 to-zinc-500"></div>
//                 <div className="p-6 md:p-8">
//                   <h3 className="text-lg md:text-xl font-black text-zinc-800 mb-6 tracking-tight">
//                     Privacy Settings
//                   </h3>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-zinc-700 font-semibold">
//                         Make profile visible to other students
//                       </span>
//                       <input
//                         type="checkbox"
//                         className="w-5 h-5 text-zinc-800 rounded"
//                         defaultChecked
//                       />
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-zinc-700 font-semibold">
//                         Allow direct messages from other students
//                       </span>
//                       <input
//                         type="checkbox"
//                         className="w-5 h-5 text-zinc-800 rounded"
//                         defaultChecked
//                       />
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-zinc-700 font-semibold">
//                         Show my projects in public browse
//                       </span>
//                       <input
//                         type="checkbox"
//                         className="w-5 h-5 text-zinc-800 rounded"
//                         defaultChecked
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )} */}
//       </>
//     );
//   }
// }
