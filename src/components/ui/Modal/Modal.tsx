import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from "@fortawesome/free-solid-svg-icons"

type ModalProps = {
  orderID: string,
  resetModal:()=>void;
}

const Modal = (props: ModalProps) => {
  const { orderID,resetModal } = props;

  const navigate = useNavigate();
  const [isOpen] = useState<Boolean>(true)

  const handlePrint = () => {
    navigate(`/printReceipt/${orderID}`);
  };

  /* const handleCloseModal = ()=>{
    setIsOpen(!isOpen);
  } */

  return isOpen && (
    <div className='modalContainer'>
      <div className="modal">
        <div className="modal__successIcon">
          <FontAwesomeIcon icon={faCheck} className="modal__successIcon--icon" />
        </div>
        <div className="modal__content">
          <h2 className="modal__content__order-status">Order Successfull !</h2>
          <p className="modal__content__order-confirmation">Your Order has been Confirmed with ID:
            <span className=" modal__content__orderID">{orderID}</span> <span className="break">Kindly <strong>PRINT</strong> your receipt or click the <strong>OKAY</strong> button to go back.
            </span>
          </p>
          <div className="modal__btnContainer">
            <button onClick={handlePrint} className="modal__btnContainer__btn">Print</button>
            <button className='modal__btnContainer__btn' onClick={()=>resetModal()}>
              okay
            </button>
          </div>

        </div>
      </div>
    </div>
  )

}

export default Modal

