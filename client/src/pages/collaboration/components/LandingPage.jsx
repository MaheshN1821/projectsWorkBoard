import { Link } from "react-router-dom";
import {
  Users,
  Lightbulb,
  Target,
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import bgimg from "../../../assets/images/col.png";

export default function LandingPage() {
  const features = [
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: "Share Your Ideas",
      description:
        "Post your project ideas and find students with complementary skills to bring them to life.",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Find Teammates",
      description:
        "Connect with students from different departments who have the skills you need for your project.",
    },
    {
      icon: <Target className="h-10 w-10" />,
      title: "Skill Matching",
      description:
        "Our platform matches you with students based on required skills and project interests.",
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Fast Collaboration",
      description:
        "Start collaborating quickly and efficiently with built-in communication tools. Make it happen!",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Create Your Profile",
      description:
        "Sign up and showcase your skills, interests, and academic background.",
    },
    {
      step: "02",
      title: "Post or Browse Projects",
      description:
        "Share your project idea or browse existing projects looking for teammates.",
    },
    {
      step: "03",
      title: "Connect & Collaborate",
      description:
        "Match with compatible teammates and start building amazing projects together.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      department: "Computer Science",
      text: "I found the perfect teammate for my AI project! As a CS student, I needed someone with hardware skills for IoT integration.",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Mike Rodriguez",
      department: "Electrical Engineering",
      text: "This platform helped me join a machine learning project. Great way to learn new skills while contributing my expertise.",
      rating: 5,
      avatar: "MR",
    },
    {
      name: "Priya Patel",
      department: "Design",
      text: "Found an amazing team for our mobile app project. The skill matching feature is incredibly accurate!",
      rating: 5,
      avatar: "PP",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-xl shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link
                to="/collaborate"
                className="text-2xl font-black bg-gradient-to-r from-black to-zinc-800 bg-clip-text text-transparent"
              >
                CollabU
              </Link>
              <div className="flex items-center space-x-3">
                <Link
                  to="/collaborate/login"
                  className="px-4 py-2 text-black hover:text-black font-semibold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/collaborate/register"
                  className="px-4 py-2 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl font-bold hover:from-zinc-800 hover:to-black transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="absolute inset-0">
          <img
            src={bgimg}
            alt="Students collaborating"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-[32rem] h-[32rem] bg-zinc-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-white/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-black mt-24 leading-none tracking-tighter">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-white bg-clip-text text-transparent">
              Find Your Perfect
            </span>
            <br />
            <span className="bg-gradient-to-r from-zinc-400 via-white to-zinc-400 bg-clip-text text-transparent">
              Project Teammates
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-4xl mx-auto mt-4">
            Connect with students across departments to collaborate on projects
            you can't build alone. Turn your ideas into reality with the right
            team.
          </p>

          <div className="flex items-center justify-center">
            <div className="flex flex-col sm:flex-row gap-6 w-80 justify-center">
              <Link
                to="/collaborate/browse"
                className="group relative px-8 py-4 bg-gradient-to-r from-white to-zinc-200 rounded-3xl font-bold -mb-4 text-xl text-black hover:from-zinc-100 hover:to-white transition-all duration-500 transform hover:scale-105"
              >
                <span className="relative flex items-center justify-center tracking-wide">
                  Browse Projects
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Link>

              <Link
                to="/collaborate/post"
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl font-bold text-xl text-white hover:bg-white/15 transition-all duration-500 mb-10"
              >
                <span className="relative tracking-wide">Post Your Idea</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      {/* <section className="relative py-24 bg-gradient-to-b from-zinc-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-black via-zinc-800 to-black bg-clip-text text-transparent mb-8 tracking-tight">
              The Challenge Every Student Faces
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-black via-zinc-600 to-black mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                title: "Limited Network",
                description:
                  "You have a great project idea but don't know students with the right skills to help you build it.",
                icon: "🤝",
              },
              {
                title: "Skill Gaps",
                description:
                  "Your CS background is perfect for coding, but you need IoT, AI, or design expertise for your vision.",
                icon: "🧩",
              },
              {
                title: "Time Constraints",
                description:
                  "Complex projects are too time-consuming to tackle alone, but collaboration can make them achievable.",
                icon: "⏰",
              },
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-white/50 hover:bg-white/90 transition-all duration-700 transform group-hover:-translate-y-3">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-black mb-6 bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="relative py-16 px-4 sm:py-20 sm:px-6 border-b border-black bg-gradient from-zinc-500 to-zinc">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-black to-zinc-600 bg-clip-text text-transparent mb-8 tracking-tight">
              The Challenge Every Student Faces
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-black to-zinc-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                title: "Limited Network",
                description:
                  "You have a great project idea but do not know the students with the right skills to help you build it.",
              },
              {
                title: "Skill Gaps",
                description:
                  "Your CS background is perfect for coding, but you need IoT, AI, or design expertise for your vision.",
              },
              {
                title: "Time Constraints",
                description:
                  "Complex projects are too time-consuming to tackle alone, but collaboration can make them achievable.",
              },
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-black text-center hover:bg-white transition-all duration-500 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  <div className="text-4xl mb-4 select-none">{item.icon}</div>
                  <h3 className="text-xl font-extrabold mb-4 bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-700 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-black via-zinc-800 to-black bg-clip-text text-transparent mb-8 tracking-tight">
              How CollabU Solves This
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto font-light tracking-wide">
              Our platform connects students across departments to form the
              perfect project teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-black hover:bg-white/90 transition-all duration-700">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-black to-zinc-700 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500">
                    <div className="text-white">{feature.icon}</div>
                  </div>

                  <h3 className="text-xl font-black mb-6 text-center bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 text-center leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-zinc-200 to-white bg-clip-text text-transparent mb-8 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-zinc-300 font-light tracking-wide">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all duration-700 transform group-hover:-translate-y-3">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-white to-zinc-300 rounded-2xl flex items-center justify-center mx-auto mb-8 text-black font-black text-2xl tracking-wider">
                    {step.step}
                  </div>

                  <h3 className="text-2xl font-black mb-6 text-center text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-zinc-300 text-center leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Example */}
      <section className="relative py-24 bg-gradient-to-b from-zinc-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-black via-zinc-900 to-black rounded-3xl p-6 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-zinc-400/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-zinc-400/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-zinc-200 to-white bg-clip-text text-transparent mb-6 tracking-tight">
                  Real Example: AI + IoT Project
                </h2>
                <p className="text-xl text-zinc-300 font-light tracking-wide">
                  See how students collaborate across departments
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Alex (CS Student)",
                    quote:
                      "I want to build a smart home system but I only know programming. I need help with AI algorithms and IoT hardware.",
                    skills: "React, Node.js, Databases",
                  },
                  {
                    name: "Maya (AI/ML Student)",
                    quote:
                      "I can handle the machine learning models for pattern recognition and automation logic.",
                    skills: "Python, TensorFlow, Data Science",
                  },
                  {
                    name: "Sam (EE Student)",
                    quote:
                      "I'll handle the IoT sensors, microcontrollers, any thing related to hardware along with integration.",
                    skills: "Arduino, Raspberry Pi, Circuit Design",
                  },
                ].map((person, index) => (
                  <div key={index} className="group">
                    <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500">
                      <div className="w-16 h-16 bg-gradient-to-br from-white to-zinc-300 rounded-2xl flex items-center justify-center mx-auto mb-6 text-black font-black text-xl">
                        {person.name.split(" ")[0][0]}
                      </div>
                      <h3 className="text-lg font-bold mb-4 text-white text-center tracking-wide">
                        {person.name}
                      </h3>
                      <p className="text-zinc-300 text-center mb-6 text-sm leading-relaxed font-medium">
                        "{person.quote}"
                      </p>
                      <div className="text-xs text-zinc-400 text-center font-medium">
                        Skills: {person.skills}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-16">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-2xl border border-white/20 px-10 py-6 rounded-3xl">
                  <CheckCircle className="h-8 w-8 text-white mr-4" />
                  <span className="text-white font-bold text-xl tracking-wide">
                    Project Successfully Completed!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 bg-gradient-to-b from-white to-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-black via-zinc-800 to-black bg-clip-text text-transparent mb-8 tracking-tight">
              What Students Say
            </h2>
            <p className="text-xl text-zinc-600 font-light tracking-wide">
              Real experiences from our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-black hover:bg-white/90 transition-all duration-700 transform group-hover:-translate-y-3">
                  <div className="flex mb-8 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 text-zinc-800 fill-current"
                      />
                    ))}
                  </div>

                  <p className="text-zinc-600 mb-8 leading-relaxed text-center italic font-medium text-lg">
                    "{testimonial.text}"
                  </p>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-black to-zinc-700 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-black text-xl">
                      {testimonial.avatar}
                    </div>
                    <div className="font-black text-black text-lg tracking-wide">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-zinc-500 font-medium">
                      {testimonial.department}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="relative py-24 bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-zinc-200 to-white bg-clip-text text-transparent mb-8 tracking-tight">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-zinc-300 mb-16 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            Join thousands of students who are already collaborating on
            incredible projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link
              to="/browse"
              className="group relative px-12 py-6 bg-gradient-to-r from-white to-zinc-200 rounded-3xl font-bold text-xl text-black hover:from-zinc-100 hover:to-white transition-all duration-500 transform hover:scale-105"
            >
              <span className="relative tracking-wide">
                Start Browsing Projects
              </span>
            </Link>

            <Link
              to="/post"
              className="group relative px-12 py-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl font-bold text-xl text-white hover:bg-white/15 transition-all duration-500"
            >
              <span className="relative tracking-wide">
                Post Your First Project
              </span>
            </Link>
          </div>
        </div>
      </section> */}
      <section className="relative py-16 px-4 sm:py-20 sm:px-6 bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-white/15 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-zinc-200 to-white bg-clip-text text-transparent mb-6 tracking-tight">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            Join thousands of students who are already collaborating on
            incredible projects.
          </p>
          <div className="flex items-center justify-center">
            <div className="flex flex-col w-90 gap-6 sm:gap-8 justify-center px-2">
              <Link
                to="/collaborate/browse"
                className="group relative px-10 sm:px-12 py-5 bg-gradient-to-r from-white to-zinc-200 rounded-3xl font-bold text-lg sm:text-xl text-black hover:from-zinc-100 hover:to-white transition-all duration-500 transform hover:scale-105 -mb-4"
              >
                <span className="relative tracking-wide">
                  Start Browsing Projects
                </span>
              </Link>
              <Link
                to="/collaborate/post"
                className="group relative px-10 sm:px-12 py-5 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl font-bold text-lg sm:text-xl text-white hover:bg-white/15 transition-all duration-500"
              >
                <span className="relative tracking-wide">
                  Post Your First Project
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
