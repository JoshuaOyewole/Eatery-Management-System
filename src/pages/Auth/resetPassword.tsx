import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/forms/formInput/Index";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const env = import.meta.env;




const Index = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<"idle" | "loading" | "success" | "error">("idle");

    let [email, setEmail] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading("loading");

        //Validate if a user entered a value
        if ((email.length <= 0) || (email == undefined)) toast.error("Kindly enter a Valid Email Address");


        //trim whitespace from email value entered
        email = email.trim();

        try {
            const res = await axios.post(`${env.VITE_API_URL}/forgot_pwd`, { email });
            if (res.data) {
                setLoading("success")

                toast.success(res.data.message);
                //Redirect user to the page to enter OTP sent
                setTimeout(() => {
                    navigate('/new_pwd')
                }, 5000);

            }

        } catch (error: any) {
            setLoading("error");
            toast.error(error.response.data.message);
        }
    }


    const loginComponent = <div className="login-container">
        <div className="loginLeft">
            <h1 className="title">
                <>Reset Your Password</>
            </h1>
            <p className="info">Kindly enter your Email Address to reset your password</p>
            <div className="bg-overlay"></div>
        </div>
        <div className="login">
            <form className="login-form" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    labelName="Enter your email"
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="btn primary-btn perfect-center capitalize"
                    disabled={loading == "loading" ? true : false}
                >
                    {loading == "loading" ? <> <FontAwesomeIcon icon={faSpinner} spin size="lg" />Loading...</> : "Reset"}
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

<<<<<<< HEAD
export default Index;
=======
export default Index;
>>>>>>> a31ceca7cce7c4ccf45fbb3da2a9a0bd1a041f73
