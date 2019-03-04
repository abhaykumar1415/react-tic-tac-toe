import React, { Component } from 'react'
import './page.css';
import StartScreen from '../startScreen';
export default class RouterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginBtn: 'Login',
      registerBtn: 'Sign Up'
    }
  }

  renderRedirect = (loginBtn) => {
    // eslint-disable-next-line no-unused-expressions
    (loginBtn === 'Login') ? this.props.history.push('/login') : null;
  }

  renderPage = (registerBtn) => {
    // eslint-disable-next-line no-unused-expressions
    (registerBtn === 'Sign Up') ? this.props.history.push('/register') : null;
  }

  render() {
    return (
      <div >
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
