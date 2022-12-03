import { useParams } from "react-router-dom";
import {useEffect} from "react"

type Props = {
    businessName?: string,
    businessAddress?: string,
    totalOrderPrice?: React.ReactNode,
    orderCart: {
        meal: string, 
        quantity:Number, 
        totalAmount:Number, 
        price:Number
    }[]
}


function Index({ businessName, businessAddress, orderCart, totalOrderPrice}: Props) {
    const {id} = useParams();
    
    const tableHeader = ["SN", "Description", "Price", "Qty", "Total"];

    useEffect(() => {
        window.print(); 
    }, [])
    
    return (
        <div className="receipt-container">
           
            <h3 className="title">{businessName}</h3>
            <h4 className="adress">{businessAddress}</h4>
            <h5 className="invoice">Customer Invoice Receipt</h5>

            <table className="selectedMeal__table">
                <thead>
                    <tr className='selectedMeal__thead'>
                        {tableHeader.map((hd, index) => {
                            return <th key={index}>{hd}</th>
                        })}
                    </tr>

                </thead>

                <tbody>
                    {
                        orderCart.map((order, index) => {
                            return <tr className='selectedMeal__tr' key={index}>
                                <td className='selectedMeal__td'>{index + 1}</td>
                                <td className='selectedMeal__td'>{order.meal}</td>
                               {/*  ERROR COMING FROM HERE
                               <td className='selectedMeal__td'> {order.price}</td>
                                <td className='selectedMeal__td'>{order.quantity}</td>
                                <td className='selectedMeal__td'> {order.totalAmount}</td> */}
                            </tr>
                        })
                    }

                </tbody>
                <tfoot>
                    <tr className="selectedMeal__tr">
                        <>
                        <td className="selectedMeal__td uppercase">
                            Total Amount
                        </td>
                        <td className="selectedMeal__td uppercase">
                            -
                        </td>
                        <td className="selectedMeal__td uppercase">
                            -
                        </td>
                        <td className="selectedMeal__td uppercase">
                            -
                        </td>
                        <td className="selectedMeal__td uppercase">
                            &#8358; 3000
                        </td>
                        </>
                    </tr>
                </tfoot>


            </table>

            <a href="/order-meal">Return Home</a>
        </div>
    )
}

export default Index;