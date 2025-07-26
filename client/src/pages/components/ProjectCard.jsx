import { useState } from "react";

function ProjectCard({ project, onClick, isActive }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg transition-all duration-300 transform ${
        isHovering ? "scale-[1.02]" : ""
      } ${
        isActive
          ? "ring-2 ring-purple-600 ring-offset-2"
          : "border border-gray-200"
      } overflow-hidden cursor-pointer h-full`}
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold mr-3 shadow-md">
            {project?.project_title?.charAt(0) || "P"}
          </div>
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
            {project?.project_title}
          </h3>
        </div>

        <p className="text-gray-600 mb-5 line-clamp-2 h-12">
          {project?.project_description}
        </p>

        <div className="space-y-3 mb-5">
          <div className="flex items-center text-sm">
            <div className="w-8 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-600 font-medium w-20">Tech:</span>
            <span className="text-gray-800 font-medium line-clamp-1">
              {project?.techStack}
            </span>
          </div>

          <div className="flex items-center text-sm">
            <div className="w-8 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-600 font-medium w-20">Deadline:</span>
            <span className="text-gray-800 font-medium">
              {project?.deadline}
            </span>
          </div>

          {project?.min_price && (
            <div className="flex items-center text-sm">
              <div className="w-8 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-600 font-medium w-20">Budget:</span>
              <span className="text-gray-800 font-medium">
                ₹{project?.min_price} - ₹{project?.max_price}
              </span>
            </div>
          )}
        </div>

        <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group">
          <span>View Details</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
