import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Chart from "../../components/ui/Chart/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import Styles from "./_eod.module.scss";
import Box from "../../components/ui/Dashboard/Box";
import MultiLayoutBox from "../../components/ui/Dashboard/MultiLayoutBox";

const EOD = () => {
  /* 
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState(''); 
    */
  let currDate = new Date().getDate();
  const [date, setDate] = useState('2023-04-06');


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(typeof date); 
  };

  return (
    <>
      <DashboardLayout>
        <main className="dashboard__content">
          <div className="dashboard__content--top">
            <h2 className="dashboard__heading">
              EOD (End of Day Transactions History)
            </h2>
            {/* <p>The buttons below show a few things you can do right away</p> */}
            {/* 
                        IMPROVEMENT -- 16th Oct 2022, 8:19PM
                        The dashboard headings and paragraphs should be recieved as props here since they are reusable.
                        Instead of passing Children, a prop can replaced it and take the main as a prop and the dashboard heading, paragraphs as props also */}
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
                  title="Today Sales for Today"
                  value={20}
                  hClass={Styles.heading}
                  pClass={Styles.paragraph}
                />
              </Link>
            </div>

            <div className="content2">
              <MultiLayoutBox
                transfer={19}
                POS={40}
                cash={12}
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
                value={"1,150,000"}
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
                      onChange={(e) => {
                        setDate(e.target.value)
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
