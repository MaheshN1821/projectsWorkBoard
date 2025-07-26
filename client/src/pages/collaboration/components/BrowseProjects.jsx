import { useState, useEffect } from "react";
import {
  Search,
  Clock,
  Users,
  Filter,
  MapPin,
  Calendar,
  ArrowRight,
  Star,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "../../../hooks/useProjects";
import Navbar from "./Navbar";

export default function BrowseProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "all",
    "AI/ML",
    "Web Development",
    "Mobile App",
    "IoT",
    "Game Development",
    "Data Science",
    "Blockchain",
  ];

  // Build filters for API call
  const filters = {
    page: currentPage,
    limit: 12,
    search: searchTerm || undefined,
    category: selectedCategory !== "all" ? selectedCategory : undefined,
    status: "active",
  };

  const { projects, loading, error, pagination, refetch } =
    useProjects(filters);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      refetch({ ...filters, page: 1 });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch({ ...filters, page });
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Projects
          </h2>
          <p className="text-zinc-600 mb-4">{error}</p>
          <button
            onClick={() => refetch()}
            className="px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:pt-20 pt-16">
          {/* Header */}
          <div className="text-center mb-10 md:mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black bg-gradient-to-r from-black via-zinc-800 to-zinc-600 bg-clip-text text-transparent mb-4 mt-24 tracking-tight">
              Browse Projects
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Find exciting projects to collaborate on and contribute your
              skills
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff] opacity-80" />
              <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-inner p-6 sm:p-8">
                {/* Search Bar */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
                  <div className="relative flex items-center">
                    <Search className="absolute left-6 h-5 w-5 text-zinc-500 z-10" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="w-full pl-14 pr-6 py-4 bg-transparent text-zinc-800 placeholder-zinc-500 font-medium text-base sm:text-lg focus:outline-none relative z-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filter Categories */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-zinc-800 to-black shadow-lg">
                      <Filter className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-800">
                      Categories
                    </h3>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`
                        relative min-w-fit px-6 py-3 rounded-2xl font-semibold text-sm sm:text-base
                        transition-all duration-300 whitespace-nowrap
                        ${
                          selectedCategory === category
                            ? "text-white shadow-lg transform scale-105"
                            : "text-zinc-700 hover:scale-105"
                        }
                      `}
                      >
                        {selectedCategory === category ? (
                          <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-800 rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]" />
                        ) : (
                          <div className="absolute inset-0 bg-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]" />
                        )}
                        <span className="relative z-10">
                          {category === "all" ? "All" : category}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-xl border border-zinc-200/50 shadow-lg">
              <span className="text-zinc-600 font-medium">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading projects...
                  </div>
                ) : (
                  <>
                    <span className="font-bold text-zinc-800">
                      {pagination?.total || 0}
                    </span>
                    {" projects found"}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="flex items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
                <span className="text-lg font-medium text-zinc-600">
                  Loading projects...
                </span>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && projects.length > 0 && (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project._id} className="group">
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-50 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff] group-hover:shadow-[25px_25px_70px_#d1d5db,-25px_-25px_70px_#ffffff] transition-all duration-500" />
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 sm:p-7 h-full flex flex-col group-hover:bg-white/90 transition-all duration-500">
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute -top-2 -right-2 p-2 rounded-full bg-gradient-to-r from-zinc-800 to-black shadow-lg">
                          <Star className="h-4 w-4 text-white fill-current" />
                        </div>
                      )}

                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/collaborate/project/${project._id}`}
                              className="block text-xl sm:text-2xl font-bold text-zinc-800 hover:text-black transition-colors mb-2 line-clamp-2 group-hover:underline"
                            >
                              {project.title}
                            </Link>
                            <div className="flex items-center text-xs text-zinc-500 gap-2">
                              <span className="font-semibold">
                                {project.author.name}
                              </span>
                              <span>•</span>
                              <span className="font-semibold">
                                {project.author.department}
                              </span>
                            </div>
                          </div>
                          <div className="ml-3 px-3 py-1 bg-gradient-to-r from-zinc-700 to-black text-white rounded-xl text-xs font-bold shadow-lg">
                            {project.category}
                          </div>
                        </div>
                        <p className="text-zinc-600 text-sm sm:text-base line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Skills Section */}
                      <div className="mb-6 space-y-4">
                        <div>
                          <h4 className="text-xs font-bold text-zinc-800 mb-2 uppercase tracking-wide">
                            Skills Needed
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.skillsNeeded.slice(0, 2).map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-gradient-to-r from-zinc-100 to-zinc-50 text-zinc-700 rounded-lg text-xs font-semibold border border-zinc-200/50 shadow-sm"
                              >
                                {skill}
                              </span>
                            ))}
                            {project.skillsNeeded.length > 2 && (
                              <span className="text-zinc-400 text-xs font-semibold self-center">
                                +{project.skillsNeeded.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-zinc-800 mb-2 uppercase tracking-wide">
                            Skills Offered
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.skillsOffered.slice(0, 2).map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-gradient-to-r from-white to-zinc-50 text-zinc-600 rounded-lg text-xs font-semibold border border-zinc-100/50 shadow-sm"
                              >
                                {skill}
                              </span>
                            ))}
                            {project.skillsOffered.length > 2 && (
                              <span className="text-zinc-400 text-xs font-semibold self-center">
                                +{project.skillsOffered.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="flex flex-col items-center p-3 bg-gradient-to-br from-zinc-50 to-white rounded-xl border border-zinc-100/50 shadow-inner">
                          <Users className="h-4 w-4 text-zinc-600 mb-1" />
                          <span className="text-xs font-semibold text-zinc-700 text-center leading-tight">
                            {project.teamSize}
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-gradient-to-br from-zinc-50 to-white rounded-xl border border-zinc-100/50 shadow-inner">
                          <Calendar className="h-4 w-4 text-zinc-600 mb-1" />
                          <span className="text-xs font-semibold text-zinc-700 text-center leading-tight">
                            {project.duration}
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-gradient-to-br from-zinc-50 to-white rounded-xl border border-zinc-100/50 shadow-inner">
                          <MapPin className="h-4 w-4 text-zinc-600 mb-1" />
                          <span className="text-xs font-semibold text-zinc-700 text-center leading-tight">
                            {project.location}
                          </span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-auto space-y-4">
                        <div className="flex items-center justify-between text-xs text-zinc-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="font-semibold">
                              {formatTimeAgo(project.createdAt)}
                            </span>
                          </div>
                          <span className="font-bold text-zinc-700">
                            {project.interestedCount || 0} interested
                          </span>
                        </div>
                        <Link
                          to={`/collaborate/project/${project._id}`}
                          className="group/btn relative w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                          <span>View Details</span>
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results State */}
          {!loading && projects.length === 0 && (
            <div className="text-center py-16">
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-8 sm:p-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Search className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-800 mb-3">
                    No projects found
                  </h3>
                  <p className="text-zinc-600 font-medium">
                    Try adjusting your search criteria or filters.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          {!loading && pagination && pagination.pages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                        page === currentPage
                          ? "bg-gradient-to-r from-black to-zinc-800 text-white shadow-lg"
                          : "bg-white/80 text-zinc-700 hover:bg-zinc-100/80 shadow-md"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

////////////////////////////
// import { useState } from "react";
// import {
//   Search,
//   Clock,
//   Users,
//   Filter,
//   Sparkles,
//   MapPin,
//   Calendar,
//   ArrowRight,
//   Star,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function BrowseProjects() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   const categories = [
//     "all",
//     "AI/ML",
//     "Web Development",
//     "Mobile App",
//     "IoT",
//     "Game Development",
//     "Data Science",
//     "Blockchain",
//   ];

//   const projects = [
//     {
//       id: 1,
//       title: "Smart Campus Navigation System",
//       description:
//         "Building an AI-powered mobile app that helps students navigate campus using AR and real-time data.",
//       author: "Sarah Chen",
//       department: "Computer Science",
//       category: "AI/ML",
//       skillsNeeded: ["Flutter", "Machine Learning", "AR Development"],
//       skillsOffered: ["Python", "Backend Development"],
//       teamSize: "3-4 people",
//       duration: "3 months",
//       postedTime: "2 days ago",
//       applicants: 12,
//       location: "Remote",
//       featured: true,
//     },
//     {
//       id: 2,
//       title: "IoT-Based Smart Garden Monitor",
//       description:
//         "Create an automated garden monitoring system with sensors, mobile app, and machine learning for plant health prediction.",
//       author: "Mike Rodriguez",
//       department: "Electrical Engineering",
//       category: "IoT",
//       skillsNeeded: ["Mobile Development", "Machine Learning", "UI/UX Design"],
//       skillsOffered: ["Arduino", "Sensor Integration", "Hardware Design"],
//       teamSize: "2-3 people",
//       duration: "4 months",
//       postedTime: "1 week ago",
//       applicants: 8,
//       location: "Hybrid",
//       featured: false,
//     },
//     {
//       id: 3,
//       title: "Blockchain-Based Student Credential System",
//       description:
//         "Developing a secure, decentralized system for storing and verifying student academic credentials.",
//       author: "Alex Kumar",
//       department: "Information Technology",
//       category: "Blockchain",
//       skillsNeeded: ["Smart Contract Development", "Frontend Development"],
//       skillsOffered: ["Blockchain Architecture", "Cryptography"],
//       teamSize: "3-5 people",
//       duration: "5 months",
//       postedTime: "3 days ago",
//       applicants: 15,
//       location: "On-campus",
//       featured: true,
//     },
//     {
//       id: 4,
//       title: "Mental Health Support Chatbot",
//       description:
//         "AI-powered chatbot to provide initial mental health support and resources for college students.",
//       author: "Priya Patel",
//       department: "Psychology",
//       category: "AI/ML",
//       skillsNeeded: [
//         "Natural Language Processing",
//         "Web Development",
//         "Database Design",
//       ],
//       skillsOffered: ["Psychology Research", "Content Creation"],
//       teamSize: "4-5 people",
//       duration: "6 months",
//       postedTime: "5 days ago",
//       applicants: 20,
//       location: "Remote",
//       featured: false,
//     },
//     {
//       id: 5,
//       title: "Sustainable Energy Monitoring Dashboard",
//       description:
//         "Web platform to track and analyze renewable energy usage across campus buildings with predictive analytics.",
//       author: "David Kim",
//       department: "Environmental Engineering",
//       category: "Data Science",
//       skillsNeeded: [
//         "Data Visualization",
//         "Machine Learning",
//         "Backend Development",
//       ],
//       skillsOffered: ["Environmental Data Analysis", "Sustainability Metrics"],
//       teamSize: "3-4 people",
//       duration: "4 months",
//       postedTime: "1 day ago",
//       applicants: 6,
//       location: "Hybrid",
//       featured: false,
//     },
//     {
//       id: 6,
//       title: "Virtual Reality Campus Tour",
//       description:
//         "Immersive VR experience for prospective students to explore campus facilities and academic programs.",
//       author: "Emma Wilson",
//       department: "Digital Media",
//       category: "Game Development",
//       skillsNeeded: ["Unity Development", "3D Modeling", "Backend Integration"],
//       skillsOffered: ["VR Design", "3D Animation", "User Experience"],
//       teamSize: "4-6 people",
//       duration: "5 months",
//       postedTime: "4 days ago",
//       applicants: 11,
//       location: "On-campus",
//       featured: true,
//     },
//   ];

//   const filteredProjects = projects.filter((project) => {
//     const matchesSearch =
//       project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       project.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "all" || project.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:pt-20 pt-16">
//         {/* Header */}
//         <div className="text-center mb-16 md:mb-16">
//           {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-zinc-200/50 shadow-lg mb-6">
//             <Sparkles className="h-4 w-4 text-zinc-600" />
//             <span className="text-sm font-semibold text-zinc-700">
//               Discover Amazing Projects
//             </span>
//           </div> */}

//           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black bg-gradient-to-r from-black via-zinc-800 to-zinc-600 bg-clip-text text-transparent mb-8 tracking-tight">
//             Browse Projects
//           </h1>

//           <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto font-medium leading-relaxed">
//             Find exciting projects to collaborate on and contribute your skills
//           </p>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="mb-12">
//           {/* Neumorphic Container */}
//           <div className="relative">
//             {/* Outer shadow for neumorphism */}
//             <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff] opacity-80" />

//             {/* Inner glassmorphic container */}
//             <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-inner p-6 sm:p-8">
//               {/* Search Bar */}
//               <div className="relative mb-8">
//                 <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white rounded-2xl shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]" />
//                 <div className="relative flex items-center">
//                   <Search className="absolute left-6 h-5 w-5 text-zinc-500 z-10" />
//                   <input
//                     type="text"
//                     placeholder="Search projects..."
//                     className="w-full pl-14 pr-6 py-4 bg-transparent text-zinc-800 placeholder-zinc-500 font-medium text-base sm:text-lg focus:outline-none relative z-10"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Filter Categories */}
//               <div>
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 rounded-xl bg-gradient-to-br from-zinc-800 to-black shadow-lg">
//                     <Filter className="h-5 w-5 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-zinc-800">
//                     Categories
//                   </h3>
//                 </div>

//                 {/* Mobile: Scrollable categories */}
//                 <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       onClick={() => setSelectedCategory(category)}
//                       className={`
//                         relative min-w-fit px-6 py-3 rounded-2xl font-semibold text-sm sm:text-base
//                         transition-all duration-300 whitespace-nowrap
//                         ${
//                           selectedCategory === category
//                             ? "text-white shadow-lg transform scale-105"
//                             : "text-zinc-700 hover:scale-105"
//                         }
//                       `}
//                     >
//                       {/* Background for selected */}
//                       {selectedCategory === category ? (
//                         <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-800 rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]" />
//                       ) : (
//                         <div className="absolute inset-0 bg-white rounded-2xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]" />
//                       )}
//                       <span className="relative z-10">
//                         {category === "all" ? "All" : category}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-xl border border-zinc-200/50 shadow-lg">
//             <span className="text-zinc-600 font-medium">
//               <span className="font-bold text-zinc-800">
//                 {filteredProjects.length}
//               </span>
//               {" of "}
//               <span className="font-bold text-zinc-800">{projects.length}</span>
//               {" projects found"}
//             </span>
//           </div>
//         </div>

