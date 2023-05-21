import {useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import Styles from "./_eod.module.scss";
import Box from "../../components/ui/Dashboard/Box";
import MultiLayoutBox from "../../components/ui/Dashboard/MultiLayoutBox";
import axios from "axios";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button";
import { AuthTransaction } from "../../../types";
import { cashPayment, getTodaySaleAmount, POSPayment, TransferPayment } from "../../utils/function";

const EOD = () => {
  // Get the EOD Date param from the URL.
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const navigate = useNavigate();

  const [totalSale, setTotalSale] = useState<number>();
  const [eod, setEod] = useState<AuthTransaction[]>([]);

   /* FETCH EOD BASED ON THE DATE PASSED */
   useEffect(() => {
    const fetchEOD = async () => {
      const res = await axios.get(
        `https://eatman-api.onrender.com/api/records?q=${query}`,
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } 
        }
      );
      //Update the EOD with res variable
      setEod(res.data);
    };
    fetchEOD();
  }, [query]);

  /* FILTER SUCCESSFUL TRANSACTIONS */
  let successfulTransactions = eod?.filter((transaction: AuthTransaction)=>{
    return transaction.payment_status === "Successful";
  });

//Total Payments made by Cash
  let cashPayments = cashPayment(successfulTransactions);

  //Total Payments made by POS
  let POSPayments = POSPayment(successfulTransactions);

  //Total Payments made by Transfer
  let transferPayments = TransferPayment(successfulTransactions);

  /* TOTAL AMOUNT SOLD */
  useEffect(() => {
    const totalTransactionAmount = getTodaySaleAmount(successfulTransactions)
    setTotalSale(totalTransactionAmount);
  }, [successfulTransactions]);

  const printEODReport = () => {
    eod?.length !== 0
      ? navigate(`/printEODReport?q=${query}`)
      : alert("No Transaction Found");
  };
  const printEODSummary = () => {
    eod?.length !== 0
      ? navigate(`/printEODSummary?q=${query}`)
      : alert("No Transaction Found");
  };

  /* 
  IMPLEMENT THIS == 8th April, 2023 (04:42PM)
  MEAL ORDER PRICES 
  1. Get all the whole prices for Rice, Ice Creams etc. alongside with the names e.g

  [Rice,Chicken,Beans]
  [300,900,987]
  */
  /*   const prices = eod?.map((transaction) => {
    return transaction.totalPrice;
  }); */
  /* MEAL ORDER PRICES */
  /* let meals = eod?.map((transaction) => {
    return transaction.orders
  }); */

  return (
    <>
      <DashboardLayout>
        {eod.length === 0 ? (
          <main className="dashboard__content">
            <div className="flex space-between align-center mt-m">
              <h2 className="dashboard__heading ">
                <span className="dashboard__transaction-result">0</span>{" "}
                Transaction Found for {query}
              </h2>

              <Button
                text={
                  <>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" /> Go Back
                  </>
                }
                handleClick={() => navigate(-1)}
              />
            </div>
          </main>
        ) : (
          <main className="dashboard__content">
            <div className="dashboard__content--eod-top">
              <h2 className="dashboard__heading">
                EOD Transaction for {query}
              </h2>
              <div>
                <Button
                  text={"PRINT EOD SUMMARY"}
                  handleClick={printEODSummary}
                  classname={"primary-btn"}
                />
                <Button
                  text={"PRINT EOD REPORT"}
                  handleClick={printEODReport}
                  classname={"primary-btn ml-s"}
                />
              </div>
            </div>
            <div className="dashboard__box-container">
              <div className="content2">
                <Link to={`/records/orders?q=${query}`} className="block">
                  <Box
                    icon={
                      <FontAwesomeIcon
                        icon={faHouseChimney}
                        className="dashboard__icon"
                      />
                    }
                    title="Total Transactions"
                    value={eod?.length}
                    hClass={Styles.heading}
                    pClass={Styles.paragraph}
                  />
                </Link>
              </div>

              <div className="content2">
                <MultiLayoutBox
                  transfer={transferPayments?.length}
                  POS={POSPayments?.length}
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
                  value={totalSale}
                  hClass={Styles.heading}
                  pClass={Styles.paragraph}
                />
              </div>
            </div>
            <section className="dashboard__content--bottom">
              <div className="wrapper">
                <div className="right">
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
                </div>
              </div>
            </section>
          </main>
        )}
      </DashboardLayout>
    </>
  );
};

export default EOD;
/* &#8358; */
