import { AuthTransaction } from '../../types'

export const currentDate = () => {
    const date = new Date();
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = date.getFullYear();

    let today = `${yyyy}-${mm}-${dd}`;
    return today;
};

export const getPreviousDate = (currentDate: string, days: number) => {
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

export const GetCurrentMonth = () => {
    //Array of Months in a Calender
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
    //Get the Current Month Index
    const currentMonth = new Date().getMonth();
    //Return the current Month from the Array of Months already generated
    return months[currentMonth];

};

/* GET TOTAL AMOUNT SOLD */
export const getTodaySaleAmount = (successfulTransactions: AuthTransaction[]) => {
    const totalTransactionAmount = successfulTransactions?.reduce(
        (total: number, value: AuthTransaction) => {
            return (total += value.totalPrice);
        },
        0
    );
    return totalTransactionAmount;
};

//Get Payments made by Cash
export const cashPayment = (successfulTransactions: AuthTransaction[]) => {
    return successfulTransactions.filter((transaction: AuthTransaction) => {
        return transaction.payment_medium === "Cash";
    });
}

//Get Payments made by POS
export const POSPayment = (successfulTransactions: AuthTransaction[]) => {
    return successfulTransactions.filter((transaction: AuthTransaction) => {
        return transaction.payment_medium === "POS";
    })
}
//Get Payments made by Transfer
export const TransferPayment = (successfulTransactions: AuthTransaction[]) => {
    return successfulTransactions.filter((transaction: AuthTransaction) => {
        return transaction.payment_medium === "Transfer";
    });
}