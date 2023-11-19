import { useEffect, useState } from "react";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../ViewRecords/_viewRecord.module.scss";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table/table";
import TableRow from "../../components/ui/Table/tablebody";
import TableStyles from "../../components/ui/Table/_table.module.scss";
import Swal from "sweetalert2";
import { Spinner } from "../../components/ui/Spinner/Spinner";
import { mealProps } from "../../utils/types";
let baseURL = "https://eatman-api.onrender.com/api";

function DeleteMeal() {
  const navigate = useNavigate();
  const [meals, setMeal] = useState<mealProps[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  /* TABLE HEADER */
  const [tableHeader] = useState(["sn", "Name of Meal", "Price", "Action"]);

  /* FETCH MEALS*/
  const fetchMeals = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${baseURL}/meal`,
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });
      setMeal(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  const handleDeleteMeal = async (_id: string) => {
    setLoading(true)
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
        const response = await axios.delete(
          `${baseURL}/meal/${_id}`,
          {
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
          }
        );
        let data = await response.data;
        setLoading(true)
        fetchMeals();//Update Meals
        if (data.success) {
          Swal.fire({
            title: "Deleted!",
            text: `${data.message}`,
            icon: "success",
          });
        }
      }

    } catch (error) {
      Swal.fire({
        title: "Unable to Delete!",
        text: `${error}`,
        icon: "error",
      });
    }
    setLoading(false)
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
            {loading ? <Spinner /> : (
              <section
                className={`${TableStyles.table_container} ${TableStyles.tableContainer} `}
              >
                {meals.length > 0 ? (
                  <Table tableHeader={tableHeader}>
                    {meals?.map((meal, index) => {
                      const { _id, title, price } = meal;
                      return (
                        <TableRow key={index}>
                          <td>{index + 1}</td>
                          <td>{title}</td>
                          <td>
                            <>&#8358; {price}</>
                          </td>
                          <td>
                            <Button
                              text={"Delete Meal"}
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
              </section>)}
          </div>
        </main>
      </DashboardLayout>
    </>
  );
}

export default DeleteMeal;
