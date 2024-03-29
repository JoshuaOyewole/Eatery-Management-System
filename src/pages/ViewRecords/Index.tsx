import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import TableStyles from "../../components/ui/Table/_table.module.scss";
import ReactLoading from "react-loading";
import Styles from "./_viewRecord.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserStyles from "../../components/ui/UserInfoSection/_user.module.scss";
import Button from "../../components/ui/Button";
import TableRow from "../../components/ui/Table/tablebody";
import Table from "../../components/ui/Table/table";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { currentDate } from '../../utils/function'
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import { AuthTransaction } from "../../utils/types"
import { useAppSelector } from "../../redux/hooks/hooks";
const env = import.meta.env;


type Props = {
  record?: string;
};



const Index = (props: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Get the EOD Date param from the URL.
  const [date] = useSearchParams();
  const query = date.get('q');
  let userId = useAppSelector(state => state.auth.user._id)


  /* HOOK TO FETCH TODAY's DATE */
  const today = currentDate();

  /* TABLE HEADER */
  const [tableHeader] = useState([

    "Customer Name",
    "Payment Medium",
    "Total Amount",
    "payment date",
    "time",
    "payment status",
    "Action",
  ]);

  const [orders, setOrder] = useState<AuthTransaction[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  /* FETCH ORDERS FOR TODAY*/
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${env.VITE_API_URL}/records`, {
        params: {
          "q": `${query !== null ? query : today}`,
          userId
        },
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      });
      let res = await response?.data;
      setOrder(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);

    }
  };

  /* FETCH ORDERS FROM LOCALSTORAGE TO ENABLE FASTER LOADING */
  useEffect(() => {
    const fetchOrder = localStorage.getItem("orders");
    document.title = `Recent Orders`;
    // Check if the Order Data was gotten and not null
    if (fetchOrder != null) {
      const getOrder = JSON.parse(fetchOrder);
      setOrder(getOrder);
    }
    fetchOrders();
  }, []);


  return (
    <>
      <DashboardLayout>
        <main className={Styles.transactions__heading}>
          <div className={Styles.transactions__table}>
            {loading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><ReactLoading type={"bars"} color="#333" /></div> : <div className={Styles.userContainer}>
              <div className={Styles.navigateUser__header}>
                <h2 className={Styles["transactions__heading--title"]}>
                  {orders.length ? orders.length : "0"}
                  <span className={Styles["transactions__heading--ordersFound"]}>
                    Orders Found
                  </span>
                </h2>
                <Button
                  text={"GO BACK"}
                  handleClick={() => navigate(-1)}
                  classname={"primary-btn"}
                />
              </div>

              <div className={Styles.userDetailsContainer}>
                <section
                  className={`${TableStyles.table_container} ${TableStyles.tableContainer} `}
                >
                  <div className={UserStyles.userDetails__sectionTitle}>
                    Transactions
                  </div>
                  {orders.length > 0 ? (
                    <Table tableHeader={tableHeader}>
                      {orders?.map((order, index) => {
                        const { name, payment_medium, payment_date, totalPrice,
                          payment_status } = order;
                        const originalDate = new Date(payment_date);
                        const formattedTime = originalDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                        const formattedDate = originalDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                        return (
                          <TableRow key={index}>

                            <td>{name}</td>
                            <td>{payment_medium}</td>
                            <td>&#8358; {totalPrice}</td>
                            <td>
                              {formattedDate}
                            </td>
                            <td>{formattedTime}</td>
                            <td>{payment_status.toUpperCase()}</td>
                            <td>
                              <Link to={`${order._id}`} key={index}>
                                <FontAwesomeIcon icon={faArrowPointer} />
                                <span> View</span>
                                {/* <FontAwesomeIcon icon={faPenToSquare} size="xl" /> FOR EDITING*/}
                              </Link>
                            </td>
                          </TableRow>
                        );
                      })}
                    </Table>
                  ) : (
                    <h2>No Transaction Found!</h2>
                  )}
                </section>
              </div>
            </div>}
          </div>
        </main>
      </DashboardLayout>
    </>
  );
};

export default Index;
