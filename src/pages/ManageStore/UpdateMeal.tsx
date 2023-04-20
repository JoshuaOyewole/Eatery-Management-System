import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../ViewRecords/_viewRecord.module.scss";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table/table";
import Update from "./Update";
import Modal from "./Modal";
import TableRow from "../../components/ui/Table/tablebody";
import TableStyles from "../../components/ui/Table/_table.module.scss";

type mealProps = {
  _id: string;
  name: string;
  price: Number;
};

function UpdateMeal() {
  const navigate = useNavigate();
  const [meals, setMeal] = useState<mealProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleUpdateMeal = (_id: string) => {
    navigate(`${_id}`)
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <DashboardLayout>
        <main className="dashboard__content">
          <div className="flex space-between mt-s">
            <div className="dashboard__content--top col ">
              <h2 className="dashboard__heading uppercase underline mt-s">
                Update Meal
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
                            handleClick={() => handleUpdateMeal(_id)}
                            classname={"primary-btn primary-btn__small"}
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
          {/* MODAL FOR UPDATE MEAL*/}
          {isModalOpen && (
            <Modal
              updateModalOpen={setIsModalOpen}
              isModalOpen
              Component={Update}
            />
          )}
        </main>
      </DashboardLayout>
    </>
  );
}

export default UpdateMeal;
