import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Styles from "./_receipt.module.scss";
import axios from "axios";
import { approvedTrans, declinedTrans, getTodaySaleAmount } from "../../utils/function";
import { AuthTransaction } from "../../utils/types";
import { Spinner } from "../../components/ui/Spinner/Spinner";
let baseURL = "https://eatman-api.onrender.com/api"


function EODReport() {
  const [eod, setEodInfo] = useState<AuthTransaction[]>([]);
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState<boolean>(false)
  const [searchParams] = useSearchParams();
  const date = searchParams.get("q");
  const [declinedAmount, setDeclinedAmount] = useState<number>(0);
  const [approvedAmount, setApprovedAmount] = useState<number>(0);

  function printWindow() {
    window.print();
    navigate(-1);
  }



  const approvedTransactions = approvedTrans(eod);
  const declinedTransactions = declinedTrans(eod);

  useEffect(() => {
    const fetchEODReport = async () => {
      setIsLoading(true)
      const res = await axios.get(`${baseURL}/records/?q=${date}`,
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });
      setEodInfo(res?.data);
      setIsLoading(false)
    };
    document.title = `EOD Report for ${date}`;
    fetchEODReport();
  }, []);

  useEffect(() => {
    setApprovedAmount(getTodaySaleAmount(approvedTransactions));
    setDeclinedAmount(getTodaySaleAmount(declinedTransactions));
  }, [approvedTransactions, declinedTransactions])
  useEffect(() => {
    if (eod !== null) {
      setTimeout(() => {
        printWindow();
      }, 1000);
    }
  }, []);
  {
    if (loading) {
      return <Spinner />
    }
    else {
      return <div className={Styles["invoice-POS"]}>
        <div className={Styles.top}>
          <div className={Styles.logo}></div>
          <div className={Styles.info}>
            <h2 className={Styles.legal}>Rukky Cuisine</h2>
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
    }
  }



}

export default EODReport;
