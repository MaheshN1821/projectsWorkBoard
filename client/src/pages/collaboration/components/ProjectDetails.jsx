import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clock,
  Users,
  MessageCircle,
  Calendar,
  CheckCircle,
  MapPin,
  Star,
  Award,
  Target,
  Zap,
  Send,
  X,
  Loader2,
} from "lucide-react";
import { useProject } from "../../../hooks/useProjects";
import { useAuth } from "../../../hooks/useAuth";
import applicationService from "../../../services/applicationService";
import Navbar from "./Navbar";

export default function ProjectDetails() {
  const { id } = useParams();
  const Navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { project, userData, loading, error, toggleInterest } = useProject(id);

  // console.log(project);

  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState("");
  const [isInterested, setIsInterested] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Navigate("/collaborate/login");
      return;
    }
    if (userData) {
      setIsInterested(userData.isInterested);
    }
  }, [userData]);

  const token1 = localStorage.getItem("token");
  if (!token1) {
    Navigate("/collaborate/login");
    return;
  }
  const userInfo = localStorage.getItem("user");
  const actualInfo = JSON.parse(userInfo);
  const token = actualInfo._id;
  const isInterest = project?.interestedUsers?.map(
    (user) => user._id === token
  );
  const isApplied = project?.teamMembers?.map(
    (member) => member?.user?._id === token
  );

  const checkInterested = isInterest?.length > 0 ? true : false;
  const checkApplied = isApplied?.length > 0 ? true : false;

  const handleInterestToggle = async () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return;
    }

    try {
      await toggleInterest();
      setIsInterested(!isInterested);
    } catch (err) {
      console.error("Error toggling interest:", err);
    }
  };

  const handleContactAuthor = () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return;
    }
    setShowContactForm(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError("");

    try {
      await applicationService.applyToProject({
        project: id,
        message: contactMessage,
        skills: user?.skills || [],
        availability: {
          hoursPerWeek: 15,
          startDate: new Date(),
          endDate: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000), // 3 months
        },
      });

      setShowContactForm(false);
      setContactMessage("");

      // Show success message or redirect
      // alert("Done");
    } catch (err) {
      console.log(err);
      setContactError(err.message);
    } finally {
      setContactLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
          <span className="text-lg font-medium text-zinc-600">
            Loading project...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Project
          </h2>
          <p className="text-zinc-600 mb-4">{error}</p>
          <Link
            to="/collaborate/browse"
            className="px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500"
          >
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-800 mb-4">
            Project Not Found
          </h2>
          <p className="text-zinc-600 mb-4">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/collaborate/browse"
            className="px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500"
          >
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="mt-16 grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner">
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-9 -right-5 z-10">
                      <div className="p-3 rounded-full bg-gradient-to-r from-zinc-800 to-black shadow-lg">
                        <Star className="h-5 w-5 text-white fill-current" />
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-8 md:p-12">
                    {/* Title and Category */}
                    <div className="mb-8">
                      <div className="mb-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-black via-zinc-800 to-zinc-600 bg-clip-text text-transparent mb-4 mt-6 tracking-tight leading-tight">
                          {project.title}
                        </h1>
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-zinc-800 to-black text-white rounded-xl font-bold text-sm shadow-lg">
                          {project.category}
                        </div>
                      </div>
                      {/* Meta info */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center px-4 py-2 bg-gradient-to-br from-zinc-50 to-white rounded-xl border border-zinc-100/50 shadow-inner">
                          <Clock className="h-4 w-4 mr-2 text-zinc-600" />
                          <span className="font-bold text-zinc-700 text-sm">
                            Posted {formatTimeAgo(project.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center px-4 py-2 bg-gradient-to-br from-zinc-50 to-white rounded-xl border border-zinc-100/50 shadow-inner">
                          <Users className="h-4 w-4 mr-2 text-zinc-600" />
                          <span className="font-bold text-zinc-700 text-sm">
                            {project.interestedCount || 0} interested
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]" />
                          <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner p-4">
                            <Users className="h-6 w-6 text-zinc-600 mx-auto mb-2" />
                            <div className="font-bold text-zinc-800 text-sm">
                              {project.teamSize}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]" />
                          <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner p-4">
                            <Calendar className="h-6 w-6 text-zinc-600 mx-auto mb-2" />
                            <div className="font-bold text-zinc-800 text-sm">
                              {project.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]" />
                          <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner p-4">
                            <MapPin className="h-6 w-6 text-zinc-600 mx-auto mb-2" />
                            <div className="font-bold text-zinc-800 text-sm">
                              {project.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
                      <div className="relative p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-zinc-800 mb-4 flex items-center gap-2">
                          <Target className="h-6 w-6" />
                          Project Description
                        </h2>
                        <p className="text-zinc-600 leading-relaxed font-medium text-base sm:text-lg">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 sm:p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-800 mb-6 flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Skills Needed
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.skillsNeeded.map((skill) => (
                          <div key={skill} className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50 rounded-xl shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]" />
                            <div className="relative bg-white/60 backdrop-blur-xl rounded-xl border border-white/50 shadow-inner px-4 py-2">
                              <span className="text-zinc-700 font-bold text-sm">
                                {skill}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-800 mb-6 flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Skills Offered
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.skillsOffered.map((skill) => (
                          <div key={skill} className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-50 rounded-xl shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]" />
                            <div className="relative bg-white/40 backdrop-blur-xl rounded-xl border border-white/50 shadow-inner px-4 py-2">
                              <span className="text-zinc-600 font-bold text-sm">
                                {skill}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirements & Goals */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Requirements */}
                {project.requirements && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 h-full">
                      <h2 className="text-xl font-bold text-zinc-800 mb-4">
                        Requirements
                      </h2>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_6px_6px_12px_#d1d5db,inset_-6px_-6px_12px_#ffffff]" />
                        <div className="relative p-4">
                          <p className="text-zinc-600 leading-relaxed text-sm font-medium whitespace-pre-line">
                            {project.requirements}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Goals */}
                {project.goals && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 h-full">
                      <h2 className="text-xl font-bold text-zinc-800 mb-4">
                        Project Goals
                      </h2>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_6px_6px_12px_#d1d5db,inset_-6px_-6px_12px_#ffffff]" />
                        <div className="relative p-4">
                          <p className="text-zinc-600 leading-relaxed text-sm font-medium whitespace-pre-line">
                            {project.goals}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline */}
              {project.timeline && project.timeline.length > 0 && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-zinc-800 mb-8">
                      Project Timeline
                    </h2>
                    <div className="space-y-6">
                      {project.timeline.map((phase, index) => (
                        <div key={index} className="relative">
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Duration badge */}
                            <div className="relative flex-shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50 rounded-xl shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]" />
                              <div className="relative bg-white/60 backdrop-blur-xl rounded-xl border border-white/50 shadow-inner px-4 py-2 text-center min-w-[120px]">
                                <span className="text-zinc-700 font-bold text-sm">
                                  {phase.duration}
                                </span>
                              </div>
                            </div>
                            {/* Phase content */}
                            <div className="flex-1">
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]" />
                                <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner p-4 sm:p-6">
                                  <h4 className="font-bold text-zinc-800 mb-2 text-lg">
                                    {phase.phase}
                                  </h4>
                                  <p className="text-zinc-600 font-medium text-sm leading-relaxed">
                                    {phase.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Connector line */}
                          {index < project.timeline.length - 1 && (
                            <div className="hidden sm:block absolute left-[60px] top-16 w-0.5 h-8 bg-gradient-to-b from-zinc-300 to-transparent" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 mt-8">
                  <h3 className="text-xl font-bold text-zinc-800 mb-6">
                    Project Author
                  </h3>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-black rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {project.author.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-zinc-800 text-lg">
                        {project.author.name}
                      </h4>
                      <p className="text-sm text-zinc-600 font-semibold">
                        {project.author.department}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {project.author.year}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-bold text-zinc-600">
                          {project.author.rating}
                        </span>
                        <span className="text-xs text-zinc-500">
                          • {project.author.projectsCompleted} projects
                        </span>
                      </div>
                    </div>
                  </div>
                  {project.author.bio && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_6px_6px_12px_#d1d5db,inset_-6px_-6px_12px_#ffffff]" />
                      <div className="relative p-4">
                        <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                          {project.author.bio}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {isAuthenticated && userData && !userData.isOwner && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6">
                    <div className="space-y-4">
                      {/* Interest Button */}
                      <button
                        onClick={handleInterestToggle}
                        className="group relative w-full"
                      >
                        <div
                          className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                            isInterested
                              ? "bg-gradient-to-r from-zinc-700 to-black shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]"
                              : "bg-gradient-to-r from-black to-zinc-800 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] group-hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]"
                          }`}
                        />
                        <div className="relative px-6 py-4 text-white font-bold flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                          {isInterested || checkInterested ? (
                            <>
                              <CheckCircle className="h-5 w-5" />
                              Interested ✓
                            </>
                          ) : (
                            "Show Interest"
                          )}
                        </div>
                      </button>

                      {/* Apply Button */}
                      {!userData.hasApplied && (
                        <button
                          onClick={handleContactAuthor}
                          className="group relative w-full"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] group-hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] transition-all duration-300" />
                          <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner px-6 py-4 text-zinc-700 font-bold flex items-center justify-center gap-2 group-hover:text-zinc-900 transition-all duration-300">
                            <MessageCircle className="h-5 w-5" />
                            {userData.hasApplied || checkApplied
                              ? "Already Applied!"
                              : "Apply to Project"}
                          </div>
                        </button>
                      )}

                      {userData.hasApplied ||
                        (checkApplied && (
                          <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200">
                            <p className="text-green-700 font-bold">
                              Application Submitted
                            </p>
                            <p className="text-green-600 text-sm">
                              You have already applied to this project
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Interested Users */}
              {project.interestedUsers &&
                project.interestedUsers.length > 0 && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6">
                      <h3 className="text-xl font-bold text-zinc-800 mb-6">
                        Interested Students ({project.interestedUsers.length})
                      </h3>
                      <div className="space-y-4">
                        {project.interestedUsers.map((user, index) => (
                          <div
                            key={user._id || index}
                            className="relative group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff] group-hover:shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff] transition-all duration-300" />
                            <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner p-4 flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                {user.avatar}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-zinc-800 text-sm truncate">
                                  {user.name}
                                </div>
                                <div className="text-xs text-zinc-500 font-semibold">
                                  {user.department}
                                </div>
                                {user.skills && user.skills.length > 0 && (
                                  <div className="text-xs text-zinc-600 truncate">
                                    {user.skills.slice(0, 2).join(", ")}
                                  </div>
                                )}
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span className="text-xs font-bold text-zinc-600">
                                    {user?.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              {/* team members*/}
              {project?.teamMembers && project?.teamMembers?.length > 0 && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6">
                    <h3 className="text-xl font-bold text-zinc-800 mb-6">
                      Team Members ({project.teamMembers.length})
                    </h3>
                    <div className="space-y-4">
                      {project?.teamMembers.map((user, index) => (
                        <div key={user._id || index} className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff] group-hover:shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff] transition-all duration-300" />
                          <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner p-4 flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                              {user.user.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-zinc-800 text-sm truncate">
                                {user.user.name}
                              </div>
                              <div className="text-xs text-zinc-500 font-semibold">
                                {user.user.department}
                              </div>
                              {user.user.skills &&
                                user.user.skills.length > 0 && (
                                  <div className="text-xs text-zinc-600 truncate">
                                    {user.user.skills.slice(0, 2).join(", ")}
                                  </div>
                                )}
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs font-bold text-zinc-600">
                                  {user.user.rating}
                                </span>
                              </div>
                              {/* {user.user.rating && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs font-bold text-zinc-600">
                                  {user.rating}
                                </span>
                              </div>
                            )} */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Application Form Modal */}
          {showContactForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="relative max-w-md w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-zinc-800">
                        Apply to Project
                      </h3>
                      <button
                        onClick={() => setShowContactForm(false)}
                        className="group relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-xl shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] group-hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff] transition-all duration-300" />
                        <div className="relative p-2 text-zinc-600 group-hover:text-zinc-800 transition-colors">
                          <X className="h-5 w-5" />
                        </div>
                      </button>
                    </div>

                    {contactError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm font-medium">
                          {contactError}
                        </p>
                      </div>
                    )}

                    <form
                      onSubmit={handleSubmitApplication}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-bold text-zinc-800 mb-3">
                          Your Message
                        </label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
                          <textarea
                            rows={4}
                            className="relative w-full px-4 py-3 bg-transparent text-zinc-700 placeholder-zinc-500 resize-none focus:outline-none font-medium"
                            placeholder="Hi! I'm interested in joining your project..."
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setShowContactForm(false)}
                          className="group relative flex-1"
                          disabled={contactLoading}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] group-hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] transition-all duration-300" />
                          <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner px-6 py-3 text-zinc-700 font-bold group-hover:text-zinc-900 transition-colors">
                            Cancel
                          </div>
                        </button>
                        <button
                          type="submit"
                          className="group relative flex-1"
                          disabled={contactLoading}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-800 rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] group-hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] transition-all duration-300" />
                          <div className="relative px-6 py-3 text-white font-bold flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                            {contactLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Applying...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                Submit Application
                              </>
                            )}
                          </div>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

//////////////////////////////////////////
// import { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   ArrowLeft,
//   Clock,
//   Users,
//   Heart,
//   Share2,
//   MessageCircle,
//   Calendar,
//   CheckCircle,
//   MapPin,
//   Star,
//   Award,
//   Target,
//   Zap,
//   Send,
//   X,
// } from "lucide-react";

// export default function ProjectDetails() {
//   const { id } = useParams();
//   const [isInterested, setIsInterested] = useState(false);
//   const [showContactForm, setShowContactForm] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);

//   // Mock project data - in real app, fetch based on id
//   const project = {
//     id: 1,
//     title: "Smart Campus Navigation System",
//     description:
//       "Building an AI-powered mobile app that helps students navigate campus using AR and real-time data. The app will use machine learning to predict optimal routes based on class schedules, crowd density, and real-time events. We're looking to create something that genuinely improves student life on campus.",
//     author: {
//       name: "Sarah Chen",
//       department: "Computer Science",
//       year: "3rd Year",
//       avatar: "SC",
//       bio: "Passionate about AI and mobile development. Previously built 3 mobile apps and have experience with React Native and Python.",
//       rating: 4.9,
//       projectsCompleted: 8,
//     },
//     category: "AI/ML",
//     skillsNeeded: [
//       "Flutter",
//       "Machine Learning",
//       "AR Development",
//       "UI/UX Design",
//     ],
//     skillsOffered: [
//       "Python",
//       "Backend Development",
//       "API Design",
//       "Project Management",
//     ],
//     teamSize: "3-4 people",
//     duration: "3 months",
//     location: "Hybrid",
//     postedTime: "2 days ago",
//     applicants: 12,
//     featured: true,
//     requirements: `Looking for committed teammates who can dedicate 10-15 hours per week to this project. Experience with mobile development or machine learning is preferred but not required - enthusiasm to learn is more important! We'll be meeting twice a week and using Slack for communication.`,
//     goals: `Our goal is to create a fully functional prototype that we can demo at the upcoming Tech Fair. If successful, we plan to pitch this to the university administration for potential implementation. This could be a great portfolio piece and potentially lead to a startup opportunity.`,
//     timeline: [
//       {
//         phase: "Research & Planning",
//         duration: "Week 1-2",
//         description: "User research, technical planning, and UI/UX design",
//         status: "upcoming",
//       },
//       {
//         phase: "Core Development",
//         duration: "Week 3-8",
//         description: "Build core navigation features and ML models",
//         status: "upcoming",
//       },
//       {
//         phase: "AR Integration",
//         duration: "Week 9-10",
//         description: "Implement AR features and real-time data",
//         status: "upcoming",
//       },
//       {
//         phase: "Testing & Polish",
//         duration: "Week 11-12",
//         description: "User testing, bug fixes, and final preparations",
//         status: "upcoming",
//       },
//     ],
//   };

//   const interestedUsers = [
//     {
//       name: "Alex Kumar",
//       department: "Design",
//       skills: ["UI/UX", "Figma"],
//       avatar: "AK",
//       rating: 4.8,
//     },
//     {
//       name: "Mike Rodriguez",
//       department: "Computer Science",
//       skills: ["Flutter", "Mobile Dev"],
//       avatar: "MR",
//       rating: 4.7,
//     },
//     {
//       name: "Emma Wilson",
//       department: "Data Science",
//       skills: ["Machine Learning", "Python"],
//       avatar: "EW",
//       rating: 4.9,
//     },
//     {
//       name: "David Kim",
//       department: "Computer Science",
//       skills: ["AR Development", "Unity"],
//       avatar: "DK",
//       rating: 4.6,
//     },
//   ];

//   const handleInterestToggle = () => {
//     setIsInterested(!isInterested);
//   };

//   const handleContactAuthor = () => {
//     setShowContactForm(true);
//   };

//   const handleSaveToggle = () => {
//     setIsSaved(!isSaved);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
//         <div className="mt-16 grid lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Header Card */}
//             <div className="relative">
//               {/* Neumorphic container */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />

//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner overflow-hidden">
//                 {/* Featured badge */}
//                 {project.featured && (
//                   <div className="absolute top-6 right-6 z-10">
//                     <div className="p-3 rounded-full bg-gradient-to-r from-zinc-800 to-black shadow-lg">
//                       <Star className="h-5 w-5 text-white fill-current" />
//                     </div>
//                   </div>
//                 )}

//                 <div className="p-6 sm:p-8 md:p-12">
//                   {/* Title and Category */}
//                   <div className="mb-8">
//                     <div className="mb-6">
//                       <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-black via-zinc-800 to-zinc-600 bg-clip-text text-transparent mb-4 tracking-tight leading-tight">
//                         {project.title}
//                       </h1>
//                       <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-zinc-800 to-black text-white rounded-xl font-bold text-sm shadow-lg">
//                         {project.category}
//                       </div>
//                     </div>

//                     {/* Meta info */}
//                     <div className="flex flex-wrap gap-4">
//                       <div className="flex items-center px-4 py-2 bg-gradient-to-br from-zinc-50 to-white rounded-xl border border-zinc-100/50 shadow-inner">
//                         <Clock className="h-4 w-4 mr-2 text-zinc-600" />
//                         <span className="font-bold text-zinc-700 text-sm">
//                           Posted {project.postedTime}
//                         </span>
//                       </div>
//                       <div className="flex items-center px-4 py-2 bg-gradient-to-br from-zinc-50 to-white rounded-xl border border-zinc-100/50 shadow-inner">
//                         <Users className="h-4 w-4 mr-2 text-zinc-600" />
//                         <span className="font-bold text-zinc-700 text-sm">
//                           {project.applicants} interested
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Project Stats */}
//                   <div className="grid grid-cols-3 gap-4 mb-8">
//                     <div className="text-center">
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]" />
//                         <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner p-4">
//                           <Users className="h-6 w-6 text-zinc-600 mx-auto mb-2" />
//                           <div className="font-bold text-zinc-800 text-sm">
//                             {project.teamSize}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]" />
//                         <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner p-4">
//                           <Calendar className="h-6 w-6 text-zinc-600 mx-auto mb-2" />
//                           <div className="font-bold text-zinc-800 text-sm">
//                             {project.duration}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]" />
//                         <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner p-4">
//                           <MapPin className="h-6 w-6 text-zinc-600 mx-auto mb-2" />
//                           <div className="font-bold text-zinc-800 text-sm">
//                             {project.location}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
//                     <div className="relative p-6 sm:p-8">
//                       <h2 className="text-2xl font-bold text-zinc-800 mb-4 flex items-center gap-2">
//                         <Target className="h-6 w-6" />
//                         Project Description
//                       </h2>
//                       <p className="text-zinc-600 leading-relaxed font-medium text-base sm:text-lg">
//                         {project.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Skills Section */}
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />

//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 sm:p-8">
//                 <div className="grid md:grid-cols-2 gap-8">
//                   <div>
//                     <h3 className="text-xl font-bold text-zinc-800 mb-6 flex items-center gap-2">
//                       <Zap className="h-5 w-5" />
//                       Skills Needed
//                     </h3>
//                     <div className="flex flex-wrap gap-3">
//                       {project.skillsNeeded.map((skill) => (
//                         <div key={skill} className="relative">
//                           <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50 rounded-xl shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]" />
//                           <div className="relative bg-white/60 backdrop-blur-xl rounded-xl border border-white/50 shadow-inner px-4 py-2">
//                             <span className="text-zinc-700 font-bold text-sm">
//                               {skill}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-zinc-800 mb-6 flex items-center gap-2">
//                       <Award className="h-5 w-5" />
//                       Skills Offered
//                     </h3>
//                     <div className="flex flex-wrap gap-3">
//                       {project.skillsOffered.map((skill) => (
//                         <div key={skill} className="relative">
//                           <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-50 rounded-xl shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]" />
//                           <div className="relative bg-white/40 backdrop-blur-xl rounded-xl border border-white/50 shadow-inner px-4 py-2">
//                             <span className="text-zinc-600 font-bold text-sm">
//                               {skill}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Requirements & Goals */}
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Requirements */}
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />

//                 <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 h-full">
//                   <h2 className="text-xl font-bold text-zinc-800 mb-4">
//                     Requirements
//                   </h2>
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_6px_6px_12px_#d1d5db,inset_-6px_-6px_12px_#ffffff]" />
//                     <div className="relative p-4">
//                       <p className="text-zinc-600 leading-relaxed text-sm font-medium whitespace-pre-line">
//                         {project.requirements}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Goals */}
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />

//                 <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 h-full">
//                   <h2 className="text-xl font-bold text-zinc-800 mb-4">
//                     Project Goals
//                   </h2>
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_6px_6px_12px_#d1d5db,inset_-6px_-6px_12px_#ffffff]" />
//                     <div className="relative p-4">
//                       <p className="text-zinc-600 leading-relaxed text-sm font-medium whitespace-pre-line">
//                         {project.goals}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />

//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 sm:p-8">
//                 <h2 className="text-2xl font-bold text-zinc-800 mb-8">
//                   Project Timeline
//                 </h2>
//                 <div className="space-y-6">
//                   {project.timeline.map((phase, index) => (
//                     <div key={index} className="relative">
//                       <div className="flex flex-col sm:flex-row gap-4">
//                         {/* Duration badge */}
//                         <div className="relative flex-shrink-0">
//                           <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50 rounded-xl shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]" />
//                           <div className="relative bg-white/60 backdrop-blur-xl rounded-xl border border-white/50 shadow-inner px-4 py-2 text-center min-w-[120px]">
//                             <span className="text-zinc-700 font-bold text-sm">
//                               {phase.duration}
//                             </span>
//                           </div>
//                         </div>

//                         {/* Phase content */}
//                         <div className="flex-1">
//                           <div className="relative">
//                             <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]" />
//                             <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner p-4 sm:p-6">
//                               <h4 className="font-bold text-zinc-800 mb-2 text-lg">
//                                 {phase.phase}
//                               </h4>
//                               <p className="text-zinc-600 font-medium text-sm leading-relaxed">
//                                 {phase.description}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Connector line */}
//                       {index < project.timeline.length - 1 && (
//                         <div className="hidden sm:block absolute left-[60px] top-16 w-0.5 h-8 bg-gradient-to-b from-zinc-300 to-transparent" />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Author Card */}
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />

//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6">
//                 <h3 className="text-xl font-bold text-zinc-800 mb-6">
//                   Project Author
//                 </h3>

//                 <div className="flex items-start gap-4 mb-4">
//                   <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-black rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
//                     {project.author.avatar}
//                   </div>
//                   <div className="flex-1">
//                     <h4 className="font-bold text-zinc-800 text-lg">
//                       {project.author.name}
//                     </h4>
//                     <p className="text-sm text-zinc-600 font-semibold">
//                       {project.author.department}
//                     </p>
//                     <p className="text-sm text-zinc-500">
//                       {project.author.year}
//                     </p>
//                     <div className="flex items-center gap-1 mt-1">
//                       <Star className="h-3 w-3 text-yellow-500 fill-current" />
//                       <span className="text-xs font-bold text-zinc-600">
//                         {project.author.rating}
//                       </span>
//                       <span className="text-xs text-zinc-500">
//                         • {project.author.projectsCompleted} projects
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_6px_6px_12px_#d1d5db,inset_-6px_-6px_12px_#ffffff]" />
//                   <div className="relative p-4">
//                     <p className="text-sm text-zinc-600 leading-relaxed font-medium">
//                       {project.author.bio}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />

//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6">
//                 <div className="space-y-4">
//                   {/* Interest Button */}
//                   <button
//                     onClick={handleInterestToggle}
//                     className="group relative w-full"
//                   >
//                     <div
//                       className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
//                         isInterested
//                           ? "bg-gradient-to-r from-zinc-700 to-black shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]"
//                           : "bg-gradient-to-r from-black to-zinc-800 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] group-hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]"
//                       }`}
//                     />
//                     <div className="relative px-6 py-4 text-white font-bold flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
//                       {isInterested ? (
//                         <>
//                           <CheckCircle className="h-5 w-5" />
//                           Interested ✓
//                         </>
//                       ) : (
//                         "Show Interest"
//                       )}
//                     </div>
//                   </button>

//                   {/* Contact Button */}
//                   <button
//                     onClick={handleContactAuthor}
//                     className="group relative w-full"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] group-hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] transition-all duration-300" />
//                     <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner px-6 py-4 text-zinc-700 font-bold flex items-center justify-center gap-2 group-hover:text-zinc-900 transition-all duration-300">
//                       <MessageCircle className="h-5 w-5" />
//                       Contact Author
//                     </div>
//                   </button>

//                   {/* Save and Share */}
//                   {/* <div className="grid grid-cols-2 gap-3">
//                     <button
//                       onClick={handleSaveToggle}
//                       className="group relative"
//                     >
//                       <div
//                         className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
//                           isSaved
//                             ? "bg-gradient-to-r from-red-500 to-red-600 shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]"
//                             : "bg-gradient-to-br from-zinc-50 to-white shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff] group-hover:shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff]"
//                         }`}
//                       />
//                       <div
//                         className={`relative px-4 py-3 font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
//                           isSaved
//                             ? "text-white"
//                             : "text-zinc-700 group-hover:text-zinc-900"
//                         }`}
//                       >
//                         <Heart
//                           className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
//                         />
//                         <span className="text-sm">Save</span>
//                       </div>
//                     </button>

//                     <button className="group relative">
//                       <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff] group-hover:shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff] transition-all duration-300" />
//                       <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner px-4 py-3 text-zinc-700 font-bold flex items-center justify-center gap-2 group-hover:text-zinc-900 transition-all duration-300">
//                         <Share2 className="h-4 w-4" />
//                         <span className="text-sm">Share</span>
//                       </div>
//                     </button>
//                   </div> */}
//                 </div>
//               </div>
//             </div>

//             {/* Interested Users */}
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />

//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6">
//                 <h3 className="text-xl font-bold text-zinc-800 mb-6">
//                   Interested Students ({interestedUsers.length})
//                 </h3>
//                 <div className="space-y-4">
//                   {interestedUsers.slice(0, 4).map((user, index) => (
//                     <div key={index} className="relative group">
//                       <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff] group-hover:shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff] transition-all duration-300" />

//                       <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner p-4 flex items-center gap-3">
//                         <div className="w-12 h-12 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
//                           {user.avatar}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="font-bold text-zinc-800 text-sm truncate">
//                             {user.name}
//                           </div>
//                           <div className="text-xs text-zinc-500 font-semibold">
//                             {user.department}
//                           </div>
//                           <div className="text-xs text-zinc-600 truncate">
//                             {user.skills.join(", ")}
//                           </div>
//                           <div className="flex items-center gap-1 mt-1">
//                             <Star className="h-3 w-3 text-yellow-500 fill-current" />
//                             <span className="text-xs font-bold text-zinc-600">
//                               {user.rating}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Form Modal */}
//         {showContactForm && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="relative max-w-md w-full">
//               {/* Neumorphic modal */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />

//               <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner overflow-hidden">
//                 <div className="p-8">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-2xl font-bold text-zinc-800">
//                       Contact {project.author.name}
//                     </h3>
//                     <button
//                       onClick={() => setShowContactForm(false)}
//                       className="group relative"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-xl shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] group-hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff] transition-all duration-300" />
//                       <div className="relative p-2 text-zinc-600 group-hover:text-zinc-800 transition-colors">
//                         <X className="h-5 w-5" />
//                       </div>
//                     </button>
//                   </div>

//                   <form className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-bold text-zinc-800 mb-3">
//                         Your Message
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
//                         <textarea
//                           rows={4}
//                           className="relative w-full px-4 py-3 bg-transparent text-zinc-700 placeholder-zinc-500 resize-none focus:outline-none font-medium"
//                           placeholder="Hi! I'm interested in joining your project..."
//                         />
//                       </div>
//                     </div>

//                     <div className="flex gap-4">
//                       <button
//                         type="button"
//                         onClick={() => setShowContactForm(false)}
//                         className="group relative flex-1"
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] group-hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] transition-all duration-300" />
//                         <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-inner px-6 py-3 text-zinc-700 font-bold group-hover:text-zinc-900 transition-colors">
//                           Cancel
//                         </div>
//                       </button>

//                       <button type="submit" className="group relative flex-1">
//                         <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-800 rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] group-hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] transition-all duration-300" />
//                         <div className="relative px-6 py-3 text-white font-bold flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
//                           <Send className="h-4 w-4" />
//                           Send Message
//                         </div>
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
