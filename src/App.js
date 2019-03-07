import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import http from './core/HttpClient';
import Login from './component/login';
import Register from './component/register';
import RouterPage from './component/routerPage';
import HomePage from './component/homepage';
import GameSetup from './component/gamesetup';
import Navigation from './component/navigation';
import Profile from './component/profile';

class App extends Component {

  render() {
    return (
      <Router>
        <div >
          <Switch>
            <Route exact path="/" component={RouterPage} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/navigation" component={Navigation} />
            <Route path="/homepage" component={HomePage} />
            <Route path="/gamesetup" component={GameSetup} />
            <Route path="/profile" component={Profile} />
            <Route component={RouterPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;



