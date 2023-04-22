import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Styles from "./_receipt.module.scss";
import axios from "axios";

type OrderProps = {
  orders: {
    meal: string;
    price: React.ReactNode;
    quantity: React.ReactNode;
    totalAmount: React.ReactNode;
    _id: string;
  }[];
  name: string;
  totalPrice: React.ReactNode;
};

/* 
TASK FOR TOMORROW
Use the ID gottem from the parameter to query the database for the Receipt Info and update the UI
You can bring a loading component and hide only when the data queried is available
*/
function Index() {
  const navigate = useNavigate();
  const { id } = useParams();//Order ID
  const [orderInfo, setOrderInfo] = useState<OrderProps | null>(null);

  const fetchReceiptInfo = async () => {
    const response = await axios.get(`http://localhost:3100/api/order/${id}`);
    setOrderInfo(response?.data);
  };

  function printWindow() {
    window.print();
    navigate("/order-meal");
  }

  useEffect(() => {
    fetchReceiptInfo();
    //Delay of 50ms was added so the response from the promise can be gotten and the UI updated with the correct details before printing
    const interval = setTimeout(() => printWindow(), 50);

    return () => {
      clearTimeout(interval);
    };
  }, []);

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
        <div className={Styles.info}>
          <h3>Payment Receipt</h3>
        </div>
      </div>

      <div className={Styles.bot}>
        <div className={Styles.table}>
          <table>
            <>
              <thead>
                <tr className={Styles.tabletitle}>
                  <td className={Styles.item}>
                    <h2>Item</h2>
                  </td>
                  <td className={Styles.Hours}>
                    <h2>Qty</h2>
                  </td>
                  <td className={Styles.Rate}>
                    <h2>Sub Total</h2>
                  </td>
                </tr>
              </thead>
              <tbody>
                <>
                  {orderInfo?.orders.map((item, index) => {
                    return (
                      <tr className={Styles.service} key={index}>
                        <td className={Styles.tableitem}>
                          <p className={Styles.itemtext}> {item.meal}</p>
                        </td>
                        <td className={Styles.tableitem}>
                          <p className={Styles.itemtext}>{item.quantity}</p>
                        </td>
                        <td className={Styles.tableitem}>
                          <p className={Styles.itemtext}>{item.totalAmount}</p>
                        </td>
                      </tr>
                    );
                  })}
                  <tr className={Styles.tabletitle}>
                    <td></td>
                    <td className={Styles.Rate}>
                      <h2>Total</h2>
                    </td>
                    <td className={Styles.payment}>
                      <h2>{orderInfo?.totalPrice}</h2>
                    </td>
                  </tr>
                </>
              </tbody>
            </>
          </table>
        </div>

        <div className={Styles.legalcopy}>
          <p className={Styles.legal}>
            <strong>Thank you for your patronage!</strong>
          </p>
          <p className={Styles.information}>
            For Queries kindly contact us on: +2347032054367 or <span className={Styles.break}>email us @
            queries@orisfinaEatery.com.ng</span> 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Index;
