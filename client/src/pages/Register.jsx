import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Code,
  FileText,
} from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    address: "",
    userType: "client",
    techStack: "",
    workedProjects: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const result = await register(formData, formData.userType);

    if (result.success) {
      navigate("/pwb/login");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-500 flex items-center justify-center p-4">
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
      </div> */}

      <div className="relative w-full max-w-4xl">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-4">
              Join PWB
            </h2>
            <p className="text-white/80 text-lg">
              Create your account and start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4 p-2 bg-white/5 rounded-2xl border border-white/10">
              <label
                className={`flex-1 text-center py-4 px-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  formData.userType === "client"
                    ? "bg-gradient-to-r from-blue-300 to-blue-300 text-white shadow-lg transform scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <input
                  type="radio"
                  name="userType"
                  value="client"
                  checked={formData.userType === "client"}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className="font-semibold">I'm a Client</span>
              </label>
              <label
                className={`flex-1 text-center py-4 px-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  formData.userType === "freelancer"
                    ? "bg-gradient-to-r from-blue-300 to-blue-300 text-white shadow-lg transform scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <input
                  type="radio"
                  name="userType"
                  value="freelancer"
                  checked={formData.userType === "freelancer"}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className="font-semibold">I'm a Freelancer</span>
              </label>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-white/90 font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-white/90 font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-white/90 font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-white/90 font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your address"
                  required
                />
              </div>
            </div>

            {/* Freelancer specific fields */}
            {formData.userType === "freelancer" && (
              <div className="space-y-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-white/90 font-semibold text-lg flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Freelancer Information
                </h3>

                <div className="space-y-2">
                  <label className="text-white/90 font-medium">
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="e.g., React, Node.js, Python"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/90 font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Previous Work Experience
                  </label>
                  <textarea
                    name="workedProjects"
                    value={formData.workedProjects}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                    placeholder="Describe your previous projects and experience"
                    rows="3"
                    required
                  />
                </div>
              </div>
            )}

            {/* Client specific fields */}
            {formData.userType === "client" && (
              <div className="space-y-2">
                <label className="text-white/90 font-medium flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Company (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your company name"
                />
              </div>
            )}

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-white/90 font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/90 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-center backdrop-blur-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-white/70">
              Already have an account?{" "}
              <Link
                to="/pwb/login"
                className="text-blue-300 hover:text-blue-200 font-semibold transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
            <Link
              to="/pwb"
              className="inline-block text-white/60 hover:text-white/80 transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

//////////////////////////////////////
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { Eye, EyeOff } from "lucide-react";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone_number: "",
//     address: "",
//     userType: "client",
//     // Freelancer specific fields
//     techStack: "",
//     workedProjects: "",
//     // Client specific fields
//     company: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     const result = await register(formData, formData.userType);

//     if (result.success) {
//       navigate("/pwb/login");
//     } else {
//       setError(result.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <div className="auth-card glass-card">
//           <div className="auth-header">
//             <h2 className="gradient-text">Join PWB</h2>
//             <p>Create your account and start your journey</p>
//           </div>

//           <form onSubmit={handleSubmit} className="auth-form">
//             <div className="user-type-selector">
//               <label
//                 className={`type-option ${
//                   formData.userType === "client" ? "active" : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="userType"
//                   value="client"
//                   checked={formData.userType === "client"}
//                   onChange={handleChange}
//                 />
//                 <span>I'm a Client</span>
//               </label>
//               <label
//                 className={`type-option ${
//                   formData.userType === "freelancer" ? "active" : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="userType"
//                   value="freelancer"
//                   checked={formData.userType === "freelancer"}
//                   onChange={handleChange}
//                 />
//                 <span>I'm a Freelancer</span>
//               </label>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Full Name</label>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="glass-input"
//                   placeholder="Enter your full name"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="glass-input"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone_number"
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   className="glass-input"
//                   placeholder="Enter your phone number"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="glass-input"
//                   placeholder="Enter your address"
//                   required
//                 />
//               </div>
//             </div>

//             {formData.userType === "freelancer" && (
//               <>
//                 <div className="form-group">
//                   <label>Tech Stack</label>
//                   <input
//                     type="text"
//                     name="techStack"
//                     value={formData.techStack}
//                     onChange={handleChange}
//                     className="glass-input"
//                     placeholder="e.g., React, Node.js, Python"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Previous Work Experience</label>
//                   <textarea
//                     name="workedProjects"
//                     value={formData.workedProjects}
//                     onChange={handleChange}
//                     className="glass-input"
//                     placeholder="Describe your previous projects and experience"
//                     rows="3"
//                     required
//                   />
//                 </div>
//               </>
//             )}

//             {formData.userType === "client" && (
//               <div className="form-group">
//                 <label>Company (Optional)</label>
//                 <input
//                   type="text"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                   className="glass-input"
//                   placeholder="Enter your company name"
//                 />
//               </div>
//             )}

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Password</label>
//                 <div className="password-input">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="glass-input"
//                     placeholder="Create a password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5" />
//                     ) : (
//                       <Eye className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Confirm Password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="glass-input"
//                   placeholder="Confirm your password"
//                   required
//                 />
//               </div>
//             </div>

//             {error && <div className="error-message">{error}</div>}

//             <button
//               type="submit"
//               className="btn-primary auth-button"
//               disabled={loading}
//             >
//               {loading ? <div className="spinner"></div> : "Create Account"}
//             </button>
//           </form>

//           <div className="auth-footer">
//             <p>
//               Already have an account?{" "}
//               <Link to="/pwb/login" className="auth-link">
//                 Sign in here
//               </Link>
//             </p>
//             <Link to="/pwb" className="back-home">
//               ← Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
