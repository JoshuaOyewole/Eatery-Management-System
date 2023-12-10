import Styles from "../../../pages/Dashboard/_dashboard.module.scss"
import Chart from "react-apexcharts";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { useEffect, useState } from "react";
import { GetCurrentMonth } from "../../../utils/function";




const AdminDashboard = (props: { name: String; }) => {
    const [currentMonth, setCurrentMonth] = useState<string>('')
    let sales_summary = useAppSelector(state => state.dashboardSummary);
    let best_selling = useAppSelector(state => state.topSelling);
    const { name} = props;


    useEffect(() => {
        //Get Current Month
        setCurrentMonth(GetCurrentMonth());
    }, [])

    return (
        <main className={Styles.dashboard__content}>
            <div className={Styles["dashboard__content--top"]}>
                <h2 className={Styles.dashboard__heading}>Hi, {name} - Welcome to Dashboard</h2>

            </div>
            <div className={Styles["dashboard__box-container"]}>
                <div className={Styles["dashboard__box-content--left"]}>

                    <div className={Styles["dashboard__box-content--leftWrapper"]}>
                        <div className={`${Styles["dashboard__sales-overview"]} ${Styles["dashboard__sales-overview--first"]}`}>
                            <div className={Styles["dashboard__sales-overview--top"]}>
                                <h4 className={Styles["dashboard__sales-overview--title"]}>Total Sales (Today)</h4>
                                <div className={Styles["dashboard__sales-overview--record-type"]}>Daily</div>
                            </div>
                            <p className={Styles["dashboard__sales-overview--sales-datas"]}>
                                <strong className={Styles.orderValue}>{sales_summary?.dashboardSummary.totalForDay.totalCount}</strong> Orders | &#8358; {sales_summary?.dashboardSummary.totalForDay.totalAmount.toLocaleString()}
                            </p>
                        </div>

                        <div className={`${Styles["dashboard__sales-overview"]} ${Styles["dashboard__sales-overview--second"]} ml-s`} >
                            <div className={Styles["dashboard__sales-overview--top"]}>
                                <h4 className={Styles["dashboard__sales-overview--title"]}>{`${currentMonth} Overview`}
                                </h4>
                                <div className={Styles["dashboard__sales-overview--record-type"]}>Monthly</div>
                            </div>
                            <p className={Styles["dashboard__sales-overview--sales-datas"]}>
                                <strong className={Styles.orderValue}>{sales_summary?.dashboardSummary.totalForMonth.totalCount.toLocaleString()}</strong> Orders | &#8358; {sales_summary?.dashboardSummary.totalForMonth.totalAmount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className={Styles["dashboard__sales-overview"]}>
                        <div className={Styles["dashboard__sales-overview--top"]}>
                            <h4 className={Styles["dashboard__sales-overview--title"]}>Last 7 days</h4>
                        </div>
                        <Chart
                            options={{
                                chart: {
                                    id: "basic-bar"
                                },
                                xaxis: {
                                    categories: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
                                }
                            }}
                            series={[
                                {
                                    name: "Total Sales",
                                    data: [30000, 50000, 49000, 60000, 39000, 70000, 91000]
                                }
                            ]}
                        />
                    </div>
                </div>
                <div className={Styles["dashboard__box-content--right"]}>
                    <div className={Styles["dashboard__sales-overview"]}>
                        <div className={Styles["dashboard__sales-overview--top"]}>
                            <h4 className={Styles["dashboard__sales-overview--title"]}>Top Selling Categories</h4>
                        </div>
                        <ul className={Styles["dashboard__sales-overview--sales-datas"]}>
                            {
                                best_selling.topSelling.map((item, index) => {
                                    return <li key={index}>
                                        <div className="flex space-between">
                                            <div className={Styles.item}>{item._id}</div>
                                            <div className={Styles.data}>{item.totalQuantity}</div>
                                        </div>
                                    </li>
                                })
                            }

                        </ul>

                    </div>
                    {/*   <div className={Styles["dashboard__sales-overview"]}>
                        <div className={Styles["dashboard__sales-overview--top"]}>
                            <h4 className={Styles["dashboard__sales-overview--title"]}>Order Summary</h4>
                        </div>
                        <div className={Styles["dashboard__sales-overview--sales-datas"]}>
                            <Chart options={{
                                labels: ['Rice & Stew', 'Ice Cream', 'Fried Rice', 'Yohgurt'],
                                responsive: [{
                                    breakpoint: 480,
                                    options: {
                                        chart: {
                                            width: 200
                                        },
                                        legend: {
                                            position: 'bottom'
                                        }
                                    }
                                }]
                            }} series={[40, 58, 88, 188]} type="pie" width={380} />
                        </div>
                    </div> */}

                </div>
            </div>
        </main>
    )
}

export default AdminDashboard