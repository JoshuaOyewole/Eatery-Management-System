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
import Swal from "sweetalert2";
let baseURL = "https://eatman-api.onrender.com/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchStaffs } from "../../redux/features/staffs/staffSlice";
import { Spinner } from "../../components/ui/Spinner/Spinner";


function DeleteStaff() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false)
  const staffData = useAppSelector((state) => state.staff);
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


  useEffect(() => {
    /* FETCH Staff*/
    dispatch(fetchStaffs());
  }, []);

  const handleDeleteStaff = async (id: any) => {

    try {
      let res = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (res.isConfirmed) {
        let response = await axios.delete(
          `${baseURL}staff/${id}`,
          {
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
          }
        );
        let data = await response.data;
        if (data.success) {
          Swal.fire({
            title: "Deleted!",
            text: `${data.message}`,
            icon: "success",
          });
        }
        dispatch(fetchStaffs()); /* FETCH Staff*/
      }
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
              {staffData.loading ? <Spinner /> : staffData.staffs.length > 0 ? (
                <Table tableHeader={tableHeader}>
                  {staffData.staffs.map((staff, index) => {
                    const { _id: id, firstname, lastname, email, gender, phone, state } =
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
