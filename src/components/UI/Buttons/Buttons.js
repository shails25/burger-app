import React from 'react';
import Styles from './Buttons.module.css';

const Buttons = (props) => {
    return ( 
        <button className={[Styles.Btn, Styles[props.btnClass]].join(" ")} onClick={props.clickEvent} type={props.Type}>{props.children}</button>
     );
}
 
export default Buttons;