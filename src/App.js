import React, { Component} from 'react';
import Layout from '../src/components/layouts/layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';

class App extends Component{
  render(){
    return (
      <Layout>
        <BurgerBuilder/>
      </Layout>
    )
  }
}

export default App;
