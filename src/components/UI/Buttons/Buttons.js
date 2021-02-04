import React from 'react';
import Styles from './Buttons.module.css';

const Buttons = (props) => {
    return ( 
        <button className={[Styles.Btn, Styles[props.btnClass]].join(" ")} onClick={props.clickEvent}>{props.children}</button>
     );
}
 
export default Buttons;