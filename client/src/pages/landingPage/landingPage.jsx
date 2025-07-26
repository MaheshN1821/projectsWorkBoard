import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./landingPage.css";
import {
  TrendingUp,
  Code,
  Smartphone,
  Palette,
  Database,
  FileText,
} from "lucide-react";
import { ArrowRight, Edit3, Users, CheckCircle, Zap } from "lucide-react";
import { useState, useEffect } from "react";

function LandingPage() {
  const Navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animateSpotlight, setAnimateSpotlight] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Create a spotlight effect every 10 seconds if no card is being hovered
    const interval = setInterval(() => {
      if (hoveredCard === null) {
        setAnimateSpotlight(true);
        setTimeout(() => setAnimateSpotlight(false), 2000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [hoveredCard]);

  const steps = [
    {
      icon: <Edit3 size={28} />,
      title: "Post Your Project",
      description:
        "Describe your project in detail, set your budget, and specify the skills and expertise you're looking for.",
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      icon: <Users size={28} />,
      title: "Get Expert Proposals",
      description:
        "Review proposals from talented freelancers who are interested in your project and find the perfect match.",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: <CheckCircle size={28} />,
      title: "Complete Project",
      description:
        "Work together smoothly with built-in tools for communication, milestone tracking, and secure payments.",
      color: "bg-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: <Zap size={28} />,
      title: "Grow Your Business",
      description:
        "Leverage our talent network to scale your operations, launch new features, and accelerate your growth.",
      color: "bg-amber-500",
      bgColor: "bg-amber-50",
    },
  ];

  const categories = [
    {
      name: "Web Development",
      icon: <Code />,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      description: "Responsive websites, web apps & APIs",
      projects: 78,
    },
    {
      name: "Mobile Apps",
      icon: <Smartphone />,
      color: "bg-gradient-to-br from-emerald-500 to-green-600",
      description: "iOS & Android applications",
      projects: 64,
    },
    {
      name: "UI/UX Design",
      icon: <Palette />,
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
      description: "Beautiful interfaces & experiences",
      projects: 92,
    },
    {
      name: "Data Science",
      icon: <Database />,
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
      description: "Analytics & machine learning",
      projects: 53,
    },
    {
      name: "Content Writing",
      icon: <FileText />,
      color: "bg-gradient-to-br from-red-500 to-rose-600",
      description: "Compelling copy & content",
      projects: 87,
    },
    {
      name: "Digital Marketing",
      icon: <TrendingUp />,
      color: "bg-gradient-to-br from-indigo-500 to-blue-600",
      description: "Growth strategies & campaigns",
      projects: 71,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Navigation */}
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              to="/pwb"
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center transform rotate-3">
                <span className="text-white font-bold text-sm sm:text-lg">
                  PW
                </span>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-800 to-indigo-700 bg-clip-text text-transparent">
                <span>ProjectsWorkboard</span>
                {/* <span className="sm:hidden">PW</span> */}
              </span>
            </Link>
            {/* Desktop Navigation */}
            {/* hidden lg:flex items-center space-x-6 xl:space-x-8 */}
            <nav className="flex items-center space-x-6 customCreated">
              <Link
                to="/pwb/projects"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Browse Projects
              </Link>
              {/* <Link
                to="/pwb/freelancers"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Find Talent
              </Link> */}
              <a
                href="#works"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                How It Works
              </a>
              <Link
                to="/pwb/about"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/pwb/login"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/pwb/register"
                className="px-4 py-2 xl:px-5 xl:py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign Up
              </Link>
            </nav>
            {/* Mobile Navigation - CTA Buttons */}
            {/* Mobile Menu Button */}
            <button
              className="sm:hidden ml-2 p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu (you'll need state to toggle this) */}
          <div
            className={`lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <nav className="py-4 space-y-2">
              <Link
                to="/pwb/projects"
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 font-medium transition-colors rounded-md"
              >
                Browse Projects
              </Link>
              {/* <Link
                to="/pwb/freelancers"
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 font-medium transition-colors rounded-md"
              >
                Find Talent
              </Link> */}
              <a
                href="#works"
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 font-medium transition-colors rounded-md"
              >
                How It Works
              </a>
              <Link
                to="/pwb/about"
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 font-medium transition-colors rounded-md"
              >
                About Us
              </Link>
              <div className="flex flex-row justify-around px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 font-medium transition-colors rounded-md">
                <Link
                  to="/pwb/login"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors border-purple"
                >
                  Log In
                </Link>
                <Link
                  to="/pwb/register"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-26 pb-16 md:pt-26 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply opacity-50 filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply opacity-50 filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-40 bg-gradient-to-r from-purple-200/30 to-indigo-200/30 rotate-12 skew-y-6 filter blur-3xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-[url('/bg2.png')] bg-right bg-contain bg-no-repeat lg:pr-10 no-bg-custom"
            >
              <div className="mb-6 inline-block px-3 py-1 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-full">
                <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Connect. Create. Succeed.
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Where{" "}
                <span className="relative">
                  Projects
                  <svg
                    className="absolute -bottom-3 left-0 w-full"
                    viewBox="0 0 200 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 13C50 5 100 1 150 9C180 13 199 9 199 9"
                      stroke="url(#paint0_linear)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="1"
                        y1="9"
                        x2="199"
                        y2="9"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#8B5CF6" />
                        <stop offset="1" stopColor="#4F46E5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                Meet{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Talent
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-xl">
                Connect with top freelancers or find exciting projects on
                India's premier digital talent marketplace. Your vision, our
                platform, endless possibilities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium shadow-xl hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Discover Projects
                </Link>
                <Link
                  to="/pwb/register"
                  className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Join as Freelancer
                </Link>
              </div>

              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br ${
                        i % 2 === 0
                          ? "from-purple-400 to-purple-600"
                          : "from-indigo-400 to-indigo-600"
                      } flex items-center justify-center`}
                    >
                      <span className="text-white text-xs font-bold">{i}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-medium">
                    Trusted by{" "}
                    <span className="text-purple-600 font-bold">10,000+</span>{" "}
                    professionals
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative pt-10 w-fit ml-4"
            >
              {/* Card Showcase */}
              <div className="relative">
                {/* Main Card */}
                <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform rotate-1">
                  <div className="p-5 bg-gradient-to-r from-purple-600 to-indigo-600">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-bold text-lg">
                        Featured Project
                      </h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-5">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-purple-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">
                          E-commerce Website Redesign
                        </h4>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500">
                            Posted by
                          </span>
                          <span className="text-sm font-medium text-purple-600 ml-1">
                            TechWave Inc.
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            2 days ago
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">
                      Looking for an experienced web designer to redesign our
                      e-commerce platform with modern UI/UX principles and
                      performance optimization.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
                        React
                      </span>
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                        Node.js
                      </span>
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                        MongoDB
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex">
                        <span className="text-gray-500 font-medium w-24">
                          Budget:
                        </span>
                        <span className="text-gray-800 font-semibold">
                          ₹30,000 - ₹50,000
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 font-medium w-24">
                          Deadline:
                        </span>
                        <span className="text-gray-800 font-semibold">
                          30 days
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 font-medium w-24">
                          Proposals:
                        </span>
                        <span className="text-gray-800 font-semibold">
                          12 received
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/pwb/projects"
                      className="block w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Background Cards */}
                <div className="absolute top-8 -left-8 w-full h-full bg-gradient-to-br from-purple-200 to-indigo-100 rounded-2xl -z-10 transform -rotate-3"></div>
                <div className="absolute -bottom-8 -right-8 w-full h-full bg-gradient-to-br from-indigo-100 to-purple-200 rounded-2xl -z-10 transform rotate-6"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 -right-12 w-24 h-24 bg-yellow-400 bg-opacity-10 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
              </div>

              <div className="absolute -bottom-10 left-10 w-20 h-20 bg-purple-400 bg-opacity-10 rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 font-medium mb-8">
            Trusted by leading companies and startups
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-80">
            {["Adobe", "Microsoft", "Google", "Airbnb", "Spotify"].map(
              (company) => (
                <div key={company} className="text-xl font-bold text-gray-400">
                  {company}
                </div>
              )
            )}
          </div>
        </div>
      </section> */}

      {/* How It Works Section */}
      <section id="works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-full text-2xl font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent inline-block mb-3">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our platform makes it easy to connect projects with the right
              talent in three simple steps
            </p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                ),
                title: "Post a Project",
                description:
                  "Describe your project in detail, set your budget, and specify the skills and expertise you're looking for.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Receive Proposals",
                description:
                  "Review proposals from talented freelancers who are interested in your project and find the perfect match.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Collaborate & Complete",
                description:
                  "Work together smoothly with built-in tools for communication, milestone tracking, and secure payments.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link
                    to="/how-it-works"
                    className="text-purple-600 font-medium flex items-center hover:text-purple-700 transition-colors"
                  >
                    Learn more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div> */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`${
                  step.bgColor
                } bg-opacity-30 p-6 md:p-8 rounded-3xl shadow-lg transition-all duration-500 transform ${
                  hoveredCard === idx
                    ? "scale-105 shadow-xl"
                    : "hover:scale-102"
                } border border-white border-opacity-60 backdrop-blur-sm`}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`shrink-0 w-13 h-13 ${step.color} rounded-2xl flex items-center justify-center text-white`}
                  >
                    {step.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 mb-6 text-lg">
                      {step.description}
                    </p>

                    <div className="pt-4 border-t border-white border-opacity-50">
                      <button
                        onClick={() => Navigate("/pwb/client")}
                        className={`text-${step.color.slice(
                          3
                        )} font-medium flex items-center hover:text-indigo-800 transition-colors group cursor-pointer`}
                      >
                        Learn more
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connecting Lines between cards (visible on large screens) */}
          <div className="hidden xl:block absolute inset-0 pointer-events-none">
            <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 opacity-30">
              <path
                d="M100,100 C150,50 250,50 300,100 C350,150 450,150 500,100 M100,300 C150,250 250,250 300,300 C350,350 450,350 500,300"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8 8"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-full text-2xl font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent inline-block mb-3">
              Browse Categories
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Find Projects By Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore opportunities across various domains and technologies
            </p>
          </div>

          <div className="px-4 py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl ${category.color} opacity-90 shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300" />
                    <div className="relative p-8 h-full flex flex-col">
                      <div className="mb-4 p-3 bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-md">
                        <div
                          className={`text-${
                            category.color.split("from-")[1].split("-")[0]
                          }-600`}
                        >
                          {category.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white text-opacity-90 mb-4">
                        {category.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="bg-white bg-opacity-20 text-black px-3 py-1 rounded-full text-sm">
                          {category.projects}+ projects
                        </span>
                        <div className="bg-white rounded-full p-2 transform transition-transform duration-300 group-hover:-rotate-40">
                          <svg
                            className="w-4 h-4 text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </div>
                      </div>

                      {hoveredIndex === index && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <div
                            onClick={() => Navigate("/pwb/projects")}
                            className="bg-white bg-opacity-0 text-black font-semibold text-opacity-0 group-hover:bg-opacity-10 group-hover:text-opacity-100 transition-all duration-300 px-5 py-2 rounded-full cursor-pointer"
                          >
                            View Projects
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="text-center mt-12">
            <Link
              to="/projects/categories"
              className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
            >
              View all categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div> */}
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent inline-block mb-3">
              Success Stories
            </span>
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Hear from freelancers and clients who have found success on our
              platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rohit Sharma",
                role: "Web Developer",
                image: "/api/placeholder/80/80",
                content:
                  "I've been freelancing for years, but ProjectsWorkboard has been a game-changer. The quality of projects and clients I've found here is unmatched.",
                rating: 5,
              },
              {
                name: "Priya Patel",
                role: "Project Manager",
                image: "/api/placeholder/80/80",
                content:
                  "As a startup founder, finding reliable talent was our biggest challenge. Thanks to this platform, we've built an amazing team of freelancers who deliver quality work.",
                rating: 5,
              },
              {
                name: "Amit Verma",
                role: "UX Designer",
                image: "/api/placeholder/80/80",
                content:
                  "The seamless experience from project posting to completion has made this my go-to platform. The talented pool of professionals here is impressive.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 p-1 rounded-2xl"
              >
                <div className="bg-white p-8 rounded-xl h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link
                      to="/testimonials"
                      className="text-purple-600 font-medium flex items-center hover:text-purple-700 transition-colors"
                    >
                      Read full story
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 relative bg-gradient-to-br from-purple-600 to-indigo-700 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full mix-blend-overlay"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 opacity-20 rounded-full mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-40 bg-indigo-500 opacity-10 rotate-45 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-indigo-100 text-xl mb-10">
              Join thousands of freelancers and businesses turning their ideas
              into reality on India's premier digital talent marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pwb/register"
                className="px-8 py-4 bg-white text-xl text-indigo-700 rounded-xl font-bold shadow-xl hover:shadow-indigo-500/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                Create Account
              </Link>
              <Link
                to="/pwb/projects"
                className="px-8 py-4 bg-transparent text-xl text-white border-2 border-white rounded-xl font-bold shadow-xl hover:shadow-indigo-500/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="h-10 w-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center transform rotate-3">
                  <span className="text-white font-bold text-lg">PW</span>
                </div>
                <span className="text-xl font-bold text-white">
                  ProjectsWorkboard
                </span>
              </Link>
              <p className="text-gray-400 mb-6">
                India's premier digital talent marketplace connecting skilled
                freelancers with exciting projects across various domains.
              </p>
              {/* <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "linkedin"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <svg
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  )
                )}
              </div> */}
            </div>

            <div className="flex flex-row justify-start flex-wrap">
              <div className="mx-6 mb-6">
                <h3 className="text-lg font-bold mb-6">For Clients</h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/pwb/login"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Post a Project
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#works"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      How It Works
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/pwb/login"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Find Freelancers
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="mx-6">
                <h3 className="text-lg font-bold mb-6">For Freelancers</h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/pwb/register"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Find Work
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pwb/register"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Create Profile
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/resources"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/community"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Community
                    </Link>
                  </li> */}
                </ul>
              </div>

              <div className="mx-6">
                <h3 className="text-lg font-bold mb-6">About</h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/pwb/about"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pwb/contact"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ProjectsWorkboard. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/pwb/coming-soon"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/pwb/coming-soon"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              {/* <Link
                to="/security"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Security
              </Link> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
