import firebase from './firebase.js';
import { func } from 'prop-types';

var database = firebase.database().ref();
var match = database.child('matches');
var user = database.child('users');
var matchId=1, player1='', player2='', z=0;

class Controller {

  addNewUser() {
    let newuser = {
      email:'Mayuri@qed42.com',
      password:'123456'
    };
    user.push(newuser);
    console.log("New User added successfully.");
    console.log(user);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      // ...
      console.log("Token", idToken);
    }).catch(function(error) {
      // Handle error
    });
  }

  fetchPlayers() {
    console.log("Inside controller");
    user.on('value', snap => {
      console.log("snap",snap.val());
      snap.forEach(function(child) {

        console.log("child.name",child.val().name);
        var {name} = child.val();
        if( name === "Vrushali")
           player1 = name;
        if( name === "Mayuri" )
          player2 = name;  
      })
      console.log("Player-1:", player1);
      console.log("Player-2 :", player2);
    });
  }

  getAllUsers() {
    
  }

  addNewMatch() {
    let newmatch = {
      x:player1,
      o:player2,
      matchId:matchId
    }
    match.push( newmatch );
    console.log( "Match added successfully" );
    matchId++;
  }
}
const Handler = new Controller();
export default Handler;