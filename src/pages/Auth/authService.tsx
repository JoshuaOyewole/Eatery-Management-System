import axios from "axios";
const env = import.meta.env;


/* REGISTER USER */
const register = async (userData: any) => {
    const response = await axios.post(`${env.VITE_API_URL}/register`, userData);
    return response.data
}


/* LOGIN USER */
const login = async (userData: { email: string, password: string }) => {
    try {
        const response = await axios.post(`${env.VITE_API_URL}/login`, userData);
        let res = response.data

        if (res.success) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.details))
            return response.data
        }

    } catch (error: any) {

        console.log(error);

        return { message: error.response.data.message, details: null, token: null, success: false }
        //return error.response.data.message;
    }



}
export default { register, login } 