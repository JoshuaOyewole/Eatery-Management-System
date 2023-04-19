import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../components/forms/formInput/Index";
import { useParams } from "react-router-dom";

type MealProps = {
  name: string;
  price: Number;
};

const initialState = { name: "", price: 0 };

function Update({}) {
  const [meal, setMeal] = useState<MealProps>(initialState);
  
  const {mealId} = useParams();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeal({
      ...meal,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3100/api/meal/${mealId}`, {
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

  console.log(mealId);
  


  return (
    <>
      <div className="dashboard__content--top col ">
        <h2 className="dashboard__heading uppercase underline">Update Meal</h2>
        <p className="mt-s">
          Kindly insert the Meal Name and Price to Update Existing Meal
        </p>
      </div>
      <form className="login-form w-100" onSubmit={handleSubmit}>
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
        <Input type="submit" value="Update" className="btn primary-btn" />
      </form>
    </>
  );
}

export default Update;
