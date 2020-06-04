import React from 'react';
import Styles from './BuildControl.module.css';

const BuildControl = (props) => {
    
    return (
        <div className={Styles.BuildControl}>
            <div className={Styles.Label}>{props.label}</div>
            <button className={Styles.Remove} onClick={() => props.removed(props.type)} disabled={props.disabled}>-</button>
            <input type="text" value={props.ingredient[props.type]} readOnly/>
            <button className={Styles.Add} onClick={() => props.added(props.type)}>+</button>
        </div>
    );
};

export default BuildControl;