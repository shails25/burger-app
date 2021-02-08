import React, { useEffect, useState } from 'react';
import CheckoutSumaary from "../../components/Order/CheckoutSummary";
import Axios from '../../axios.orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Auxc from '../../hoc/Misc';
import Loader from '../../components/UI/Loader/Loader';
import Buttons from '../../components/UI/Buttons/Buttons';
import Classess from './Checkout.module.css';
import Formdata from './Formdata';

let cnt = 0;

const Checkout = (props) => {
    const [ingredient, setIngredient] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [loadform, setLoadform] = useState(false);    

    useEffect(() => {
        console.log("rendring...", cnt++);
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
    }, [])

    const handleProceed = () => {
        setLoadform(true);
    }

    const handleCancel = () => {
        
        props.history.replace("/");
    }

    return ( 
        <Auxc>
            {isLoading ? <Loader /> : 
            <Auxc>
                <CheckoutSumaary ingredient={ingredient}/>
                <div style={{
                    textAlign: "center"
                }}>
                    <Buttons btnClass="Error" clickEvent={handleCancel}>Back</Buttons>
                    {Object.keys(ingredient).length ? <Buttons btnClass="Success" clickEvent={handleProceed}>Proceed</Buttons> : null }
                </div>
            </Auxc>
            }

            {loadform ? <div className={Classess.Form}>
                <Formdata ingredients={ingredient} history={props.history}/>
            </div> : null}
            
        </Auxc> 
    );
}
 
export default withErrorHandler(Checkout, Axios);