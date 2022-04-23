import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Components/Header';
import Home from './Components/Home';

export default class App extends Component {
    render() {
    return (
        <Router>
          <div id="root" >
            <Header />
            <Route exact path="/:category" component={Home} />
          </div>
        </Router>
    )
  }
}

