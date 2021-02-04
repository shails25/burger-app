import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Misc';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state ={
            error: null
        };

        componentWillMount(){
            axios.interceptors.request.use(req => {
                this.setState({errors: null});
                return req;
            })

            axios.interceptors.response.use(res => res, err => {
                this.setState({error: err});
            })
        }
        render(){
            return (
                <Aux>
                    <Modal show={this.state.error}>{this.state.error ? this.state.error.message : null}</Modal>
                    <WrapperComponent {...this.props} />
                </Aux>            
            );
        }
    };
};

export default withErrorHandler;