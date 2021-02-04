import React from 'react';
import Burger from '../Burger/Burger';

const CheckoutSumaary = (props) => {
    return ( 
        <div style={{
            textAlign: "center"
        }}>
            <h1>Checkout Your Delicious Burger</h1>
            <p>Enjoy This page for fun</p>
            <div style={{
                width: "50%",
                height: "300px",
                margin: "auto"
            }}><Burger ingredient={props.ingredient}/></div>
        </div>
     );
}
 
export default CheckoutSumaary;