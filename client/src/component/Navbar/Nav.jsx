import { HashLink } from "react-router-hash-link";
import "./Nav.css";

const NavBar = () => {
  return (
    <>
      <div className="nav">
        <div className="nav-links">
          <HashLink to="/#home">Home</HashLink>
          <HashLink to="/#about">About</HashLink>
          <HashLink to="/#share-a-story">Share a Story</HashLink>
          <HashLink to="/#contact">Contact</HashLink>
        </div>
      </div>
    </>
  );
};

export default NavBar;
