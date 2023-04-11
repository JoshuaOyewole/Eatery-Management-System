import { useState } from "react";

//TRY AND LOOK FOR A WAY TYO IMPORT THIS PROP HERE using the IMPORT & EXPORTING OF PROPS (10/4/2023 => 10:31PM)
interface AuthTransaction {
  _id: string;
  name: string;
  orders: {
    quantity: number;
    meal: string;
    price: number;
    totalAmount: number;
    _id: string;
  }[];
  totalPrice: number;
  payment_date: string;
  payment_status: string;
  payment_medium: string;
}


const currentDate = () => {
  const date = new Date();
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();

  let today = `${yyyy}-${mm}-${dd}`;
  return today;
};

const getPreviousDate = (currentDate: string, days: number) => {
  //Extract the DAY from TODAY's date (YYYY-MM-DD)
  let toy = { ...currentDate.split("-") };

  let day: string | number = toy[2].slice(-2);
  //Convert day from String to Number and substract one to get yesterday DATE
  day = Number(day) - days;
  //If the DAY is LESS THAN 2 DIGITS, then add 0 to it
  day = day.toString().length < 2 ? `0${day}` : `${day}`;
  let date = `${toy[0]}-${toy[1]}-${day}`;
  return date;
};

const GetCurrentMonth = () => {
  const [currMonth, setcurMonth] = useState<String>("");

  const months = [
    "January",
    "Febraury",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth();

  setcurMonth(months[currentMonth]);
  return currMonth;
};

  /* GET TOTAL AMOUNT SOLD */
  const getTodaySaleAmount = (eod: AuthTransaction[]) => {
    const totalTransactionAmount = eod?.reduce(
      (total: number, value: AuthTransaction) => {
        return (total += value.totalPrice);
      },
      0
    );
    return totalTransactionAmount;
  };
export { currentDate, getPreviousDate, GetCurrentMonth,getTodaySaleAmount};

/* Work on putting all your utilities functions here */
