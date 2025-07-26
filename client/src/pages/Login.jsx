import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "client",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
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

    const result = await login(
      formData.email,
      formData.password,
      formData.userType
    );

    if (result.success) {
      navigate(
        formData.userType === "freelancer" ? "/pwb/freelancers" : "/pwb/client"
      );
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-950 to-indigo-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-2000"></div>
      </div>

      <div className="w-full max-w-md backdrop-blur-2xl bg-white/10 rounded-3xl shadow-xl border border-white/10 p-8 md:p-12 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent mb-3 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-white/80 text-lg font-medium">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4 p-2 bg-white/5 rounded-2xl border border-white/10">
            <label
              className={`flex-1 text-center py-3 px-6 rounded-xl cursor-pointer transition-all duration-300 text-sm font-semibold tracking-wide ${
                formData.userType === "client"
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md transform scale-[1.02]"
                  : "text-white/70 hover:text-white hover:bg-white/10"
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
              I'm a Client
            </label>
            <label
              className={`flex-1 text-center py-3 px-6 rounded-xl cursor-pointer transition-all duration-300 text-sm font-semibold tracking-wide ${
                formData.userType === "freelancer"
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md transform scale-[1.02]"
                  : "text-white/70 hover:text-white hover:bg-white/10"
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
              I'm a Freelancer
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-white/90 font-medium flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent backdrop-blur-sm transition duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-white/90 font-medium flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent backdrop-blur-sm transition duration-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition duration-200"
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

          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-center backdrop-blur-sm text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold rounded-xl transition duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-10 text-center space-y-4">
          <p className="text-white/70 text-sm">
            Don't have an account?{" "}
            <Link
              to="/pwb/register"
              className="text-purple-300 hover:text-purple-200 font-medium transition"
            >
              Sign up here
            </Link>
          </p>
          <Link
            to="/pwb"
            className="inline-block text-white/60 hover:text-white/80 text-sm transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

////////////////////////
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { Eye, EyeOff, Mail, Lock } from "lucide-react";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     userType: "client",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const { login } = useAuth();
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

//     const result = await login(
//       formData.email,
//       formData.password,
//       formData.userType
//     );

//     if (result.success) {
//       navigate(
//         formData.userType === "freelancer" ? "/pwb/freelancers" : "/pwb/client"
//       );
//     } else {
//       setError(result.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
//       </div>

//       <div className="relative w-full max-w-md">
//         <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
//               Welcome Back
//             </h2>
//             <p className="text-white/80 text-lg">Sign in to your account</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* User Type Selector */}
//             <div className="flex gap-4 p-2 bg-white/5 rounded-2xl border border-white/10">
//               <label
//                 className={`flex-1 text-center py-4 px-6 rounded-xl cursor-pointer transition-all duration-300 ${
//                   formData.userType === "client"
//                     ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
//                     : "text-white/70 hover:text-white hover:bg-white/5"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="userType"
//                   value="client"
//                   checked={formData.userType === "client"}
//                   onChange={handleChange}
//                   className="hidden"
//                 />
//                 <span className="font-semibold">I'm a Client</span>
//               </label>
//               <label
//                 className={`flex-1 text-center py-4 px-6 rounded-xl cursor-pointer transition-all duration-300 ${
//                   formData.userType === "freelancer"
//                     ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
//                     : "text-white/70 hover:text-white hover:bg-white/5"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="userType"
//                   value="freelancer"
//                   checked={formData.userType === "freelancer"}
//                   onChange={handleChange}
//                   className="hidden"
//                 />
//                 <span className="font-semibold">I'm a Freelancer</span>
//               </label>
//             </div>

//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="text-white/90 font-medium flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label className="text-white/90 font-medium flex items-center gap-2">
//                 <Lock className="w-4 h-4" />
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5" />
//                   ) : (
//                     <Eye className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-center backdrop-blur-sm">
//                 {error}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
//               disabled={loading}
//             >
//               {loading ? (
//                 <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="mt-8 text-center space-y-4">
//             <p className="text-white/70">
//               Don't have an account?{" "}
//               <Link
//                 to="/pwb/register"
//                 className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-200"
//               >
//                 Sign up here
//               </Link>
//             </p>
//             <Link
//               to="/pwb"
//               className="inline-block text-white/60 hover:text-white/80 transition-colors duration-200"
//             >
//               ← Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

///////////////////////////////////
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { Eye, EyeOff } from "lucide-react";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     userType: "client",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const { login } = useAuth();
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

//     const result = await login(
//       formData.email,
//       formData.password,
//       formData.userType
//     );

//     if (result.success) {
//       navigate(
//         formData.userType === "freelancer"
//           ? "/pwb/freelancer/dashboard"
//           : "/pwb/client/dashboard"
//       );
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
//             <h2 className="gradient-text">Welcome Back</h2>
//             <p>Sign in to your account</p>
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

//             <div className="form-group">
//               <label>Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="glass-input"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Password</label>
//               <div className="password-input">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="glass-input"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5" />
//                   ) : (
//                     <Eye className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && <div className="error-message">{error}</div>}

//             <button
//               type="submit"
//               className="btn-primary auth-button"
//               disabled={loading}
//             >
//               {loading ? <div className="spinner"></div> : "Sign In"}
//             </button>
//           </form>

//           <div className="auth-footer">
//             <p>
//               Don't have an account?{" "}
//               <Link to="/pwb/register" className="auth-link">
//                 Sign up here
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

// export default Login;
