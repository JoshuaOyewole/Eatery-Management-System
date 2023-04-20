import profilePix from "../../assets/images/logo.png";
import Sidebar from "../../components/layout/sidebar/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { children } = props;
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
              <p className="username">Orisfina</p>
            </div>
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
