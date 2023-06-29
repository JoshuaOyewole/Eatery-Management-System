import axios from "axios";
import { mealProps } from "../../../utils/types";

/* FETCH MEALS */
const getMeals = async () => {
    const response = await axios.get<mealProps>(`http://eatman-api.onrender.com/api/meal/`);
    return response.data
}


export default {getMeals} 