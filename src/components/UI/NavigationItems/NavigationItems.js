import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import Styles from './NavigationItems.module.css';

const NavigationItems = (props) => {
    return (
        <ul className={Styles.NavigationItems}>
            <NavigationItem link="/" active={true}>Buger Builder</NavigationItem>        
            <NavigationItem link="/checkout">Checkout</NavigationItem>        
            <NavigationItem link="/orders">Orders</NavigationItem>        
        </ul>
    );
};

export default NavigationItems;