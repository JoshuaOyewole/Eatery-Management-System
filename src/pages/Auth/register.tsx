import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from '../../components/forms/formInput/Index'
import {  toast } from 'react-toastify';
import logo from '../../assets/images/logo.png'
import { useAppDispatch } from '../../redux/hooks/hooks';
import {  register } from "../../redux/features/auth/authSlice";
import { loginCredentialsProps } from '../../utils/types';


const Register = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<loginCredentialsProps>({
        email: "",
        password: "",
    });
    const dispatch = useAppDispatch();


    //handle email and Password change Event
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(credentials));
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
                        value={credentials.email}
                        placeholder='Enter your email'
                        labelName='Enter your email'
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type='password'
                        name='password'
                        value={credentials.password}
                        placeholder='Enter your password'
                        labelName='Enter your password'
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type='submit'
                        value='Register'
                        className='btn primary-btn'
                    />

                </form>
            </div>
        </div>
    )
}

export default Register