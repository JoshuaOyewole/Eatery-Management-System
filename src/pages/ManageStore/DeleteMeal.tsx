import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../ViewRecords/_viewRecord.module.scss";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table/table";
import { toast, ToastContainer } from "react-toastify";
import TableRow from "../../components/ui/Table/tablebody";
import TableStyles from "../../components/ui/Table/_table.module.scss";

type mealProps = {
  _id: string;
  name: string;
  price: Number;
};

function DeleteMeal() {
  const navigate = useNavigate();
  const [meals, setMeal] = useState<mealProps[]>([]);
  /* TABLE HEADER */
  const [tableHeader] = useState(["sn", "Name of Meal", "Price", "Action"]);

  /* FETCH MEALS*/
  const fetchMeals = async () => {
    const response = await axios.get(`http://localhost:3100/api/meal`);
    setMeal(response?.data);
    //setLoading(false);
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  const handleDeleteMeal = async (_id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3100/api/meal/${_id}`
      );
      toast.success(`${response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });  
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
                Delete Meal
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
              {meals.length > 0 ? (
                <Table tableHeader={tableHeader}>
                  {meals?.map((meal, index) => {
                    const { _id, name, price } = meal;
                    return (
                      <TableRow key={index}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>
                          <>&#8358; {price}</>
                        </td>
                        <td>
                          <Button
                            text={"Update Meal"}
                            handleClick={() => handleDeleteMeal(_id)}
                            classname={"danger-btn primary-btn__small"}
                          />
                        </td>
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

export default DeleteMeal;
