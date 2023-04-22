import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../ViewRecords/_viewRecord.module.scss";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table/table";
import TableRow from "../../components/ui/Table/tablebody";
import TableStyles from "../../components/ui/Table/_table.module.scss";

type mealProps = {
  _id: string;
  name: string;
  price: Number;
};

function ViewMeals() {
  const navigate = useNavigate();
  const [meals, setMeal] = useState<mealProps[]>([]);
  /* TABLE HEADER */
  const [tableHeader] = useState([
    "sn",
    "Name of Meal",
    "Price",
  ]);

  /* FETCH MEALS*/
  const fetchMeals = async () => {
    const response = await axios.get(`http://localhost:3100/api/meal`);
    setMeal(response?.data);
    //setLoading(false);
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <>
      <DashboardLayout>
        <main className="dashboard__content">
          <div className="flex space-between mt-s">
            <div className="dashboard__content--top col ">
              <h2 className="dashboard__heading uppercase underline mt-s">
                View Meals
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
                    const { name, price } = meal;
                    return (
                      <TableRow key={index}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>
                          <>&#8358; {price}</>
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
      </DashboardLayout>
    </>
  );
}

export default ViewMeals;
