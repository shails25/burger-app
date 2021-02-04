import React, { Component } from 'react';
import Aux from '../../../hoc/Misc';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Styles from  './Modal.module.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        const modalClass = [Styles.Modal];
        
        if(this.props.show)
        modalClass.push(Styles.Show)

        return (
            <Aux>
                <Backdrop show={this.props.show}/>
                <div className={modalClass.join(" ")}>
                    {this.props.children}
                </div>
            </Aux>            
        )
    };
};

export default Modal;