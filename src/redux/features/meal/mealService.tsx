import axios from "axios";
import { mealProps } from "../../../utils/types";
const env = import.meta.env;

/* FETCH MEALS */
const getMeals = async () => {
    const response = await axios.get<Array<mealProps>>(`https://eatman-api.onrender.com/api/meal`);    
    return response.data
}


export default {getMeals} 