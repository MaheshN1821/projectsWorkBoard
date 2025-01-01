import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/api.js";
import Header from "../../components/header/header";
import "./manageAccount.css";

const freeId = sessionStorage.getItem("freelancerId");

function ManageAccount() {
  const { register, handleSubmit } = useForm();
  const [freelancer, setFreelancer] = useState({
    username: "",
    phone_number: "",
    address: "",
    email: "",
    workedProjects: "",
    techStack: "",
    fimage: "",
  });

  const updateOptions = {
    username: {
      required: "Name is required",
    },
    phone_number: {
      required: "Phone Number is required",
    },
    email: {
      required: "Email is required",
    },
    address: {
      required: "Address is required",
    },
    workedProjects: {
      required: "Worked Projects is required",
    },
    techStack: {
      required: "Tech Stack is required",
    },
    fimage: {
      message: "Image Uploaded",
    },
  };

  useEffect(() => {
    async function getFreeData() {
      try {
        const result = await api.get(`/freelancer/${freeId}`);

        setFreelancer({
          username: result?.data?.info[0]?.username,
          phone_number: result?.data?.info[0]?.phone_number,
          address: result?.data?.info[0]?.address,
          email: result?.data?.info[0]?.email,
          workedProjects: result?.data?.info[0]?.workedProjects,
          techStack: result?.data?.info[0]?.techStack,
          fimage: result?.data?.info[0]?.fimage,
        });
      } catch (err) {
        console.log(err);
      }
    }

    getFreeData();
  }, []);

  const onFormSubmit = async (data) => {
    const newData = { ...data, fId: freeId };

    try {
      const response = await api.post("/freelancer/update-details", {
        newData,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
      alert("Try again later!");
    }
  };

  return (
    <div className="freelancerContainer-1">
      <Header />
      <div className="free-wrapper-1">
        <div className="account-content">
          <div className="acc-title">Your Information</div>
          <div className="twoCont">
            {/* Freelancer Information (Profile Display) */}
            <div className="acc-cont-1">
              <div
                className="profile-image"
                style={{
                  backgroundImage: `url(${freelancer.fimage})`,
                }}
              ></div>
              <div className="info-item">
                <label>Name:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder={freelancer.username}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder={freelancer.email}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder={freelancer.phone_number}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder={freelancer.address}
                  disabled
                />
              </div>
            </div>
            <div className="acc-cont-2">
              <div className="info-head-1">
                <h1>Experience</h1>
              </div>
              <div className="form-item-container">
                <label htmlFor="projects">Previously Worked Projects:</label>
                <textarea
                  id="projects"
                  name="projects"
                  placeholder={freelancer.workedProjects}
                  disabled
                ></textarea>
              </div>
              <div className="form-item-container">
                <label htmlFor="techStack">Proficiency in Tech Stack:</label>
                <input
                  type="text"
                  id="techStack"
                  name="techStack"
                  placeholder={freelancer.techStack}
                  disabled
                />
              </div>
            </div>
          </div>
          {/* Form to Collect Details (acc-cont-2) */}
          <div className="update-container">
            <div className="acc-cont-2">
              <form
                className="freelancer-form"
                onSubmit={handleSubmit(onFormSubmit)}
              >
                <div className="info-head-1">
                  <h1>Update your Informtaion</h1>
                </div>
                <div className="form-item-container">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder={freelancer.username}
                    {...register("username", updateOptions.username)}
                  />
                </div>
                <div className="form-item-container">
                  <label htmlFor="projects">Previously Worked Projects:</label>
                  <textarea
                    id="projects"
                    name="projects"
                    placeholder={freelancer.workedProjects}
                    {...register(
                      "workedProjects",
                      updateOptions.workedProjects
                    )}
                  ></textarea>
                </div>
                <div className="form-item-container">
                  <label htmlFor="techStack">Proficiency in Tech Stack:</label>
                  <input
                    type="text"
                    id="techStack"
                    name="techStack"
                    placeholder={freelancer.techStack}
                    {...register("techStack", updateOptions.techStack)}
                  />
                </div>
                <div className="form-item-container">
                  <label htmlFor="mobile">Phone Number:</label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    placeholder={freelancer.phone_number}
                    pattern="[0-9]{10}"
                    {...register("phone_number", updateOptions.phone_number)}
                  />
                </div>
                <div className="form-item-container">
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={freelancer.email}
                    {...register("email", updateOptions.email)}
                  />
                </div>
                <div className="form-item-container">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder={freelancer.address}
                    {...register("address", updateOptions.address)}
                  />
                </div>

                {/* Profile Image Upload Section */}
                <div className="form-item-container">
                  <label htmlFor="profileImage">Upload Profile Picture:</label>
                  <input
                    type="file"
                    id="fimage"
                    name="fimage"
                    // accept="image/*"
                    {...register("fimage", updateOptions.fimage)}
                  />
                </div>
                <div className="up-btn-cont">
                  <button type="submit" className="submit-btn">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;
