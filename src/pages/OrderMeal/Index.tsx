import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Styles from "./_addOrder.module.scss";
import React, { useState, useEffect, useRef } from "react";
import Modal from "../../components/ui/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { orderCartProps } from '../../utils/types'
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getMeals } from "../../redux/features/meal/mealSlice";
import { currentDate } from "../../utils/function";
import { addOrder, resetOrder } from "../../redux/features/addOrder/addOrderSlice";

const OrderMeal = () => {
  const dispatch = useAppDispatch();

  const isSucess = useAppSelector(state => state.meal.success)
  const isOrderSucess = useAppSelector(state => state.addOrder.success)

  //Fetch Meals state from Redux Store when the App loads
  const meals = useAppSelector(state => state.meal.meals);

  const qtyRef = useRef<HTMLInputElement | null>(null);
  const totalAmountRef = useRef<HTMLInputElement | null>(null);
  const pRef = useRef<HTMLInputElement | null>(null);
  const selectMealRef = useRef<HTMLSelectElement | null>(null);

  const [ResponseMessage, setResponseMessage] = useState<string | undefined>(undefined);
  const [invoiceID, setInvoiceID] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [meal, setMeal] = useState<string>();
  const [paymentMedium, setPaymentMedium] = useState<string | null>(null);

  const [quantity, setQty] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  let [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);
  const [orderCart, setorderCart] = useState<orderCartProps[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(price * quantity);
  const tableHeader = ["SN", "Description", "Price", "Qty", "Total", "Actions"];

  //Get current Date
  const today = currentDate();

  //Refetch Meals if isSuccess state changes 
  useEffect(() => {
    dispatch(getMeals());
  }, [dispatch, isSucess]);

  // Focus the Meal select input when the page finish loading
  useEffect(() => {
    selectMealRef.current?.focus();
  }, []);

  //Change the Meal option selected by a user
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMeal(event.target.value)
  };

  //Change Price to that of the Meal Selected
  const changePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value;
    setPrice(parseInt(price));
  };

  useEffect(() => {
    if (meal !== undefined) {
      //Get the MEAL selected inorder to get the Price
      const selectedmeal = meals.filter((mealList) => mealList.title === meal);


      //Get the PRICE from the MEAL selected
      setPrice(selectedmeal[0].price);
      //Set the QTY to 1 before a user decides to INCREASE|DECREASE
      setQty(1)
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


  //SUBMIT MEAL
  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
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
    orderCart.push({ meal, quantity, price, totalAmount });
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
      const data = {
        name: "Customer ----",
        orders: orderCart,
        totalPrice: totalOrderPrice,
        payment_date: today,
        payment_medium: paymentMedium
      }
      try {
        let response = await dispatch(addOrder(data))
        if (response.payload) {
          /* UPDATE RESPONSE MESSAGE */
          setResponseMessage(response.payload.message);
          /* UPDATE INVOICE ID */

          setInvoiceID(response.payload.id);
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
        })
      }
    }
  };


  //Reset Modal Open and Close State
  const resetModal = () => {
    setIsModalOpen(false);
  };

  //Payment Methods
  const changePaymentMethod = (e: React.MouseEvent<HTMLButtonElement>) => {
    let value = e.currentTarget.textContent;
    setPaymentMedium(value)

  }


  //Reset Order Object after a successful Ordering
  useEffect(() => {
    if (isOrderSucess == true) {
      //Reset the State
      dispatch(resetOrder())
    }
  }, [isOrderSucess])


  return (
    <>
      <DashboardLayout>
        <main className={Styles.dashboard__content}>
          <div className={Styles["dashboard__content--top"]}>
            <h2 className={Styles.dashboard__heading}>Make an Order</h2>
            <p>The buttons below show a few things you can do right away</p>
          </div>
          <form onSubmit={handleAddOrder} className="meal__container">
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
                  <option defaultValue={"Choose One"} disabled >
                    --Select a Meal--
                  </option>
                </>
                {meals.map((meal, index) => {
                  return (
                    <option value={meal.title} key={index}>
                      {meal.title}
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
              type="submit"
              className="btn primary-btn add-order"
            >
              Add Order
            </button>
          </form>


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
      {isModalOpen && <Modal message={ResponseMessage} orderID={invoiceID} resetModal={resetModal} />}
    </>
  );
};

export default OrderMeal;
