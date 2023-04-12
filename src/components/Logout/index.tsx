import { useNavigate } from "react-router-dom";
//import axios from 'axios';
import {useSignOut} from "react-auth-kit";

/* type LogoutProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
} */

type LogoutBtnprops = {
    className: string,
    component?: React.ReactElement
}

const Index = (props: LogoutBtnprops) => {
    const { className, component } = props;
    const navigate = useNavigate();
    const signOut  = useSignOut();

    const handleLogout = async () => {
        navigate('/');
        signOut();
       /*  
       //CUSTOM FUNCTION FOR LOGOUT
       try {
            const response = await axios.get(`http://localhost:3100/logout`);
            
            if (response.data.success === true) navigate('/')
        } catch (error: any) {
            console.log(error);
        } */

    }

    return (
        <>
            <button onClick={handleLogout} className={className}>{component} Logout</button>
        </>

    )
}

export default Index