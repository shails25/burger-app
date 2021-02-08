import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let input = null;
    switch(props.inputtype){
        case "input": 
            input = <input {...props.config} onBlur={props.changed}/>;
            break;
        case "select":
            input = <select {...props.config} onChange={props.changed}>
                <option value="">{props.config.placeholder}</option>
               { props.config.options.map(opt => <option key={opt.value} value={opt.value}>{opt.display}</option>)}
            </select>
            break;
        case "textarea":
            input = <textarea {...props.config} onBlur={props.changed}>{props.value}</textarea>
            break;
        default:
            input = <input {...props.config} onBlur={props.changed}/>;
            break;
    }

    return ( 
        <div className={classes.form_control}>
            <label>{props.label}</label>
            {input}
            {props.error ? <small className={classes.error}>{props.error}</small> : null}
        </div>
     );
}
 
export default Input;