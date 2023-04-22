import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from '../../components/forms/formInput/Index'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../assets/images/logo.png'

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3100/register', {
                email, password
            });
            if (response.data.success === true) {
                navigate('/login')
            }
        } catch (error: any) {
            const errMsg = error.response.data.message;

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
    }


    return (
        <div className='login-container'>
            <div className='login'>
                <div className="logo_container">
                    <img src={logo} alt="logo" className='logo' />
                </div>
                <h3 className="secondary-text">
                    Staff Registration for Valchi MS
                </h3>
                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >
                    <Input
                        type='text'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        labelName='Enter your email'
                        onChange={(e: React.ChangeEvent<HTMLFormElement>) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type='password'
                        name='password'
                        value={password}
                        placeholder='Enter your password'
                        labelName='Enter your password'
                        onChange={(e: React.ChangeEvent<HTMLFormElement>) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        type='submit'
                        value='Register'
                        className='btn primary-btn'
                    />
                    
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
    )
}

export default Register