//         {/* Projects Grid */}
//         <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {filteredProjects.map((project) => (
//             <div key={project.id} className="group">
//               {/* Neumorphic Project Card */}
//               <div className="relative h-full">
//                 {/* Outer neumorphic shadow */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-50 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff] group-hover:shadow-[25px_25px_70px_#d1d5db,-25px_-25px_70px_#ffffff] transition-all duration-500" />

//                 {/* Inner glassmorphic card */}
//                 <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-6 sm:p-7 h-full flex flex-col group-hover:bg-white/90 transition-all duration-500">
//                   {/* Featured Badge */}
//                   {project.featured && (
//                     <div className="absolute -top-2 -right-2 p-2 rounded-full bg-gradient-to-r from-zinc-800 to-black shadow-lg">
//                       <Star className="h-4 w-4 text-white fill-current" />
//                     </div>
//                   )}

//                   {/* Header */}
//                   <div className="mb-4">
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex-1 min-w-0">
//                         <Link
//                           href={`/project/${project.id}`}
//                           className="block text-xl sm:text-2xl font-bold text-zinc-800 hover:text-black transition-colors mb-2 line-clamp-2 group-hover:underline"
//                         >
//                           {project.title}
//                         </Link>
//                         <div className="flex items-center text-xs text-zinc-500 gap-2">
//                           <span className="font-semibold">
//                             {project.author}
//                           </span>
//                           <span>•</span>
//                           <span className="font-semibold">
//                             {project.department}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="ml-3 px-3 py-1 bg-gradient-to-r from-zinc-700 to-black text-white rounded-xl text-xs font-bold shadow-lg">
//                         {project.category}
//                       </div>
//                     </div>

