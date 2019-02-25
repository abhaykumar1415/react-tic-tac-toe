import React, { Component } from 'react';
import './App.css';
import HomePage from './component/homepage';
import firebase from './services/firebase.js';

class App extends Component {
  
  render() {
    return (
      <div>
        <HomePage/>
      </div>
    );
  }
}

export default App;
