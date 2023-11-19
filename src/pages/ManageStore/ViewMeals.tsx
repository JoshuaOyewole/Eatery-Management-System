import { useEffect, useState } from "react";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import Styles from "../ViewRecords/_viewRecord.module.scss";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table/table";
import TableRow from "../../components/ui/Table/tablebody";
import TableStyles from "../../components/ui/Table/_table.module.scss";
import { Spinner } from "../../components/ui/Spinner/Spinner"
import { getMeals } from "../../redux/features/meal/mealSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";




function ViewMeals() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
const mealData = useAppSelector((state) => state.meal);


  /* TABLE HEADER */
  const [tableHeader] = useState([
    "sn",
    "Name of Meal",
    "Price",
  ]);

  useEffect(() => {
    dispatch(getMeals());
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
              {mealData.meals.length > 0 ?
                (
                  <Table tableHeader={tableHeader}>
                    {mealData.meals?.map((meal, index) => {
                      const { title, price } = meal;
                      return (
                        <TableRow key={index}>
                          <td>{index + 1}</td>
                          <td>{title}</td>
                          <td>
                            <>&#8358; {price}</>
                          </td>
                        </TableRow>
                      );
                    })}
                  </Table>
                ) : <Spinner />}
            </section>
          </div>
        </main>
      </DashboardLayout>
    </>
  );
}

export default ViewMeals;
