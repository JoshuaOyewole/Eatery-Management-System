import axios from "axios";
import { loginResType } from "../../utils/types";
const env = import.meta.env;


/* REGISTER USER */
const register = async (userData: any) => {
    const response = await axios.post(`${env.VITE_API_URL}/register`, userData);
    return response.data
}


/* LOGIN USER */
const login = async (userData: { email: string, password: string }) => {
    try {
        const response = await axios.post<loginResType>(`${env.VITE_API_URL}/login`, userData);
        let res = response.data
        

        if (res) {
            localStorage.setItem('token', JSON.stringify(response.data.token))
            localStorage.setItem('user', JSON.stringify(response.data.details))
            return response.data
        }

    } catch (error: any) {
        return error.response.data.message;
    }



}
export default { register, login } 