import React from 'react';
import Aux from '../../hoc/Misc';
import Styles from './layout.module.css';

const layout = (props) => (
    <Aux>
        <div>right Menu, Middle Section</div>
        <main className={Styles.burger_container}>{props.children}</main>
    </Aux>
);

export default layout;
