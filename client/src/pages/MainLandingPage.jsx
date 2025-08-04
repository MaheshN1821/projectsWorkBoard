import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Briefcase,
  BookOpen,
  Star,
  Zap,
  Shield,
  Globe,
  ChevronDown,
} from "lucide-react";

export default function MainLandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Client Projects",
      description:
        "Connect with clients and showcase your expertise through professional project management.",
      link: `/pwb`,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description:
        "Find perfect teammates for college projects and academic collaborations.",
      link: `/collaborate`,
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Knowledge Hub",
      description:
        "Access curated resources, tutorials, and insights from industry experts.",
      link: `/coming-soon`,
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "2.5K+", label: "Projects Completed" },
    { number: "500+", label: "Teams Formed" },
    { number: "98%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-zinc-200/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-zinc-800 to-zinc-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <a
                href={"#hero"}
                className="text-xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent"
              >
                CollabCraft
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/pwb"
                className="text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                Projects
              </Link>
              <Link
                to="/collaborate"
                className="text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                Collaborate
              </Link>
              <a
                href="#about"
                className="text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                About
              </a>
              <button className="bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-all duration-300 hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/5 to-zinc-600/5"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-zinc-200 to-zinc-300 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-zinc-300 to-zinc-400 rounded-full opacity-15 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-zinc-400 to-zinc-500 rounded-full opacity-25 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className={`max-w-6xl mt-18 mx-auto px-6 lg:px-8 text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
              Connect
            </span>
            <br />
            <span className="bg-gradient-to-r from-zinc-600 via-zinc-800 to-zinc-600 bg-clip-text text-transparent">
              Collaborate
            </span>
            <br />
            <span className="bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 bg-clip-text text-transparent">
              Create
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform where freelancers meet clients, students find
            teammates, and innovative projects come to life through seamless
            collaboration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-zinc-900 text-white px-8 py-4 rounded-2xl hover:bg-zinc-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center space-x-2">
              <a href="#features" className="text-lg font-semibold">
                Start Your Journey
              </a>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* <button className="group bg-white/80 backdrop-blur-sm text-zinc-900 px-8 py-4 rounded-2xl border border-zinc-200 hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-lg font-semibold">Watch Demo</span>
            </button> */}
          </div>

          {/* Stats */}
          {/* <div className="flex flex-row flex-wrap justify-center gap-8 mt-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/50 hover:bg-white/80 transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl font-bold text-zinc-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-600">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-zinc-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
              Three Worlds, One Platform
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              Whether you're a freelancer, student, or knowledge seeker,
              CollabCraft provides the perfect environment for your success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/80 to-zinc-50/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-300 hover:border-zinc-400 transition-all duration-500"
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-r from-zinc-800 to-zinc-600 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <Link
                    to={feature.link}
                    className="mt-6 text-zinc-800 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section
        id="choose-main"
        className="py-20 bg-gradient-to-r from-zinc-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
              Choose Your Path
            </h2>
            <p className="text-xl text-zinc-600">
              Select your role and dive into a tailored experience designed just
              for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Projects Board */}
            <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-700 rounded-3xl p-8 text-white overflow-hidden transition-all duration-500 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <Briefcase className="w-12 h-12 mb-6 text-zinc-300" />
                <h3 className="text-3xl font-bold mb-4">Projects Board</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">
                  Professional marketplace for freelancers and clients. Showcase
                  your skills, find exciting projects, and build your career.
                </p>
                <div className="flex items-center space-x-2 text-zinc-200 group-hover:translate-x-2 transition-transform duration-300">
                  <Link to={"/pwb"} className="font-semibold">
                    Enter Workspace
                  </Link>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
            </div>

            {/* Student Collaboration */}
            <div className="group relative bg-gradient-to-br from-white to-zinc-50 border-2 border-gray-300 rounded-3xl p-8 overflow-hidden transition-all duration-500 cursor-pointer hover:border-zinc-300">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <Users className="w-12 h-12 mb-6 text-zinc-700" />
                <h3 className="text-3xl font-bold mb-4 text-zinc-900">
                  Student Hub
                </h3>
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  Academic collaboration space for students. Find teammates,
                  share ideas, and excel in your college projects together.
                </p>
                <div className="flex items-center space-x-2 text-zinc-800 group-hover:translate-x-2 transition-transform duration-300">
                  <Link to={"/collaborate"} className="font-semibold">
                    Join Community
                  </Link>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div className="absolute -top-10 -right-10 w-32 h-32 bg-zinc-200/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-zinc-900">
              Why Choose CollabCraft?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-zinc-800 to-zinc-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900">
                Secure & Trusted
              </h3>
              <p className="text-zinc-600">
                End-to-end encryption and verified user profiles ensure your
                safety.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-zinc-800 to-zinc-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900">
                Global Reach
              </h3>
              <p className="text-zinc-600">
                Connect with talent and opportunities from around the world.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-zinc-800 to-zinc-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900">
                Premium Quality
              </h3>
              <p className="text-zinc-600">
                Curated community of professionals and serious collaborators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-zinc-900 to-zinc-700 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join thousands of creators, collaborators, and innovators who are
            building the future together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#choose-main"
              className="bg-white w-[80%] text-zinc-900 px-8 py-4 rounded-2xl font-semibold hover:bg-zinc-100 transition-all duration-300"
            >
              Get Started Free
            </a>
            {/* <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-zinc-900 transition-all duration-300 hover:scale-105">
              Schedule Demo
            </button> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-white to-zinc-300 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-zinc-900" />
              </div>
              <span className="text-xl font-bold">CollabCraft</span>
            </div>

            <div className="text-zinc-400 text-center md:text-right">
              <p>&copy; 2025 CollabCraft. All rights reserved.</p>
              <p className="text-sm">Connecting minds, creating futures.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
