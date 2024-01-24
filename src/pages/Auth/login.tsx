import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/forms/formInput/Index";
/* import { RootState } from "../../redux/store"; */
import { ToastContainer, toast } from "react-toastify";
//import { useSignIn } from "react-auth-kit";
import logo from "../../assets/images/logo.png";
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
//import { fetchStaffs } from "../../redux/features/staffs/staffSlice";
import { login } from "../../redux/features/auth/authSlice";
import { loginCredentialsProps } from "../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { top_selling } from "../../redux/features/dashboard-summary/topSellingSlice";
import { summary } from "../../redux/features/dashboard-summary/dashboardsummarySlice";
import { lastTransaction } from "../../redux/features/dashboard-summary/lastTransactionsSlice";
import { getTotalOrders } from "../../redux/features/dashboard-summary/getTotalOrdersLast7Days";
import axios from "axios";
const env = import.meta.env;

const Index = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { message, errorMsg, loading, success, token, user } = useAppSelector(state => state.auth);
  //const user = useAppSelector(state => state.auth.user);


  const [credentials, setCredentials] = useState<loginCredentialsProps>({
    email: "",
    password: "",
  });
  //console.log({ message, errorMsg, loading, success, token });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      let response = await dispatch(login(credentials)).unwrap();

      if (response.success) {

        toast.success(response.message);
        dispatch(top_selling());
        dispatch(summary(response.details._id));
        dispatch(lastTransaction(1));
        dispatch(getTotalOrders())
        navigate('/')

      }
      else {
        toast.error(response.message)
      }

    } catch (error) {
      console.log(error);

    }
  }

  const loginComponent = <div className="login-container">
    <div className="loginLeft">
      <h1 className="title">
        <>Welcome Back!</>
      </h1>
      <p className="info">Kindly Login with correct Email and Password</p>
      <div className="bg-overlay"></div>
    </div>
    <div className="login">
      <div className="logo_container">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <h3 className="secondary-text">Login in to Eatman</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="email"
          value={credentials.email}
          placeholder="Enter your email"
          labelName="Enter your email"
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter your password"
          labelName="Enter your password"
          required
        />

        <p style={{ fontSize: "1.4rem", marginBottom: "2rem" }}>
          <Link to={"/reset_password"} className="text-primary">Forget Password? </Link>
        </p>
        <button
          type="submit"
          className="btn primary-btn perfect-center"
          disabled={loading ? true : false}
        >
          {loading ? <> <FontAwesomeIcon icon={faSpinner} spin size="lg" />Loading...</> : "Sign in"}
        </button>

      </form>
    </div>
  </div>
  return (
    <>
      {loginComponent}
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
    </>



  );
};

export default Index;
