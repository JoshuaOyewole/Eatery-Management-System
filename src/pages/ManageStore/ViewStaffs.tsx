import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../ViewRecords/_viewRecord.module.scss";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table/table";
import TableRow from "../../components/ui/Table/tablebody";
import TableStyles from "../../components/ui/Table/_table.module.scss";

type staffProps = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  homeAddress: string;
  state: string;
  lga: string;
  dob: Date;
  passport:string,
};

function ViewStaffs() {
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState<staffProps[]>([]);
  /* TABLE HEADER */
  const [tableHeader] = useState([
    "sn",
    "Fullnames",
    "Email",
    "Gender",
    "Phone",
    "state"
  ]);

  /* FETCH staffs*/
  const fetchStaffs = async () => {
    const response = await axios.get(`http://localhost:3100/api/staff`);
    setStaffs(response?.data);
    //setLoading(false);
  };
  useEffect(() => {
    fetchStaffs();
  }, []);

  return (
    <>
      <DashboardLayout>
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
              {staffs.length > 0 ? (
                <Table tableHeader={tableHeader}>
                  {staffs?.map((staff, index) => {
                    const {  firstname,lastname,email,gender,phone,state } = staff;
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
                <h2>No Meal Found!</h2>
              )}
            </section>
          </div>
        </main>
      </DashboardLayout>
    </>
  );
}

export default ViewStaffs;
