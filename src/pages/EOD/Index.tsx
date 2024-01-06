import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import Styles from "./_eod.module.scss";
import Box from "../../components/ui/Dashboard/Box";
import MultiLayoutBox from "../../components/ui/Dashboard/MultiLayoutBox";
import axios from "axios";
import {
  cashPayment,
  currentDate,
  getPreviousDate,
  getTodaySaleAmount,
  POSPayment,
  printEODReport,
  printEODSummary,
  TransferPayment,
} from "../../utils/function";
import Button from "../../components/ui/Button";
import { AuthTransaction } from "../../utils/types";
import { Spinner } from "../../components/ui/Spinner/Spinner";
const env = import.meta.env;



const EOD = () => {
  const navigate = useNavigate();

  /* HOOK TO FETCH TODAY's DATE */
  const today = currentDate();
  const yesterday = getPreviousDate(today, 1);
  const twoDaysago = getPreviousDate(today, 2);
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(today);
  const [totalSale, setTotalSale] = useState<number>();
  const [yesterdayTotalSale, setYesterdayTotalSale] = useState<number>();
  const [twoDaysAgoTotalSale, setTwoDaysAgoTotalSale] = useState<number>();
  const [eod, setEod] = useState<AuthTransaction[]>([]);
  const [yesterdayEod, setYesterdayEod] = useState<AuthTransaction[]>([]);
  const [twoDaysAgoEod, setTwoDaysAgoEod] = useState<AuthTransaction[]>([]);

  /* Handle Custom Search EOD Transaction Form  */
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/eod/filter?q=${date}`);
  };


  /* FILTER SUCCESSFUL TRANSACTIONS FROM EOD */
  const successfulTransactions = eod?.filter(
    (currentValue: AuthTransaction) => {
      return currentValue.payment_status === "Successful";
    }
  );
  /* FILTER CASH PAYMENTS TRANSACTIONS FROM EOD */
  const cashPayments = cashPayment(successfulTransactions)
  /* FILTER ATM PAYMENTS TRANSACTIONS FROM EOD */
  const POSPaymens = POSPayment(successfulTransactions)
  /* FILTER TRANSFER PAYMENTS TRANSACTIONS FROM EOD */
  const transferPayments = TransferPayment(successfulTransactions);
  useEffect(() => {
    document.title = `EOD Report for ${date}`;
  }, [date])

  /* Fetch Today, Yesterday and Two Days Ago EOD */
  useEffect(() => {
    //FETCH EOD
    const fetchEOD = async (
      date: string,
      state: React.Dispatch<React.SetStateAction<AuthTransaction[]>>
    ) => {
      setLoading(true);
      try {
        const res = await axios.get(`${env.VITE_API_URL}/records/?q=${date}`,
          {
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
          });
        let data = await res.data;
        state(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    fetchEOD(today, setEod);
    fetchEOD(yesterday, setYesterdayEod);
    fetchEOD(twoDaysago, setTwoDaysAgoEod);
  }, [today, yesterday, twoDaysago]);

  /* TOTAL AMOUNT SOLD */
  useEffect(() => {
    let totalTransactionAmount = getTodaySaleAmount(eod);
    let yesterdayTotalAmount = getTodaySaleAmount(yesterdayEod);
    let twoDaysAgoTotalAmount = getTodaySaleAmount(twoDaysAgoEod);

    //UPDATES EACH DAY WITH THEIR TOTAL AMOUNT RESPECTIVELY
    setTotalSale(totalTransactionAmount);
    setYesterdayTotalSale(yesterdayTotalAmount);
    setTwoDaysAgoTotalSale(twoDaysAgoTotalAmount);

  }, [eod, yesterdayEod, twoDaysAgoEod]);

  /*   const printEODReport = () => {
      eod?.length !== 0
        ? navigate(`/printEODReport?q=${today}`)
        : alert("No Transaction Found");
    };
    const printEODSummary = () => {
      eod?.length !== 0
        ? navigate(`/printEODSummary?q=${today}`)
        : alert("No Transaction Found");
    }; */

  const orderSummary = async () => {
    const res = await axios.get(
      `${env.VITE_API_URL}/records?q=05-01-2024`,
      {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      }
    );
    let transactions: AuthTransaction[] = await res.data;

    //Get all the meals bought individually with the price
    let filterSalesData: { meal: string; amount: number }[] = [];

    //console.log(transactions);

    transactions.forEach((transact, index) => {


      const lastcard = transact.orders.map((order, index, array) => {
        return filterSalesData.push({
          meal: order.meal,
          amount: order.totalAmount,
        });
      });
      //console.log(lastcard);

      return lastcard;
    });

    //Filter the list to get unique names of Meals ordered
    const prevDays = await axios.get(
      `${env.VITE_API_URL}/records/last7days`,
      {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      }
    );

    let prevDayss: AuthTransaction[] = prevDays.data;
    //console.log(prevDayss);

  };

  orderSummary();

  return (
    <>
      <DashboardLayout>
        {loading ? <Spinner /> :
          <main className="dashboard__content">
            <div className="dashboard__content--eod-top">
              <h2 className="dashboard__heading">
                EOD (End of Day Transactions History)
              </h2>
              <div>
                <Button
                  text={"PRINT EOD SUMMARY"}
                  handleClick={() => printEODSummary(eod, today, navigate)}
                  classname={"primary-btn"}
                />
                <Button
                  text={"PRINT EOD REPORT"}
                  handleClick={() => printEODReport(eod, today, navigate)}
                  classname={"primary-btn ml-s"}
                />
              </div>
            </div>
            <div className="dashboard__box-container">
              <div className="content2">
                <Link to={"/orders"} className="block">
                  <Box
                    icon={
                      <FontAwesomeIcon
                        icon={faHouseChimney}
                        className="dashboard__icon"
                      />
                    }
                    title="Transactions for Today"
                    value={eod?.length}
                    hClass={Styles.heading}
                    pClass={Styles.paragraph}
                  />
                </Link>
              </div>

              <div className="content2">
                <MultiLayoutBox
                  transfer={transferPayments?.length}
                  POS={POSPaymens?.length}
                  cash={cashPayments?.length}
                  boxTitle={"Payment Methods"}
                />
              </div>

              <div className="content2">
                <Box
                  icon={
                    <FontAwesomeIcon
                      icon={faHouseChimney}
                      className="dashboard__icon"
                    />
                  }
                  title="Total Amount"
                  value={new Intl.NumberFormat().format(Number(totalSale))}

                  hClass={Styles.heading}
                  pClass={Styles.paragraph}
                />
              </div>
            </div>
            <section className="dashboard__content--bottom">
              <div className="wrapper">
                <div className="left">
                  <div className="top">
                    <h3 className="mb-s tertiary-header">Previous Records</h3>
                    <div className="flex w-100 space-between">
                      <Link
                        to={`/records/orders?q=${yesterday}`}
                        className="w-48"
                      >
                        <Box
                          title="Yesterday Sales"
                          value={new Intl.NumberFormat().format(Number(yesterdayTotalSale))}
                          hClass={Styles.heading}
                          pClass={Styles.paragraph}
                          boxStyle={Styles.box__small}
                        />
                      </Link>
                      <Link
                        to={`/records/orders?q=${twoDaysago}`}
                        className="w-48"
                      >
                        <Box
                          title="2 days ago"
                          value={new Intl.NumberFormat().format(Number(twoDaysAgoTotalSale))}
                          hClass={Styles.heading}
                          pClass={Styles.paragraph}
                          boxStyle={Styles.box__small}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="bottom">
                    <h3 className="mb-s tertiary-header mt-s">Custom Search</h3>
                    <p>Kindly select the EOD for a specific date</p>
                    <form
                      className="dashboard__search-form"
                      onSubmit={handleSearch}
                    >
                      <input
                        type="date"
                        name="eod-date"
                        className="dashboard__search-form--input"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                        required
                      />
                      <input
                        type="submit"
                        value="Query"
                        className="dashboard__search-form--submitBtn"
                      />
                    </form>
                  </div>
                </div>
                {/* <div className="right">
                  <h3 className="dashboard__heading">Order Summary</h3>
                  <Chart
                    options={{
                      labels: [
                        "Rice & Stew",
                        "Ice Cream",
                        "Fried Rice",
                        "Yohgurt",
                        "Rice & Stew",
                        "Ice Cream",
                        "Fried Rice Fried Rice",
                        "Yohgurt",
                      ],
                      responsive: [
                        {
                          breakpoint: 480,
                          options: {
                            chart: {
                              width: 200,
                            },
                            legend: {
                              position: "bottom",
                            },
                          },
                        },
                      ],
                    }}
                    series={[40, 58, 88, 188, 40, 58, 88, 188]}
                    type="pie"
                    width={480}
                  />
                </div> */}
              </div>
            </section>
          </main>}
      </DashboardLayout>
    </>
  );
};

export default EOD;
/* &#8358; */
