import { useForm } from "react-hook-form";
import "./listedProject.css";
import { useState } from "react";
import api from "../../../utils/api";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function ListedProject({ list, index, setCount, count }) {
  const { register, handleSubmit } = useForm();
  const [toDisplayContent, setToDisplayContent] = useState(false);
  const [toDisplayEditForm, setToDisplayEditForm] = useState(false);

  const notifyFailure = () => toast.error("There was an error!Try again later");
  const notifySuccess = () => toast.success("Project is Updated Successfully!");
  const notifyInfo = () => toast.info("Project Deleted Successfully!");

  const onViewProjectDetailSubmit = async (data) => {
    const usrId = sessionStorage.getItem("studentId");
    const newData = { ...data, userID: usrId, listId: list?._id };
    try {
      const response = await api.post(
        "/student/project-details-update",
        newData
      );
      console.log(response);
      notifySuccess();
      count < 1000 ? setCount(count + 1) : setCount(1);
    } catch (err) {
      notifyFailure();
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.post(
        "/student/project-details-deletion",
        list
      );
      console.log(response);
      count < 1000 ? setCount(count + 1) : setCount(1);
      notifyInfo();
    } catch (err) {
      console.log(err);
      notifyFailure();
    }
  };

  return (
    <div className="listed-project-container">
      <div className="taskbar">
        <span className="p-listed-slno">{index + 1}</span>
        <span className="p-listed-title">{list?.project_title}</span>
        {/* <span className="p-listed-deadline">Deadline: 21/03/12</span> */}
        <span className="opt-container">
          <span
            className="p-listed-full"
            onClick={() => setToDisplayContent(!toDisplayContent)}
          >
            View Full
          </span>
          <span
            className="p-listed-edit"
            onClick={() => setToDisplayEditForm(!toDisplayEditForm)}
          >
            Edit
          </span>
          <span className="p-listed-delete" onClick={handleDelete}>
            Delete
          </span>
        </span>
      </div>
      <div
        className="listed-other-contents"
        style={{ display: toDisplayContent ? "block" : "none" }}
      >
        {/* <div className="p-listed-stack">Tech stack: MERN</div> */}
        <div className="v-listed-desc">
          <span>Project Description: </span>
          {list?.project_description}
        </div>
        {/* <div>Deadline: 21/02/12</div>
        <div>Freelancer: Waiting</div>
        <div>Status: Waiting</div> */}
        <div className="v-ad">
          <div className="v-side-stack">
            <span className="v-dd">Tech Stack: </span>
            {list?.techStack}
          </div>
          <div className="v-side-deadline">
            <span className="v-dd">Deadline: </span>
            {list?.deadline}
          </div>
        </div>
        <div className="v-ab">
          <div className="v-pp">
            <span className="v-dd">Price Range: </span>
            &#8377;{list?.min_price} - &#8377;
            {list?.max_price}
          </div>
          <div className="v-side-deadline">
            <span className="v-dd">Status: </span>
            {list?.status}
          </div>
        </div>
      </div>
      <div
        className="listed-edit-form"
        style={{ display: toDisplayEditForm ? "flex" : "none" }}
      >
        <form
          onSubmit={handleSubmit(onViewProjectDetailSubmit)}
          className="view-project-details-form"
        >
          <div className="view-single-form-cont">
            <p className="view-form-heading">Enter Project Title: </p>
            <input
              type="text"
              id="title"
              name="title"
              placeholder=" "
              {...register("title")}
              required
            />
          </div>
          <div className="view-single-form-cont">
            <p className="view-form-heading">Enter Project Description: </p>
            <textarea
              id="description"
              placeholder="In less than 200 words"
              className="view-textArea"
              required
              {...register("description")}
            />
          </div>
          <div className="view-single-form-cont">
            <p className="view-form-heading">Tech Stack required: </p>
            <input
              type="text"
              id="stack"
              name="stack"
              placeholder=" "
              {...register("stack")}
              required
            />
          </div>
          <div className="view-single-form-cont-date">
            <p className="view-form-heading">Price Range </p>
            <div className="v-single-form-cont-price">
              <select name="minprice" id="minprice" {...register("minprice")}>
                <option value="500">&#8377;500</option>
                <option value="1000">&#8377;1000</option>
                <option value="2000">&#8377;2000</option>
                <option value="3000">&#8377;3000</option>
              </select>
              <span> to </span>
              <select name="maxprice" id="maxprice" {...register("maxprice")}>
                <option value="500">&#8377;500</option>
                <option value="1000">&#8377;1000</option>
                <option value="2000">&#8377;2000</option>
                <option value="3000">&#8377;3000</option>
                <option value="4000">&#8377;4000</option>
                <option value="5000">&#8377;5000</option>
                <option value="6000">&#8377;6000</option>
                <option value="7000">&#8377;7000</option>
                <option value="8000">&#8377;8000</option>
                <option value="9000">&#8377;9000</option>
                <option value="10000">&#8377;10000</option>
              </select>
            </div>
          </div>
          <div className="view-single-form-cont-date">
            <p className="view-form-heading">Project to be completed by: </p>
            <input
              type="date"
              id="completion"
              name="completion"
              className="view-date"
              placeholder=" "
              {...register("completion")}
              required
            />
          </div>
          <button
            type="submit"
            className="view-form-btn"
            onSubmit={handleSubmit(onViewProjectDetailSubmit)}
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
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

export default ListedProject;
