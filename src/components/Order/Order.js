import React from 'react';
import Buttons from '../UI/Buttons/Buttons';
import Styles from './Order.module.css';
import Burger from '../Burger/Burger';

const Order = (props) => {
    const ingredients = [];
    for(let key in props.ingredient){
        ingredients.push(
            <small className={Styles.Ingredient} 
                    key={key}
                    style={{
                        backgroundColor: "#"+Math.ceil(Math.random()*9)+Math.ceil(Math.random()*9)+Math.ceil(Math.random()*9)
                    }}>{key}: {props.ingredient[key]}</small>
        ) 
    }

    return ( 
        <div className={Styles.Order}>
            <h5>Order Detail #{props.index}</h5>
            <hr/>
            <div style={{
                width: "60%",
                height: "150px",
                margin: "auto"
            }}><Burger ingredient={props.ingredient} /></div>
            <div className={Styles.Ingredients}>{ingredients}</div>
            <p><b>Price</b>: ₹ {props.price}/-</p>
            <div className={Styles.Order_control}>
                {props.completed?
                <Buttons btnClass="Error" clickEvent={(event) => props.handleDelete(event, props.id)}>Delete</Buttons>
                :<Buttons btnClass="Success" clickEvent={(event) => props.handleUpdate(event, props.id)}>Mark Completed</Buttons>}
            </div>
        </div>
     );
}
 
export default Order;