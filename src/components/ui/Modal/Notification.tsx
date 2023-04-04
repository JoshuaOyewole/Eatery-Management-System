import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from "@fortawesome/free-solid-svg-icons"

type ModalProps = {
  resetModal:()=>void;
}

const Notification = (props: ModalProps) => {
  const {resetModal } = props;

  const [isOpen] = useState<Boolean>(true)

  const proceed = () => {
    console.log('Proceeding');
    
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
          <span className="break">Kindly <strong>PRINT</strong> your receipt or click the <strong>OKAY</strong> button to go back.
            </span>
          </p>
          <div className="modal__btnContainer">
            <button onClick={proceed} className="modal__btnContainer__btn">Print</button>
            <button className='modal__btnContainer__btn' onClick={()=>resetModal()}>
              okay
            </button>
          </div>

        </div>
      </div>
    </div>
  )

}

export default Notification

