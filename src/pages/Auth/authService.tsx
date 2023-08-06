import axios from "axios";
import { loginResType } from "../../utils/types";
const env = import.meta.env;


/* REGISTER USER */
const register = async (userData: any) => {
    const response = await axios.post(`${env.VITE_API_URL}/register`, userData);
    return response.data
}


/* LOGIN USER */
const login = async (userData: any) => {
    const response = await axios.post<loginResType>(`${env.VITE_API_URL}/login`, userData);

    if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
        localStorage.setItem('user', JSON.stringify(response.data.details))
    }
    return response.data
}
export default { register, login} 