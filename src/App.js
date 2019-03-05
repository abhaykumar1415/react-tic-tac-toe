import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './component/login';
import Register from './component/register';
import RouterPage from './component/routerPage';
import HomePage from './component/homepage';
import GameSetup from './component/gamesetup';

class App extends Component {
  render() {
    return (
      <Router>
        <div >
          <Route exact path="/" component={RouterPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/homepage" component={HomePage} />
          <Route exact path="/gamesetup" component={GameSetup} />
        </div>
      </Router>
    );
  }
}

export default App;
