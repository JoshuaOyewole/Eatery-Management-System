import { useNavigate } from "react-router-dom";


type LogoutBtnprops = {
    className?: string,
    component?: React.ReactElement
}

const Index = (props: LogoutBtnprops) => {
    const { className, component } = props;
    const navigate = useNavigate();


    const handleLogout =  () => {
        localStorage.removeItem('token');
        navigate('/login');
      //  signOut();
       /*  
       //CUSTOM FUNCTION FOR LOGOUT
       try {
            const response = await axios.get(`https://eatman-api.onrender.com/logout`);
            
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