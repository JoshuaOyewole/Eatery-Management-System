import {useState} from "react"

export const GetCurrentMonth = () => {
    const [currMonth, setcurMonth] = useState<String>('');

    const months = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currentMonth = new Date().getMonth();

    setcurMonth(months[currentMonth]);
    return currMonth;
};

GetCurrentMonth();

module.exports = { GetCurrentMonth};

/* Work on putting all your utilities functions here */