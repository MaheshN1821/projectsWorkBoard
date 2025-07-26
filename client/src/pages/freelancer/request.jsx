import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MessageSquare,
  User,
  Calendar,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";

const Request = () => {
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/pwb/login");
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // This endpoint might need to be created in your backend
      const response = await axios.get(
        "https://projects-work-board.vercel.app/api/pwb/users/freelancer/requests"
      );
      setRequestData(response.data);
      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      if (error.response?.status === 401) {
        navigate("/pwb/login");
      }
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.patch(
        `https://projects-work-board.vercel.app/api/pwb/users/requests/${requestId}/accept`
      );
      fetchRequests(); // Refresh the list
      alert("Request accepted successfully!");
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept request");
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.patch(
        `https://projects-work-board.vercel.app/api/pwb/users/requests/${requestId}/reject`
      );
      fetchRequests(); // Refresh the list
      alert("Request rejected");
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/pwb/freelancers")}
              className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Client Requests
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 mr-4 mb-4 text-end text-sm">
        <span className="font-bold">Important:</span> Once you accept the
        request, be sure to check your email for communication from the client.
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {requestData.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-12 border border-white/30 max-w-2xl mx-auto">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No Requests
              </h2>
              <p className="text-gray-600 mb-8">
                You don't have any client requests at the moment.
              </p>
              <button
                onClick={() => navigate("/pwb/freelancers")}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap justify-center gap-6">
            {requestData.map((request, index) => (
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
                        {request?.client?.username || "Client"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {request?.client?.email || "client@example.com"}
                      </p>
                    </div>
                  </div>
                  {/* <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs rounded-full">
                    {request.status}
                  </span> */}
                </div>

                {/* Request Details */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Session Request
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {request.message ||
                      "Client has requested a 1:1 consultation session with you."}
                  </p>

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
                {request.status == "accepted" ||
                request.status == "declined" ? (
                  <div className="text-center border border-gray-400 font-bold rounded-xl p-2">
                    {request.status?.toUpperCase()}
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleAcceptRequest(request._id)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-semibold">Accept</span>
                    </button>

                    <button
                      onClick={() => handleRejectRequest(request._id)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      <X className="w-4 h-4" />
                      <span className="font-semibold">Decline</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;

// import { useEffect, useState } from "react";
// import "./request.css";
// import api from "../../utils/api";
// import RequestCard from "../../components/card/request/requestCard";

// function Request() {
//   const freeId = sessionStorage.getItem("freelancerId");
//   const [requestData, setRequestData] = useState([]);

//   useEffect(() => {
//     async function getRequestsFromUser() {
//       const result = await api.post("/request/get-request", { freeId: freeId });
//       setRequestData(result?.data?.info);
//       console.log(result?.data?.info);
//     }
//     getRequestsFromUser();
//   }, [freeId]);

//   return (
//     <div className="requestContainer">
//       <div className="request-wrapper">
//         <div className="request-features">
//           {requestData.map((request, index) => (
//             <RequestCard request={request} key={index + 1} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Request;
