import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Styles from "./_receipt.module.scss";
import axios from "axios";
import { declinedTrans, getTodaySaleAmount } from "../../utils/function";
import { AuthTransaction } from "../../utils/types";
import { Spinner } from "../../components/ui/Spinner/Spinner";
const env = import.meta.env;

function EODSummary() {
  const [eod, setEod] = useState<AuthTransaction[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const date = searchParams.get("q");
  const [declinedAmount, setDeclinedAmount] = useState<number>(0);
  const [approvedAmount, setApprovedAmount] = useState<number>(0);

  function printWindow() {
    window.print();
    navigate(-1);
  }


  /* FILTER SUCCESSFUL TRANSACTIONS FROM EOD */
  const successfulTransactions = eod?.filter((currentValue: AuthTransaction) => {
    return currentValue.payment_status === "Successful";
  });
  /* FILTER DECLINED TRANSACTIONS FROM EOD */
  const declinedTransactions = declinedTrans(eod);

  useEffect(() => {
    /* FETCH EOD TRANSACTIONS */
    const fetchEOD = async () => {
      setIsLoading(true)
      const res = await axios.get(`${env.VITE_API_URL}/records/?q=${date}`,
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });
      let data = await res?.data;

      setEod(data);
      setIsLoading(false)
    };
    //Chage Document Title
    document.title = `EOD Summary for ${date}`;
    fetchEOD();
  }, []);

  useEffect(() => {
    setApprovedAmount(getTodaySaleAmount(successfulTransactions));
    setDeclinedAmount(getTodaySaleAmount(declinedTransactions));
  }, [successfulTransactions, declinedTransactions]);

   useEffect(() => {
     if (eod !== null) {
       setTimeout(() => {
         printWindow();
       }, 2000);
     }
   }, []); 



  {
    if (isLoading) {
      return <Spinner />
    }
    else {
      return <div className={Styles["invoice-POS"]}>
        <div className={Styles.top}>
          {/* <div className={Styles.logo}></div> */}
          <div className={Styles.info}>
            <h2 className={Styles.legal}>Bella Cuisine</h2>
            {/* <p className={Styles.address}>
            Motto : Customer's Satisfactory is our priority{" "}
          </p> */}
            <p className={Styles.address}>Address : No. 22 Agege, Lagos State</p>
            <p className={Styles.address}>Email : info@bellacuisine.com  </p>
          </div>
        </div>

        <div className={Styles.mid}>
          <div className={`${Styles.info}`}>
            <h3>EOD REPORT Summary</h3>

            <span className={Styles.header}>
              <strong>Date:</strong>
            </span>
            <span className={Styles.header}>
              <strong> {date}</strong>
            </span>
          </div>
          <div className={`${Styles.row} `}>
            <h6 className={Styles.header}> Total Approved Sales</h6>
            <p className={Styles.data}>{successfulTransactions.length}</p>
          </div>
          <div className={`${Styles.row} `}>
            <h6 className={Styles.header}>Total Approved Amount</h6>
            <p className={Styles.data}>{approvedAmount}</p>
          </div>
          <div className={`${Styles.row} `}>
            <h6 className={Styles.header}>Total Declined Sales</h6>
            <p className={Styles.data}>{declinedTransactions.length}</p>
          </div>
          <div className={`${Styles.row} `}>
            <h6 className={Styles.header}>Total Declined Amount</h6>
            <p className={Styles.data}>{declinedAmount}</p>
          </div>
        </div>
        <h3 className="mt-xs">Details Report</h3>
        {eod.length !== 0 ? <div className={Styles.bot}>
          <div className={Styles.table}>
            <>
              {eod?.map((order, index) => {
                const originalDate = new Date(order.payment_date);
                const formattedTime = originalDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                const formattedDate = originalDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                return (
                  <div className={`${Styles.service} mt-xs`} key={index}>
                    <p className={Styles.itemtext}> {order.payment_status}</p>

                    <p className={Styles.itemtext}>NGN {order.totalPrice}</p>
                    <p className={Styles.itemtext}>
                      <>
                        {formattedDate}  {formattedTime}
                      </>
                    </p>
                    {/*  <p className={Styles.itemtext}>ID:{order._id}</p> */}
                  </div>
                );
              })}

              <div className={`${Styles.tabletitle} mt-xs px-s py-xs perfect-center`}>
                <span className={Styles.Rate}><strong>Total: </strong></span>

                <span className={Styles.payment}><strong>NGN {approvedAmount}</strong></span>
              </div>
            </>
          </div>

        </div> :
          <h6 className={Styles.header}>No Transaction Found for Today</h6>}
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

export default EODSummary;
