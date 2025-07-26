import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
  Loader2,
  Mail,
  Lock,
  User,
  GraduationCap,
  Building,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    year: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Information Technology",
    "Design",
    "Business",
    "Psychology",
    "Environmental Engineering",
    "Digital Media",
    "Data Science",
    "Other",
  ];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate("/collaborate/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-black bg-gradient-to-r from-black via-zinc-800 to-black bg-clip-text text-transparent mb-4 tracking-tight">
            Join the Community
          </h2>
          <p className="text-lg text-zinc-600 font-medium">
            Create your account and start collaborating on amazing projects
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-600 font-medium text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-zinc-800 mb-3 tracking-wide"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
                  <div className="relative flex items-center">
                    <User className="absolute left-4 h-5 w-5 text-zinc-500 z-10" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-transparent text-zinc-800 placeholder-zinc-500 font-medium focus:outline-none relative z-10"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-zinc-800 mb-3 tracking-wide"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 h-5 w-5 text-zinc-500 z-10" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-transparent text-zinc-800 placeholder-zinc-500 font-medium focus:outline-none relative z-10"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Department and Year */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-bold text-zinc-800 mb-3 tracking-wide"
                  >
                    Department *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
                    <div className="relative flex items-center">
                      <Building className="absolute left-4 h-5 w-5 text-zinc-500 z-10" />
                      <select
                        id="department"
                        name="department"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-transparent text-zinc-800 font-medium focus:outline-none relative z-10"
                        value={formData.department}
                        onChange={handleInputChange}
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="year"
                    className="block text-sm font-bold text-zinc-800 mb-3 tracking-wide"
                  >
                    Academic Year *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
                    <div className="relative flex items-center">
                      <GraduationCap className="absolute left-4 h-5 w-5 text-zinc-500 z-10" />
                      <select
                        id="year"
                        name="year"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-transparent text-zinc-800 font-medium focus:outline-none relative z-10"
                        value={formData.year}
                        onChange={handleInputChange}
                      >
                        <option value="">Select year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-zinc-800 mb-3 tracking-wide"
                  >
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 h-5 w-5 text-zinc-500 z-10" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full pl-12 pr-12 py-4 bg-transparent text-zinc-800 placeholder-zinc-500 font-medium focus:outline-none relative z-10"
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 z-10 text-zinc-500 hover:text-zinc-700 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-bold text-zinc-800 mb-3 tracking-wide"
                  >
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 h-5 w-5 text-zinc-500 z-10" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="w-full pl-12 pr-12 py-4 bg-transparent text-zinc-800 placeholder-zinc-500 font-medium focus:outline-none relative z-10"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 z-10 text-zinc-500 hover:text-zinc-700 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-bold text-zinc-800 mb-3 tracking-wide"
                >
                  Bio (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className="relative w-full px-4 py-4 bg-transparent text-zinc-800 placeholder-zinc-500 font-medium focus:outline-none resize-none"
                    placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-6 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-zinc-600 font-medium">
                Already have an account?{" "}
                <Link
                  to="/collaborate/login"
                  className="font-bold text-zinc-800 hover:text-black transition-colors"
                >
                  Sign in here
                </Link>
              </p>
              <p className="text-zinc-600 font-medium mt-2">
                Back to Home?{" "}
                <Link
                  to="/collaborate/"
                  className="font-bold text-zinc-800 hover:text-black transition-colors"
                >
                  Click here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
