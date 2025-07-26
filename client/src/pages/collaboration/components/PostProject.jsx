import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Save, Calendar, Loader2 } from "lucide-react";
import projectService from "../../../services/projectService";
import { useAuth } from "../../../hooks/useAuth";
import Navbar from "./Navbar";

export default function PostProject() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    teamSize: "",
    duration: "",
    location: "",
    skillsNeeded: [],
    skillsOffered: [],
    requirements: "",
    goals: "",
    timeline: [{ phase: "", duration: "", description: "" }],
  });

  const categories = [
    "AI/ML",
    "Web Development",
    "Mobile App",
    "IoT",
    "Game Development",
    "Data Science",
    "Blockchain",
    "Other",
  ];

  const locations = ["Remote", "On-campus", "Hybrid", "Flexible"];

  const commonSkills = [
    "React",
    "Python",
    "JavaScript",
    "Machine Learning",
    "Arduino",
    "Node.js",
    "Flutter",
    "Unity",
    "TensorFlow",
    "Figma",
    "Java",
    "C++",
    "Swift",
    "Kotlin",
    "Vue.js",
    "Angular",
    "Django",
    "MongoDB",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimelineChange = (index, field, value) => {
    const newTimeline = [...formData.timeline];
    newTimeline[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      timeline: newTimeline,
    }));
  };

  const addTimelinePhase = () => {
    setFormData((prev) => ({
      ...prev,
      timeline: [
        ...prev.timeline,
        { phase: "", duration: "", description: "" },
      ],
    }));
  };

  const removeTimelinePhase = (index) => {
    if (formData.timeline.length > 1) {
      const newTimeline = formData.timeline.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        timeline: newTimeline,
      }));
    }
  };

  const addSkillNeeded = (skill) => {
    if (skill && !formData.skillsNeeded.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skillsNeeded: [...prev.skillsNeeded, skill],
      }));
    }
  };

  const addSkillOffered = (skill) => {
    if (skill && !formData.skillsOffered.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, skill],
      }));
    }
  };

  const removeSkillNeeded = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.filter((s) => s !== skill),
    }));
  };

  const removeSkillOffered = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.category) {
        throw new Error("Please fill in all required fields");
      }

      if (formData.skillsNeeded.length === 0) {
        throw new Error("Please add at least one skill needed");
      }

      if (formData.skillsOffered.length === 0) {
        throw new Error("Please add at least one skill offered");
      }

      // Filter out empty timeline phases
      const filteredTimeline = formData.timeline.filter(
        (phase) => phase.phase && phase.duration && phase.description
      );

      const projectData = {
        ...formData,
        timeline: filteredTimeline,
      };

      const result = await projectService.createProject(projectData);

      // Navigate to the created project
      navigate(`/collaborate/project/${result.project._id}`);
    } catch (err) {
      const mes =
        err.message +
        ", " +
        "Enter correct details![There is a minimum criteria!]";
      setError(mes);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 font-['Inter',sans-serif]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl mt-32 md:text-6xl font-black bg-gradient-to-r from-black via-zinc-800 to-black bg-clip-text text-transparent mb-6 tracking-tight">
              Post Your Project
            </h1>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto font-light tracking-wide">
              Share your project idea and find the perfect teammates to bring it
              to life
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden">
              <div className="p-8 md:p-12">
                {/* Basic Information */}
                <div className="mb-12">
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-black to-zinc-800 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-white font-black text-lg">1</span>
                    </div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
                      Basic Information
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative">
                      <label
                        htmlFor="title"
                        className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
                      >
                        Project Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
                        placeholder="e.g., Smart Campus Navigation System"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="category"
                        className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
                      >
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-8">
                    <label
                      htmlFor="description"
                      className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
                    >
                      Project Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={5}
                      className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 resize-none font-medium"
                      placeholder="Describe your project idea, what problem it solves, and what you want to build..."
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Team Requirements */}
                <div className="mb-12">
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-700 to-black rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-white font-black text-lg">2</span>
                    </div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
                      Team Requirements
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="relative">
                      <label
                        htmlFor="teamSize"
                        className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
                      >
                        Team Size *
                      </label>
                      <select
                        id="teamSize"
                        name="teamSize"
                        required
                        className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                      >
                        <option value="">Select team size</option>
                        <option value="2-3 people">2-3 people</option>
                        <option value="3-4 people">3-4 people</option>
                        <option value="4-5 people">4-5 people</option>
                        <option value="5+ people">5+ people</option>
                      </select>
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="duration"
                        className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
                      >
                        Project Duration *
                      </label>
                      <select
                        id="duration"
                        name="duration"
                        required
                        className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
                        value={formData.duration}
                        onChange={handleInputChange}
                      >
                        <option value="">Select duration</option>
                        <option value="1-2 months">1-2 months</option>
                        <option value="3-4 months">3-4 months</option>
                        <option value="5-6 months">5-6 months</option>
                        <option value="6+ months">6+ months</option>
                      </select>
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="location"
                        className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
                      >
                        Work Location *
                      </label>
                      <select
                        id="location"
                        name="location"
                        required
                        className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
                        value={formData.location}
                        onChange={handleInputChange}
                      >
                        <option value="">Select location</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-12">
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-white font-black text-lg">3</span>
                    </div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
                      Skills
                    </h2>
                  </div>

                  {/* Skills Needed */}
                  <div className="mb-8">
                    <label className="block text-sm font-black text-zinc-800 mb-3 tracking-wide">
                      Skills Needed *
                    </label>
                    <p className="text-sm text-zinc-600 mb-4 font-medium">
                      What skills are you looking for in teammates?
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {commonSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addSkillNeeded(skill)}
                          className="px-4 py-2 bg-zinc-50/80 backdrop-blur-xl text-zinc-700 rounded-xl font-semibold hover:bg-zinc-100/80 transition-all duration-500 disabled:opacity-50 border border-black tracking-wide"
                          disabled={formData.skillsNeeded.includes(skill)}
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skillsNeeded.map((skill) => (
                        <span
                          key={skill}
                          className="bg-zinc-100/80 backdrop-blur-xl text-zinc-700 px-4 py-2 rounded-xl font-bold flex items-center border border-zinc-300/50 tracking-wide"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkillNeeded(skill)}
                            className="ml-2 hover:text-zinc-900 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills Offered */}
                  <div>
                    <label className="block text-sm font-black text-zinc-800 mb-3 tracking-wide">
                      Skills You Offer *
                    </label>
                    <p className="text-sm text-zinc-600 mb-4 font-medium">
                      What skills do you bring to the project?
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {commonSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addSkillOffered(skill)}
                          className="px-4 py-2 bg-zinc-50/80 backdrop-blur-xl text-zinc-700 rounded-xl font-semibold hover:bg-zinc-100/80 transition-all duration-500 disabled:opacity-50 border border-black tracking-wide"
                          disabled={formData.skillsOffered.includes(skill)}
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skillsOffered.map((skill) => (
                        <span
                          key={skill}
                          className="bg-zinc-50/80 backdrop-blur-xl text-zinc-600 px-4 py-2 rounded-xl font-bold flex items-center border border-black tracking-wide"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkillOffered(skill)}
                            className="ml-2 hover:text-zinc-800 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-12">
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-500 to-zinc-700 rounded-2xl flex items-center justify-center mr-4">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
                      Project Timeline
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {formData.timeline.map((phase, index) => (
                      <div
                        key={index}
                        className="relative bg-zinc-50/80 backdrop-blur-xl rounded-2xl p-6 border border-black"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-black text-zinc-800 tracking-tight">
                            Phase {index + 1}
                          </h4>
                          {formData.timeline.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTimelinePhase(index)}
                              className="p-2 text-zinc-500 hover:text-zinc-700 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2">
                              Phase Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Research & Planning"
                              className="w-full px-4 py-3 bg-white/80 backdrop-blur-xl border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 text-zinc-700 font-medium"
                              value={phase.phase}
                              onChange={(e) =>
                                handleTimelineChange(
                                  index,
                                  "phase",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2">
                              Duration
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Week 1-2"
                              className="w-full px-4 py-3 bg-white/80 backdrop-blur-xl border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 text-zinc-700 font-medium"
                              value={phase.duration}
                              onChange={(e) =>
                                handleTimelineChange(
                                  index,
                                  "duration",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-zinc-700 mb-2">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Describe what will be accomplished in this phase..."
                            className="w-full px-4 py-3 bg-white/80 backdrop-blur-xl border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 text-zinc-700 font-medium resize-none"
                            value={phase.description}
                            onChange={(e) =>
                              handleTimelineChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addTimelinePhase}
                      className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black text-zinc-700 rounded-2xl font-bold hover:bg-zinc-100/80 transition-all duration-500 flex items-center justify-center tracking-wide"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add Timeline Phase
                    </button>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="mb-12">
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-white font-black text-lg">5</span>
                    </div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
                      Additional Details
                    </h2>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <label
                        htmlFor="requirements"
                        className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
                      >
                        Requirements & Expectations
                      </label>
                      <textarea
                        id="requirements"
                        name="requirements"
                        rows={4}
                        className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 resize-none font-medium"
                        placeholder="What are your expectations for teammates? Any specific requirements or commitments?"
                        value={formData.requirements}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="goals"
                        className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
                      >
                        Project Goals & Outcomes
                      </label>
                      <textarea
                        id="goals"
                        name="goals"
                        rows={4}
                        className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 resize-none font-medium"
                        placeholder="What do you hope to achieve? What will success look like?"
                        value={formData.goals}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-6">
                  <button
                    type="button"
                    onClick={() => navigate("/collaborate/browse")}
                    className="px-8 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black text-zinc-700 rounded-2xl font-bold hover:bg-zinc-100/80 transition-all duration-500 tracking-wide"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative px-8 py-4 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500 transform hover:scale-105 flex items-center tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative flex items-center">
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating Project...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Post Project
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus, X, Save, Lightbulb, Calendar } from "lucide-react";

// export default function PostProject() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     teamSize: "",
//     duration: "",
//     location: "",
//     skillsNeeded: [],
//     skillsOffered: [],
//     requirements: "",
//     goals: "",
//     timeline: [{ phase: "", duration: "", description: "" }],
//   });

//   const [newSkillNeeded, setNewSkillNeeded] = useState("");
//   const [newSkillOffered, setNewSkillOffered] = useState("");

//   const categories = [
//     "AI/ML",
//     "Web Development",
//     "Mobile App",
//     "IoT",
//     "Game Development",
//     "Data Science",
//     "Blockchain",
//     "Other",
//   ];

//   const locations = ["Remote", "On-campus", "Hybrid", "Flexible"];

//   const commonSkills = [
//     "React",
//     "Python",
//     "JavaScript",
//     "Machine Learning",
//     "Arduino",
//     "Node.js",
//     "Flutter",
//     "Unity",
//     "TensorFlow",
//     "Figma",
//     "Java",
//     "C++",
//     "Swift",
//     "Kotlin",
//     "Vue.js",
//     "Angular",
//     "Django",
//     "MongoDB",
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleTimelineChange = (index, field, value) => {
//     const newTimeline = [...formData.timeline];
//     newTimeline[index][field] = value;
//     setFormData((prev) => ({
//       ...prev,
//       timeline: newTimeline,
//     }));
//   };

//   const addTimelinePhase = () => {
//     setFormData((prev) => ({
//       ...prev,
//       timeline: [
//         ...prev.timeline,
//         { phase: "", duration: "", description: "" },
//       ],
//     }));
//   };

//   const removeTimelinePhase = (index) => {
//     if (formData.timeline.length > 1) {
//       const newTimeline = formData.timeline.filter((_, i) => i !== index);
//       setFormData((prev) => ({
//         ...prev,
//         timeline: newTimeline,
//       }));
//     }
//   };

//   const addSkillNeeded = (skill) => {
//     if (skill && !formData.skillsNeeded.includes(skill)) {
//       setFormData((prev) => ({
//         ...prev,
//         skillsNeeded: [...prev.skillsNeeded, skill],
//       }));
//     }
//     setNewSkillNeeded("");
//   };

//   const addSkillOffered = (skill) => {
//     if (skill && !formData.skillsOffered.includes(skill)) {
//       setFormData((prev) => ({
//         ...prev,
//         skillsOffered: [...prev.skillsOffered, skill],
//       }));
//     }
//     setNewSkillOffered("");
//   };

//   const removeSkillNeeded = (skill) => {
//     setFormData((prev) => ({
//       ...prev,
//       skillsNeeded: prev.skillsNeeded.filter((s) => s !== skill),
//     }));
//   };

//   const removeSkillOffered = (skill) => {
//     setFormData((prev) => ({
//       ...prev,
//       skillsOffered: prev.skillsOffered.filter((s) => s !== skill),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Project submitted:", formData);
//     navigate("/collaborate/browse");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 font-['Inter',sans-serif]">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           {/* <div className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-xl rounded-full border border-black mb-8">
//             <Lightbulb className="h-6 w-6 text-zinc-700 mr-3" />
//             <span className="text-zinc-700 font-semibold tracking-wide text-lg">
//               Share Your Vision
//             </span>
//           </div> */}
//           <h1 className="text-5xl mt-18 md:text-6xl font-black bg-gradient-to-r from-black via-zinc-800 to-black bg-clip-text text-transparent mb-6 tracking-tight">
//             Post Your Project
//           </h1>
//           <p className="text-xl text-zinc-600 max-w-3xl mx-auto font-light tracking-wide">
//             Share your project idea and find the perfect teammates to bring it
//             to life
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="relative">
//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden">
//             <div className="p-8 md:p-12">
//               {/* Basic Information */}
//               <div className="mb-12">
//                 <div className="flex items-center mb-8">
//                   <div className="w-10 h-10 bg-gradient-to-br from-black to-zinc-800 rounded-2xl flex items-center justify-center mr-4">
//                     <span className="text-white font-black text-lg">1</span>
//                   </div>
//                   <h2 className="text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
//                     Basic Information
//                   </h2>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-8">
//                   <div className="relative">
//                     <label
//                       htmlFor="title"
//                       className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
//                     >
//                       Project Title *
//                     </label>
//                     <input
//                       type="text"
//                       id="title"
//                       name="title"
//                       required
//                       className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
//                       placeholder="e.g., Smart Campus Navigation System"
//                       value={formData.title}
//                       onChange={handleInputChange}
//                     />
//                   </div>

//                   <div className="relative">
//                     <label
//                       htmlFor="category"
//                       className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
//                     >
//                       Category *
//                     </label>
//                     <select
//                       id="category"
//                       name="category"
//                       required
//                       className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                     >
//                       <option value="">Select a category</option>
//                       {categories.map((category) => (
//                         <option key={category} value={category}>
//                           {category}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="mt-8">
//                   <label
//                     htmlFor="description"
//                     className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
//                   >
//                     Project Description *
//                   </label>
//                   <textarea
//                     id="description"
//                     name="description"
//                     required
//                     rows={5}
//                     className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 resize-none font-medium"
//                     placeholder="Describe your project idea, what problem it solves, and what you want to build..."
//                     value={formData.description}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>

//               {/* Team Requirements */}
//               <div className="mb-12">
//                 <div className="flex items-center mb-8">
//                   <div className="w-10 h-10 bg-gradient-to-br from-zinc-700 to-black rounded-2xl flex items-center justify-center mr-4">
//                     <span className="text-white font-black text-lg">2</span>
//                   </div>
//                   <h2 className="text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
//                     Team Requirements
//                   </h2>
//                 </div>

//                 <div className="grid md:grid-cols-3 gap-8">
//                   <div className="relative">
//                     <label
//                       htmlFor="teamSize"
//                       className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
//                     >
//                       Team Size *
//                     </label>
//                     <select
//                       id="teamSize"
//                       name="teamSize"
//                       required
//                       className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
//                       value={formData.teamSize}
//                       onChange={handleInputChange}
//                     >
//                       <option value="">Select team size</option>
//                       <option value="2-3 people">2-3 people</option>
//                       <option value="3-4 people">3-4 people</option>
//                       <option value="4-5 people">4-5 people</option>
//                       <option value="5+ people">5+ people</option>
//                     </select>
//                   </div>

//                   <div className="relative">
//                     <label
//                       htmlFor="duration"
//                       className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
//                     >
//                       Project Duration *
//                     </label>
//                     <select
//                       id="duration"
//                       name="duration"
//                       required
//                       className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
//                       value={formData.duration}
//                       onChange={handleInputChange}
//                     >
//                       <option value="">Select duration</option>
//                       <option value="1-2 months">1-2 months</option>
//                       <option value="3-4 months">3-4 months</option>
//                       <option value="5-6 months">5-6 months</option>
//                       <option value="6+ months">6+ months</option>
//                     </select>
//                   </div>

//                   <div className="relative">
//                     <label
//                       htmlFor="location"
//                       className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
//                     >
//                       Work Location *
//                     </label>
//                     <select
//                       id="location"
//                       name="location"
//                       required
//                       className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
//                       value={formData.location}
//                       onChange={handleInputChange}
//                     >
//                       <option value="">Select location</option>
//                       {locations.map((location) => (
//                         <option key={location} value={location}>
//                           {location}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Skills */}
//               <div className="mb-12">
//                 <div className="flex items-center mb-8">
//                   <div className="w-10 h-10 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-2xl flex items-center justify-center mr-4">
//                     <span className="text-white font-black text-lg">3</span>
//                   </div>
//                   <h2 className="text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
//                     Skills
//                   </h2>
//                 </div>

//                 {/* Skills Needed */}
//                 <div className="mb-8">
//                   <label className="block text-sm font-black text-zinc-800 mb-3 tracking-wide">
//                     Skills Needed *
//                   </label>
//                   <p className="text-sm text-zinc-600 mb-4 font-medium">
//                     What skills are you looking for in teammates?
//                   </p>

//                   <div className="flex flex-wrap gap-3 mb-4">
//                     {commonSkills.map((skill) => (
//                       <button
//                         key={skill}
//                         type="button"
//                         onClick={() => addSkillNeeded(skill)}
//                         className="px-4 py-2 bg-zinc-50/80 backdrop-blur-xl text-zinc-700 rounded-xl font-semibold hover:bg-zinc-100/80 transition-all duration-500 disabled:opacity-50 border border-black tracking-wide"
//                         disabled={formData.skillsNeeded.includes(skill)}
//                       >
//                         + {skill}
//                       </button>
//                     ))}
//                   </div>

//                   {/* <div className="flex gap-3 mb-4">
//                     <input
//                       type="text"
//                       placeholder="Add custom skill..."
//                       className="flex-1 px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
//                       value={newSkillNeeded}
//                       onChange={(e) => setNewSkillNeeded(e.target.value)}
//                       onKeyPress={(e) =>
//                         e.key === "Enter" &&
//                         (e.preventDefault(), addSkillNeeded(newSkillNeeded))
//                       }
//                     />
//                     <button
//                       type="button"
//                       onClick={() => addSkillNeeded(newSkillNeeded)}
//                       className="px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl hover:from-zinc-800 hover:to-black transition-all duration-500 transform hover:scale-105 font-bold"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </button>
//                   </div> */}

//                   <div className="flex flex-wrap gap-2">
//                     {formData.skillsNeeded.map((skill) => (
//                       <span
//                         key={skill}
//                         className="bg-zinc-100/80 backdrop-blur-xl text-zinc-700 px-4 py-2 rounded-xl font-bold flex items-center border border-zinc-300/50 tracking-wide"
//                       >
//                         {skill}
//                         <button
//                           type="button"
//                           onClick={() => removeSkillNeeded(skill)}
//                           className="ml-2 hover:text-zinc-900 transition-colors"
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Skills Offered */}
//                 <div>
//                   <label className="block text-sm font-black text-zinc-800 mb-3 tracking-wide">
//                     Skills You Offer *
//                   </label>
//                   <p className="text-sm text-zinc-600 mb-4 font-medium">
//                     What skills do you bring to the project?
//                   </p>

//                   <div className="flex flex-wrap gap-3 mb-4">
//                     {commonSkills.map((skill) => (
//                       <button
//                         key={skill}
//                         type="button"
//                         onClick={() => addSkillOffered(skill)}
//                         className="px-4 py-2 bg-zinc-50/80 backdrop-blur-xl text-zinc-700 rounded-xl font-semibold hover:bg-zinc-100/80 transition-all duration-500 disabled:opacity-50 border border-black tracking-wide"
//                         disabled={formData.skillsOffered.includes(skill)}
//                       >
//                         + {skill}
//                       </button>
//                     ))}
//                   </div>

//                   {/* <div className="flex gap-3 mb-4">
//                     <input
//                       type="text"
//                       placeholder="Add custom skill..."
//                       className="flex-1 px-4 py-3 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 font-medium"
//                       value={newSkillOffered}
//                       onChange={(e) => setNewSkillOffered(e.target.value)}
//                       onKeyPress={(e) =>
//                         e.key === "Enter" &&
//                         (e.preventDefault(), addSkillOffered(newSkillOffered))
//                       }
//                     />
//                     <button
//                       type="button"
//                       onClick={() => addSkillOffered(newSkillOffered)}
//                       className="px-6 py-3 bg-gradient-to-r from-zinc-700 to-black text-white rounded-xl hover:from-black hover:to-zinc-800 transition-all duration-500 transform hover:scale-105 font-bold"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </button>
//                   </div> */}

//                   <div className="flex flex-wrap gap-2">
//                     {formData.skillsOffered.map((skill) => (
//                       <span
//                         key={skill}
//                         className="bg-zinc-50/80 backdrop-blur-xl text-zinc-600 px-4 py-2 rounded-xl font-bold flex items-center border border-black tracking-wide"
//                       >
//                         {skill}
//                         <button
//                           type="button"
//                           onClick={() => removeSkillOffered(skill)}
//                           className="ml-2 hover:text-zinc-800 transition-colors"
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Timeline */}
//               <div className="mb-12">
//                 <div className="flex items-center mb-8">
//                   <div className="w-10 h-10 bg-gradient-to-br from-zinc-500 to-zinc-700 rounded-2xl flex items-center justify-center mr-4">
//                     <Calendar className="h-5 w-5 text-white" />
//                   </div>
//                   <h2 className="text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
//                     Project Timeline
//                   </h2>
//                 </div>

//                 <div className="space-y-6">
//                   {formData.timeline.map((phase, index) => (
//                     <div
//                       key={index}
//                       className="relative bg-zinc-50/80 backdrop-blur-xl rounded-2xl p-6 border border-black"
//                     >
//                       <div className="flex items-center justify-between mb-4">
//                         <h4 className="text-lg font-black text-zinc-800 tracking-tight">
//                           Phase {index + 1}
//                         </h4>
//                         {formData.timeline.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeTimelinePhase(index)}
//                             className="p-2 text-zinc-500 hover:text-zinc-700 transition-colors"
//                           >
//                             <X className="h-4 w-4" />
//                           </button>
//                         )}
//                       </div>

//                       <div className="grid md:grid-cols-2 gap-4 mb-4">
//                         <div>
//                           <label className="block text-sm font-bold text-zinc-700 mb-2">
//                             Phase Name
//                           </label>
//                           <input
//                             type="text"
//                             placeholder="e.g., Research & Planning"
//                             className="w-full px-4 py-3 bg-white/80 backdrop-blur-xl border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 text-zinc-700 font-medium"
//                             value={phase.phase}
//                             onChange={(e) =>
//                               handleTimelineChange(
//                                 index,
//                                 "phase",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-bold text-zinc-700 mb-2">
//                             Duration
//                           </label>
//                           <input
//                             type="text"
//                             placeholder="e.g., Week 1-2"
//                             className="w-full px-4 py-3 bg-white/80 backdrop-blur-xl border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 text-zinc-700 font-medium"
//                             value={phase.duration}
//                             onChange={(e) =>
//                               handleTimelineChange(
//                                 index,
//                                 "duration",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-bold text-zinc-700 mb-2">
//                           Description
//                         </label>
//                         <textarea
//                           rows={3}
//                           placeholder="Describe what will be accomplished in this phase..."
//                           className="w-full px-4 py-3 bg-white/80 backdrop-blur-xl border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 text-zinc-700 font-medium resize-none"
//                           value={phase.description}
//                           onChange={(e) =>
//                             handleTimelineChange(
//                               index,
//                               "description",
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                     </div>
//                   ))}

//                   <button
//                     type="button"
//                     onClick={addTimelinePhase}
//                     className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black text-zinc-700 rounded-2xl font-bold hover:bg-zinc-100/80 transition-all duration-500 flex items-center justify-center tracking-wide"
//                   >
//                     <Plus className="h-5 w-5 mr-2" />
//                     Add Timeline Phase
//                   </button>
//                 </div>
//               </div>

//               {/* Additional Details */}
//               <div className="mb-12">
//                 <div className="flex items-center mb-8">
//                   <div className="w-10 h-10 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-2xl flex items-center justify-center mr-4">
//                     <span className="text-white font-black text-lg">5</span>
//                   </div>
//                   <h2 className="text-3xl font-black bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
//                     Additional Details
//                   </h2>
//                 </div>

//                 <div className="space-y-8">
//                   <div>
//                     <label
//                       htmlFor="requirements"
//                       className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
//                     >
//                       Requirements & Expectations
//                     </label>
//                     <textarea
//                       id="requirements"
//                       name="requirements"
//                       rows={4}
//                       className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 resize-none font-medium"
//                       placeholder="What are your expectations for teammates? Any specific requirements or commitments?"
//                       value={formData.requirements}
//                       onChange={handleInputChange}
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="goals"
//                       className="block text-sm font-black text-zinc-800 mb-3 tracking-wide"
//                     >
//                       Project Goals & Outcomes
//                     </label>
//                     <textarea
//                       id="goals"
//                       name="goals"
//                       rows={4}
//                       className="w-full px-6 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-400/50 focus:bg-white/80 transition-all duration-500 text-zinc-700 resize-none font-medium"
//                       placeholder="What do you hope to achieve? What will success look like?"
//                       value={formData.goals}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end space-x-6">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/browse")}
//                   className="px-8 py-4 bg-zinc-50/80 backdrop-blur-xl border border-black text-zinc-700 rounded-2xl font-bold hover:bg-zinc-100/80 transition-all duration-500 tracking-wide"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="group relative px-8 py-4 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500 transform hover:scale-105 flex items-center tracking-wide"
//                 >
//                   <span className="relative flex items-center">
//                     <Save className="h-4 w-4 mr-2" />
//                     Post Project
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
