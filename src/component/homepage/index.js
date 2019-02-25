import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './style.css';
import firebase from '../../services/firebase.js';
import Handler from '../../services/controller.js';

var database = firebase.database().ref();
var user=database.child('users');

export default class HomePage extends Component {
  addNewUser = () => {
    Handler.addNewUser();
  }
  generateMatchId = () => {
    Handler.getToken();
  }
  showUsers(){
    console.log("Inside show users");
    Handler.fetchPlayers();
  }
  addNewMatch = () => {
    console.log("Inside new match");
    Handler.fetchPlayers();
    Handler.addNewMatch();
  }
  render() {
    return (
      <div className="wrapper">
        <Button variant="contained" color="primary" onClick={this.addNewUser}>
          Add User
        </Button>
        <Button variant="contained" color="primary" onClick={this.addNewMatch}>
          Add Match
        </Button>
        <Button variant="contained" color="primary" onClick={this.showUsers}>
          Show Users 
        </Button>
        <Button variant="contained" color="primary" onClick={this.addNewUser}>
          Show Matches
        </Button>
        <Button variant="contained" color="primary" onClick={this.generateMatchId}>
         Get Token
        </Button>
      </div>
    )
  }
}
