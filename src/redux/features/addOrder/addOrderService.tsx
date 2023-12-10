import axios from "axios";
import { mealOrder } from "../../../utils/types";
const env = import.meta.env;


/* ADD ORDER */
const addOrder = async (data:mealOrder) => {
    const res = await axios.post(`${env.VITE_API_URL}/order`, data, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    })
    return res.data
}


export default {addOrder} 