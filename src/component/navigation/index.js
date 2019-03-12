import React, { Component } from 'react';
import './navigation.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import firebase from '../services/firebase.js'
import Handler from '../services/authService';
import { getTokenofReceiver, sendNotification, askForPermissioToReceiveNotifications } from '../services/pushnotification/push_notification';

var database = firebase.database().ref();
var userdata = database.child('users');

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      list: [],
      currentuser: ''
    }
  }

  componentDidMount() {
    Handler.authListener().then(user => {
      this.setState({ currentuser: user });
    })
    window.localStorage.setItem('current player', JSON.stringify(""));
    window.localStorage.setItem('received player', JSON.stringify(""));
    let messages = []
    userdata.on('child_added', snapshot => {
      messages.push({
        text: snapshot.val().email
      })
      this.setState({ messages, list: messages })
      console.log('list', this.state.list);
      console.log('messages', messages);
    })
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  changePage = () => {
    console.log('hii');
    // let email = this.props.history.location.state.email;
    this.props.history.push({
      pathname: '/profile',
      // state: {
      //   email: this.props.history.location.state.email
      // }
    });
  }

  userLogout = () => {
    firebase.auth().signOut().then(function () {
      console.log('Sign-out successful.');
    }).catch(function (error) {
      console.log('Error occured', error);
    });
  }

  renderToLogin = () => {
    this.props.history.push('/');
  }

  handelButton = () => {
    this.userLogout();
    this.renderToLogin();
  }

  showGame = () => {
    this.props.history.push('/gameSetup');
  }

  changeToInvites = () => {
    this.props.history.push('/invitation');
  }

  notification = (sendto) => {
    getTokenofReceiver(sendto, this.state.currentuser);
    askForPermissioToReceiveNotifications();
    sendNotification(this.state.currentuser);
  }

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
              <div className="list" onClick={this.showGame}>
                Matches
                </div>
              <div className="list" onClick={this.changeToHomepage}>
                Home
                </div>
              <div className="list" onClick={this.changeToInvites} >
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
                    <div key={index} className="gameUsers">
                      <div className="user-text">{item.text}</div>
                      <div> <Button variant="contained" color="primary" onClick={() => this.notification(item.text)}>
                        Invite
                      </Button>
                      </div>
                    </div>
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
