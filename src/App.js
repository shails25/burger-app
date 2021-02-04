import React, { Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Layout from '../src/components/layouts/layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';


class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <Layout>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" exact component={Checkout}/>
          <Route path="/orders" exact component={Orders}/>
        </Layout>
      </BrowserRouter>
    )
  }
}

export default App;
