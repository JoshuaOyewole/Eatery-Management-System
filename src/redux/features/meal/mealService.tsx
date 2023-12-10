import axios from "axios";
import { mealProps } from "../../../utils/types";
const env = import.meta.env;

/* FETCH MEALS */
const getMeals = async () => {
    const response = await axios.get<Array<mealProps>>(`${env.VITE_API_URL}/meal`);
    return response.data
}


export default { getMeals } 