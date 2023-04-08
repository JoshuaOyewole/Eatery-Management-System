import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Chart from "../../components/ui/Chart/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import Styles from "./_eod.module.scss";
import Box from "../../components/ui/Dashboard/Box";
import MultiLayoutBox from "../../components/ui/Dashboard/MultiLayoutBox";
import axios from "axios";
import useDate from "../../hooks/useDate";

interface AuthTransaction {
  _id: string;
  name: string;
  orders: {
    quantity: number;
    meal: string;
    price: number;
    totalAmount: number;
    _id: string;
  }[];
  totalPrice: number;
  payment_date: string;
  payment_status: string;
  payment_medium: string;
}

const EOD = () => {
  /* HOOK TO FETCH TODAY's DATE */
  const [today] = useDate();

  /* 
   {
      _id: "642ea65add5c550f857ee95e",
      name: "Customer ----",
      orders: [
        {
          quantity: 2,
          meal: "Ice Cream",
          price: 600,
          totalAmount: 1200,
          _id: "642ea65add5c550f857ee95f",
        },
        {
          quantity: 4,
          meal: "Chicken",
          price: 1600,
          totalAmount: 6400,
          _id: "642ea65add5c550f857ee960",
        },
      ],
      totalPrice: 7600,
      payment_date: "2023-04-06",
      payment_status: "pending",
      payment_medium: "Cash",
    }, */
  const [date, setDate] = useState(today);
  const [totalSale, setTotalSale] = useState<number>();
  const [eod, setEod] = useState<AuthTransaction[]>([]);

  /* Handle Custom Search EOD Transaction Form  */
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  //FILTER PAYMENTS METHODS
  /* 
  1. Get the list of all the payments[ARRAY]
  2. Loop through the Array and filter it based on criterias
  3.Then find the length
  */
  const cashPayments = eod?.filter((transaction: AuthTransaction) => {
    return transaction.payment_medium === "Cash";
  });
  const ATMPayments = eod?.filter((transaction: AuthTransaction) => {
    return transaction.payment_medium === "ATM";
  });
  const transferPayments = eod?.filter((transaction: AuthTransaction) => {
    return transaction.payment_medium === "Transfer";
  });

  /* FETCH EOD */
  useEffect(() => {
    const fetchEOD = async () => {
      const res = await axios.get(
        `http://localhost:3100/api/records?eod=${today}`
      );
      setEod(res.data);
    };
    fetchEOD();
  }, []);

  /* TOAL AMOUNT SOLD */
  useEffect(() => {
    const totalTransactionAmount = eod?.reduce(
      (total: number, value: AuthTransaction) => {
        return (total += value.totalPrice);
      },
      0
    );
    
    setTotalSale(totalTransactionAmount);
  }, [eod]);

  return (
    <>
      <DashboardLayout>
        <main className="dashboard__content">
          <div className="dashboard__content--top">
            <h2 className="dashboard__heading">
              EOD (End of Day Transactions History)
            </h2>
          </div>
          <div className="dashboard__box-container">
            <div className="content2">
              <Link to={"/records/orders"} className="block">
                <Box
                  icon={
                    <FontAwesomeIcon
                      icon={faHouseChimney}
                      className="dashboard__icon"
                    />
                  }
                  title="Sales for Today"
                  value={eod?.length}
                  hClass={Styles.heading}
                  pClass={Styles.paragraph}
                />
              </Link>
            </div>

            <div className="content2">
              <MultiLayoutBox
                transfer={transferPayments?.length}
                POS={ATMPayments?.length}
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
              <div className="left">
                <div className="top">
                  <h3 className="mb-s tertiary-header">Previous Records</h3>
                  <div className="flex w-100 space-between">
                    <Box
                      title="Yesterday Sales"
                      value={"950,000"}
                      hClass={Styles.heading}
                      pClass={Styles.paragraph}
                      boxStyle={Styles.box__small}
                    />
                    <Box
                      title="2 days ago"
                      value={"650,000"}
                      hClass={Styles.heading}
                      pClass={Styles.paragraph}
                      boxStyle={Styles.box__small}
                    />
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
      </DashboardLayout>
    </>
  );
};

export default EOD;
/* &#8358; */
