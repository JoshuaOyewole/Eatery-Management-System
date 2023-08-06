import axios from "axios";
import { mealOrder } from "../../../utils/types";


/* ADD ORDER */
const addOrder = async (data:mealOrder) => {
    const res = await axios.post(`https://eatman-api.onrender.com/api/order`, data, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    })
    return res.data
}


export default {addOrder} 