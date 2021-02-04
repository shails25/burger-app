import React from 'react';
import Aux from '../../hoc/Misc';
import Toolbar from '../UI/Toolbar/Toolbar';
import Styles from './layout.module.css';

const layout = (props) => (
    <Aux>
        <Toolbar/>
        <main className={Styles.burger_container}>{props.children}</main>
    </Aux>
);

export default layout;
