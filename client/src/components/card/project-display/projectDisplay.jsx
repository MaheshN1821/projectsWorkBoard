import "./projectDisplay.css";

function ProjectDisplay() {
  return (
    <div className="p-card-wrapper" style={{ width: !false ? "100%" : "50%" }}>
      <div className="outer-cont">
        <div className="proj-title">Some Title</div>
        <div className="p-desc">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
          commodi reprehenderit doloremque! Laboriosam ex, ipsam illo quae
          beatae, et vel consequatur esse impedit perferendis nostrum!
        </div>
        <div className="other-contents">
          <div className="p-stack">
            <b>Tech Stack:</b> Mern Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Eaque, hic.
          </div>
          <div className="p-time">
            <b>Deadline:</b> 20/12/2024
          </div>
        </div>
        <div className="know-more">Click here to know more!</div>
      </div>
    </div>
  );
}

export default ProjectDisplay;
