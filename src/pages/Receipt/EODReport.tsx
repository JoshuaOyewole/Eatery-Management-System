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

function EODReport() {
  const [eod, setEodInfo] = useState<AuthTransaction[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("q");
  const [declinedAmount, setDeclinedAmount] = useState<number>(0);
  const [approvedAmount, setApprovedAmount] = useState<number>(0);

  function printWindow() {
    window.print();
    navigate(-1);
  }

  const fetchEODReport = async () => {
    const res = await axios.get(`http://localhost:3100/api/records/?q=${date}`);
    setEodInfo(res?.data);
  };

  const approvedTransactions = eod?.filter((currentValue: AuthTransaction) => {
    return currentValue.payment_status === "Successful";
  });

  const declinedTransactions = eod?.filter((currentValue: AuthTransaction) => {
    return currentValue.payment_status === "Declined";
  });

  useEffect(() => {
    document.title = `EOD Report for ${date}`;
    fetchEODReport();
    //Delay of 50ms was added so the response from the promise can be gotten and the UI updated with the correct details before printing
    const interval = setTimeout(() => printWindow(), 50);

    return () => {
      clearTimeout(interval);
    }; 
    
  }, []);

  useEffect(() => {
    setApprovedAmount(getTodaySaleAmount(approvedTransactions));
    setDeclinedAmount(getTodaySaleAmount(declinedTransactions));
  }, [approvedTransactions,declinedTransactions])
  

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
          <span>
            <h3>EOD Report</h3>{" "}
          </span>
          <span className={Styles.header}>
            <strong>Date:</strong>{" "}
          </span>
          <span className={Styles.header}>
            <strong>{date}</strong>
          </span>
        </div>
        <div className={`${Styles.row} px-s`}>
          <h6 className={Styles.header}> Approved Sales</h6>
          <p className={Styles.data}>{approvedTransactions.length}</p>
        </div>
        <div className={`${Styles.row} px-s`}>
          <h6 className={Styles.header}>Approved Amount</h6>
          <p className={Styles.data}>{approvedAmount}</p>
        </div>
        <div className={`${Styles.row} px-s`}>
          <h6 className={Styles.header}> Declined Sales</h6>
          <p className={Styles.data}>{declinedTransactions.length}</p>
        </div>
        <div className={`${Styles.row} px-s`}>
          <h6 className={Styles.header}>Declined Amount</h6>
          <p className={Styles.data}>{declinedAmount}</p>
        </div>
        <div className={Styles["line-break"]}></div>
        <div className={`${Styles["total-row"]} px-s `}>
          <h6 className={`${Styles.bal}`}>Balance</h6>
          <p className={Styles.bal}>NGN {approvedAmount}</p>
        </div>
      </div>

      <p className={`${Styles.information} mt-s`}>
        For Queries kindly contact us on: +2347032054367 or{" "}
        <span className={Styles.break}>
          email us at queries@orisfinaEatery.com.ng
        </span>
      </p>
    </div>
  );
}

export default EODReport;
