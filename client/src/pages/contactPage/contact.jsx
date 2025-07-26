import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  User,
  MessageCircle,
  Send,
  // CheckCircle,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    feedback: "",
  });
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.role) newErrors.role = "Please select your role";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.feedback) newErrors.feedback = "Feedback is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulating axios.post request
      const response = await fetch(
        "https://projects-work-board.vercel.app/notify/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      response.status === 200
        ? alert("Submitted Successfully!")
        : alert("Try again later!");

      if (response.status === 200) {
        setFormData({
          role: "",
          name: "",
          email: "",
          phone: "",
          feedback: "",
        });
      }
    } catch (err) {
      console.log(err);
      alert("Try again later!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div
        className={`relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-6 py-20">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-100 to-blue-200 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions or feedback? We would love to hear from you! Please
              fill out the form below and we will get back to you as soon as
              possible.
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <div className="space-y-8">
                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="flex items-center text-white font-semibold text-lg">
                    <User className="w-5 h-5 mr-2 text-white-400" />I am a:
                  </label>
                  <div className="relative">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-blue-900 text-white">
                        Select...
                      </option>
                      <option
                        value="freelancer"
                        className="bg-blue-900 text-white"
                      >
                        Freelancer
                      </option>
                      <option value="client" className="bg-blue-900 text-white">
                        Client
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.role && (
                    <p className="text-red-400 text-sm">{errors.role}</p>
                  )}
                </div>

                {/* Name Input */}
                <div className="space-y-3">
                  <label className="flex items-center text-white font-semibold text-lg">
                    <User className="w-5 h-5 mr-2 text-white-400" />
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Email Input */}
                <div className="space-y-3">
                  <label className="flex items-center text-white font-semibold text-lg">
                    <Mail className="w-5 h-5 mr-2 text-white-400" />
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Phone Input */}
                <div className="space-y-3">
                  <label className="flex items-center text-white font-semibold text-lg">
                    <Phone className="w-5 h-5 mr-2 text-white-400" />
                    Phone:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm">{errors.phone}</p>
                  )}
                </div>

                {/* Feedback Textarea */}
                <div className="space-y-3">
                  <label className="flex items-center text-white font-semibold text-lg">
                    <MessageCircle className="w-5 h-5 mr-2 text-white-400" />
                    Feedback:
                  </label>
                  <textarea
                    name="feedback"
                    placeholder="Your feedback here..."
                    rows="6"
                    value={formData.feedback}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                  {errors.feedback && (
                    <p className="text-red-400 text-sm">{errors.feedback}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={onFormSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg py-4 px-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Info Cards */}
            {/* <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
                <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                <p className="text-gray-300">support@projectsworkboard.com</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
                <Phone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
                <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Response Time
                </h3>
                <p className="text-gray-300">Within 24 hours</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;

/////////////////////////////////////
// import { useForm } from "react-hook-form";
// import "./contact.css";
// import axios from "axios";

// function Contact() {
//   const { register, handleSubmit } = useForm();

//   const onFormSubmit = async (data) => {
//     try {
//       const val = await axios.post("https://projects-work-board.vercel.app/notify/email", data);

//       val.status === 200
//         ? alert("Submitted Successfully!")
//         : alert("Try again later!");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="contactPageContainer">
//       <div className="extra-outer">
//         <div className="contact-page-wrapper">
//           <div className="contact-content">
//             <h1>Contact Us</h1>
//             <p>
//               Have questions or feedback? We would love to hear from you! Please
//               fill out the form below and we will get back to you as soon as
//               possible.
//             </p>
//             <form
//               className="contact-form"
//               onSubmit={handleSubmit(onFormSubmit)}
//             >
//               <label htmlFor="role">I am a:</label>
//               <select id="role" {...register("role", { required: true })}>
//                 <option value="">Select...</option>
//                 <option value="freelancer">Freelancer</option>
//                 <option value="client">Client</option>
//               </select>

//               <label htmlFor="name">Name:</label>
//               <input
//                 type="text"
//                 id="name"
//                 placeholder="Your Name"
//                 {...register("name", { required: true })}
//               />

//               <label htmlFor="email">Email:</label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Your Email"
//                 {...register("email", { required: true })}
//               />

//               <label htmlFor="phone">Phone:</label>
//               <input
//                 type="tel"
//                 id="phone"
//                 placeholder="Your Phone Number"
//                 {...register("phone", { required: true })}
//               />

//               <label htmlFor="feedback">Feedback:</label>
//               <textarea
//                 id="feedback"
//                 placeholder="Your feedback here..."
//                 rows="5"
//                 {...register("feedback", { required: true })}
//               ></textarea>

//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact;
