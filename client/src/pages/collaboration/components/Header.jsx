import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white/20 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-20">
          {/* Logo */}
          <Link
            to="/collaborate"
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-tr from-zinc-600 to-black rounded-lg flex items-center justify-center transform rotate-3">
              <span className="text-white font-bold text-sm sm:text-lg">
                CB
              </span>
            </div>
            <span className="text-2xl sm:text-xl font-bold bg-gradient-to-r from-black to-zinc-700 bg-clip-text text-transparent">
              <span>Collaborate</span>
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-6 customCreated">
            <Link
              to="/collaborate/browse"
              className="text-white hover:text-black font-medium transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/collaborate/post"
              className="text-white hover:text-black font-medium transition-colors"
            >
              Post
            </Link>
            <Link
              to="/collaborate/dashboard"
              className="text-white hover:text-black font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/collaborate/login"
              className="text-white hover:text-black font-medium transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/collaborate/signup"
              className="px-4 py-2 xl:px-5 xl:py-2.5 bg-gradient-to-r from-zinc-600 to-black text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign Up
            </Link>
          </nav>
          <button
            className="sm:hidden ml-2 p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <nav className="py-4 space-y-2">
            <Link
              to="/collaborate/browse"
              className="block px-4 py-2 text-gray-700 hover:text-zinc-600 hover:bg-gray-50 font-medium transition-colors rounded-md"
            >
              Browse
            </Link>
            <Link
              to="/collaborate/post"
              className="block px-4 py-2 text-gray-700 hover:text-zinc-600 hover:bg-gray-50 font-medium transition-colors rounded-md"
            >
              Post
            </Link>
            <Link
              to="/collaborate/dashboard"
              className="block px-4 py-2 text-gray-700 hover:text-zinc-600 hover:bg-gray-50 font-medium transition-colors rounded-md"
            >
              Dashboard
            </Link>
            <div className="flex flex-row justify-around px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 font-medium transition-colors rounded-md">
              <Link
                to="/collaborate/login"
                className="text-gray-700 hover:text-black font-medium transition-colors border-purple"
              >
                Log In
              </Link>
              <Link
                to="/collaborate/signup"
                className="px-4 py-2 bg-gradient-to-r from-black to-zinc-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
