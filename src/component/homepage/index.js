import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './homepage.css';
import userOperations from '../services/userOperations.js';
import { sendNotification, askForPermissioToReceiveNotifications } from '../services/pushnotification/push_notification';

export default class Homepage extends Component {
  render() {
    // console.log("props email", this.props.history.location.state.email)
    return (
      <div className="wrapper">
        <div className="btnwrapper">
          <Button variant="contained" color="primary" onClick={() => this.addNewMatch(this.props.history.location.state.email)}>
            Add Match
            </Button>
          <Button variant="contained" color="primary" onClick={() => this.showUsers(this.props.history.location.state.email)}>
            Show Users
            </Button>
          <Button variant="contained" color="primary" onClick={this.addNewUser}>
            Show Matches
            </Button>
          <Button variant="contained" color="primary" onClick={this.generateMatchId}>
            Get Token
            </Button>
        </div>
        <div>

        </div>

        <Button variant="contained" color="primary" onClick={askForPermissioToReceiveNotifications}>
          Notification
        </Button>
        <Button variant="contained" color="primary" onClick={sendNotification}>
          send
        </Button>
      </div>
    )
  }
}
