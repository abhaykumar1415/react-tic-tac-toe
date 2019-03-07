import React, { Component } from 'react'
import './startScreen.css';
import Button from '@material-ui/core/Button';

export default class StartScreen extends Component {

  componentDidCatch = () => {
    this.initializePush();
  }
  changePage = () => {
    console.log("login", this.props.loginBtn);
    this.props.changePage(this.props.loginBtn);
  }

  renderPage = () => {
    console.log("register", this.props.registerBtn);
    this.props.renderPage(this.props.registerBtn)
  }

  render() {
    return (
      <div>
        <div className="main-wrapper" >
          <div className="header-container">
            Tic-Tac-Toe
        </div >
          <div className="content" >
            <Button variant="contained" className="button1-wrapper" onClick={this.changePage}>
              Login
          </Button>
          </div>
          <div className="content1">
            <Button variant="contained" className="button2-wrapper" onClick={this.renderPage}>
              Sign Up
      </Button>
          </div>
        </div>
      </div>
    )
  }
}
