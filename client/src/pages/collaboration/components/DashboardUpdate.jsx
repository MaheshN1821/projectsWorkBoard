import { Eye, Edit, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom"; // Assuming Link is from react-router-dom
import { useState } from "react"; // Assuming handleDeleteProject is a state function

const DashboardUpdate = () => {
  const [projects, setProjects] = useState([]); // Example state for projects

  const handleDeleteProject = (projectId) => {
    // Logic to delete the project
    setProjects(projects.filter((project) => project._id !== projectId));
  };

  return (
    <div>
      {/* Other parts of the Dashboard component */}
      {projects.map((project) => (
        <div key={project._id} className="flex flex-wrap gap-3">
          <Link
            to={`/collaborate/project/${project._id}`}
            className="px-4 py-2 bg-zinc-50/80 backdrop-blur-xl border border-black text-zinc-700 rounded-xl hover:bg-zinc-100/80 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide text-sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Link>
          <Link
            to={`/project/${project._id}/edit`}
            className="px-4 py-2 bg-zinc-50/80 backdrop-blur-xl border border-black text-zinc-700 rounded-xl hover:bg-zinc-100/80 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide text-sm"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
          <Link
            to={`/project/${project._id}/applications`}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide text-sm shadow-lg"
          >
            <Users className="h-4 w-4 mr-2" />
            Applications ({project.applicantCount || 0})
          </Link>
          <button
            onClick={() => handleDeleteProject(project._id)}
            className="px-4 py-2 bg-zinc-100/80 backdrop-blur-xl text-zinc-600 rounded-xl hover:bg-red-100/80 hover:text-red-600 transition-all duration-500 inline-flex items-center justify-center font-bold tracking-wide border border-zinc-300 text-sm"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default DashboardUpdate;
