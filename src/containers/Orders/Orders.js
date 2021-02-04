import React, { Component } from 'react';
import Axios from '../../axios.orders';
import Order from '../../components/Order/Order';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Styles from './Orders.module.css';

class Orders extends Component {
    state = { 
        loading: true,
        orders: {}
    }

    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders(){
        Axios.get("orders.json")
        .then(res => {
            let orders = [];
            for(let key in res.data){
                orders.push({
                    ...res.data[key],
                    id: key
                })
            }

            this.setState({orders: orders, loading: false})
        })
        .catch(err => {
            this.setState({loading: false})
        })
    }

    handleDelete = (e, id) => {
        const btn = e.target;
        btn.innerHTML = "Loading...";
        btn.disabled = true;

        Axios.delete(`orders/${id}.json`)
        .then(res => {
            this.fetchOrders()
        })
        .catch(err => console.log(err))
    }

    handleUpdate =(e, id) => {
        const btn = e.target;
        const data = {
            completed: true
        };

        btn.innerHTML = "Loading...";
        btn.disabled = true;

        console.log(id, e)

        Axios.patch(`orders/${id}.json`, data)
        .then(res => {
            this.fetchOrders()
        })
        .catch(err => console.log(err))
    }

    render() { 
        return ( 
            <div className={Styles.Orders}>
                {this.state.loading ? <Loader /> : this.state.orders.map((order,i) => <Order 
                    handleDelete={this.handleDelete} 
                    handleUpdate={this.handleUpdate}
                    key={order.id} 
                    index={i+1} 
                    {...order}/>
                )}
            </div>
         );
    }
}
 
export default withErrorHandler(Orders, Axios);

