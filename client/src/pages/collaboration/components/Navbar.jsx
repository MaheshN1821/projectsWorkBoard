import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { LogOut, Plus, Search, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/collaborate/login");
  };

  return (
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

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-zinc-800 to-black rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    {user?.avatar || user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="sm:block text-sm font-semibold text-zinc-800">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-zinc-600 hover:text-zinc-800 font-semibold transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
        <div className="flex justify-end pb-2 items-center space-x-2 sm:space-x-6">
          <Link
            to="/collaborate/browse"
            className="flex items-center gap-2 px-4 py-2 text-sm sm:text-md text-zinc-700 hover:text-black font-semibold transition-colors"
          >
            <Search className="h-4 w-4" />
            Browse Projects
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/collaborate/post"
                className="flex items-center text-sm sm:text-md gap-2 px-4 py-2 text-zinc-700 hover:text-black font-semibold transition-colors"
              >
                <Plus className="h-4 w-4" />
                Post Project
              </Link>
              <Link
                to="/collaborate/dashboard"
                className="flex items-center text-sm sm:text-md gap-2 px-4 py-2 text-zinc-700 hover:text-black font-semibold transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
