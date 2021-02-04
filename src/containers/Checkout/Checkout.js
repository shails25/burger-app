import React, { useEffect, useState } from 'react';
import CheckoutSumaary from "../../components/Order/CheckoutSummary";
import Axios from '../../axios.orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Auxc from '../../hoc/Misc';
import Loader from '../../components/UI/Loader/Loader';
import Buttons from '../../components/UI/Buttons/Buttons';


const Checkout = (props) => {
    const [ingredient, setIngredient] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if(window.localStorage.getItem("burger_order_id") !== null){
            const order_id = window.localStorage.getItem("burger_order_id");

            Axios.get(`orders/${order_id}/ingredient.json`)
            .then(res => {
                console.log(res);
                setIngredient(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        }else{
            setLoading(false);
        }
    }, [setIngredient,setLoading ])

    const handleProceed = () => {
        window.localStorage.removeItem("burger_order_id");
        props.history.push("/orders")
    }

    const handleCancel = () => {
        
        props.history.replace("/");
    }
    
    return ( 
        <Auxc>
            {isLoading ? <Loader /> : <CheckoutSumaary ingredient={ingredient}/>}
            <div style={{
                textAlign: "center"
            }}>
                <Buttons btnClass="Error" clickEvent={handleCancel}>Cancel</Buttons>
                <Buttons btnClass="Success" clickEvent={handleProceed}>Proceed</Buttons>
            </div>
        </Auxc> 
    );
}
 
export default withErrorHandler(Checkout, Axios);