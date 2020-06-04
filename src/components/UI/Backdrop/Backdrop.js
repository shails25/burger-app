import React from 'react';
import Styles from './Backdrop.module.css';

const Backdrop = (props) => {
    const backClass = [Styles.Backdrop];
    if(props.show)
        backClass.push(Styles.Show);

   return (
       <div className={backClass.join(" ")}></div>
   );
};

export default Backdrop;