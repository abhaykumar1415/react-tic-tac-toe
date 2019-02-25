import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './component/login';
import Register from './component/register';
import RouterPage from './component/routerPage';


class App extends Component {
  render() {
    return (
      <Router>
        <div >
          <Route exact path="/" component={RouterPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
