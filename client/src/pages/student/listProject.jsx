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
        <div className="p-title">Project Details:</div>
        <form
          onSubmit={handleSubmit(onProjectDetailSubmit)}
          className="project-details-form"
        >
          <div>
            <p>Enter project Title: </p>
            <input
              type="text"
              id="title"
              name="title"
              placeholder=" "
              {...register("title")}
            />
          </div>
          <div>
            <p>Enter project Description: </p>
            <input
              type="text"
              id="description"
              name="description"
              placeholder=" "
              {...register("description")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ListProject;
