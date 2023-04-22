import Logout from "../../components/Logout/index"
import Sidebar from '../../components/layout/sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";

const ViewOrderLayout = () => {

  return (
    <div className='dashboard__container'>
      <Sidebar />
      <div className='dashboard-right'>
        <header className='navbar-header'>
          <ul>
            <li className="navbar-list__header">
              
             <Logout className='uppercase font-bold' component={ <FontAwesomeIcon icon={faRightFromBracket} className='navbar__logoutBtn navbar__logoutIcon' />}/>
            </li>
          </ul>
        </header>
        <Outlet />

        {/* 
        IMPROVEMENT -- 16th Oct 2022, 8:19PM
        The dashboard headings and paragraphs should be passed as props here since they are reusable.
        Instead of passing Children, a prop can replaced it and take the main as a prop and the dashboard heading, paragraphs as props also */}
      </div>
    </div>
  )
};

export default ViewOrderLayout;
