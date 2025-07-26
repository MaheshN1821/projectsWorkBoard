//no-use delete-later
import { useContext } from "react";
import { GlobalContext } from "../../context/context";

function ProjectDisplay({ toDisplay, setToDisplay, projData }) {
  const { setSingleProjectData } = useContext(GlobalContext);

  function handleInfoClick() {
    setToDisplay(true);
    setSingleProjectData(projData);
  }

  return (
    <div
      className={`p-2 ${
        toDisplay ? "w-full" : "w-full md:w-1/2"
      } transition-all duration-300`}
    >
      <div className="h-full card-hover bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold mr-3">
              {projData?.project_title?.charAt(0) || "P"}
            </div>
            <h2 className="text-lg font-semibold font-poppins text-gray-800 line-clamp-1">
              {projData?.project_title}
            </h2>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
            {projData?.project_description}
          </p>

          <div className="space-y-3">
            <div className="flex items-center">
              <div className="text-xs font-medium text-gray-500 w-24">
                Tech Stack:
              </div>
              <div className="text-sm text-gray-700 font-medium">
                {projData?.techStack}
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-xs font-medium text-gray-500 w-24">
                Deadline:
              </div>
              <div className="text-sm text-gray-700">{projData?.deadline}</div>
            </div>

            <button
              onClick={handleInfoClick}
              className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg 
              font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 
              transition-all duration-300 ease-in-out text-sm"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDisplay;

// import { useContext } from "react";
// import "./projectDisplay.css";
// import { GlobalContext } from "../../context/context";
// import React from "react";

// function ProjectDisplay({ toDisplay, setToDisplay, projData }) {
//   const { setSingleProjectData } = useContext(GlobalContext);
//   function handleInfoClick() {
//     setToDisplay(true);
//     setSingleProjectData(projData);
//   }
//   return (
//     <div
//       className="p-card-wrapper"
//       style={{ width: toDisplay ? "100%" : "50%" }}
//     >
//       <div className="outer-cont">
//         <div className="border-card">
//           <div className="proj-title">{projData?.project_title}</div>
//           <div className="p-desc">{projData?.project_description}</div>
//           <div className="other-contents">
//             <div className="p-stack">
//               <div className="p-t">Tech Stack</div> {projData?.techStack}
//             </div>
//             <div className="p-time">
//               <div className="p-d">Deadline</div> {projData?.deadline}
//             </div>
//             <div className="know-more" onClick={handleInfoClick}>
//               Click here to know more!
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectDisplay;
