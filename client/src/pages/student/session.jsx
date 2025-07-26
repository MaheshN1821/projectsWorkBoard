import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { AlertCircle, Calendar, User } from "lucide-react";

function Session() {
  const [freelancerData, setFreelancerData] = useState([]);
  const [reqData, setReqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingRequest, setSendingRequest] = useState({});

  const userId = localStorage.getItem("token");

  useEffect(() => {
    async function getFreelancers() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "https://projects-work-board.vercel.app/api/pwb/users/freelancers",
          {
            headers: { Authorization: `Bearer ${userId}` },
          }
        );
        const response2 = await axios.get(
          "https://projects-work-board.vercel.app/api/pwb/users/freelancer/requests/client",
          {
            headers: { Authorization: `Bearer ${userId}` },
          }
        );

        setFreelancerData(response?.data || []);
        setReqData(response2?.data || []);
      } catch (err) {
        console.log(err);
        setError("Failed to load freelancers. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    getFreelancers();
  }, []);

  async function handleSendingRequest(freeData) {
    const freelancerId = freeData._id;
    try {
      setSendingRequest((prev) => ({ ...prev, [freelancerId]: true }));
      const clientId = jwtDecode(userId);
      const data = {
        client: clientId.userId,
        freelancer: freelancerId,
        requestDate: new Date(Date.now()).toISOString(),
      };
      await axios.post(
        "https://projects-work-board.vercel.app/api/pwb/projects/save-request",
        data,
        {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        }
      );
      alert("Request sent successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to send request. Please try again.");
    } finally {
      setSendingRequest((prev) => ({ ...prev, [freelancerId]: false }));
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg font-semibold tracking-wide">
            Loading freelancers...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-800 px-6 py-4 rounded shadow-md mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="pb-2 mb-8 border-b">
          <div className="text-4xl text-center font-bold">
            Status of Requests
          </div>
          <div className="text-start text-sm mt-4">
            <span className="font-bold">Important:</span> If your request is
            accepted, please contact the freelancer via email to discuss the
            next steps.
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {reqData.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-12 border border-white/30 max-w-2xl mx-auto">
                  <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    No Requests
                  </h2>
                  <p className="text-gray-600 mb-8">
                    You have not made any requests.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-row flex-wrap justify-center gap-6">
                {reqData.map((request, index) => (
                  <div
                    key={request._id || index}
                    className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-gray-400 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Request Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {request?.freelancer?.username || "Client"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request?.freelancer?.email || "client@example.com"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Request Details */}
                    <div className="mb-6">
                      {/* <h4 className="font-semibold text-gray-800 mb-2">
                        Session Request
                      </h4> */}

                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Requested on:{" "}
                          {new Date(
                            request.createdAt || Date.now()
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="text-center border border-gray-400 font-bold rounded-xl p-2">
                      {request.status?.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-600 mb-14">
          Available Freelancers
        </h1>
        <div className="grid gap-10 md:grid-cols-2">
          {freelancerData.map((freeData) => (
            <div
              key={freeData._id}
              className="relative shadow-xl rounded-2xl border border-blue-100 bg-white hover:shadow-2xl transition duration-300"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 flex flex-col items-center py-8 px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
                  <div
                    className="w-24 h-24 shadow-md border-4 border-white rounded-full bg-cover bg-center mb-4 ring-4 ring-blue-200"
                    style={{ backgroundImage: `url(${freeData?.fimage})` }}
                  />
                  <div className="text-center mb-3">
                    <h2 className="text-xl font-bold text-blue-900 tracking-tight mb-1">
                      {freeData.username}
                    </h2>
                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                      Freelancer
                    </span>
                  </div>
                  <div className="w-full space-y-2">
                    <InfoInput label="Name:" value={freeData.username} />
                    <InfoInput
                      label="Email:"
                      value={freeData.email}
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between -mt-10 py-8 px-8">
                  <div>
                    <h3 className="uppercase text-sm font-semibold text-indigo-700 mb-4 tracking-wider">
                      Experience
                    </h3>
                    <div className="mb-5">
                      <label className="block text-xs font-semibold text-gray-500 mb-2">
                        Previously Worked Projects
                      </label>
                      <textarea
                        value={freeData.workedProjects}
                        disabled
                        rows={3}
                        className="w-full px-4 py-2 border border-blue-100 rounded-lg bg-blue-50 text-gray-700 resize-none text-sm font-medium"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-xs font-semibold text-gray-500 mb-2">
                        Proficiency in Tech Stack
                      </label>
                      <input
                        type="text"
                        value={freeData.techStack}
                        disabled
                        className="w-full px-4 py-2 border border-blue-100 rounded-lg bg-blue-50 text-gray-700 text-sm font-medium"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleSendingRequest(freeData)}
                    disabled={sendingRequest[freeData._id]}
                    className={`w-full py-3 px-6 mt-2 rounded-full font-semibold shadow-md transition duration-300 text-white text-lg tracking-wide
                      ${
                        sendingRequest[freeData._id]
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-blue-200 hover:scale-105 hover:shadow-xl"
                      }`}
                  >
                    {sendingRequest[freeData._id] ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <span>Send A Request</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {freelancerData.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl font-medium">
              No freelancers available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoInput({ label, value, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        disabled
        className="w-full px-4 py-2 border border-blue-100 rounded-lg bg-blue-50 text-gray-700 font-medium shadow-sm text-sm"
      />
    </div>
  );
}

export default Session;

/////////////////////////////////////////////
// import { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";

// function Session() {
//   const [freelancerData, setFreelancerData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sendingRequest, setSendingRequest] = useState({});

//   const userId = localStorage.getItem("token");

//   useEffect(() => {
//     async function getFreelancers() {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get(
//           "https://projects-work-board.vercel.app/api/pwb/users/freelancers",
//           {
//             headers: {
//               Authorization: `Bearer ${userId}`,
//             },
//           }
//         );
//         console.log(response);

//         setFreelancerData(response?.data || []);
//       } catch (err) {
//         console.error("Error fetching freelancers:", err);
//         setError("Failed to load freelancers. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     getFreelancers();
//   }, []);

//   async function handleSendingRequest(freeData) {
//     const freelancerId = freeData._id;

//     try {
//       setSendingRequest((prev) => ({ ...prev, [freelancerId]: true }));
//       const clientId = jwtDecode(userId);
//       const data = {
//         client: clientId.userId,
//         freelancer: freelancerId,
//         requestDate: new Date(Date.now()).toISOString(),
//       };

//       const result = await axios.post(
//         "https://projects-work-board.vercel.app/api/pwb/projects/save-request",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${userId}`,
//           },
//         }
//       );
//       console.log("Request sent successfully:", result);

//       // Show success message (you can replace with toast notification)
//       alert("Request sent successfully!");
//     } catch (err) {
//       console.error("Error sending request:", err);
//       alert("Failed to send request. Please try again.");
//     } finally {
//       setSendingRequest((prev) => ({ ...prev, [freelancerId]: false }));
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading freelancers...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//           Available Freelancers
//         </h1>

//         <div className="space-y-8">
//           {freelancerData.map((freeData) => (
//             <div
//               key={freeData._id}
//               className="bg-white rounded-lg shadow-lg overflow-hidden"
//             >
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
//                 {/* Personal Information Section */}
//                 <div className="space-y-6">
//                   <div className="flex items-center space-x-4 mb-6">
//                     <div
//                       className="w-20 h-20 rounded-full bg-cover bg-center bg-gray-300 flex-shrink-0"
//                       style={{
//                         backgroundImage: `url(${freeData?.fimage})`,
//                       }}
//                     />
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">
//                         {freeData.username}
//                       </h2>
//                       <p className="text-gray-600">Freelancer</p>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Name:
//                       </label>
//                       <input
//                         type="text"
//                         value={freeData.username}
//                         disabled
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email:
//                       </label>
//                       <input
//                         type="email"
//                         value={freeData.email}
//                         disabled
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Phone Number:
//                       </label>
//                       <input
//                         type="tel"
//                         value={freeData.phone_number}
//                         disabled
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Address:
//                       </label>
//                       <input
//                         type="text"
//                         value={freeData.address}
//                         disabled
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Experience Section */}
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-4">
//                       Experience
//                     </h3>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Previously Worked Projects:
//                     </label>
//                     <textarea
//                       value={freeData.workedProjects}
//                       disabled
//                       rows={4}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 resize-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Proficiency in Tech Stack:
//                     </label>
//                     <input
//                       type="text"
//                       value={freeData.techStack}
//                       disabled
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
//                     />
//                   </div>

//                   <button
//                     onClick={() => handleSendingRequest(freeData)}
//                     disabled={sendingRequest[freeData._id]}
//                     className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
//                       sendingRequest[freeData._id]
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
//                     } text-white`}
//                   >
//                     {sendingRequest[freeData._id] ? (
//                       <span className="flex items-center justify-center space-x-2">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                         <span>Sending...</span>
//                       </span>
//                     ) : (
//                       "Send A Request"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {freelancerData.length === 0 && !loading && (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">
//               No freelancers available at the moment.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Session;

/////////////////////////////////////////
// import { useEffect, useState } from "react";
// import api from "../../utils/api";

// function Session() {
//   const [freelancerData, setFreelancerData] = useState([]);

//   const userId = localStorage.getItem("token");

//   useEffect(() => {
//     async function getFreelancers() {
//       try {
//         const response = await api.get("/api/pwb/users/freelancers");
//         setFreelancerData(response?.data?.freelancers);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     getFreelancers();
//   }, []);

//   async function handleSendingRequest(freeData) {
//     const data = {
//       client: userId,
//       freeId: freeData,
//       date: new Date(Date.now()).toString(),
//     };
//     try {
//       const result = await api.post("/api/pwb/projects/save-request", data);
//       console.log(result);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <div className="sessionContainer">
//       <div className="session-wrapper">
//         {freelancerData.map((freeData, index) => (
//           <div className="twoCont-1-s" key={index + 1}>
//             <div className="acc-cont-1-1-s">
//               <div
//                 className="profile-image-s"
//                 style={{
//                   backgroundImage: `url(${freeData?.fimage})`,
//                 }}
//               ></div>
//               <div className="info-item-s">
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   placeholder={freeData.username}
//                   disabled
//                 />
//               </div>
//               <div className="info-item-s">
//                 <label>Email:</label>
//                 <input
//                   type="text"
//                   name="email"
//                   id="email"
//                   placeholder={freeData.email}
//                   disabled
//                 />
//               </div>
//               <div className="info-item-s">
//                 <label>Phone Number:</label>
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   id="phoneNumber"
//                   placeholder={freeData.phone_number}
//                   disabled
//                 />
//               </div>
//               <div className="info-item-s">
//                 <label>Address:</label>
//                 <input
//                   type="text"
//                   name="address"
//                   id="address"
//                   placeholder={freeData.address}
//                   disabled
//                 />
//               </div>
//             </div>
//             <div className="acc-cont-2-2-s">
//               <div className="info-head-1-2-s">
//                 <h1>Experience</h1>
//               </div>
//               <div className="form-item-container-s">
//                 <label htmlFor="projects">Previously Worked Projects:</label>
//                 <textarea
//                   id="projects"
//                   name="projects"
//                   placeholder={freeData.workedProjects}
//                   disabled
//                 ></textarea>
//               </div>
//               <div className="form-item-container-s">
//                 <label htmlFor="techStack">Proficiency in Tech Stack:</label>
//                 <input
//                   type="text"
//                   id="techStack"
//                   name="techStack"
//                   placeholder={freeData.techStack}
//                   disabled
//                 />
//               </div>
//               <div
//                 className="request-btn"
//                 onClick={() => handleSendingRequest(freeData._id)}
//               >
//                 Send A Request
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Session;
