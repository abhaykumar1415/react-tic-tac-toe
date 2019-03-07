import React, { Component } from 'react'
import Matches from '../services/matches.service.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import firebase from '../services/firebase';
import './style.css';

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
  componentWillUnmount() {
    console.log('COmponenet unmounted');
  }

  listen = () => {

    match.on('value', snap => {
      console.log("snap", snap);
      snap.forEach(child => {
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
              console.log('winner is:', array[i]);
              alert('Winner is:', array[i]);
            } else {
              console.log('array traveres failed');
            }
          }
          for (let j = 0; j < 3; j++) {
            let i = j;
            if ((array[i]) && (array[i] === array[i + 3]) && (array[i + 3] === array[i + 6])) {
              console.log('winner is:', array[i]);
              alert('Winner is:', array[i]);
            }
            else {
              console.log('array traveres failed');
            }
          }
          for (let j = 0; j < 2; j++) {
            let i = j;
            if ((array[i]) && (array[i] === array[i + 4]) && (array[i + 4] === array[i + 8])) {
              console.log('winner is:', array[i]);
              alert('Winner is:', array[i]);
            }
          }
        }
      })
    })
  }

  startGame = () => {

    Matches.startGame(this.state.matchId).then((result) => {
      this.setState({ currentmatch: result });
    }).catch(err => {
      console.log('in render result err', err);
    })
  }

  getMatchId = () => {
    this.setState({ winner: '' });
    console.log('Inside get match id', this.state.email);
    Matches.getMatchId(this.state.email)
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
    Matches.onGridClick(this.state.currentmatch.childkey, index).then((result) => {
      console.log('chance :', result.chance);
    })
  }
  render() {
    return (
      <div>
        <div className="wrapper">
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
        </div>
        {this.state.matchId ?
          <span>X :{this.state.currentmatch.x}</span>
          : null}
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
        {
          this.state.matchId ?
            <span>O :{this.state.currentmatch.o}</span>
            : null
        }

      </div >
    )
  }
}
