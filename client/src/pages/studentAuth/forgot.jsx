import { useForm } from "react-hook-form";
import "./forgot.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import { GlobalContext } from "../../components/context/context";

function Forgot() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUserEmail } = useContext(GlobalContext);
  const [otpValue, setOtpValue] = useState("");
  const [proceed, setProceed] = useState(false);
  const [sentOtp, setSentOtp] = useState("");
  const Navigate = useNavigate();

  const handleOtpVerification = () => {
    if (Number(otpValue) === Number(sentOtp)) {
      Navigate("/student/login/password-reset");
    } else {
      const notifyFailure = () => toast.error("Invalid Otp!");
      notifyFailure();
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://projects-work-board.vercel.app/auth/student/email-verification",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setUserEmail(data.email);
      setSentOtp(response.data.otp);

      response.status === 200 ? setProceed(true) : "";
    } catch (err) {
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 404
      ) {
        const notifyFailure = () => toast.error("Email Id does not Exist!");
        notifyFailure();
      } else {
        console.error("Unexpected error: ", err.response.status);
      }
      console.log(err);
    }
  };

  const loginOptions = {
    email: {
      required: "Email is required",
    },
  };

  return (
    <div className="backgLogin">
      <div
        style={{ display: !proceed ? "flex" : "none" }}
        className="studentLogContainer"
      >
        <div className="loginHeading">Forgot Your Password?</div>
        <div className="some-nonsense">Enter your registered Email</div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="input-field contPos">
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" "
              {...register("email", loginOptions.email)}
            ></input>
            <label htmlFor="email">Email</label>
            <svg
              className="svgEdit"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </g>
            </svg>
          </div>
          {errors.email && (
            <span className="studentErrReg">{errors.email.message}</span>
          )}
          <div className="btn-container">
            <button className="btn">Submit</button>
          </div>
        </form>
      </div>
      <div
        style={{ display: proceed ? "flex" : "none" }}
        className="studentLogContainer-1"
      >
        <div className="loginHeading">Enter the OTP</div>
        <div className="input-field contPos">
          <input
            type="otp"
            name="otp"
            id="otp"
            placeholder="Enter Otp"
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
          ></input>
          <label htmlFor="otp">OTP</label>
          <svg
            className="svgEdit"
            height="20"
            viewBox="0 0 32 32"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
        </div>
        <div className="btn-container">
          <button className="btn btn777" onClick={handleOtpVerification}>
            Submit
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
}

export default Forgot;
