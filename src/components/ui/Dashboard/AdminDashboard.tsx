import Styles from "../../../pages/Dashboard/_dashboard.module.scss"
import { useAppSelector } from "../../../redux/hooks/hooks";
import { useEffect, useState } from "react";
import { GetCurrentMonth } from "../../../utils/function";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import Table from "../Table/table";
import TableRow from "../Table/tablebody";
import TableStyles from "../../../components/ui/Table/_table.module.scss"




const AdminDashboard = (props: { name: String; }) => {
    const [currentMonth, setCurrentMonth] = useState<string>('')
    let sales_summary = useAppSelector(state => state.dashboardSummary);
    let best_selling = useAppSelector(state => state.topSelling);
    const { name } = props;

    useEffect(() => {
        //Get Current Month
        setCurrentMonth(GetCurrentMonth());
    }, [])

    /* TABLE HEADER */
    const [tableHeader] = useState([
        "Order ID",
        "Customer Name",
        "Date",
        "Time",
        "Amount",
        "Status",
        "Payment Type",
    ]);


    return (
        <main className={Styles.dashboard__content}>
            <div className="flex">
                <h2>Dashboard</h2>
            </div>

            <div className={Styles["dashboard__box-container"]}>
                <div className={`${Styles["dashboard__box-content--leftWrapper"]} justify-start`} style={{ columnGap: "2rem" }}>
                    <div className={`${Styles["dashboard__sales-overview"]} ${Styles["dashboard__sales-overview--first"]} basis-32`}>
                        <div className={Styles["dashboard__sales-overview--top"]}>
                            <h4 className={Styles["dashboard__sales-overview--title"]}>Total Sales (Today)</h4>
                            <div className={Styles["dashboard__sales-overview--record-type"]}>Daily</div>
                        </div>
                        <p className={Styles["dashboard__sales-overview--sales-datas"]}>
                            <strong className={Styles.orderValue}>{sales_summary?.dashboardSummary.totalForDay.totalCount}</strong> Orders | &#8358; {sales_summary?.dashboardSummary.totalForDay.totalAmount.toLocaleString()}
                        </p>
                    </div>

                    <div className={`${Styles["dashboard__sales-overview"]} ${Styles["dashboard__sales-overview--second"]} basis-32`} >
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
                <div className="flex w-100 gap-x-2">
                    <div className={`${Styles["dashboard__sales-overview"]}  w-50`}>
                        <div className={Styles["dashboard__sales-overview--top"]}>
                            <h4 className={`${Styles["dashboard__sales-overview--title"]} text-primary`}>Top Selling Categories</h4>
                        </div>
                        <ul className={Styles["dashboard__sales-overview--sales-datas"]} style={{ marginLeft: "2rem", listStyle: "disclosure-open" }}>
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
                    <div className={`${Styles["dashboard__sales-overview"]}  w-50`}>
                        <div className={Styles["dashboard__sales-overview--top"]}>
                            <h4 className={`${Styles["dashboard__sales-overview--title"]} text-primary`}>Total Orders</h4>
                        </div>
                        <ReactApexChart
                            series={[
                                {
                                    name: "Order",
                                    data: [6, 8, 53, 13, 33, 14],
                                },
                            ]}
                            options={{
                                chart: {
                                    height: 180,
                                    parentHeightOffset: 0,
                                    stacked: true,
                                    toolbar: {
                                        show: false,
                                    },
                                },
                                colors: ["#506fd9", "#85b6ff"],
                                grid: {
                                    borderColor: "rgba(72,94,144, 0.07)",
                                    padding: {
                                        top: -20,
                                    },
                                    yaxis: {
                                        lines: {
                                            show: true,
                                        },
                                    },
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false,
                                        columnWidth: "60%",
                                        /*     endingShape: "rounded", */
                                    },
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                stroke: {
                                    show: true,
                                    width: 2,
                                    colors: ["transparent"],
                                },
                                yaxis: {
                                    show: true,
                                },
                                xaxis: {
                                    type: "category",
                                    categories: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
                                    tickAmount: 10,
                                    decimalsInFloat: 0,
                                    labels: {
                                        style: {
                                            colors: "#6e7985",
                                            fontSize: "10px",
                                        },
                                    },
                                },
                                fill: {
                                    opacity: 1,
                                },
                                legend: {
                                    show: false,
                                },
                                tooltip: {
                                    enabled: true,
                                },
                            }}
                            type="bar"
                            height={250}
                            className="apex-chart-one mb-3"
                        />
                    </div>
                </div>
                <div className={`${Styles["dashboard__sales-overview"]} `}>
                    <div className={Styles["dashboard__sales-overview--top"]}>
                        <h4 className={`${Styles["dashboard__sales-overview--title"]} text-primary`}>New Orders</h4>
                    </div>
                    <Table tableHeader={tableHeader} extraClass={{ padding: "1rem" }} th={{color: "#333"}}>
                        <TableRow>
                            <td>0014322</td>
                            <td>Joshua Oyewole</td>
                            <td>May 13, 2024</td>
                            <td>10:12 AM</td>
                            <td>&#x20A6; 2,000</td>
                            <td>Pending</td>
                            <td>Online</td>
                        </TableRow>
                        <TableRow>
                            <td>0014323</td>
                            <td>John Doe</td>
                            <td>May 12, 2024</td>
                            <td>11:18 AM</td>
                            <td>&#x20A6; 2,300</td>
                            <td>Completed</td>
                            <td>Cash</td>
                        </TableRow>
                        <TableRow>
                            <td>0014327</td>
                            <td>Mark Allen</td>
                            <td>May 11, 2024</td>
                            <td>10:12 AM</td>
                            <td>&#x20A6; 9,000</td>
                            <td>Completed</td>
                            <td>POS</td>
                        </TableRow>
                    </Table>
                </div>
            </div>
        </main>
    )
}

export default AdminDashboard