import { useEffect, useState } from "react";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import Styles from "../ViewRecords/_viewRecord.module.scss";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table/table";
import TableRow from "../../components/ui/Table/tablebody";
import TableStyles from "../../components/ui/Table/_table.module.scss";
import { Spinner } from "../../components/ui/Spinner/Spinner"
import { fetchStaffs } from "../../redux/features/staffs/staffSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";



function ViewStaffs() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const staffData = useAppSelector((state) => state.staff);

  /* TABLE HEADER */
  const [tableHeader] = useState([
    "sn",
    "Fullnames",
    "Email",
    "Gender",
    "Phone",
    "state"
  ]);

  useEffect(() => {

    /* FETCH staffs*/
    dispatch(fetchStaffs());
  }, []);


  return (
    <>
      {
        staffData.loading ? <Spinner /> : <DashboardLayout>
          <main className="dashboard__content">
            <div className="flex space-between mt-s">
              <div className="dashboard__content--top col ">
                <h2 className="dashboard__heading uppercase underline mt-s">
                  View staffs
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

                {staffData.staffs.length > 0 ? (
                  <Table tableHeader={tableHeader}>
                    {staffData.staffs?.map((staff, index) => {
                      const { firstname, lastname, email, gender, phone, state } = staff;
                      return (
                        <TableRow key={index}>
                          <td>{index + 1}</td>
                          <td>{firstname} {lastname}</td>
                          <td>
                            {email}
                          </td>
                          <td>{gender}</td>
                          <td>{phone}</td>
                          <td>{state}</td>
                        </TableRow>
                      );
                    })}
                  </Table>
                ) : (
                  <h2>No Staff Found!</h2>
                )}
              </section>
            </div>
          </main>
        </DashboardLayout>
      }
    </>
  );
}

export default ViewStaffs;
