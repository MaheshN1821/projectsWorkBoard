import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Star,
  Mail,
  User,
  Loader2,
  Filter,
} from "lucide-react";
import projectManagementService from "../../../services/projectManagementService";
import projectService from "../../../services/projectService";
import { useAuth } from "../../../hooks/useAuth";
import Navbar from "./Navbar";

export default function ProjectApplications() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewAction, setReviewAction] = useState("");

  useEffect(() => {
    fetchProjectAndApplications();
  }, [projectId, selectedStatus]);

  const fetchProjectAndApplications = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch project details
      const projectData = await projectService.getProject(projectId);
      setProject(projectData.project);

      // Check if user is project owner
      if (projectData.project.author._id !== user._id) {
        navigate("/dashboard");
        return;
      }

      // Fetch applications
      const params = selectedStatus !== "all" ? { status: selectedStatus } : {};
      const applicationsData =
        await projectManagementService.getProjectApplications(
          projectId,
          params
        );
      setApplications(applicationsData.applications);
      setStats(applicationsData.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewApplication = (application, action) => {
    setSelectedApplication(application);
    setReviewAction(action);
    setReviewMessage("");
    setShowReviewModal(true);
  };

  const submitReview = async () => {
    if (!selectedApplication || !reviewAction) return;

    try {
      setActionLoading(selectedApplication._id);

      if (reviewAction === "accept") {
        await projectManagementService.acceptApplication(
          selectedApplication._id,
          reviewMessage
        );
      } else {
        await projectManagementService.rejectApplication(
          selectedApplication._id,
          reviewMessage
        );
      }

      setShowReviewModal(false);
      setSelectedApplication(null);
      setReviewMessage("");
      await fetchProjectAndApplications();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "from-yellow-500 to-yellow-600";
      case "accepted":
        return "from-green-500 to-green-600";
      case "rejected":
        return "from-red-500 to-red-600";
      default:
        return "from-zinc-500 to-zinc-600";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
          <span className="text-lg font-medium text-zinc-600">
            Loading applications...
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
            Error Loading Applications
          </h2>
          <p className="text-zinc-600 mb-4">{error}</p>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl mt-32 font-black bg-gradient-to-r from-black via-zinc-800 to-black bg-clip-text text-transparent tracking-tight">
                  Project Applications
                </h1>
                <p className="text-lg text-zinc-600 font-medium mt-2">
                  {project?.title}
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            {stats && (
              <div className="flex flex-row flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-black p-4 text-center shadow-lg w-25">
                  <div className="text-4xl font-black text-zinc-800">
                    {stats.total}
                  </div>
                  <div className="text-lg mt-2 text-zinc-600 font-medium">
                    Total
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-black p-4 text-center shadow-lg">
                  <div className="text-4xl font-black text-yellow-600">
                    {stats.pending}
                  </div>
                  <div className="text-lg mt-2 text-zinc-600 font-medium">
                    Pending
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-black p-4 text-center shadow-lg">
                  <div className="text-4xl font-black text-green-600">
                    {stats.accepted}
                  </div>
                  <div className="text-lg mt-2 text-zinc-600 font-medium">
                    Accepted
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-black p-4 text-center shadow-lg">
                  <div className="text-4xl font-black text-red-600">
                    {stats.rejected}
                  </div>
                  <div className="text-lg mt-2 text-zinc-600 font-medium">
                    Rejected
                  </div>
                </div>
              </div>
            )}

            {/* Filter */}
            <div className="flex flex-col items-start gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-zinc-600" />
                <span className="font-semibold text-zinc-800">Filter:</span>
              </div>
              <div className="flex gap-2">
                {["all", "pending", "accepted", "rejected"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      selectedStatus === status
                        ? "bg-gradient-to-r from-black to-zinc-800 text-white shadow-lg"
                        : "bg-white/80 text-zinc-700 hover:bg-zinc-100/80 shadow-md"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-6">
            {applications.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-800 mb-3">
                  No applications found
                </h3>
                <p className="text-zinc-600 font-medium">
                  {selectedStatus === "all"
                    ? "No one has applied to this project yet."
                    : `No ${selectedStatus} applications found.`}
                </p>
              </div>
            ) : (
              applications.map((application) => (
                <div key={application._id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff] group-hover:shadow-[25px_25px_70px_#d1d5db,-25px_-25px_70px_#ffffff] transition-all duration-500" />
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Applicant Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-black rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {application?.applicant?.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-zinc-800">
                                  {application.applicant?.name}
                                </h3>
                                <p className="text-sm text-zinc-600 font-semibold">
                                  {application.applicant?.department} •{" "}
                                  {application.applicant?.year}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                    <span className="text-xs font-bold text-zinc-600">
                                      {application.applicant?.rating}
                                    </span>
                                  </div>
                                  <span className="text-xs text-zinc-500">
                                    •
                                  </span>
                                  <span className="text-xs text-zinc-500 font-semibold">
                                    {application.applicant?.projectsCompleted}{" "}
                                    projects completed
                                  </span>
                                </div>
                              </div>
                              <div
                                className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(
                                  application.status
                                )} text-white rounded-xl text-sm font-bold`}
                              >
                                {application?.status}
                              </div>
                            </div>

                            {/* Bio */}
                            {application.applicant?.bio && (
                              <p className="text-sm text-zinc-600 mb-3 leading-relaxed">
                                {application.applicant.bio}
                              </p>
                            )}

                            {/* Skills */}
                            {application?.applicant?.skills &&
                              application?.applicant?.skills?.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="text-xs font-bold text-zinc-800 mb-2 uppercase tracking-wide">
                                    Skills
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {application?.applicant?.skills
                                      .slice(0, 4)
                                      .map((skill) => (
                                        <span
                                          key={skill}
                                          className="px-3 py-1 bg-gradient-to-r from-zinc-100 to-zinc-50 text-zinc-700 rounded-lg text-xs font-semibold border border-zinc-200/50"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    {application?.applicant?.skills?.length >
                                      4 && (
                                      <span className="text-zinc-400 text-xs font-semibold self-center">
                                        +
                                        {application?.applicant?.skills
                                          ?.length - 4}{" "}
                                        more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                            {/* Application Message */}
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_6px_6px_12px_#d1d5db,inset_-6px_-6px_12px_#ffffff]" />
                              <div className="relative p-4">
                                <h4 className="text-sm font-bold text-zinc-800 mb-2 flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4" />
                                  Application Message
                                </h4>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                  {application?.message}
                                </p>
                              </div>
                            </div>

                            {/* Application Details */}
                            <div className="flex flex-wrap gap-4 mt-4 text-xs text-zinc-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span className="font-semibold">
                                  Applied {formatDate(application?.appliedAt)}
                                </span>
                              </div>
                              {application.reviewedAt && (
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span className="font-semibold">
                                    Reviewed{" "}
                                    {formatDate(application?.reviewedAt)}
                                    {application.reviewedBy &&
                                      ` by ${application?.reviewedBy?.name}`}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Review Message */}
                            {application.reviewMessage && (
                              <div className="mt-4 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-[inset_4px_4px_8px_#dbeafe,inset_-4px_-4px_8px_#ffffff]" />
                                <div className="relative p-4">
                                  <h4 className="text-sm font-bold text-blue-800 mb-2">
                                    Review Message
                                  </h4>
                                  <p className="text-sm text-blue-700 leading-relaxed">
                                    {application?.reviewMessage}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      {application?.status === "pending" && (
                        <div className="flex flex-col gap-3 lg:w-48">
                          <button
                            onClick={() =>
                              handleReviewApplication(application, "accept")
                            }
                            disabled={actionLoading === application._id}
                            className="group/btn relative w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                          >
                            {actionLoading === application._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                Accept
                              </>
                            )}
                          </button>
                          <button
                            onClick={() =>
                              handleReviewApplication(application, "reject")
                            }
                            disabled={actionLoading === application._id}
                            className="group/btn relative w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                          >
                            {actionLoading === application._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <XCircle className="h-4 w-4" />
                                Reject
                              </>
                            )}
                          </button>
                          <a
                            href={`mailto:${application?.applicant?.email}`}
                            className="group/btn relative w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-zinc-600 to-zinc-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            <Mail className="h-4 w-4" />
                            Contact
                          </a>
                        </div>
                      )}

                      {application?.status !== "pending" && (
                        <div className="flex flex-row items-center gap-3">
                          <Mail className="h-5 w-4" />
                          <div className="text-lg font-bold">
                            Contact: {application?.applicant?.email}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Review Modal */}
          {showReviewModal && selectedApplication && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="relative max-w-md w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-zinc-800">
                        {reviewAction === "accept" ? "Accept" : "Reject"}{" "}
                        Application
                      </h3>
                      <button
                        onClick={() => setShowReviewModal(false)}
                        className="group relative p-2 text-zinc-600 hover:text-zinc-800 transition-colors"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mb-6">
                      <p className="text-zinc-600 font-medium">
                        {reviewAction === "accept"
                          ? `You are about to accept ${selectedApplication?.applicant?.name}'s application.`
                          : `You are about to reject ${selectedApplication?.applicant?.name}'s application.`}
                      </p>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-bold text-zinc-800 mb-3">
                        Message to Applicant{" "}
                        {reviewAction === "accept"
                          ? "(Optional)"
                          : "(Required)"}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
                        <textarea
                          rows={4}
                          className="relative w-full px-4 py-3 bg-transparent text-zinc-700 placeholder-zinc-500 resize-none focus:outline-none font-medium"
                          placeholder={
                            reviewAction === "accept"
                              ? "Welcome to the team! Looking forward to working with you..."
                              : "Thank you for your interest. Unfortunately..."
                          }
                          value={reviewMessage}
                          onChange={(e) => setReviewMessage(e.target.value)}
                          required={reviewAction === "reject"}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowReviewModal(false)}
                        className="group relative flex-1 px-6 py-3 bg-gradient-to-br from-zinc-50 to-white rounded-2xl border border-zinc-200/50 text-zinc-700 font-bold hover:bg-zinc-100/80 transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={submitReview}
                        disabled={
                          reviewAction === "reject" && !reviewMessage.trim()
                        }
                        className={`group relative flex-1 px-6 py-3 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                          reviewAction === "accept"
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : "bg-gradient-to-r from-red-500 to-red-600"
                        }`}
                      >
                        {reviewAction === "accept"
                          ? "Accept Application"
                          : "Reject Application"}
                      </button>
                    </div>
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
