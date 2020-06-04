import React from 'react';
import BuildControl from  './BuildControl/BuildControl';
import Styles from './BuildControls.module.css';

const BuildControls = (props) => {
   const controls = [
      {label: "Salad", type: "salad"},
      {label: "Cheese", type: "cheese"},
      {label: "Bacon", type: "bacon"},
      {label: "Meat", type: "meat"},
   ];

   return (
      <div className={Styles.BuildControls}>
         <p>Current Price: <strong>{props.price} ₹</strong></p>
         {controls.map(function(ctl){
            return <BuildControl 
                     key={ctl.type} 
                     type={ctl.type} 
                     label={ctl.label} 
                     added={props.addIngredient} 
                     removed={props.removeIngredient} 
                     ingredient={props.ingredient}
                     disabled={props.disabledInfo[ctl.type]}
                  />;
         })}

         <button className={Styles.Purchase} disabled={!props.purchaseable} onClick={props.ordered}>ORDER NOW</button>
      </div>
   )
};

export default BuildControls;