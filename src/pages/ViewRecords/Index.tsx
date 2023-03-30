import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TableStyles from "../../components/ui/Table/_table.module.scss";
import Styles from "./_viewRecord.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { format } from "date-fns";

/* COMPONENTS */
import UserStyles from "../../components/ui/UserInfoSection/_user.module.scss";
import Button from "../../components/ui/Button";
import TableRow from "../../components/ui/Table/tablebody";
import Table from "../../components/ui/Table/table";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";

type Props = {
  record?: string;
};

type ordersProps = {
  _id: string;
  name: string;
  payment_medium: string;
  totalPrice: string;
  payment_date: string;
  payment_status: string
}[];

const Index = (props: Props) => {
  /* INITIAL VALUE FOR ORDERS */
  const initialValue = [
    {
      _id: "1",
      name: "Joshua Oyewole",
      payment_medium: "Cash",
      totalPrice: "34564",
      payment_date: "2023-03-30",
      payment_status: "Successful"
    },
    {
      _id: "2",
      name: "Lookman Harus",
      payment_medium: "Cash",
      totalPrice: "4564",
      payment_date: "2023-03-30",
      payment_status: "Successful"
    },
  ];

  /* TABLE HEADER */
  const [tableHeader] = useState([
    "sn",
    "Customer Name",
    "Payment Medium",
    "Total Amount",
    "payment date",
    "payment status",
    "Action",
  ]);

  const [orders, setOrder] = useState<ordersProps>(initialValue);
  //const [loading, setLoading] = useState<Boolean>(true);
  const handleClick = () => {
    alert("Export Button Clicked!");
  };

  /* FETCH ALL ORDERS */
  const fetchOrders = async () => {
    const response = await axios.get(`http://localhost:3100/api/order`);
    setOrder(response?.data);
    //setLoading(false);
  };

  /* FETCH ORDERS FROM LOCALSTORAGE TO ENABLE FASTER LOADING */
  useEffect(() => {
    const fetchOrder = localStorage.getItem("orders");

    // Check if the Order Data was gotten and not null
    if (fetchOrder != null) {
      const getOrder = JSON.parse(fetchOrder);
      setOrder(getOrder);
    }
    fetchOrders();
  }, []);

  return (
    <main className={Styles.transactions__heading}>
      <div className={Styles.transactions__table}>
        <div className={Styles.userContainer}>
          <div className={Styles.navigateUser__header}>
            <h2 className={Styles["transactions__heading--title"]}>
              {orders.length ? orders.length : "0"}
              <span className={Styles["transactions__heading--ordersFound"]}>
                Orders Found
              </span>
            </h2>
            <Button
              text={"EXPORT REPORT"}
              handleClick={handleClick}
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
                    return (
                      <TableRow key={index}>
                        <td>{index + 1}</td>
                        <td>{order.name}</td>
                        <td>{order.payment_medium}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                            {order.payment_date}
                        </td>
                        <td>{order.payment_status.toUpperCase()}</td>
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
        </div>
      </div>
    </main>
  );
};

export default Index;
