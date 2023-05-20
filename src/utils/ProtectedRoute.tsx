import React from 'react';
import { useAppSelector, useAppDispatch} from '../redux/hooks/hooks';
import { Navigate } from 'react-router-dom'

interface Props {
    children: React.ReactNode,
}

const ProtectedRoute = ({children }: Props) => {
    const staff = useAppSelector((state) => state.staff);
    const isLoggedIn = false;
    //const isLoggedIn = useAppSelector((state) => state.staff.isLoggedIn);

    console.log(staff)
    if (!isLoggedIn) {
        return (<Navigate to="/login" replace={true} />)
    }
    return (<div>{children}</div>)
}

export default ProtectedRoute


