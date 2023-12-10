import axios from "axios";
import { dashboardSummaryProps, topSellingProps, } from "../../../utils/types";
const env = import.meta.env;


/* DASHBOARD SUMMARY */
const dashboardSummary = async () => {
    const res = await axios.get<dashboardSummaryProps>(`${env.VITE_API_URL}/dashboard-summary`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    })
    return res.data
}

/* TOP SELLING */
const topSelling = async () => {
    const res = await axios.get<topSellingProps>(`${env.VITE_API_URL}/dashboard-summary/top-selling`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    })
    return res.data
}


export { dashboardSummary, topSelling } 