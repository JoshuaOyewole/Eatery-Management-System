import { useEffect, useState } from "react";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../ViewRecords/_viewRecord.module.scss";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table/table";
import { toast, ToastContainer } from "react-toastify";
import TableRow from "../../components/ui/Table/tablebody";
import TableStyles from "../../components/ui/Table/_table.module.scss";
import { StaffProps } from "../../utils/types";

function DeleteStaff() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState<StaffProps[]>([]);
  /* TABLE HEADER */
  const [tableHeader] = useState([
    "sn",
    "Fullnames",
    "Email",
    "Gender",
    "Phone",
    "state",
    "Action",
  ]);

  /* FETCH Staff*/
  const fetchStaff = async () => {
    const response = await axios.get(`https://eatman-api.onrender.com/api/staff`,
    {
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } 
    });
    setStaff(response?.data);
    //setLoading(false);
  };
  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDeleteStaff = async (id: any) => {
    try {
      const response= await axios.delete(
        `https://eatman-api.onrender.com/api/staff/${id}`,
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } 
        }
      );

      toast.success(response?.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchStaff();
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <DashboardLayout>
        <main className="dashboard__content">
          <div className="flex space-between mt-s">
            <div className="dashboard__content--top col ">
              <h2 className="dashboard__heading uppercase underline mt-s">
                Delete Staff
              </h2>
            </div>
            <div>
              <div></div>
              <Button
                text={"GO BACK"}
                handleClick={() => navigate(-1)}
                classname={"primary-btn"}
              />
            </div>
          </div>
          <div className={Styles.userDetailsContainer}>
            <section
              className={`${TableStyles.table_container} ${TableStyles.tableContainer} `}
            >
              {staff.length > 0 ? (
                <Table tableHeader={tableHeader}>
                  {staff.map((staff, index) => {
                    const {_id:id, firstname, lastname, email, gender, phone, state } =
                      staff;
                    return (
                      <TableRow key={index}>
                        <td>{index + 1}</td>
                        <td>{firstname} {lastname}</td>
                        <td>
                          {email}
                        </td>
                        <td>
                          {gender}
                        </td>
                        <td>
                          {phone}
                        </td>
                        <td>
                          {state}
                        </td>
                        <td>
                          <Button
                            text={"Delete staff"}
                            handleClick={() => handleDeleteStaff(id)}
                            classname={"danger-btn primary-btn__small"}
                          />
                        </td>
                      </TableRow>
                    );
                  })}
                </Table>
              ) : (
                <h2>No staff Found!</h2>
              )}
            </section>
          </div>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </DashboardLayout>
    </>
  );
}

export default DeleteStaff;
