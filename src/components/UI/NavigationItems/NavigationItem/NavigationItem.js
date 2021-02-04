import React from 'react';
import {NavLink } from 'react-router-dom';
import Styles from './NavigationItem.module.css';

const NavigationItem = (props) => {
    return (
        <li className={Styles.NavigationItem}>
            <NavLink to={props.link} exact activeClassName={Styles.active}>{props.children}</NavLink>
            {/* <a href= className={props.active ? Styles.active : null}></a> */}
        </li>
    );
};

export default NavigationItem; 