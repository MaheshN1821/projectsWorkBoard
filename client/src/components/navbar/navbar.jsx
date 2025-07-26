import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-end py-4">
          <div className="flex items-center space-x-8">
            <div
              className="nav-link cursor-pointer"
              onClick={() => navigate("/")}
            >
              Projects
            </div>
            <div
              className="nav-link cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About Us
            </div>
            <div
              className="nav-link cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </div>
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="nav-link cursor-pointer flex items-center">
                Profile
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                    onClick={() => navigate("/student/login")}
                  >
                    Student
                  </div>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                    onClick={() => navigate("/freelancer/login")}
                  >
                    Freelancer
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
