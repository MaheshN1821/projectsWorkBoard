import { useState } from "react";
import Header from "../../components/header/header";
import "./manageAccount.css";

function ManageAccount() {
  // State to store freelancer data
  const [freelancer, setFreelancer] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profileImageURL: "https://via.placeholder.com/120", // Default placeholder
  });

  // State to handle form data
  const [formData, setFormData] = useState({
    name: "",
    projects: "",
    techStack: "",
    mobile: "",
    email: "",
    profileImage: null, // New state for profile image
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle profile image upload
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result, // Store the uploaded image URL
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // After form submission, update the freelancer state with submitted data
    setFreelancer({
      ...freelancer,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.mobile,
      profileImageURL: formData.profileImage || freelancer.profileImageURL, // Use uploaded image if available
    });
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
                  backgroundImage: `url(${freelancer.profileImageURL})`,
                }}
              />
              <div className="info-item">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={freelancer.name}
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
                  placeholder={freelancer.phoneNumber}
                  disabled
                />
              </div>
            </div>

            {/* Form to Collect Details (acc-cont-2) */}
            <div className="acc-cont-2">
              <form className="freelancer-form" onSubmit={handleSubmit}>
                <div className="info-head-1">
                  <h1>Update your Informtaion</h1>
                </div>
                <div className="form-item-container">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-item-container">
                  <label htmlFor="projects">Previously Worked Projects:</label>
                  <textarea
                    id="projects"
                    name="projects"
                    value={formData.projects}
                    onChange={handleInputChange}
                    placeholder="Describe your previous projects"
                    required
                  ></textarea>
                </div>

                <div className="form-item-container">
                  <label htmlFor="techStack">Proficiency in Tech Stack:</label>
                  <input
                    type="text"
                    id="techStack"
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleInputChange}
                    placeholder="e.g., React, Node.js, Python"
                    required
                  />
                </div>

                <div className="form-item-container">
                  <label htmlFor="mobile">Mobile Number:</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div className="form-item-container">
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Profile Image Upload Section */}
                <div className="form-item-container">
                  <label htmlFor="profileImage">Upload Profile Picture:</label>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;

// import Header from "../../components/header/header";
// import "./manageAccount.css";

// function ManageAccount() {
//   return (
//     <div className="freelancerContainer">
//       <Header />
//       <div className="free-wrapper">
//         <div className="account-content">
//           <div className="acc-title">Your Information</div>
//           <div className="twoCont">
//             <div className="acc-cont-1"></div>
//             <div className="acc-cont-2"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManageAccount;

// {
//   /* <div>
//             <span>Name:</span>
//             <div>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 placeholder="mahesh"
//                 disabled
//               />
//             </div>
//           </div> */
// }
// //   <div class="mb-3 row">
// //     <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
// //     <div class="col-sm-10">
// //       <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
// //     </div>
// //   </div>
// //   <div class="mb-3 row">
// //     <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
// //     <div class="col-sm-10">
// //       <input type="password" class="form-control" id="inputPassword">
// //     </div>
// //   </div>
