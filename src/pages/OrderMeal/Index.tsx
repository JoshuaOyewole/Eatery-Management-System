import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Styles from "./_addOrder.module.scss";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Modal from "../../components/ui/Modal/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

type mealProps = {
  name: string;
  _id?: object;
  amount: number;
  price: number;
};

type orderCartProps = {
  meal: string;
  quantity: number;
  price: number;
  totalAmount: number;
}[];

const OrderMeal = () => {
  
  const qtyRef = useRef<HTMLInputElement | null>(null);
  const totalAmountRef = useRef<HTMLInputElement | null>(null);
  const pRef = useRef<HTMLInputElement | null>(null);
  const selectMealRef = useRef<HTMLSelectElement | null>(null);

  //const [ResponseMessage, setResponseMessage] = useState<string | null>(null);
  const [invoiceID, setInvoiceID] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [meal, setMeal] = useState<string>();
  const [paymentMedium, setPaymentMedium] = useState<string | null>(null);
  const [meals, setMeals] = useState<mealProps[]>([]);
  const [quantity, setQty] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  let [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);
  const [orderCart, setorderCart] = useState<orderCartProps>([]);
  const [totalAmount, setTotalAmount] = useState<number>(price * quantity);
  const tableHeader = ["SN", "Description", "Price", "Qty", "Total", "Actions"];

  const getDate = () => {
    const date = new Date();
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = date.getFullYear();

    const today = `${yyyy}-${mm}-${dd}`;
    return today;
  };
  const today = getDate();

  //Fetch Meals from the DB when the App loads
  const fetchMeal = useCallback(async () => {
    const fetchMeal = await axios.get<mealProps[]>(
      `http://localhost:3100/api/meal`
    );

    setMeals(fetchMeal?.data);
  }, []);

  useEffect(() => {
    fetchMeal();
  }, [fetchMeal]);

  // Focus the select input when the app launches
  useEffect(() => {
    selectMealRef.current?.focus();
  }, []);

  //Change the select option choosen by the user
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    setMeal(option);
  };

  //Change Price of the meal ordering
  const changePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value;
    setPrice(parseInt(price));
  };

  useEffect(() => {
    if (meal !== undefined) {
      //Get the MEAL selected inorder to get the Price
      const selectedmeal = meals.filter((mealList) => mealList.name === meal);

      //Get the PRICE from the MEAL selected
      setPrice(selectedmeal[0].price);
    }
  }, [meal, meals]);

  //Change Qty of the meal ordering
  const changeQty = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQty(parseInt(event.target.value));
  };

  /* REMOVE ORDER ITEM */
  const removeItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    /* GET THE SERIAL NO. AND SUBSTRACT 1 TO GET THE EXACT ARRAY ITEM INDEX */
    let itemIndex =
      Number(
        e.currentTarget.parentElement?.parentElement?.firstChild?.textContent
      ) - 1;
    /* FILTER OUT THE ITEM FROM ARRAY AND UPDATE THE ORDERCART */
    setorderCart(orderCart.filter((item, index) => index !== itemIndex));
  };

  const handleAddOrder = () => {
    if (meal === undefined) {
      selectMealRef.current?.focus();
      return toast.error("Kindly select an option from the list of Meals", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setQty(1); // Reset Quantity Field
    setMeal(undefined); // Reset selectedOption Field
    setPrice(price); // Reset Price Field
    orderCart.push({ meal, quantity, price, totalAmount});
    setorderCart(orderCart); //update OrderCart
  };

  //Update Total Amount anytime the qty is incremented or decrement
  useEffect(() => {
    setTotalAmount(price * quantity);
  }, [quantity, price]);

  /* Update TOTAL PRICE OF ALL ITEMS */
  useEffect(() => {
    /* GET TOTAL AMOUNT OF GOODS */
    let sum = 0;
    orderCart.map((order) => (sum += order.totalAmount));
    setTotalOrderPrice(sum);
  }, [orderCart.length, orderCart]);

  const handleSubmit = async () => {
    /* Check if totalPrice and orders are empty. If EMPTY then throw up an ERROR message */
    if (orderCart.length === 0 || totalOrderPrice === 0) {
      return toast.error(`Kindly select an Item to Order`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (window.confirm("Are you sure you want to Proceed?")) {
      /* IF NOT EMPTY THEN SEND THE ORDER TO THE ENDPOINT */
      try {
        const response = await axios.post(`http://localhost:3100/api/order`, {
          name: "Customer ----",
          orders: orderCart,
          totalPrice: totalOrderPrice,
          payment_date: today,
          payment_medium:paymentMedium 
        });

        if (response) {
          /* UPDATE RESPONSE MESSAGE */
          //setResponseMessage(response.data.message);
          /* UPDATE INVOICE ID */
          setInvoiceID(response.data.id);
          /* OPEN MODAL DISPLAY ORDER SUCCESS INFORMATION*/
          setIsModalOpen(true);
          /* SET THE ORDERCART TO EMPTY */
          setorderCart([]);
          /* UPDATE THE TOTAL ORDER PRICE TO 0 */
          setTotalOrderPrice(0);
        }
      } catch (error) {
        toast.success(`${error}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
  };
const changePaymentMethod = (e:React.MouseEvent<HTMLButtonElement>) =>{
  let value =e.currentTarget.textContent;
  setPaymentMedium(value)
  
}
  return (
    <>
      <DashboardLayout>
        <main className={Styles.dashboard__content}>
          <div className={Styles["dashboard__content--top"]}>
            <h2 className={Styles.dashboard__heading}>Make an Order</h2>
            <p>The buttons below show a few things you can do right away</p>
          </div>

          <div className="meal__container">
            <div className="formContainer">
              <label htmlFor="selectMeals" className="mealLabel">
                Select a Meal *
              </label>
              <select
                ref={selectMealRef}
                onChange={selectChange}
                className="selectMeal"
                name="selectMeals"
              >
                <>
                  <option defaultValue={"Choose One"} disabled>
                    Choose one
                  </option>
                </>
                {meals.map((meal, index) => {
                  return (
                    <option value={meal.name} key={index}>
                      {meal.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="formContainer">
              <label htmlFor="price" className="mealLabel">
                Price
              </label>

              <input
                type="number"
                min={0}
                disabled
                className="selectPrice"
                ref={pRef}
                name="price"
                value={price}
                onChange={changePrice}
              />
            </div>
            <div className="formContainer">
              <label htmlFor="quantity" className="mealLabel">
                Qty
              </label>
              <input
                type="number"
                min={1}
                className="selectQty"
                ref={qtyRef}
                name="quantity"
                value={quantity}
                onChange={changeQty}
              />
            </div>
            <div className="formContainer">
              <label htmlFor="totalAmount" className="mealLabel">
                Total Amount
              </label>
              <input
                type="number"
                disabled
                ref={totalAmountRef}
                name="totalAmount"
                value={totalAmount}
                className="selectPrice"
                /* onChange={updateTotalAmount}  */
              />
            </div>
            <button
              onClick={handleAddOrder}
              className="btn primary-btn add-order"
            >
              Add Order
            </button>
          </div>
          <div className="selectedMeal__container">
            {orderCart.length !== 0 && (
              <table className="selectedMeal__table">
                <thead>
                  <tr className="selectedMeal__thead">
                    {tableHeader.map((hd, index) => {
                      return <th key={index}>{hd}</th>;
                    })}
                  </tr>
                </thead>

                <tbody>
                  {orderCart.map((order, index) => {
                    return (
                      <tr className="selectedMeal__tr" key={index}>
                        <td className="selectedMeal__td">{index + 1}</td>
                        <td className="selectedMeal__td">{order.meal}</td>
                        <td className="selectedMeal__td">
                          &#8358; {order.price}
                        </td>
                        <td className="selectedMeal__td">{order.quantity}</td>
                        <td className="selectedMeal__td">
                          {" "}
                          &#8358; {order.totalAmount}
                        </td>
                        <td className="selectedMeal__td">
                          <>
                            <button onClick={removeItem}>
                              <FontAwesomeIcon
                                icon={faDeleteLeft}
                                size="lg"
                                style={{ color: "#F36F7C" }}
                              />
                            </button>
                          </>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="selectedMeal__tr">
                    <td className="selectedMeal__td uppercase">Total Amount</td>
                    <td className="selectedMeal__td uppercase">-</td>
                    <td className="selectedMeal__td uppercase">-</td>
                    <td className="selectedMeal__td uppercase">-</td>
                    <td className="selectedMeal__td uppercase">
                      &#8358; {totalOrderPrice}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>

          {orderCart.length !== 0 && (
            <>
              <div className={Styles.payment_type}>
                <p>Select Payment Type: </p>
                <div className={Styles.payment_method}>
                  <button className={Styles.payment_btn} onClick={changePaymentMethod}>Cash</button>
                  <button className={Styles.payment_btn} onClick={changePaymentMethod}>POS</button>
                  <button className={Styles.payment_btn} onClick={changePaymentMethod}>Transfer</button>
                </div>
              </div>
              <div className="flex mt-m">
                <button
                  onClick={() => setorderCart([])}
                  className="btn danger-btn"
                >
                  CLEAR ORDER'S
                </button>
                <button onClick={handleSubmit} className="btn blue-btn ml-s">
                  PROCESS ORDER
                </button>
              </div>
            </>
          )}
        </main>
      </DashboardLayout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* MODAL FOR SUCCESSFUL TRANSACTION OR FAILURE */}
      {isModalOpen && <Modal orderID={invoiceID} resetModal={resetModal} />}
    </>
  );
};

export default OrderMeal;
