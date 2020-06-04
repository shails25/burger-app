import React from 'react';
import Styles from  './Modal.module.css';

const Modal = (props) => {
    const modalClass = [Styles.Modal];
    if(props.show)
        modalClass.push(Styles.Show)

    return (
        <div className={modalClass.join(" ")}>
            {props.children}
        </div>
    );
};

export default Modal;