import React, { Component } from 'react'
import Matches from '../services/matches.service.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import firebase from '../services/firebase';
import './style.css';
import Handler from '../services/authService.js';

let receivedPlayerDetails = JSON.parse(window.localStorage.getItem('received player'));
let currentPlayerDetails = JSON.parse(window.localStorage.getItem('current player'))
let notifiedPlayerDetails = JSON.parse(window.localStorage.getItem('notified player'))
let database = firebase.database().ref();
let match = database.child('matches');

export default class GameSetup extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      matchId: '',
      currentmatch: '',
      chance: '',
      valuearr: [],
      winner: ''
    }
    this.listen();
  }
  componentDidMount() {
    console.log("current", currentPlayerDetails);
    console.log("received", receivedPlayerDetails);
    if ((currentPlayerDetails.email !== "") && (receivedPlayerDetails.email !== "")) {
      Matches.createUserMatchId().then(res => {
        if (res) {
          Matches.createNewMatch(res).then(res => {
            this.setState({ matchId: res });
            this.getMatchId();
            // this.startGame();
          })
        }
      })
    } else {
      console.log("localstorage null");
    }
  }

  listen = () => {
    console.log("equal");
    // return new Promise((resolve, reject) => {
    match.on('value', snap => {
      snap.forEach(child => {
        if (child.key === this.state.matchId.matchId) {
          console.log("equal");
          console.log('updated chance', child.val().chance);
          console.log('updated array', child.val().values);
          this.setState({ chance: child.val().chance, valuearr: child.val().values });
          console.log('updated array', child.val().values);
          let array = child.val().values;
          console.log('Array traversing on', array);
          if (array) {
            let j = 0;
            for (let j = 0; j < 7; j = j + 3) {
              let i = j;
              if ((array[i]) && (array[i] === array[i + 1]) && (array[i + 1] === array[i + 2])) {
                console.log('winner is 1:', array[i]);
                this.setState({ winner: array[i] });
                // alert('Winner is:', array[i]);
              } else {
                console.log('array traveres failed');
              }
            }
            for (let j = 0; j < 3; j++) {
              let i = j;
              if ((array[i]) && (array[i] === array[i + 3]) && (array[i + 3] === array[i + 6])) {
                console.log('winner is 2:', array[i]);
                this.setState({ winner: array[i] });
                // alert('Winner is:', array[i]);
              }
              else {
                console.log('array traveres failed');
              }
            }
            for (let j = 0; j < 2; j++) {
              let i = j;
              if ((array[i]) && (array[i] === array[i + 4]) && (array[i + 4] === array[i + 8])) {
                console.log('winner is 3:', array[i]);
                this.setState({ winner: array[i] });
                // alert('Winner is:', array[i]);
              }
            }
          }
        }
      })
    })
    //   resolve("resolved");
    // })
  }

  startGame = () => {
    console.log("matchid", this.state.matchId);
    Matches.startGame(this.state.matchId).then((result) => {
      this.setState({ currentmatch: result });
      console.log("cuttent match", this.state.currentmatch);
      this.setState({ valuearr: this.state.currentmatch.values, chance: this.state.currentmatch.chance });
    }).catch(err => {
      console.log('in render result err', err);
    })
  }

  getMatchId = () => {
    this.setState({ winner: '' });
    console.log('Inside get match id', this.state.email);
    Matches.getMatchId(notifiedPlayerDetails.email)
      .then(result => {
        this.setState({ matchId: result });

        this.startGame();
      }).catch(err => {
        console.log('error', err);
      })
  }

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  onGridClick = (index) => {
    console.log('in grid fun', index);
    console.log('this.state.valueArr :', this.state.valuearr);
    if (!this.state.valuearr[index].length) {
      Matches.onGridClick(this.state.currentmatch.childkey, index).then((result) => {
        if (result.chance) {
          this.setState({ chance: result.chance, valuearr: result.values });
        }
        else {
          console.log("chance in undefined");
        }
      })
    }
  }
  render() {
    return (
      <div>
        {/* <div className="wrapper">
            <TextField
              id="outlined-name"
              label="Email"
              value={this.state.email}
              onChange={this.handleEmail}
              margin="normal"
              variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={this.getMatchId}>
              Primary
          </Button>
          </div> */}
        <div className="wrapper">
          <div className="names">
            {this.state.matchId ?
              <span>X :{this.state.currentmatch.x}</span>
              : null}
          </div>
          <div className="gridWrapper">
            <React.Fragment>
              <div className="paperWrapper">
                {
                  this.state.matchId ?
                    this.state.valuearr ?
                      this.state.valuearr.map((data, index) => {
                        return (
                          <Paper key={index} className="block" onClick={() => this.onGridClick(index)} >
                            {data}
                          </Paper >
                        )
                      }) : null
                    : null
                }
              </div>
            </React.Fragment>
          </div>
          <div className="names">
            {
              this.state.matchId ?
                <span>O :{this.state.currentmatch.o}</span>
                : null
            }
          </div>
        </div>
      </div >
    )
  }
}
