import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Input from "../../components/forms/formInput/Index";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

type MealProps = {
  name: string;
  price: Number;
};

const initialState = { name: "", price: 0 };

function AddMeal() {
  const navigate =  useNavigate();
  const [meal, setMeal] = useState<MealProps>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeal({
      ...meal,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3100/api/meal`, {
        name: meal.name,
        price: meal.price,
      });

      if (response.data.success === true) {
        setMeal(initialState);
        toast.success(`${response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      const errMsg = error.response.data.message
        ? error.response.data.message
        : error.response.data;

      toast.error(`${errMsg}`, {
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
            <h2 className="dashboard__heading uppercase underline">Add Meal</h2>
            <p className="mt-s">
              Kindly insert the Meal Name and Price to add new Meals
            </p>
          </div>
          <div>
            <div>

            </div>
            <Button
            text={"GO BACK"}
            handleClick={() => navigate(-1)}
            classname={"primary-btn"}
          />
          </div>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              value={meal.name}
              placeholder="Enter meal name"
              labelName="Meal Name"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="price"
              value={meal.price}
              onChange={handleChange}
              placeholder="Price"
              labelName="Meal price"
              required
            />
            <Input type="submit" value="Add" className="btn primary-btn" />
          </form>
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

export default AddMeal;
