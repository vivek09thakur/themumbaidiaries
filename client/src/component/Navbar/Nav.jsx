import { HashLink } from "react-router-hash-link";
import { MdOutlineRssFeed } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { RiContactsLine } from "react-icons/ri";
import "./Nav.css";

const navItems = [
  { to: "#feed", icon: MdOutlineRssFeed, label: "Feed" },
  { to: "/#share-a-story", icon: HiMiniPencilSquare, label: "Share a Story" },
  { to: "/#about", icon: BiBookContent, label: "About" },
  { to: "/#contact", icon: RiContactsLine, label: "Support" },
];

const NavBar = () => {
  return (
    <div className="nav">
      <div className="nav-links">
        {navItems.map((item, index) => (
          <HashLink key={index} to={item.to}>
            <item.icon
              style={{
                fontSize: "1.2rem",
                marginBottom: "-.2rem",
                marginRight: ".3rem",
              }}
            />
            {item.label}
          </HashLink>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
