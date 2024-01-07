import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/forms/formInput/Index";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const env = import.meta.env;

type CredentialProps = {
    email: string,
    password: string,
    otp: string
}


const Index = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<"idle" | "loading" | "success" | "error">("idle");

    let [credentials, setCredentials] = useState<CredentialProps>({ email: "", otp: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(
            (prev) => ({
                ...prev,
                [e.target.name]: e.target.value
            }
            )
        )
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading("loading");//Loading State

        // destructure credentials
        const { email, password, otp } = credentials;

        //Validate the Data inputed
        if (!email && !password && !otp) return toast.error("All Fields are Required!")

        try {
            const res = await axios.post(`${env.VITE_API_URL}/reset_pwd`, {
                otp, newPassword: password, email
            });

            if (res.data) {
                setLoading("success");

                toast.success(res.data.message);
                return setTimeout(() => {
                    navigate("/login")
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
            <p className="info">Kindly input the 4 digit OTP sent to your Email  </p>
            <p className="info">inorder to reset your Password</p>
            <div className="bg-overlay"></div>
        </div>
        <div className="login">
            <form className="login-form" onSubmit={handleSubmit}>
                <Input
                    type="number"
                    name="otp"
                    value={credentials.otp}
                    placeholder="Enter OTP Code"
                    labelName="OTP"
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="New Password"
                    labelName="New Password"
                    onChange={handleChange}
                    required
                />
                <Input
                    type="text"
                    name="email"
                    value={credentials.email}
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
                    {loading == "loading" ? <> <FontAwesomeIcon icon={faSpinner} spin size="lg" />Loading...</> : "Submit"}
                </button>

            </form>
        </div>
    </div >
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
