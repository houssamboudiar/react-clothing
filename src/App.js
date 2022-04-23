import React, { Component } from 'react';
import Header from './Components/Header';
import Home from './Components/Home';

export default class App extends Component {

  render() {
    return (
        <div id="root" >
          <Header />
          {/* <Home /> */}
        </div>
    )
  }
}

