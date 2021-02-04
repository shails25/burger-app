import React, {Component} from 'react';
import Aux from '../../hoc/Misc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from '../../axios.orders';
import Loader from '../../components/UI/Loader/Loader';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    cheese: 2,
    bacon: 3,
    salad: 1,
    meat: 4
}

class BurgerBuilder extends Component{
    state = {
        ingredient: null,
        totalPrice: 0,
        purchaseable: false,
        purchasing: false,
        isLoading: false,
        error: null
    };

    componentDidMount(){

        let fetch = 'ingredient.json';
        if(this.getLocalStorage("burger_order_id") !== null){
            let order_id = this.getLocalStorage("burger_order_id");
            fetch = `orders/${order_id}/ingredient.json`
        }

        Axios.get(fetch)
        .then(res => {
            console.log(res);

            if(res.data !== null){
                // const oldPrice = this.state.totalPrice;
                let sum = this.state.totalPrice;
                for(let item in res.data){
                    sum += INGREDIENT_PRICES[item] * res.data[item];
                }

                this.setState({ingredient: res.data, totalPrice: sum});
                this.updatePurchaseState(res.data);
            }
            
        })
        .catch(err => {
            this.setState({error: true})
        });
    }

    updatePurchaseState(ingredient){
        const sum = Object.values(ingredient).reduce((sum, el) => sum+el, 0);
        this.setState({purchaseable: sum > 0});
    }

    addIngredient = (type) => {
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredient
        }
        updatedIngredient[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const price = INGREDIENT_PRICES[type];
        const updatedPrice = oldPrice + price;

        this.setState({ingredient: updatedIngredient, totalPrice: updatedPrice});
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount === 0 ? 0 : oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredient
        }
        updatedIngredient[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const price = INGREDIENT_PRICES[type];
        const updatedPrice = oldPrice - price;

        this.setState({ingredient: updatedIngredient, totalPrice: updatedPrice});
        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler= () =>{
        this.setState({purchasing: !this.state.purchasing});
    }

    placeOrderHandler = () => {
        this.setState({isLoading: true});

        const order = {
            ingredient: this.state.ingredient,
            price: this.state.totalPrice,
            customer: {
                name: "Sam",
                address: {
                    street: "up town",
                    city: "Delhi",
                    state: "Delhi",
                    pincode: "111002"
                },
                mobile: "9988776655",
                email: "sams@gmail.com"
            }
        };
        
        if(this.getLocalStorage("burger_order_id") !== null ){

            let order_id = this.getLocalStorage("burger_order_id");

            //send request to  server to save order details
            Axios.patch(`orders/${order_id}.json`, order)
            .then(res => this.props.history.push("/checkout"))
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                    purchasing: false
                })
            });
        }else{

            Axios.post('orders.json', order)
            .then(res=>{
                window.localStorage.setItem("burger_order_id", res.data.name);
                this.props.history.push("/checkout");
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                    purchasing: false
                })
            });
        }


    }

    getLocalStorage = (key) => {
        return window.localStorage.getItem(key) || null;
    }

    setLocalStorage = (key, value) => {
        window.localStorage.setItem(key, value);
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredient
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let summary = null;
        let burger = this.state.error ? <p >Burger ingredient coudn't be loaded</p> : <Loader/>;

        if(this.state.ingredient){
            burger = (
                <Aux>
                    <div style={{
                        width: "50%",
                        height: "300px",
                        margin: "auto"
                    }}><Burger ingredient={this.state.ingredient}/></div>
                    <BuildControls 
                        addIngredient={this.addIngredient} 
                        removeIngredient={this.removeIngredient} 
                        ingredient={this.state.ingredient}
                        disabledInfo={disabledInfo}
                        price = {this.state.totalPrice}
                        purchaseable = {this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            summary = <OrderSummary 
                isLoading={this.state.isLoading} 
                ingredient={this.state.ingredient} 
                price={this.state.totalPrice} 
                orderCancelled={this.purchaseHandler} 
                placeOrder={this.placeOrderHandler}
            />;
        }

        if(this.state.isLoading){
            summary = <Loader/>;
        }

        return (
            <Aux>
                
                <Modal show={this.state.purchasing}>
                    {summary}
                </Modal>
                {burger}
            </Aux>            
        );
    }
}

export default errorHandler(BurgerBuilder, Axios);