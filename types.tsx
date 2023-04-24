
export type mealProps = {
    name: string;
    _id?: object;
    amount: number;
    price: number;
  };

  export type orderCartProps = {
    meal: string;
    quantity: number;
    price: number;
    totalAmount: number;
  };

  export interface AuthTransaction {
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

  export type OrderProps = {
    orders: {
      meal: string;
      price: React.ReactNode;
      quantity: React.ReactNode;
      totalAmount: React.ReactNode;
      _id: string;
    }[];
    name: string;
    payment_medium?:string;
    totalPrice: React.ReactNode;
    payment_date?:string,
    payment_status?:string
  };

  export type ordersProps = {
    _id: string;
    name: string;
    payment_medium: string;
    totalPrice: string;
    payment_date: string;
    payment_status: string
  };

  export type staffProps = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    homeAddress: string;
    state: string;
    lga: string;
    dob: Date;
    passport: string;
  };