import axios from "axios";
import { dashboardSummaryProps, topSellingProps } from "../../../utils/types";
const env = import.meta.env;


/* DASHBOARD SUMMARY */
const dashboardSummary = async (userId: string) => {
    const res = await axios.post(`${env.VITE_API_URL}/dashboard-summary`, { id: userId },
        { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
    )
    return res.data
}

/* TOP SELLING */
const topSelling = async () => {
    const res = await axios.get<topSellingProps>(`${env.VITE_API_URL}/dashboard-summary/top-selling`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    })
    return res.data
}
/* TOTAL ORDERS */
const totalOrders = async () => {
    const res = await axios.get(`${env.VITE_API_URL}/dashboard-summary/getTotalOrdersLast7Days`,
        { 
            headers: 
            { "Authorization": `Bearer ${localStorage.getItem('token')}` } 
        }
    )

    return res.data
}

/*GET LAST TRANSACTIONS^*/
const lastTransactions = async (page: number) => {
    const res = await axios.get(`${env.VITE_API_URL}/dashboard-summary/lastTransactions`, {
        params: {
            page
        },
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    return res.data;
}



export { dashboardSummary, topSelling, totalOrders, lastTransactions } 