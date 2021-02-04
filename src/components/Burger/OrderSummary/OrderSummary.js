import React from 'react';
import Aux from '../../../hoc/Misc';
import Styles from './OrderSummary.module.css';

const OrderSummary = (props) => {
    const Ingredient = Object.entries(props.ingredient)
                    .map(([key, value]) => {
                        return <li key={key}>{key}: {value}</li>
                    });

    return (
        <Aux>
            <h3>Your Order Summary</h3>
            <p>A delicious Buger With Folowing Ingredient: </p>
            <ul className={Styles.IngredientList}>
                {Ingredient}
            </ul>
            <p>Total Cost: <strong>{props.price} ₹</strong></p>
            <button className={Styles.Cancel} onClick={props.orderCancelled}>Cancel</button>
            <button className={Styles.Continue} onClick={props.placeOrder}>Continue</button>
        </Aux>
    );
};

export default OrderSummary;