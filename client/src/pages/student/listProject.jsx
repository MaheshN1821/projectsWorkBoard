import Header from "../../components/header/header";
import { useForm } from "react-hook-form";
import "./listProject.css";
import api from "../../utils/api.js";

function ListProject() {
  const { register, handleSubmit } = useForm();

  const onProjectDetailSubmit = async (data) => {
    const usrId = sessionStorage.getItem("studentId");

    const newData = { ...data, userID: usrId };

    try {
      const response = await api.post("/student/project-details", newData);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
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
            <p className="form-heading">Price Range </p>
            <div className="single-form-cont-price">
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
