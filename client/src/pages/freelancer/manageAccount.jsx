import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Code,
  Briefcase,
  Camera,
  Save,
  ArrowLeft,
  Edit3,
} from "lucide-react";

const ManageAccount = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [freelancer, setFreelancer] = useState({
    username: "",
    phone_number: "",
    address: "",
    email: "",
    workedProjects: "",
    techStack: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchFreelancerData();
  }, []);

  const fetchFreelancerData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/pwb/login");
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        "https://projects-work-board.vercel.app/api/pwb/users/profile"
      );

      const userData = response.data;
      setFreelancer({
        username: userData.username || "",
        phone_number: userData.phone_number || "",
        address: userData.address || "",
        email: userData.email || "",
        workedProjects: userData.workedProjects || "",
        techStack: userData.techStack || "",
        profileImage: userData.profileImage || "",
      });

      // Set form default values
      Object.keys(userData).forEach((key) => {
        setValue(key, userData[key]);
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching freelancer data:", error);
      if (error.response?.status === 401) {
        navigate("/pwb/login");
      }
      setLoading(false);
    }
  };

  const onFormSubmit = async (data) => {
    setUpdating(true);
    try {
      const response = await axios.put(
        "https://projects-work-board.vercel.app/api/pwb/users/profile",
        data
      );

      // Update local state
      setFreelancer((prev) => ({ ...prev, ...data }));
      setIsEditing(false);

      // Show success message
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Manage Account
              </h1>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? "Cancel Edit" : "Edit Profile"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl flex justify-center mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col justify-center w-160 gap-8">
          {/* Profile Display Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-gray-400 sticky top-24">
              <div className="text-center">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      {/* {freelancer.profileImage ? (
                        <img
                          src={freelancer.profileImage || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-16 h-16 text-gray-400" />
                      )} */}
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {freelancer.username}
                </h2>
                <p className="text-gray-600 mb-6">Freelancer</p>

                {/* Quick Info */}
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">
                      {freelancer.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">
                      {freelancer.phone_number}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-700">
                      {freelancer.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience Section */}
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-gray-400">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
                Professional Experience
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tech Stack
                  </label>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl border border-white/30">
                    <div className="flex flex-wrap gap-2">
                      {freelancer.techStack?.split(",").map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-full"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Previous Projects
                  </label>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-white/30">
                    <p className="text-gray-700 leading-relaxed">
                      {freelancer.workedProjects}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Form */}
            {isEditing && (
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-gray-400">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Edit3 className="w-6 h-6 mr-3 text-purple-600" />
                  Update Information
                </h3>

                <form
                  onSubmit={handleSubmit(onFormSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        {...register("username", {
                          required: "Name is required",
                        })}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                      {errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.username.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("phone_number", {
                          required: "Phone number is required",
                        })}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                      {errors.phone_number && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone_number.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address
                    </label>
                    <input
                      type="text"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Code className="w-4 h-4 inline mr-2" />
                      Tech Stack
                    </label>
                    <input
                      type="text"
                      {...register("techStack", {
                        required: "Tech stack is required",
                      })}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="e.g., React, Node.js, Python"
                    />
                    {errors.techStack && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.techStack.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Previous Projects
                    </label>
                    <textarea
                      {...register("workedProjects", {
                        required: "Work experience is required",
                      })}
                      rows="4"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Describe your previous projects and experience"
                    />
                    {errors.workedProjects && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.workedProjects.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Camera className="w-4 h-4 inline mr-2" />
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      {...register("profileImage")}
                      accept="image/*"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={updating}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {updating ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Update Profile</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;

///////////////////////////////////////////////
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import api from "../../utils/api.js";
// import "./manageAccount.css";

// const freeId = sessionStorage.getItem("freelancerId");

// function ManageAccount() {
//   const { register, handleSubmit } = useForm();
//   const [freelancer, setFreelancer] = useState({
//     username: "",
//     phone_number: "",
//     address: "",
//     email: "",
//     workedProjects: "",
//     techStack: "",
//     fimage: "",
//   });

//   const updateOptions = {
//     username: {
//       required: "Name is required",
//     },
//     phone_number: {
//       required: "Phone Number is required",
//     },
//     email: {
//       required: "Email is required",
//     },
//     address: {
//       required: "Address is required",
//     },
//     workedProjects: {
//       required: "Worked Projects is required",
//     },
//     techStack: {
//       required: "Tech Stack is required",
//     },
//     fimage: {
//       message: "Image Uploaded",
//     },
//   };

//   useEffect(() => {
//     async function getFreeData() {
//       try {
//         const result = await api.get(`/freelancer/${freeId}`);

//         setFreelancer({
//           username: result?.data?.info[0]?.username,
//           phone_number: result?.data?.info[0]?.phone_number,
//           address: result?.data?.info[0]?.address,
//           email: result?.data?.info[0]?.email,
//           workedProjects: result?.data?.info[0]?.workedProjects,
//           techStack: result?.data?.info[0]?.techStack,
//           fimage: result?.data?.info[0]?.fimage,
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     getFreeData();
//   }, []);

//   const onFormSubmit = async (data) => {
//     const newData = { ...data, fId: freeId };

//     try {
//       const response = await api.post("/freelancer/update-details", {
//         newData,
//       });
//       console.log(response);
//     } catch (err) {
//       console.log(err);
//       alert("Try again later!");
//     }
//   };

//   return (
//     <div className="freelancerContainer-1">
//       <div className="free-wrapper-1">
//         <div className="account-content">
//           <div className="acc-title">Your Information</div>
//           <div className="twoCont">
//             {/* Freelancer Information (Profile Display) */}
//             <div className="acc-cont-1">
//               <div
//                 className="profile-image"
//                 style={{
//                   backgroundImage: `url(${freelancer.fimage})`,
//                 }}
//               ></div>
//               <div className="info-item">
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   placeholder={freelancer.username}
//                   disabled
//                 />
//               </div>
//               <div className="info-item">
//                 <label>Email:</label>
//                 <input
//                   type="text"
//                   name="email"
//                   id="email"
//                   placeholder={freelancer.email}
//                   disabled
//                 />
//               </div>
//               <div className="info-item">
//                 <label>Phone Number:</label>
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   id="phoneNumber"
//                   placeholder={freelancer.phone_number}
//                   disabled
//                 />
//               </div>
//               <div className="info-item">
//                 <label>Address:</label>
//                 <input
//                   type="text"
//                   name="address"
//                   id="address"
//                   placeholder={freelancer.address}
//                   disabled
//                 />
//               </div>
//             </div>
//             <div className="acc-cont-2">
//               <div className="info-head-1">
//                 <h1>Experience</h1>
//               </div>
//               <div className="form-item-container">
//                 <label htmlFor="projects">Previously Worked Projects:</label>
//                 <textarea
//                   id="projects"
//                   name="projects"
//                   placeholder={freelancer.workedProjects}
//                   disabled
//                 ></textarea>
//               </div>
//               <div className="form-item-container">
//                 <label htmlFor="techStack">Proficiency in Tech Stack:</label>
//                 <input
//                   type="text"
//                   id="techStack"
//                   name="techStack"
//                   placeholder={freelancer.techStack}
//                   disabled
//                 />
//               </div>
//             </div>
//           </div>
//           {/* Form to Collect Details (acc-cont-2) */}
//           <div className="update-container">
//             <div className="acc-cont-2">
//               <form
//                 className="freelancer-form"
//                 onSubmit={handleSubmit(onFormSubmit)}
//               >
//                 <div className="info-head-1">
//                   <h1>Update your Informtaion</h1>
//                 </div>
//                 <div className="form-item-container">
//                   <label htmlFor="name">Name:</label>
//                   <input
//                     type="text"
//                     name="username"
//                     id="username"
//                     placeholder={freelancer.username}
//                     {...register("username", updateOptions.username)}
//                   />
//                 </div>
//                 <div className="form-item-container">
//                   <label htmlFor="projects">Previously Worked Projects:</label>
//                   <textarea
//                     id="projects"
//                     name="projects"
//                     placeholder={freelancer.workedProjects}
//                     {...register(
//                       "workedProjects",
//                       updateOptions.workedProjects
//                     )}
//                   ></textarea>
//                 </div>
//                 <div className="form-item-container">
//                   <label htmlFor="techStack">Proficiency in Tech Stack:</label>
//                   <input
//                     type="text"
//                     id="techStack"
//                     name="techStack"
//                     placeholder={freelancer.techStack}
//                     {...register("techStack", updateOptions.techStack)}
//                   />
//                 </div>
//                 <div className="form-item-container">
//                   <label htmlFor="mobile">Phone Number:</label>
//                   <input
//                     type="tel"
//                     id="phone_number"
//                     name="phone_number"
//                     placeholder={freelancer.phone_number}
//                     pattern="[0-9]{10}"
//                     {...register("phone_number", updateOptions.phone_number)}
//                   />
//                 </div>
//                 <div className="form-item-container">
//                   <label htmlFor="email">Email Address:</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder={freelancer.email}
//                     {...register("email", updateOptions.email)}
//                   />
//                 </div>
//                 <div className="form-item-container">
//                   <label htmlFor="address">Address:</label>
//                   <input
//                     type="text"
//                     id="address"
//                     name="address"
//                     placeholder={freelancer.address}
//                     {...register("address", updateOptions.address)}
//                   />
//                 </div>

//                 {/* Profile Image Upload Section */}
//                 <div className="form-item-container">
//                   <label htmlFor="profileImage">Upload Profile Picture:</label>
//                   <input
//                     type="file"
//                     id="fimage"
//                     name="fimage"
//                     // accept="image/*"
//                     {...register("fimage", updateOptions.fimage)}
//                   />
//                 </div>
//                 <div className="up-btn-cont">
//                   <button type="submit" className="submit-btn">
//                     Update
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManageAccount;
