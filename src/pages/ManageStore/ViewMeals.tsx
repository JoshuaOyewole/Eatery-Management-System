import { useEffect, useState } from "react";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../ViewRecords/_viewRecord.module.scss";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table/table";
import TableRow from "../../components/ui/Table/tablebody";
import TableStyles from "../../components/ui/Table/_table.module.scss";
import Spinner from "../../components/ui/Spinner/Spinner"
import { mealProps } from "../../utils/types";



function ViewMeals() {
  const navigate = useNavigate();
  const [meals, setMeal] = useState<mealProps[]>([]);
  //const count = useSelector((state: RootState) => state.counter.value);


  /* TABLE HEADER */
  const [tableHeader] = useState([
    "sn",
    "Name of Meal",
    "Price",
  ]);

  /* FETCH MEALS*/
  const fetchMeals = async () => {
    //Get Token from localStorage
    let token = localStorage.getItem('token');

    const response = await axios.get(`https://eatman-api.onrender.com/api/meal`,
      {
        headers: { "Authorization": `Bearer ${token}` } 
      });
    //Update the meals object
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
              {meals.length > 0 ?
               (
                <Table tableHeader={tableHeader}>
                  {meals?.map((meal, index) => {
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
