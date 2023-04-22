import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSignOut } from "react-auth-kit";
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
  const navigate = useNavigate();
  const signOut = useSignOut();

  const handleLogout = async () => {
    navigate("/");
    signOut();
  };
  return (
    <div className="sidebar">
      <Link to="/dashboard" className="sidebar__logoContainer">
        <img src={logo} alt="logo" className="sidebar__logo" />
        <span className="sidebar__logoTitle">EatMan Eatery</span>
      </Link>
      <ul className="nav-menu">
        <li className="nav-list">
          <Link to="/dashboard" className="nav-link">
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
          <Link to="/records/orders" className="nav-link">
            <FontAwesomeIcon icon={faBook} className="fontawesomeIcon" /> View
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
            EOD
          </Link>
        </li>
        <li className="nav-list">
          <div className="nav-link">
            <FontAwesomeIcon icon={faUserGear} className="fontawesomeIcon" />
            <button onClick={handleLogout} className="text-white"> Logout</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
