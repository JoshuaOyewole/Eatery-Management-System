import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Input from "../../components/forms/formInput/Index";
import Button from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";

type MealProps = {
  title?: string,
  price?: number,
  category?: string,
  description?:string
};

const initialState = {};

function UpdateMeal() {
  const navigate = useNavigate();
  const { id } = useParams(); //Meal ID
  /* CURRENT VALUE WHICH WILL BE USED FOR THE INPUT PLACEHOLDER */
  const [meal, setMeal] = useState<MealProps>(initialState);
  /* NEW VALUE'S WHICH WILL BE SENT VIA THE API ENDPOINT */
  const [payload, setPayload] = useState<MealProps>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/api/meal/${id}`,
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } 
        });
        setMeal(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeal();
  },[id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3100/api/meal/${id}`,
        {
          title: payload.title,
          price: payload.price,
        }
      );

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
              <h2 className="dashboard__heading uppercase underline">
                Update Meal
              </h2>
              <p className="mt-s">
                Kindly insert the Meal Name and Price to Update Meal
              </p>
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

          <form className="login-form" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="title"
              value={payload.title}
              placeholder={meal.title}
              labelName="Meal Name"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="price"
              value={payload.price}
              onChange={handleChange}
              placeholder={meal.price?.toString()}
              labelName="Meal price"
              required
            />
            <Input
              type="text"
              name="description"
              value={payload.description}
              onChange={handleChange}
              placeholder={meal.description}
              labelName="Description"
              required
            />
            <Input type="submit" value="Update" className="btn primary-btn" />
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

export default UpdateMeal;
