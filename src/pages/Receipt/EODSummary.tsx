import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Styles from "./_receipt.module.scss";
import axios from "axios";
import { getTodaySaleAmount } from "../../utils/utils";

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

function EODSummary() {
  const [eod, setEod] = useState<AuthTransaction[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("q");
  const [declinedAmount, setDeclinedAmount] = useState<number>(0);
  const [approvedAmount, setApprovedAmount] = useState<number>(0);

  function printWindow() {
    window.print();
    navigate(-1);
  }

/* FETCH EOD TRANSACTIONS */
  const fetchEOD = async () => {
    const res = await axios.get(`http://localhost:3100/api/records/?q=${date}`);
    setEod(res?.data);
  };
/* FILTER SUCCESSFUL TRANSACTIONS FROM EOD */
  const successfulTransactions = eod?.filter((currentValue: AuthTransaction) => {
    return currentValue.payment_status === "Successful";
  });
/* FILTER DECLINED TRANSACTIONS FROM EOD */
  const declinedTransactions = eod?.filter((currentValue: AuthTransaction) => {
    return currentValue.payment_status === "Declined";
  });

  useEffect(() => {
    document.title = `EOD Summary for ${date}`;
    fetchEOD();
    //Delay of 50ms was added so the response from the promise can be gotten and the UI updated with the correct details before printing
    const interval = setTimeout(() => printWindow(), 50);

     return () => {
      clearTimeout(interval);
    }; 
  }, []);

  useEffect(() => {
    setApprovedAmount(getTodaySaleAmount(successfulTransactions));
    setDeclinedAmount(getTodaySaleAmount(declinedTransactions));
  }, [successfulTransactions, declinedTransactions]);

  return (
    <div className={Styles["invoice-POS"]}>
      <div className={Styles.top}>
        <div className={Styles.logo}></div>
        <div className={Styles.info}>
          <h2 className={Styles.legal}>Orisfina Eatery</h2>
          {/* <p className={Styles.address}>
            Motto : Customer's Satisfactory is our priority{" "}
          </p> */}
          <p className={Styles.address}>Address : Angle 90, Auchi Edo state </p>
          <p className={Styles.address}>Email : info@orisfinaeatery.com </p>
        </div>
      </div>

      <div className={Styles.mid}>
        <div className={`${Styles.info} px-s`}>
          <h3>EOD REPORT Summary</h3>

          <span className={Styles.header}>
            <strong>Date:</strong>
          </span>
          <span className={Styles.header}>
            <strong> {date}</strong>
          </span>
        </div>
        <div className={`${Styles.row} px-s`}>
          <h6 className={Styles.header}> Total Approved Sales</h6>
          <p className={Styles.data}>{successfulTransactions.length}</p>
        </div>
        <div className={`${Styles.row} px-s`}>
          <h6 className={Styles.header}>Total Approved Amount</h6>
          <p className={Styles.data}>{approvedAmount}</p>
        </div>
        <div className={`${Styles.row} px-s`}>
          <h6 className={Styles.header}>Total Declined Sales</h6>
          <p className={Styles.data}>{declinedTransactions.length}</p>
        </div>
        <div className={`${Styles.row} px-s`}>
          <h6 className={Styles.header}>Total Declined Amount</h6>
          <p className={Styles.data}>{declinedAmount}</p>
        </div>
      </div>
      <h3 className="mt-xs">Details Report</h3>
      {eod.length !== 0 ? <div className={Styles.bot}>
        <div className={Styles.table}>
          <>
            {eod?.map((order, index) => {
              return (
                <div className={`${Styles.service} mt-xs`} key={index}>
                  <p className={Styles.itemtext}> {order.payment_status}</p>

                  <p className={Styles.itemtext}>NGN {order.totalPrice}</p>
                  <p className={Styles.itemtext}>{order.payment_date}</p>
                  <p className={Styles.itemtext}>ID:{order._id}</p>
                </div>
              );
            })}
            
            <div className={`${Styles.tabletitle} mt-xs px-s py-xs perfect-center`}>
              <span className={Styles.Rate}><strong>Total: </strong></span>

              <span className={Styles.payment}><strong>NGN {approvedAmount}</strong></span>
            </div>
          </>
        </div>

      </div>:
      <h6 className={Styles.header}>No Transaction Found for Today</h6>}
      <p className={`${Styles.information} mt-s`}>
        For Queries kindly contact us on: +2347032054367 or{" "}
        <span className={Styles.break}>
          email us at queries@orisfinaEatery.com.ng
        </span>
      </p>
    </div>
  );
}

export default EODSummary;
