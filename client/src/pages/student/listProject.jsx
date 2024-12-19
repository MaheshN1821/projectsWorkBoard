import Header from "../../components/header/header";
import { useForm } from "react-hook-form";
import "./listProject.css";

function ListProject() {
  const { register, handleSubmit } = useForm();

  const onProjectDetailSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="listContainer">
      <Header />
      <div className="project-details-container">
        <div className="p-title">Enter Project Details</div>
        <form
          onSubmit={handleSubmit(onProjectDetailSubmit)}
          className="project-details-form"
        >
          <div className="single-form-cont">
            <p className="form-heading">Enter Project Title: </p>
            <input
              type="text"
              id="title"
              name="title"
              placeholder=" "
              {...register("title")}
              required
            />
          </div>
          <div className="single-form-cont">
            <p className="form-heading">Enter Project Description: </p>
            <textarea
              id="description"
              placeholder="In less than 200 words"
              className="textArea"
              required
              {...register("description")}
            />
          </div>
          <div className="single-form-cont">
            <p className="form-heading">Tech Stack required: </p>
            <input
              type="text"
              id="stack"
              name="stack"
              placeholder=" "
              {...register("stack")}
              required
            />
          </div>
          <div className="single-form-cont-date">
            <p className="form-heading">Project to be completed by: </p>
            <input
              type="date"
              id="completion"
              name="completion"
              className="date"
              placeholder=" "
              {...register("completion")}
              required
            />
          </div>
          <button
            type="submit"
            className="form-btn"
            onSubmit={handleSubmit(onProjectDetailSubmit)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListProject;
