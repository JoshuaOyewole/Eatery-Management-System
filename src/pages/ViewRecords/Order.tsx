import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "./_viewRecord.module.scss";
import Receipt from "../Receipt/_receipt.module.scss";
import UserStyles from "../../components/ui/UserInfoSection/_user.module.scss";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthTransaction } from "../../utils/types";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import { Spinner } from "../../components/ui/Spinner/Spinner";
import moment from "moment";
//import DashboardLayout from "../../Layout/Dashboard/Dashboard";
const env = import.meta.env;

const Index = () => {
  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState<AuthTransaction | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Boolean>(false);

  const fetchReceiptInfo = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${env.VITE_API_URL}/order/${orderId}`,
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        }
      );
      let res = await response?.data;
      setOrderInfo(res);
      setLoading(false)
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    document.title = `Transaction Details`;
    fetchReceiptInfo();
  }, []);

  const printReceipt = () => {
    navigate(`/printReceipt/${orderId}`)
  }

  return (
    <>
      <DashboardLayout>
        <main className={Styles.transactions__heading}>
          <div className={Styles.transactions__table}>
            <div className={Styles.userContainer}>
              <div className={Styles.navigateUser__header}>
                <button
                  className={`${Styles["transactions__heading--ordersFound"]} ${Styles["transactions__heading--title"]}`}
                  onClick={() => navigate(-1)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} size="lg" /> Go Back
                </button>
                <button className={`${Styles["transactions__heading--ordersFound"]} ${Styles["transactions__heading--title"]}`} onClick={printReceipt}>Print</button>
              </div>

              <div className={Styles.userDetailsContainer}>
                {loading ? <Spinner /> : (<>
                  <div className={UserStyles.userDetails__sectionTitle}>
                    Transaction Details
                  </div>
                  <div className={Receipt.userDetailsContainer}>
                    <section>
                      <div className={Styles.bot}>
                        <div className={Styles.infoTop}>
                          <div className={Styles.customerDetails}>
                            <h4>Customer Name: </h4>
                            <p>{orderInfo?.name}</p>
                          </div>
                          <div className={Styles.customerDetails}>
                            <h4>Payment Medium: </h4>
                            <p>{orderInfo?.payment_medium.toUpperCase()}</p>
                          </div>
                          <div className={Styles.customerDetails}>
                            <h4>Payment Date: </h4>
                            <p>
                              {moment(orderInfo?.payment_date).format('dddd Do MMM. YYYY')}{""}
                              <span style={{paddingLeft:"2rem"}}>{moment(orderInfo?.payment_date).format('hh:mmA')}</span>
                            </p>
                          </div>
                          <div className={Styles.customerDetails}>
                            <h4>Payment Status: </h4>
                            <p>{orderInfo?.payment_status}</p>
                          </div>
                        </div>
                        <div className={Styles.table}>
                          <table className={Styles.table}>
                            <>
                              <thead>
                                <tr className={Styles.tabletitle}>
                                  <td className={Styles.td}>
                                    <h2>Item</h2>
                                  </td>
                                  <td className={Styles.td}>
                                    <h2>Price</h2>
                                  </td>
                                  <td className={Styles.td}>
                                    <h2>Qty</h2>
                                  </td>
                                  <td className={Styles.td}>
                                    <h2>Sub Total</h2>
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <>
                                  {orderInfo?.orders.map((item, index: number) => {
                                    return (
                                      <tr className={Styles.service} key={index}>
                                        <td className={Styles.itemtext}>{item.meal}</td>
                                        <td className={Styles.itemtext}>&#8358; {item.price}</td>
                                        <td className={Styles.itemtext}>
                                          {item?.quantity}
                                        </td>
                                        <td className={Styles.itemtext}>
                                          &#8358; {item?.totalAmount}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                  <tr className={Styles.service}>
                                    <td></td>
                                    <td className={Styles.itemtext}>
                                      <h2>Total</h2>
                                    </td>
                                    <td className={Styles.itemtext}>
                                      <h2>&#8358; {orderInfo?.totalPrice}</h2>
                                    </td>
                                  </tr>
                                </>
                              </tbody>
                            </>
                          </table>
                        </div>
                      </div>
                    </section>
                  </div></>)}

              </div>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </>

  );
};

export default Index;
