import React, { Component } from 'react'
import './page.css';
import firebase from '../services/firebase.js'

import StartScreen from '../startScreen';
export default class RouterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginBtn: 'Login',
      registerBtn: 'Sign Up',
      loggedIn: false
    }
  }

  componentDidMount() {
    this.authListener();
  }

  renderRedirect = (loginBtn) => {
    // eslint-disable-next-line no-unused-expressions
    (loginBtn === 'Login') ? this.props.history.push('/login') : null;
  }

  renderPage = (registerBtn) => {
    // eslint-disable-next-line no-unused-expressions
    (registerBtn === 'Sign Up') ? this.props.history.push('/register') : null;
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("user:", user.email);
        this.setState({
          loggedIn: true
        })
      } else {
        // No user is signed in.
        this.setState({
          loggedIn: false
        });
      }
    });
  }

  render() {
    return (
      <div >
        {this.state.loggedIn === true ? (this.props.history.push('/navigation')) : null}
        <StartScreen
          loginBtn={this.state.loginBtn}
          registerBtn={this.state.registerBtn}
          changePage={this.renderRedirect}
          renderPage={this.renderPage}
        />
      </div>
    )
  }
}
