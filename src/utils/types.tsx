//Staff props
export type StaffProps = {
    _id?: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string,
    gender: string,
    homeAddress: string,
    dob: string,
    state: string,
    lga: string,
    passport: string,
}
// Define the type for your option
export interface mealSelectOptions {
    value: string;
    label: string;
}
export interface lastTransactionProps {
    transactions: Array<AuthTransaction>;
    currentPage: number;
    totalPages: number;
}
export type totalForDay = {
    totalAmount: number,
    totalCount: number
}
export type totalForMonth = {
    totalAmount: number,
    totalCount: number
}
export type dashboardSummaryProps = {
    totalForDay: totalForDay,
    totalForMonth: totalForMonth
}
export type topSellingProps = {
    totalQuantity: number,
    _id: string
}[]

export interface SelectProps {
    options: mealSelectOptions[],
    handleChange?: (selectedOption: mealSelectOptions | null) => void;
}
export type addOrderInitialState = {
    loading: boolean,
    order: {},
    error: string | undefined,
    success: boolean
}
export type purchaseResState = {
    loading: boolean,
    order: Order,
    error: undefined | "",
    success: boolean
}
export type mealOrder = {

}
export type loginCredentialsProps = {
    email: string,
    password: string
}

//initial State props
/* export type InitialState =
    {
        success: boolean,
        status: number | undefined,
        message: string,
        details: userLoginResData | null,
        token: string,
        loading: boolean,
    } */
//initial State props
export type mealInitialState = {
    loading: boolean,
    meals: Array<mealProps>,
    error: string | undefined,
    success: boolean
}
export type userLoginResData = {
    _id: string,
    rank: string,
    firstname: string,
    lastname: string
}
export type loginResType2 = {
    success: boolean,
    token: string | null,
    error: string | undefined,
    details: userLoginResData | null,
}

export type loginResType = {
    success: boolean,
    message: string | undefined,
    details: userLoginResData | null,
    token: string | null,
    loading: boolean,
}
/* export type userLoginResData = {
    _id: string,
    rank: string,
    firstname: string,
    lastname: string
}
export type loginResType2 = {
    success: boolean,
    token: string | null,
    error: string | undefined,
    details: userLoginResData | null,
}

export type loginResType = {
    success: boolean,
    message: string | undefined,
    details: userLoginResData | null,
    token: string | null,
    loading: boolean,
} */
export type bestSelling = {
    _id: String,
    totalQuantity: number
}[]
export type salesSummary = {
    totalForDay: {
        totalAmount: String | number,
        totalCount: String | number,
    },
    totalForMonth: {
        totalAmount: String | number,
        totalCount: String | number,
    }
}

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
    passport: string,
};

export interface mealProps {
    _id: string,
    title: string,
    price: number,
    description: string,
    imageURL: string,
    calories: string,
    qty: number,
    category: string,
};

export type Order = {
    quantity: number,
    meal: string,
    price: number,
    totalAmount: number,
    _id?: string,
}


export interface AuthTransaction {
    _id: string,
    name: string,
    orders: Array<Order>,
    totalPrice: number,
    payment_date: string,
    payment_status: string,
    payment_medium: string,
}

export type loginErrResponse = {
    success: boolean,
    message: string,
    code: number,
    stack: string
}


export type loadingProps = {
    color: string,
    type: string
}

export type orderCartProps = {
    meal: string,
    quantity: number,
    price: number,
    totalAmount: number
}

export type transactionInitialState = {
    loading: boolean,
    orders: Array<Object>,
    error: string | undefined,
    success: boolean
}


export type OrderProps = {
    orders: Array<Order>,
    totalPrice: number,
}

export type MealProps = {
    title?: string;
    price?: number;
    description?: string,
    category?: string
    qty?: number,
    imageURL?: string
};

export type FoodCategory = {
    _id?: string;
    name?: string;
    urlParam?: string;
    icon?: string
}

export type EodProps = {

}