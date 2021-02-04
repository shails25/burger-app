import React from 'react';
import logo from '../../../assets/images/logo.png';
import Styles from './Logo.module.css';

const Logo = (props) => {
    return (
        <div className={Styles.Logo}>
            <img src={logo} alt=""/> &nbsp;&nbsp;
            <strong>Burger<br/>Menu</strong>
        </div>   
    );
};

export default Logo;