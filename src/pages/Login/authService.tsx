import axios from "axios";
import { loginResType } from "../../utils/types";

/* REGISTER USER */
const register = async (userData: any) => {
    const response = await axios.post('https://eatman-api.onrender.com/register', userData);
    return response.data
}


/* LOGIN USER */
const login = async (userData: any) => {
    const response = await axios.post<loginResType>('https://eatman-api.onrender.com/login', userData);

    if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
        localStorage.setItem('user', JSON.stringify(response.data.details))
    }
    return response.data
}
export default { register, login} 