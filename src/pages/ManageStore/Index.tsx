import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faFolderOpen,faUserNurse,faTrashArrowUp, faUserXmark,faUtensils,faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import ManageStyles from "./_storeBox.module.scss";

import Box from "./Box";

const ManageStore = () => {
  /* 
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState(''); 
    */

  return (
    <>
      <DashboardLayout>
        <main className="dashboard__content">
          <div className="dashboard__content--top col ">
            <h2 className="dashboard__heading">Manage Store</h2>
            <p className="mt-s">
              The buttons below show a few things you can do right away
            </p>
          </div>
          <div className="dashboard__box-container">
            <Box
              boxStyle={ManageStyles["manage-storeBox"]}
              link="add-meal"
              value={"Add Meal"}
              
              icon={<FontAwesomeIcon icon={faUtensils} className={ManageStyles['manage-storeBox__icon']} />}
              hClass={ManageStyles['manage-storeBox__header']}
            />
            <Box
              boxStyle={ManageStyles["manage-storeBox"]}
              link="update-meal"
              value={"Update Meal"}
              icon={<FontAwesomeIcon icon={faFilePen} className={ManageStyles['manage-storeBox__icon']} />}
              hClass={ManageStyles['manage-storeBox__header']}
            />
            <Box
              boxStyle={ManageStyles["manage-storeBox"]}
              value={"Delete Meal"}
              link="delete-meal"
              icon={
                <FontAwesomeIcon
                  icon={faTrashArrowUp}
                  className={ManageStyles['manage-storeBox__icon']}
                />
              }
              hClass={ManageStyles['manage-storeBox__header']}
            />
            <Box
              boxStyle={ManageStyles["manage-storeBox"]}
              value={"View Meals"}
              link="view-meals"
              icon={
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  className={ManageStyles['manage-storeBox__icon']}
                />
              }
              hClass={ManageStyles['manage-storeBox__header']}
            />
        </div>
        <div className="dashboard__box-container mt-m justify-start">
            <Box
              boxStyle={ManageStyles["manage-storeBox"]}
              value={"Add Staff"}
              link="add-staff"
              icon={
                <FontAwesomeIcon
                  icon={faUserNurse}
                  className={ManageStyles['manage-storeBox__icon']}
                />
              }
              hClass={ManageStyles['manage-storeBox__header']}
            />
            <Box
              boxStyle={ManageStyles["manage-storeBox"]}
              value={"Delete Staff"}
              link="delete-staff"
              icon={
                <FontAwesomeIcon
                  icon={faUserXmark}
                  className={ManageStyles['manage-storeBox__icon']}
                />
              }
              hClass={ManageStyles['manage-storeBox__header']}
            />
            <Box
              boxStyle={ManageStyles["manage-storeBox"]}
              value={"View All Staff"}
              link="view-staffs"
              icon={
                <FontAwesomeIcon
                  icon={faUsersViewfinder}
                  className={ManageStyles['manage-storeBox__icon']}
                />
              }
              hClass={ManageStyles['manage-storeBox__header']}
            />
            {/* <Box
              boxStyle={ManageStyles["manage-storeBox"]}
              value={"Update Meal"}
              link="update-staff"
              hClass={ManageStyles['manage-storeBox__header']}
              icon={
                <FontAwesomeIcon
                  icon={faFilterCircleXmark}
                  className={ManageStyles['manage-storeBox__icon']}
                />
              }
            /> */}
          </div>
        </main>
      </DashboardLayout>
    </>
  );
};

export default ManageStore;
