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