
import { useNavigate } from "react-router-dom";
import axios from 'axios';


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

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_API_URL}/logout`);

            if (response.data.success === true) navigate('/')
        } catch (error: any) {
            console.log(error);
        }

    }


    return (
        <>
            <button onClick={handleLogout} className={className}>{component} Logout</button>
        </>

    )
}

export default Index