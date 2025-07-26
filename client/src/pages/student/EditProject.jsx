import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  FileText,
  Code,
  DollarSign,
  Calendar,
  Save,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";

const EditProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetchingProject, setFetchingProject] = useState(true);
  const [success, setSuccess] = useState(false);
  const [projectData, setProjectData] = useState(null);

  // Fetch existing project data
  useEffect(() => {
    const fetchProject = async () => {
      const clientId = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://projects-work-board.vercel.app/api/pwb/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${clientId}`,
            },
          }
        );

        const project = response.data;
        setProjectData(project);

        // Pre-populate form with existing data
        setValue("title", project.title);
        setValue("description", project.description);
        setValue("stack", project.stack);
        setValue("minprice", project.minprice);
        setValue("maxprice", project.maxprice);
        setValue("completion", project.completion?.split("T")[0]);
      } catch (error) {
        console.error("Error fetching project:", error);
        alert("Error loading project data");
        navigate("/pwb/client/view-project");
      } finally {
        setFetchingProject(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId, setValue, navigate]);

  const onProjectUpdateSubmit = async (data) => {
    setLoading(true);
    const clientId = localStorage.getItem("token");

    console.log("Updating project:", data);

    try {
      await axios.put(
        `https://projects-work-board.vercel.app/api/pwb/projects/${projectId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${clientId}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/pwb/client/view-project");
      }, 2000);
    } catch (error) {
      console.error("Error updating project:", error);
      alert("There was an error updating the project! Try again later");
    } finally {
      setLoading(false);
    }
  };

  // Loading state while fetching project data
  if (fetchingProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/30 text-center max-w-md">
          <Loader className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Loading Project Data...
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch your project details
          </p>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/30 text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Project Updated Successfully!
          </h2>
          <p className="text-gray-600">Redirecting to your projects...</p>
        </div>
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
              onClick={() => navigate("/pwb/client/view-project")}
              className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Edit Project
              </h1>
              <p className="text-sm text-gray-600">
                Update your project details
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-gray-300 shadow-xl">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Update Project Details
            </h2>
            <p className="text-gray-600">
              Modify your project information as needed
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onProjectUpdateSubmit)}
            className="space-y-8"
          >
            {/* Project Title */}
            <div className="space-y-2">
              <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Project Title
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "Project title is required",
                })}
                className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-blue-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                placeholder="Enter a compelling project title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm flex items-center mt-2">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                Project Description
              </label>
              <textarea
                {...register("description", {
                  required: "Project description is required",
                })}
                rows="6"
                className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-blue-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Describe your project in detail (max 200 words)"
              />
              {errors.description && (
                <p className="text-red-500 text-sm flex items-center mt-2">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <Code className="w-5 h-5 mr-2 text-purple-600" />
                Required Tech Stack
              </label>
              <input
                type="text"
                {...register("stack", { required: "Tech stack is required" })}
                className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-blue-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g., React, Node.js, MongoDB, Python"
              />
              {errors.stack && (
                <p className="text-red-500 text-sm flex items-center mt-2">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.stack.message}
                </p>
              )}
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Budget Range
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Budget
                  </label>
                  <select
                    {...register("minprice", {
                      required: "Minimum price is required",
                    })}
                    className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="500">₹500</option>
                    <option value="1000">₹1,000</option>
                    <option value="2000">₹2,000</option>
                    <option value="3000">₹3,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Budget
                  </label>
                  <select
                    {...register("maxprice", {
                      required: "Maximum price is required",
                    })}
                    className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="500">₹500</option>
                    <option value="1000">₹1,000</option>
                    <option value="2000">₹2,000</option>
                    <option value="3000">₹3,000</option>
                    <option value="4000">₹4,000</option>
                    <option value="5000">₹5,000</option>
                    <option value="6000">₹6,000</option>
                    <option value="7000">₹7,000</option>
                    <option value="8000">₹8,000</option>
                    <option value="9000">₹9,000</option>
                    <option value="10000">₹10,000</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Completion Date */}
            <div className="space-y-2">
              <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                Project Deadline
              </label>
              <input
                type="date"
                {...register("completion", {
                  required: "Completion date is required",
                })}
                className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.completion && (
                <p className="text-red-500 text-sm flex items-center mt-2">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.completion.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate("/pwb/client/view-project")}
                className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 hover:shadow-2xl transition-all duration-300 text-lg font-semibold"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    <span>Update Project</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
