import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks/hooks';
import { Navigate } from 'react-router-dom'

interface Props {
    children: React.ReactNode,
}

const ProtectedRoute = ({ children }: Props) => {
    let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    console.log(isLoggedIn)
    useEffect(() => {
        console.log('isLogedIn state has changed oooo');
        console.log('Current value is' + isLoggedIn)
    }, [isLoggedIn])

    console.log(isLoggedIn)
    return isLoggedIn
        ? <div>{children}</div>
        : <Navigate to="/login" replace={true} />

}

export default ProtectedRoute


