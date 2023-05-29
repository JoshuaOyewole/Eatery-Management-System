import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/forms/formInput/Index";
/* import { RootState } from "../../redux/store"; */
import { ToastContainer, toast } from "react-toastify";
//import { useSignIn } from "react-auth-kit";
import logo from "../../assets/images/logo.png";
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
//import { fetchStaffs } from "../../redux/features/staffs/staffSlice";
import { login, reset } from "../../redux/features/auth/authSlice";
import { loginCredentialsProps, userLoginResData } from "../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";




const Index = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


 /*  
 const [userData, setUserData] = useState<userLoginResData | null>(null)
 const [loading, setLoading] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [userToken, setUserToken] = useState<string>(' ') 
  */

  const message = useAppSelector(state => state.auth.message)
  const isLoading = useAppSelector(state => state.auth.loading)
  const token = useAppSelector(state => state.auth.token)
  const user = useAppSelector(state => state.auth.details)
  const success = useAppSelector(state => state.auth.success)

  const [credentials, setCredentials] = useState<loginCredentialsProps>({
    email: "",
    password: "",
  });

  useEffect(() => {

    /* 
     ERROR: Once the Login page loads it automatically throw up the toast of Logged Out Successfully each time which is not supposed to be. It should only render that when te Logout button is clicked
    */
      if(!success){
        toast.error(message)
      }
      else{
        toast.success(message)
      }

      if(success && token !== null && user ){
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/')
      }

      //dispatch(reset());
  }, [success, token,user,dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

 


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(credentials));
  };


  /*  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     try {
       const response = await axios.post(`https://eatman-api.onrender.com/login`, {
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

const loginComponent =  <div className="login-container">
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
    <button
      type="submit" className="btn primary-btn perfect-center"
    >{isLoading ? <FontAwesomeIcon icon={faSpinner} spin size="lg" /> : "Sign in"}</button>

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
