import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Styles from "./_receipt.module.scss";
import axios from "axios";
import { OrderProps } from "../../utils/types"
import { Spinner } from "../../components/ui/Spinner/Spinner";
const env = import.meta.env;

/* 
TASK FOR TOMORROW
Use the ID gottem from the parameter to query the database for the Receipt Info and update the UI
You can bring a loading component and hide only when the data queried is available
*/
function Index() {
  const navigate = useNavigate();
  let { id } = useParams();//Order ID
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [orderInfo, setOrderInfo] = useState<OrderProps | null>(null);



  function printWindow() {
    window.print();
    navigate("/order-meal");
  }

  useEffect(() => {

    const fetchReceiptInfo = async (id: string | undefined) => {
      setIsLoading(true)
      const response = await axios.get(`${env.VITE_API_URL}/order/${id}`,
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });
      const res = await response.data;
      setOrderInfo(res);
      setIsLoading(false)
    };
    fetchReceiptInfo(id);

  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (orderInfo !== null) {
        printWindow();
      }
    }, 2000);
  }, [orderInfo])


  {
    if (isLoading) {
      return <Spinner />
    }
    else {
      return <div className={Styles["invoice-POS"]}>
        <div className={Styles.top}>
          {/*   <div className={Styles.logo}></div> */}
          <div className={Styles.info}>
            <h2 className={Styles.legal}>Bella Cusine</h2>
            {/* <p className={Styles.address}>
      Motto : Customer's Satisfactory is our priority{" "}
    </p> */}
            <p className={Styles.address}>Address : No. 22 Agege, Lagos State</p>
            <p className={Styles.address}>Email : info@bellacuisine.com  </p>
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
    }
  }
}

export default Index;
