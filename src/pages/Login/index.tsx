import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/forms/formInput/Index";
import axios from "axios";
/* import { RootState } from "../../redux/store"; */
import { ToastContainer, toast } from "react-toastify";
import { useSignIn } from "react-auth-kit";
import logo from "../../assets/images/logo.png";

type LoginProps = {
  email: string;
  password: string;
};

const Index = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginProps>({
    email: "",
    password: "",
  });

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
        signIn({
            token: response.data.token,
            expiresIn:3600,
            tokenType:"Bearer",
            authState:{email:credentials.email}
        })
        navigate("/dashboard");
      } else {
        alert("Error occured");
      }
    } catch (error: any) {
      const errMsg = error.response.data.message ? error.response.data.message :error.response.data;

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
    <div className="login-container">
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
    </div>
  );
};

export default Index;
