import React, { Component } from 'react';
import './navigation.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import firebase, { initializePush } from '../services/firebase.js'

var database = firebase.database().ref();
var userdata = database.child('users');

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      list: []
    }
  }

  componentDidMount() {
    
    var messages = []
    userdata.on('child_added', snapshot => {
      messages.push({
        text: snapshot.val().email
      })
      this.setState({ messages })
      this.setState({ list: messages });
      console.log("list", this.state.list);
      console.log("messages", messages);
    })
  }



  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  changePage = () => {
    console.log("hii");
    console.log(this.props.history.location.state.email);
    var email = this.props.history.location.state.email;
    this.props.history.push({
      pathname: '/profile',
      state: {
        email: this.props.history.location.state.email
      }
    });
  }

  userLogout = () => {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      console.log("Sign-out successful.");
    }).catch(function (error) {
      // An error happened.
      console.log('Error occured');
    });
  }

  renderToLogin = () => {
    this.props.history.push('/');
  }

  handelButton = () => {
    this.userLogout();
    this.renderToLogin();
  }

  // changeToHomePage = () => {
  //   // this.props.history.push('/navigation');
  // }


  render() {

    return (

      <div>
        <AppBar position="fixed" >
          <Toolbar className="nav-toolbar" >
            <div className="navigation-btn"
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </div>
            <div className="navigation-header" >
              Tic-Tac-Toe
            </div>
            <div className="nav-btn">
              <Button onClick={this.handelButton}>
                Logout
          </Button>
            </div>
          </Toolbar>

        </AppBar>
        <div className="navigation-container">
          <Drawer
            // variant="persistent"
            // anchor="left"
            open={this.state.open}
          >
            <div className="navigation-button">
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <div className="navigation-list">
              <div className="list-first" onClick={this.changePage}>
                Profile
                </div>
              <div className="list" >
                Matches
                </div>
              <div className="list" onClick={this.changeToHomepage}>
                Home
                </div>
              <div className="list">
                Invites
                </div>
              <div className="list" onClick={this.handelButton}>
                Logout
                </div>
            </div>
            <Divider />
          </Drawer>
        </div>
        <div >

          <div className="homepage-wrapper">
            <div className="homepage-content">
              {
                this.state.list.map((item, index) => {
                  return (
                    <p key={index}>{item.text}</p>

                  )
                })
              }
            </div>
          </div>

        </div>
      </div>
    )
  }
}
