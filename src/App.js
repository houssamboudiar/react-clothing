import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Header from './Components/Header';
import Home from './Components/Home';
import { store } from './Store/store';
import {fetchCategories} from './Store/redux/reducers/categories';
import PDP from './Components/PDP';
import Cart from './Components/Cart';


export default class App extends Component {
    
    componentDidMount() {
      store.dispatch(fetchCategories())
    }
    
    render() {
      if (!store.getState().categories.categories) {
        return (
          <div className="loading">
          <div className="loader"></div>
        </div>
      );
      }
      return (
        <Router>
          <div id="root" >
            <Header />
            <Route path="/">
              <Redirect to={{ pathname: '/all' }} component={Home} />
            </Route>
            <Route exact path="/:category" component={Home} />
            <Route path="/:category/:id" component={PDP} />
          </div>
        </Router>
      )
  }
}