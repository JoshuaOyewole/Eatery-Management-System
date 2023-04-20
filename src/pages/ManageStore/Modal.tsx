import React from "react";
import Styles from "./_storeBox.module.scss";

type Props = {
  Component: React.ComponentType;
  isModalOpen: boolean,
  updateModalOpen: React.Dispatch<React.SetStateAction<boolean>>

};


function Modal({isModalOpen, Component, updateModalOpen}: Props) {

  const handleCloseModal = () => {
    updateModalOpen(!isModalOpen)
  };
  return (
    <div className="modalContainer">
      <button onClick={handleCloseModal} className={Styles["modal__closeBtn"]}>
        X
      </button>
      <div className={Styles.modal}>
        <div className={Styles["modal__content"]}>
          <Component />
        </div>
      </div>
    </div>
  );
}

export default Modal;
