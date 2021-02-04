import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Styles from './Toolbar.module.css';

const Toolbar = (props) => {
    return (
        <div className={Styles.Header}>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default Toolbar;