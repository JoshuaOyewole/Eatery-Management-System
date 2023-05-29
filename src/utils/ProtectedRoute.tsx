import React, { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks/hooks';
import { Navigate } from 'react-router-dom'

interface Props {
    children: React.ReactNode,
}

const ProtectedRoute = ({ children }: Props) => {
    let users = useAppSelector((state) => state.auth.details)

    return users
        ? <div>{children}</div>
        : <Navigate to="/login" replace={true} />

}

export default ProtectedRoute


