import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import Styles from './Burger.module.css';

const Burger = (props) => {
    let ingredient = [];

    for( const ingred in props.ingredient){
        for(let i = 0; i< props.ingredient[ingred]; i++){
            ingredient.push(<BurgerIngredient key={ingred + i} type={ingred}/>);
        }
    };

    if(ingredient.length === 0){
        ingredient = <div><span>Start Adding Some Ingredients</span></div>;
    }


    return (
        <div className={Styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;