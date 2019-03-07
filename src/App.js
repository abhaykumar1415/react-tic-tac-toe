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
import Invitation from './component/invitations';

// const NoMatch = ({ location }) => (
//   <div>
//     {/* <code>{location.pathname}</code> */}
//   </div>
// )

class App extends Component {
  render() {
    return (
      <Router>
        <div >
          <Route path="/" exact component={RouterPage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/navigation" component={Navigation} />
          <Route path="/homepage" component={HomePage} />
          <Route path="/gamesetup" component={GameSetup} />
          <Route path="/profile" component={Profile} />
          <Route path="/invitation" component={Invitation} />
          {/* <Route component={RouterPage} /> */}
        </div>
      </Router>
    );
  }
}

export default App;



