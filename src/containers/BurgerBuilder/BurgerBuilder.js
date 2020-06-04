import React, {Component} from 'react';
import Aux from '../../hoc/Misc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    cheese: 2,
    bacon: 3,
    salad: 1,
    meat: 4
}

class BurgerBuilder extends Component{
    state = {
        ingredient: {
            cheese: 0,
            bacon: 0,
            salad: 0,
            meat: 0
        },
        totalPrice: 0,
        purchaseable: false,
        purchasing: false
    };

    updatePurchaseState(ingredient){
        const sum = Object.values(ingredient).reduce((sum, el) => sum+el, 0);
        console.log(sum, sum >0 );
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

    render(){

        const disabledInfo = {
            ...this.state.ingredient
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Backdrop show={this.state.purchasing}/>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredient={this.state.ingredient} price={this.state.totalPrice} orderCancelled={this.purchaseHandler}/>
                </Modal>
                <Burger ingredient={this.state.ingredient}/>
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
    }
}

export default BurgerBuilder;