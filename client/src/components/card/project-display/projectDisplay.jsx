import "./projectDisplay.css";

function ProjectDisplay({ toDisplay, setToDisplay }) {
  console.log(toDisplay);
  function handleInfoClick() {
    setToDisplay(true);
  }
  return (
    <div
      className="p-card-wrapper"
      style={{ width: toDisplay ? "100%" : "50%" }}
    >
      <div className="outer-cont">
        <div className="proj-title">Some Title</div>
        <div className="p-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias esse
          natus adipisci consequuntur, numquam voluptates eius vero, ab quam in
          possimus necessitatibus fuga repellat quo ut impedit, provident sunt.
          Optio dicta fugiat voluptatem cumque neque facere molestiae nobis
          corrupti laudantium modi. Repellat repellendus voluptas, quasi sunt
          magnam odio mollitia debitis error cum labore commodi est quisquam
          harum voluptate similique! Cum, pariatur dolore assumenda provident
          minus perspiciatis suscipit aliquam temporibus recusandae fugiat
          voluptatem beatae impedit amet sequi, aperiam veritatis rerum aliquid
          rem repellat obcaecati repudiandae eveniet odio? Reiciendis incidunt
          aliquam nobis id earum quia perspiciatis numquam consequatur vero
          sunt. Veritatis non sapiente minima veniam architecto maxime, quae
          asperiores natus repellat quidem dignissimos autem officia facere
          distinctio eos cumque accusantium eum iste pariatur voluptates
          voluptas numquam? Expedita adipisci, odit explicabo pariatur nam porro
          iste nemo distinctio earum illum assumenda ad ducimus quas quasi cum
          vitae eius iusto facilis voluptas. Itaque, repellendus dolore ipsa
          inventore quo ea numquam nihil minus, deleniti ex eaque labore non
          architecto recusandae provident ut delectus possimus sed veritatis
          consequatur? Saepe cum esse modi. Saepe libero consequatur quod illo
          earum dolores facere provident commodi quasi nemo perferendis nihil
          repudiandae quos quam voluptates officiis in, at, doloribus, ipsum
          eaque eveniet?
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
        <div className="know-more" onClick={handleInfoClick}>
          Click here to know more!
        </div>
      </div>
    </div>
  );
}

export default ProjectDisplay;
