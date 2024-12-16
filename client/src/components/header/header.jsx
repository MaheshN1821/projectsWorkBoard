import logo from "../../assets/images/logo.png";
import "./header.css";

function Header() {
  return (
    <header>
      <img src={logo} className="logo" alt="logo" />
      <p className="title">Projectsworkboard</p>
    </header>
  );
}

export default Header;
