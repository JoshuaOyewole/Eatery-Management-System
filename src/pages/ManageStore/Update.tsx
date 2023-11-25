import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Input from "../../components/forms/formInput/Index";
import Button from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { MealProps } from "../../utils/types";
import { Spinner, SpinnerButton } from "../../components/ui/Spinner/Spinner";
const env = import.meta.env;


const initialState = {};

function UpdateMeal() {
  const navigate = useNavigate();
  const [loading, setIsloading] = useState(false)
  const { id } = useParams(); //Meal ID
  /* CURRENT VALUE WHICH WILL BE USED FOR THE INPUT PLACEHOLDER */
  const [meal, setMeal] = useState<MealProps>({} as MealProps);
  /* NEW VALUE'S WHICH WILL BE SENT VIA THE API ENDPOINT */
  //const [payload, setPayload] = useState<MealProps>({title:" ", price: 500, description:" "});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setMeal({
      ...meal,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };



  useEffect(() => {
    const fetchMeal = async () => {
      setIsloading(true)
      try {
        const response = await axios.get(`${env.VITE_API_URL}/meal/${id}`,
          {
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
          });
        setMeal(response.data);
        setIsloading(false)
      } catch (error) {
        console.log(error);
        setIsloading(false)
      }
    };
    fetchMeal();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true)
    try {
      const response = await axios.patch(
        `${env.VITE_API_URL}/meal/${id}`,
        {
          title: meal.title,
          price: meal.price,
          description: meal.description,
        },
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        }
      );

      if (response.data.success) {
        toast.success(`${response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsloading(false)
        navigate("/manage-store/update-meal")
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
      setIsloading(false)
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

          {loading ? <Spinner /> : (<form className="login-form" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="title"
              value={meal.title}
              placeholder={meal.title}
              labelName="Meal Name"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="price"
              value={meal.price}
              onChange={handleChange}
              placeholder={meal.price?.toString()}
              labelName="Meal price"
              required
            />
            <Input
              type="text"
              name="description"
              value={meal.description}
              onChange={handleChange}
              placeholder={meal.description}
              labelName="Description"
              required
            />
            <button className="btn primary-btn">
              {loading ? <SpinnerButton title="Updating" /> : "Update"}
            </button>
          </form>)}
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
