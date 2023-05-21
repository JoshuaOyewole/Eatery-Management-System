import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Input from "../../components/forms/formInput/Index";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
/* import { GiFruitTree, GiChickenOven, GiBeerBottle, GiBowlOfRice } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import { FaFish } from "react-icons/fa"; */

type MealProps = {
  title?: string;
  price?: number;
  description?: string,
  category?: string
  qty?: number,
  imageURL?:string
};

type FoodCategory = {
  _id?: string;
  name?: string;
  urlParam?: string;
  icon?: string
}

const initalFoods = [{}]

const initialState = {
  title: '',
  price: 0,
  description: '',
  category: '',
  qty: 0,
  imageURL:""
};

function AddMeal() {
  const navigate = useNavigate();
  const [meal, setMeal] = useState<MealProps>(initialState);
  const [categories, setCategory] = useState<FoodCategory[]>(initalFoods);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeal({
      ...meal,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://eatman-api.onrender.com/api/meal`, {
        title: meal.title,
        price: meal.price,
        description: meal.description,
        category: meal.category,
        qty:meal.qty,
        imageURL:meal.imageURL
      },{
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } 
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

  //Change the select option choosen by the user
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.value;
    setMeal({
      ...meal,
      category: options,
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`https://eatman-api.onrender.com/api/foodCategories`,
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } 
        });

        if (response.data) {
          setCategory(response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
    getCategories();
  }, [])


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

          <form className="add-meal-form" onSubmit={handleSubmit}>
            <div className="add-meal-form__left">
              <Input
                type="text"
                name="title"
                value={meal.title}
                placeholder="Enter meal Title"
                labelName="Meal Title"
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
              <Input
                type="number"
                name="qty"
                value={meal.qty}
                onChange={handleChange}
                placeholder="Qty"
                labelName="Qty of Meal"
                required
              />
              <Input
                type="text"
                name="description"
                value={meal.description}
                onChange={handleChange}
                placeholder="Short description of the Meal"
                labelName="Meal Description"
                required
              />
              <div>
                <label htmlFor="category">Category:</label>
                <select
                  onChange={selectChange}
                  className="selectMeal w-100 mb-m"
                  name="categories"
                >
                  <>
                    <option defaultValue={"Choose One"} disabled>
                      Choose one
                    </option>
                  </>
                  {categories.map((cat, index) => {
                    return (
                      <option value={cat.name} key={index}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <Input type="submit" value="Add" className="btn primary-btn" />
            </div>
            <div className="add-meal-form__right">
            <Input
                type="file"
                name="imageURL"
                value={meal.imageURL}
                labelName="Kindly Upload an Image"
                onChange={handleChange}
                required
              />
            </div>
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
