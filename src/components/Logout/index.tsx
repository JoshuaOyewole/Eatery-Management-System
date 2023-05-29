import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks/hooks";

type LogoutBtnprops = {
    className?: string,
    component?: React.ReactElement
}

const Index = (props: LogoutBtnprops) => {
    const { className, component } = props;
    const navigate = useNavigate();
    let dispatch = useAppDispatch()


    const handleLogout = () => {
        dispatch(reset())
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login');
    }

    return (
        <>
            <button onClick={handleLogout} className={className}>{component} Logout</button>
        </>

    )
}

export default Index