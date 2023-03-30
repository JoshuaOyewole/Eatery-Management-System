import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouseChimney,
  faCartShopping,
  faUserGear,
  faCreditCard,
  faFilePen,
  faBook
} from "@fortawesome/free-solid-svg-icons";
const logo =require("../../../assets/images/logo.png")

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to="/dashboard" className="sidebar__logoContainer">
      <img src={logo} alt="logo" className='sidebar__logo' /> 
      <span className="sidebar__logoTitle">
        Rukky Cuisine MS
      </span>
      </Link>
      <ul className='nav-menu'>
        <li className="nav-list">
          <Link to="/dashboard" className="nav-link">
            <FontAwesomeIcon icon={faHouseChimney} className='fontawesomeIcon' />
            Dashboard
          </Link>
        </li>
        <li className="nav-list">

          <Link to="/order-meal" className="nav-link">
            <FontAwesomeIcon icon={faCreditCard} className='fontawesomeIcon' />
            Make an Order
          </Link>
        </li>
        <li className="nav-list">

          <Link to="/records/orders" className="nav-link"><FontAwesomeIcon icon={faBook} className='fontawesomeIcon' /> View Orders</Link>
        </li>
        <li className="nav-list">

          <Link to="/manage-orders" className="nav-link"> <FontAwesomeIcon icon={faFilePen} className='fontawesomeIcon' /> Manage Store</Link>
        </li>
        <li className="nav-list">

          <Link to="/eod" className="nav-link"><FontAwesomeIcon icon={faCartShopping} className='fontawesomeIcon' /> EOD</Link>
        </li>
        <li className="nav-list">

          <Link to="/profile" className="nav-link"><FontAwesomeIcon icon={faUserGear} className='fontawesomeIcon' /> Profile</Link>
        </li>
        
      </ul>
    </div>
  )
}

export default Sidebar
