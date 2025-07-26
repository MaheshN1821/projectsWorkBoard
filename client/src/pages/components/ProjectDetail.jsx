function ProjectDetail({ project, onClose, onInterested }) {
  if (!project) return null;

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
      <div className="relative">
        <div className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 shadow-md hover:shadow-lg"
          aria-label="Close details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold mr-4 shadow-md">
            {project?.project_title?.charAt(0) || "P"}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {project?.project_title}
          </h2>
        </div>

        <div className="mb-8">
          <h3 className="flex items-center text-sm font-medium text-gray-500 uppercase mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-purple-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Description
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700 whitespace-pre-wrap">
              {project?.project_description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
            <h3 className="flex items-center text-sm font-medium text-gray-500 uppercase mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-purple-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Tech Stack
            </h3>
            <p className="text-gray-800 font-medium">{project?.techStack}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
            <h3 className="flex items-center text-sm font-medium text-gray-500 uppercase mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-purple-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Deadline
            </h3>
            <p className="text-gray-800 font-medium">{project?.deadline}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
            <h3 className="flex items-center text-sm font-medium text-gray-500 uppercase mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-purple-600"
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
              Price Range
            </h3>
            <p className="text-gray-800 font-medium">
              ₹{project?.min_price} - ₹{project?.max_price}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
            <h3 className="flex items-center text-sm font-medium text-gray-500 uppercase mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-purple-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Status
            </h3>
            <p className="text-gray-800 font-medium">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  project?.status === "Open" || !project?.status
                    ? "bg-green-100 text-green-800"
                    : project?.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {project?.status || "Open"}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={onInterested}
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          I'm Interested!
        </button>
      </div>
    </div>
  );
}

export default ProjectDetail;
