import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import axios from "axios";
import TableStyles from "../../components/ui/Table/_table.module.scss";
import Styles from "./_viewRecord.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserStyles from "../../components/ui/UserInfoSection/_user.module.scss";
import Button from "../../components/ui/Button";
import TableRow from "../../components/ui/Table/tablebody";
import Table from "../../components/ui/Table/table";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import useDate from "../../hooks/useDate";

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
};

const Index = (props: Props) => {

  /* HOOK TO FETCH TODAY's DATE */
  const [today] = useDate();

  // Get the userId param from the URL.
  let { date } = useParams();


  /* INITIAL VALUE FOR ORDERS */
  const initialValue = [
    {
      _id: "1",
      name: "Joshua Oyewole",
      payment_medium: "Cash",
      totalPrice: "34564",
      payment_date: "06-04-2023",
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

  const [orders, setOrder] = useState<ordersProps[]>(initialValue);
  //const [loading, setLoading] = useState<Boolean>(true);
  const handleClick = () => {
    alert("Export Button Clicked!");
  };

  /* FETCH ALL ORDERS */
  const fetchOrders = async () => {
    const response = await axios.get(`http://localhost:3100/api/records?eod=${today}`);
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
              text={"PRINT TRANSACTIONS"}
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
                    const {name,payment_medium, payment_date,totalPrice,
                    payment_status} = order
                    return (
                      <TableRow key={index}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{payment_medium}</td>
                        <td>&#8358; {totalPrice}</td>
                        <td>
                          {payment_date}
                        </td>
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
        </div>
      </div>
    </main>
  );
};

export default Index;
