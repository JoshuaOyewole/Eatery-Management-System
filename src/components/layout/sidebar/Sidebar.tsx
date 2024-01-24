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
import { useAppSelector } from "../../../redux/hooks/hooks";

const Sidebar = () => {
  const rank = useAppSelector(state => state.auth.user.rank);


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
            <span className="sidebar__nav_label">Dashboard</span>
          </Link>
        </li>
        <li className="nav-list">
          <Link to="/order-meal" className="nav-link">
            <FontAwesomeIcon icon={faCreditCard} className="fontawesomeIcon" />
            <span className="sidebar__nav_label">Make an Order</span>
          </Link>
        </li>
        <li className="nav-list">
          <Link to="/orders" className="nav-link">
            <FontAwesomeIcon icon={faBook} className="fontawesomeIcon" />
            <span className="sidebar__nav_label"> My Orders</span>
          </Link>
        </li>
        {
          rank == "admin" && <li className="nav-list">
            <Link to="/manage-store" className="nav-link">
              {" "}
              <FontAwesomeIcon
                icon={faFilePen}
                className="fontawesomeIcon"
              />{" "}
              <span className="sidebar__nav_label">Manage Store (Admin)</span>
            </Link>
          </li>
        }

        <li className="nav-list">
          <Link to="/eod" className="nav-link">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="fontawesomeIcon"
            />{" "}
            <span className="sidebar__nav_label">Reports</span>
          </Link>
        </li>
        <li className="nav-list d-none">
          <div className="nav-link">
            <FontAwesomeIcon icon={faUserGear} className="fontawesomeIcon" />
            <Logout className="text-white" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
