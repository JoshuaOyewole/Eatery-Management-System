import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profilePix from "../../assets/images/logo.png";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import { useAppSelector } from "../../redux/hooks/hooks";
import { MdKeyboardArrowDown } from "react-icons/md";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import Logout from "../../components/Logout/index"
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { children } = props;
  const [toggleMenu, setToggleMenu] = useState(false)
  const details = useAppSelector(state => state.auth.user?.details);

  const toggleDropdown = () => {
    setToggleMenu(!toggleMenu)
  }


  return (
    <div className="dashboard__container">
      <Sidebar />
      <div className="dashboard-right">
        <header className="navbar-header">
          <div className="user">
            <div className="profile-pix">
              <img
                src={profilePix}
                alt="Profile Pixs"
                className="profilePixs"
              />
              <button onClick={toggleDropdown} className="username">{details?.firstname}. {details?.lastname?.slice(0, 1)} <MdKeyboardArrowDown /></button>
            </div>
            {toggleMenu && <ul className="user__dropdown">
              <li>
                <div>
                  <FontAwesomeIcon icon={faUserGear} className="fontawesomeIcon" />
                  <Logout />
                </div>
              </li>
            </ul>}
          </div>
        </header>
        {children}

        {/* 
        IMPROVEMENT -- 16th Oct 2022, 8:19PM
        The dashboard headings and paragraphs should be passed as props here since they are reusable.
        Instead of passing Children, a prop can replaced it and take the main as a prop and the dashboard heading, paragraphs as props also */}
      </div>
    </div>
  );
};

export default DashboardLayout;
