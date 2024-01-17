import Styles from "../../../pages/Dashboard/_dashboard.module.scss"
import { useAppSelector } from "../../../redux/hooks/hooks";
import { useEffect, useState } from "react";
import { GetCurrentMonth } from "../../../utils/function";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import Table from "../Table/table";
import TableRow from "../Table/tablebody";
import { Spinner } from "../Spinner/Spinner";

const AdminDashboard = (props: { name: String; }) => {
    const [currentMonth, setCurrentMonth] = useState<string>('')
    let sales_summary = useAppSelector(state => state.dashboardSummary);
    let best_selling = useAppSelector(state => state.topSelling);
    let getTotalOrdersLast7Days = useAppSelector(state => state.getTotalOrdersLast7Days);
    let lastTrans = useAppSelector(state => state.getLastTransactions)

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
                        <ul className={Styles["dashboard__sales-overview--sales-datas"]} style={{ marginLeft: "2rem", listStyle: "circle" }}>
                            <div className="flex space-between" style={{ marginBottom: "0.5rem", fontStyle: "italic" }}>
                                <div className={Styles.item} style={{ fontWeight: "bold" }}>Product Name</div>
                                <div className={Styles.item} style={{ fontWeight: "bold" }}> Qty</div>
                            </div>

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
                                    data: getTotalOrdersLast7Days.totalOrders.values,
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
                                    categories: getTotalOrdersLast7Days.totalOrders.days,
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
                    {
                        lastTrans.isLoading ? <Spinner /> : <Table tableHeader={tableHeader} extraClass={{ padding: "1rem" }} th={{ color: "#333" }}>
                            <>
                                {lastTrans.lastTransactions.transactions.map((trans, index) => {
                                    const originalDate = new Date(trans.payment_date);
                                    const formattedTime = originalDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                                    const formattedDate = originalDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

                                    return <TableRow key={index}>
                                        <td>{trans._id.slice(0, 6)}</td>
                                        <td>{trans.name}</td>
                                        <td>{formattedDate}</td>
                                        <td>{formattedTime}</td>
                                        <td>&#x20A6; {trans.totalPrice}</td>
                                        <td>{trans.payment_status}</td>
                                        <td>{trans.payment_medium}</td>
                                    </TableRow>
                                })}
                            </>

                        </Table>
                    }
                </div>
            </div>
        </main>
    )
}

export default AdminDashboard