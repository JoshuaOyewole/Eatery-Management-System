import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logout from "../../Logout/index"

import {
  faHouseChimney,
  faCartShopping,
  faUserGear,
  faCreditCard,
  faFilePen,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/logo.png";

const Sidebar = () => {

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar__logoContainer">
        <img src={logo} alt="logo" className="sidebar__logo" />
        <span className="sidebar__logoTitle">EatMan Eatery</span>
      </Link>
      <ul className="nav-menu">
        <li className="nav-list">
          <Link to="/" className="nav-link">
            <FontAwesomeIcon
              icon={faHouseChimney}
              className="fontawesomeIcon"
            />
            Dashboard
          </Link>
        </li>
        <li className="nav-list">
          <Link to="/order-meal" className="nav-link">
            <FontAwesomeIcon icon={faCreditCard} className="fontawesomeIcon" />
            Make an Order
          </Link>
        </li>
        <li className="nav-list">
          <Link to="/orders" className="nav-link">
            <FontAwesomeIcon icon={faBook} className="fontawesomeIcon" /> My
            Orders
          </Link>
        </li>
        <li className="nav-list">
          <Link to="/manage-store" className="nav-link">
            {" "}
            <FontAwesomeIcon
              icon={faFilePen}
              className="fontawesomeIcon"
            />{" "}
            Manage Store (Admin)
          </Link>
        </li>
        <li className="nav-list">
          <Link to="/eod" className="nav-link">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="fontawesomeIcon"
            />{" "}
            Reports
          </Link>
        </li>
        <li className="nav-list d-none">
          <div className="nav-link">
            <FontAwesomeIcon icon={faUserGear} className="fontawesomeIcon" />
            <Logout className="text-white"/>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
