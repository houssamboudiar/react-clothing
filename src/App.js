import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './Components/Header';
import Home from './Components/Home';
import Section from './Components/Section';
import { store } from './Store/store';
import {fetchCategories} from './Store/redux/reducers/categories';


export default class App extends Component {
    
    componentDidMount() {
      store.dispatch(fetchCategories())
    }
  
  render() {
    if (!store.getState().categories.loading === "succeeded") {
      return (
        <div className="loading">
          <div className="loader"></div>
        </div>
      );
    } else {
      return (
        <Router>
          <div id="root" >
            <Header />
            <Route exact path="/"><Redirect to={{pathname:'/all'}} component={Home}  /></Route>
            <Route exact path="/:category" component={Home} />
          </div>
        </Router>
      )
    }
  }
}