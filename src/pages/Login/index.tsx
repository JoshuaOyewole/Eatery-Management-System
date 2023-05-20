import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/forms/formInput/Index";
import axios from "axios";
/* import { RootState } from "../../redux/store"; */
import { ToastContainer, toast } from "react-toastify";
//import { useSignIn } from "react-auth-kit";
import logo from "../../assets/images/logo.png";
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { fetchStaffs } from "../../redux/features/staffs/staffSlice";
import { login } from "../../redux/features/auth/authSlice";


type LoginProps = {
  email: string;
  password: string;
};

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)
  const staff = useAppSelector(state => state.auth.user)

  const [credentials, setCredentials] = useState<LoginProps>({
    email: "",
    password: "",
  });

  let data = { email: "admin@gmail.com", password: "admin" }
  useEffect(() => {
    dispatch(login(data));
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3100/login`, {
        email: credentials.email,
        password: credentials.password,
      });

      if (response.data.success === true) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        alert("Error occured");
      }
    } catch (error: any) {
      const errMsg = error.response.data.message ? error.response.data.message : error.response.data;

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
  /*  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     try {
       const response = await axios.post(`http://localhost:3100/login`, {
         email: credentials.email,
         password: credentials.password,
       });
 
       if (response.data.success === true) {
         localStorage.setItem("token", response.data.token);
         navigate("/");
       } else {
         alert("Error occured");
       }
     } catch (error: any) {
       const errMsg = error.response.data.message ? error.response.data.message : error.response.data;
 
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
   }; */
console.log(auth.user)
console.log(auth)
  return (
    !auth.loading ?
      (<div className="login-container">
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
            <Input type="submit" value="Sign in" className="btn primary-btn" />
          </form>
        </div>
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
      </div>) :
      <h2>Loading...</h2>

  );
};

export default Index;
