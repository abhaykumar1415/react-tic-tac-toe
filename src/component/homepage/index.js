import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './style.css';
import userOperations from '../services/userOperations.js';

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      users: [],

    }
  }
  generateMatchId = () => {
    userOperations.getToken();
  }
  showUsers(email) {
    userOperations.fetchPlayers(email);
    //   console.log("Inside show users");
    //   userOperations.fetchPlayers(email)
    //     .then((result) => {
    //       this.setState({ users: result });
    //       console.log("Users array", result);
    //     }).catch(err => {
    //       console.log("Users array", err);
    //     })
  }
  addNewMatch = (email) => {
    console.log("Inside new match");
    userOperations.fetchPlayers(email);
    userOperations.addNewMatch();
  }
  render() {
    console.log("props email", this.props.history.location.state.email)
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
          <table>
            {
              this.state.users.map(data => {
                return (
                  <tr>
                    <td></td>
                    <td>
                      <Button variant="contained" color="primary">
                        Invite
                    </Button>
                    </td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>
    )
  }
}