//                     <p className="text-zinc-600 text-sm sm:text-base line-clamp-3 leading-relaxed">
//                       {project.description}
//                     </p>
//                   </div>

//                   {/* Skills Section */}
//                   <div className="mb-6 space-y-4">
//                     <div>
//                       <h4 className="text-xs font-bold text-zinc-800 mb-2 uppercase tracking-wide">
//                         Skills Needed
//                       </h4>
//                       <div className="flex flex-wrap gap-2">
//                         {project.skillsNeeded.slice(0, 2).map((skill) => (
//                           <span
//                             key={skill}
//                             className="px-3 py-1 bg-gradient-to-r from-zinc-100 to-zinc-50 text-zinc-700 rounded-lg text-xs font-semibold border border-zinc-200/50 shadow-sm"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                         {project.skillsNeeded.length > 2 && (
//                           <span className="text-zinc-400 text-xs font-semibold self-center">
//                             +{project.skillsNeeded.length - 2} more
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     <div>
//                       <h4 className="text-xs font-bold text-zinc-800 mb-2 uppercase tracking-wide">
//                         Skills Offered
//                       </h4>
//                       <div className="flex flex-wrap gap-2">
//                         {project.skillsOffered.slice(0, 2).map((skill) => (
//                           <span
//                             key={skill}
//                             className="px-3 py-1 bg-gradient-to-r from-white to-zinc-50 text-zinc-600 rounded-lg text-xs font-semibold border border-zinc-100/50 shadow-sm"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                         {project.skillsOffered.length > 2 && (
//                           <span className="text-zinc-400 text-xs font-semibold self-center">
//                             +{project.skillsOffered.length - 2} more
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Project Info */}
//                   <div className="grid grid-cols-3 gap-2 mb-6">
//                     <div className="flex flex-col items-center p-3 bg-gradient-to-br from-zinc-50 to-white rounded-xl border border-zinc-100/50 shadow-inner">
//                       <Users className="h-4 w-4 text-zinc-600 mb-1" />
//                       <span className="text-xs font-semibold text-zinc-700 text-center leading-tight">
//                         {project.teamSize}
//                       </span>
//                     </div>
//                     <div className="flex flex-col items-center p-3 bg-gradient-to-br from-zinc-50 to-white rounded-xl border border-zinc-100/50 shadow-inner">
//                       <Calendar className="h-4 w-4 text-zinc-600 mb-1" />
//                       <span className="text-xs font-semibold text-zinc-700 text-center leading-tight">
//                         {project.duration}
//                       </span>
//                     </div>
//                     <div className="flex flex-col items-center p-3 bg-gradient-to-br from-zinc-50 to-white rounded-xl border border-zinc-100/50 shadow-inner">
//                       <MapPin className="h-4 w-4 text-zinc-600 mb-1" />
//                       <span className="text-xs font-semibold text-zinc-700 text-center leading-tight">
//                         {project.location}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Footer */}
//                   <div className="mt-auto space-y-4">
//                     <div className="flex items-center justify-between text-xs text-zinc-500">
//                       <div className="flex items-center gap-1">
//                         <Clock className="h-3 w-3" />
//                         <span className="font-semibold">
//                           Posted {project.postedTime}
//                         </span>
//                       </div>
//                       <span className="font-bold text-zinc-700">
//                         {project.applicants} interested
//                       </span>
//                     </div>

//                     <Link
//                       to={`/collaborate/project/${project.id}`}
//                       className="group/btn relative w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//                     >
//                       <span>View Details</span>
//                       <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* No Results State */}
//         {filteredProjects.length === 0 && (
//           <div className="text-center py-16">
//             <div className="relative max-w-md mx-auto">
//               {/* Neumorphic container */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]" />

//               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-inner p-8 sm:p-12">
//                 <div className="w-20 h-20 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
//                   <Search className="h-10 w-10 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-zinc-800 mb-3">
//                   No projects found
//                 </h3>
//                 <p className="text-zinc-600 font-medium">
//                   Try adjusting your search criteria or filters.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* <style jsx>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//         .line-clamp-3 {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style> */}
//     </div>
//   );
// }
