import Styles from "../../../pages/Dashboard/_dashboard.module.scss"
//import Chart from "../Chart/Chart"

type Props = {
    currentMonth:String,
    name:String
}

const StaffDashboard = (props: Props) => {
    const {currentMonth,name} = props;

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
                                        <strong>82</strong> Orders | 320,000
                                    </p>
                                </div>

                                <div className={`${Styles["dashboard__sales-overview"]} ${Styles["dashboard__sales-overview--second"]} ml-s`} >
                                    <div className={Styles["dashboard__sales-overview--top"]}>
                                        <h4 className={Styles["dashboard__sales-overview--title"]}>{`${currentMonth} Overview`}</h4>
                                        <div className={Styles["dashboard__sales-overview--record-type"]}>Monthly</div>
                                    </div>
                                    <p className={Styles["dashboard__sales-overview--sales-datas"]}>
                                        <strong>382</strong> Orders | 5,320,000
                                    </p>
                                </div>
                            </div>
                            <div className={Styles["dashboard__sales-overview"]}>
                                <div className={Styles["dashboard__sales-overview--top"]}>
                                    <h4 className={Styles["dashboard__sales-overview--title"]}>Last 7 days</h4>
                                </div>
                               {/*  <Chart
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
                                /> */}
                            </div>
                        </div>
                        <div className={Styles["dashboard__box-content--right"]}>
                            <div className={Styles["dashboard__sales-overview"]}>
                                <div className={Styles["dashboard__sales-overview--top"]}>
                                    <h4 className={Styles["dashboard__sales-overview--title"]}>Top Selling Categories</h4>
                                </div>
                                <ul className={Styles["dashboard__sales-overview--sales-datas"]}>
                                    <li>
                                        <div className="flex space-between">
                                            <div className={Styles.item}>Rice & Stew</div>
                                            <div className={Styles.data}>40</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex space-between">
                                            <div className={Styles.item}>Ice Cream</div>
                                            <div className={Styles.data}>58</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex space-between">
                                            <div className={Styles.item}>Fried Rice</div>
                                            <div className={Styles.data}>88</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex space-between">
                                            <div className={Styles.item}>Yohgurt</div>
                                            <div className={Styles.data}>188</div>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                            <div className={Styles["dashboard__sales-overview"]}>
                                <div className={Styles["dashboard__sales-overview--top"]}>
                                    <h4 className={Styles["dashboard__sales-overview--title"]}>Order Summary</h4>
                                </div>
                                <div className={Styles["dashboard__sales-overview--sales-datas"]}>
                                    {/* <Chart options={{
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
                                    }} series={[40, 58, 88, 188]} type="pie" width={380} /> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
  )
}

export default StaffDashboard