import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  FileText,
  Code,
  DollarSign,
  Calendar,
  Send,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const ListProject = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onProjectDetailSubmit = async (data) => {
    setLoading(true);
    const clientId = localStorage.getItem("token");

    try {
      await axios.post(
        "https://projects-work-board.vercel.app/api/pwb/projects",
        data,
        {
          headers: {
            Authorization: `Bearer ${clientId}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      reset();
      setTimeout(() => {
        setSuccess(false);
        navigate("/pwb/client/view-project");
      }, 2000);
    } catch (error) {
      console.error("Error listing project:", error);
      alert("There was an error! Try again later");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/30 text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Project Listed Successfully!
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
              onClick={() => navigate("/pwb/client")}
              className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                List a New Project
              </h1>
              <p className="text-sm text-gray-600">
                Find the perfect freelancer for your project
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-gray-300 shadow-xl">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Project Details
            </h2>
            <p className="text-gray-600">
              Provide comprehensive information about your project
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onProjectDetailSubmit)}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  <span>List Project</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListProject;

// import { useForm } from "react-hook-form";
// import "./listProject.css";
// import api from "../../utils/api.js";

// import { ToastContainer, toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";

// function ListProject() {
//   const { register, handleSubmit } = useForm();

//   const notifyFailure = () => toast.error("There was an error!Try again later");
//   const notifySuccess = () => toast.success("Project is Listed Successfully!");

//   const onProjectDetailSubmit = async (data) => {
//     const usrId = sessionStorage.getItem("studentId");

//     const newData = { ...data, userID: usrId };

//     try {
//       const response = await api.post("/student/project-details", newData);

//       console.log(response);
//       notifySuccess();
//     } catch (err) {
//       notifyFailure();
//       console.log(err);
//     }
//   };

//   return (
//     <div className="listContainer">
//       <div className="project-details-container">
//         <div className="p-title">Enter Project Details</div>
//         <form
//           onSubmit={handleSubmit(onProjectDetailSubmit)}
//           className="project-details-form"
//         >
//           <div className="single-form-cont">
//             <p className="form-heading">Enter Project Title: </p>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               placeholder=" "
//               {...register("title")}
//               required
//             />
//           </div>
//           <div className="single-form-cont">
//             <p className="form-heading">Enter Project Description: </p>
//             <textarea
//               id="description"
//               placeholder="In less than 200 words"
//               className="textArea"
//               required
//               {...register("description")}
//             />
//           </div>
//           <div className="single-form-cont">
//             <p className="form-heading">Tech Stack required: </p>
//             <input
//               type="text"
//               id="stack"
//               name="stack"
//               placeholder=" "
//               {...register("stack")}
//               required
//             />
//           </div>
//           <div className="single-form-cont-date">
//             <p className="form-heading">Price Range </p>
//             <div className="single-form-cont-price">
//               <select name="minprice" id="minprice" {...register("minprice")}>
//                 <option value="500">&#8377;500</option>
//                 <option value="1000">&#8377;1000</option>
//                 <option value="2000">&#8377;2000</option>
//                 <option value="3000">&#8377;3000</option>
//               </select>
//               <span> to </span>
//               <select name="maxprice" id="maxprice" {...register("maxprice")}>
//                 <option value="500">&#8377;500</option>
//                 <option value="1000">&#8377;1000</option>
//                 <option value="2000">&#8377;2000</option>
//                 <option value="3000">&#8377;3000</option>
//                 <option value="4000">&#8377;4000</option>
//                 <option value="5000">&#8377;5000</option>
//                 <option value="6000">&#8377;6000</option>
//                 <option value="7000">&#8377;7000</option>
//                 <option value="8000">&#8377;8000</option>
//                 <option value="9000">&#8377;9000</option>
//                 <option value="10000">&#8377;10000</option>
//               </select>
//             </div>
//           </div>
//           <div className="single-form-cont-date">
//             <p className="form-heading">Project to be completed by: </p>
//             <input
//               type="date"
//               id="completion"
//               name="completion"
//               className="date"
//               placeholder=" "
//               {...register("completion")}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="form-btn"
//             onSubmit={handleSubmit(onProjectDetailSubmit)}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
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
//         transition:Bounce
//       />
//     </div>
//   );
// }

// export default ListProject;
