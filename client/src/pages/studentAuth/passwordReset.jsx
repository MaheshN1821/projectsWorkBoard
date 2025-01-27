import "./passwordReset.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { GlobalContext } from "../../components/context/context";

function PasswordReset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userEmail } = useContext(GlobalContext);
  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.repeatPassword) {
      const notifyFailure = () =>
        toast.error("Both Password and Repeat Password should match!");

      notifyFailure();
    }
    try {
      const newData = {
        email: userEmail,
        password: data.password,
      };
      const response = await axios.post(
        "http://localhost:3000/auth/student/password-reset",
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      response.status === 200 ? Navigate("/student/login/") : "";
    } catch (err) {
      if (err.response.status === 400 || err.response.status === 401) {
        const notifyFailure = () => toast.error("Try again later!");
        notifyFailure();
      } else {
        console.error("Unexpected error: ", err.response.status);
      }
      console.log(err);
    }
  };

  const loginOptions = {
    password: {
      required: "Password is required",
      validate: {
        hasUppercase: (value) =>
          /[A-Z]/.test(value) ||
          "Password must contain at least 1 uppercase letter",
        hasLowercase: (value) =>
          /[a-z]/.test(value) ||
          "Password must contain at least 1 lowercase letter",
        hasDigit: (value) =>
          /\d/.test(value) || "Password must contain at least 1 digit",
        hasSpecialChar: (value) =>
          /[@$!%*?&]/.test(value) ||
          "Password must contain at least 1 special character",
        minLength: (value) =>
          value.length >= 8 || "Password must be at least 8 characters long",
      },
    },
    repeatPassword: {
      required: "Password is required",
      validate: {
        hasUppercase: (value) =>
          /[A-Z]/.test(value) ||
          "Password must contain at least 1 uppercase letter",
        hasLowercase: (value) =>
          /[a-z]/.test(value) ||
          "Password must contain at least 1 lowercase letter",
        hasDigit: (value) =>
          /\d/.test(value) || "Password must contain at least 1 digit",
        hasSpecialChar: (value) =>
          /[@$!%*?&]/.test(value) ||
          "Password must contain at least 1 special character",
        minLength: (value) =>
          value.length >= 8 || "Password must be at least 8 characters long",
      },
    },
  };

  return (
    <div className="backgLogin">
      <div className="studentLogContainer">
        <div className="loginHeading">Enter New Password</div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="input-field contPos">
            <input
              type="password"
              name="password"
              id="password"
              placeholder=" "
              {...register("password", loginOptions.password)}
            ></input>
            <label htmlFor="email">Password</label>
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
          {errors.password && (
            <span className="studentErrReg">{errors.password.message}</span>
          )}
          <div className="input-field contPos">
            <input
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              placeholder=" "
              {...register("repeatPassword", loginOptions.repeatPassword)}
            ></input>
            <label htmlFor="email">Re-Enter Password</label>
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
          {errors.repeatPassword && (
            <span className="studentErrReg">
              {errors.repeatPassword.message}
            </span>
          )}

          <div className="btn-container">
            <button className="btn">Submit</button>
          </div>
        </form>
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

export default PasswordReset;
