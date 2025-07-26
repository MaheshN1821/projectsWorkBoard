import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const location = useLocation();
  const session_id = new URLSearchParams(location.search).get("session_id");
  const [sessionData, setSessionData] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `/api/payment/success?session_id=${session_id}`
        );
        setSessionData(res.data.session);
      } catch (error) {
        console.error("Failed to fetch session:", error);
      }
    };

    if (session_id) {
      fetchSession();
    }
  }, [session_id]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      {sessionData ? (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(sessionData, null, 2)}
        </pre>
      ) : (
        <p>Loading payment details...</p>
      )}
      <div>
        If not redirected?{" "}
        <div onClick={() => Navigate("/pwb/client")} className="cursor-pointer">
          Click here
        </div>
      </div>
    </div>
  );
};

export default Success;

// import React from "react";
// import { useLocation } from "react-router-dom";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const Success = () => {
//   const query = useQuery();
//   const sessionId = query.get("session_id");

//   return (
//     <div style={{ padding: "2rem", textAlign: "center" }}>
//       <h1>Payment Successful!</h1>
//       <p>Thank you for your payment.</p>
//       {sessionId && (
//         <p>
//           Your payment session ID is: <code>{sessionId}</code>
//         </p>
//       )}
//     </div>
//   );
// };

// export default Success;
