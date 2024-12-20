import { useForm } from "react-hook-form";
import "./listedProject.css";
import { useState } from "react";

function ListedProject() {
  const { register, handleSubmit } = useForm();
  const [toDisplayContent, setToDisplayContent] = useState(false);
  const [toDisplayEditForm, setToDisplayEditForm] = useState(false);

  const onViewProjectDetailSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="listed-project-container">
      <div className="taskbar">
        <span className="p-listed-slno">1</span>
        <span className="p-listed-title">
          Some Title Lorem ipsum dolor, sit amet
        </span>
        {/* <span className="p-listed-deadline">Deadline: 21/03/12</span> */}
        <span
          className="p-listed-status"
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
        <span>Delete</span>
      </div>
      <div
        className="listed-other-contents"
        style={{ display: toDisplayContent ? "block" : "none" }}
      >
        <div className="p-listed-stack">Tech stack: MERN</div>
        <div className="p-listed-desc">
          <span>Project Description: </span>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
          magnam itaque soluta fugit, at consequatur dolores veniam vitae libero
          earum facere expedita iste animi ad placeat suscipit dolorem? Ex
          soluta incidunt cum quidem dolorum eveniet rem doloribus ab veniam.
          Eaque excepturi inventore labore! Itaque corrupti eum dolores aut
          blanditiis quo nulla nihil culpa quae minima sed doloribus unde, quod,
          accusamus excepturi dolorem iure nam inventore placeat nostrum, eius
          aspernatur voluptas. In, esse a iure culpa fuga dolorum autem tenetur
          magni vitae, vel voluptatibus! Impedit, minus nemo! Maiores dolore
          veniam, earum quas eius aspernatur similique omnis laudantium
          voluptates, alias nesciunt quibusdam. Officia numquam maiores quia
          eveniet, vitae laudantium assumenda animi id perspiciatis quod dolor
          repellat laborum earum corrupti qui debitis nulla fugiat ipsa alias
          asperiores fuga. Aspernatur eos cumque facilis possimus autem ratione
          placeat corrupti quos, iusto in odio, aliquid sunt velit. Quis animi
          facilis illo eos ut qui quidem sint vero, corporis consectetur
          officiis totam laudantium, eaque quod magni ab, accusamus blanditiis
          maiores est corrupti ratione quam! Non consectetur repellendus ex
          eveniet, maiores laudantium rem nihil dolore? Vel, praesentium!
          Doloribus, aliquid, quidem, id perferendis praesentium quasi
          repudiandae iste quibusdam accusantium excepturi voluptates eligendi!
          Labore totam nulla illum impedit necessitatibus illo!
        </div>
        <div>Deadline: 21/02/12</div>
        <div>Freelancer: Waiting</div>
        <div>Status: Waiting</div>
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
    </div>
  );
}

export default ListedProject;
