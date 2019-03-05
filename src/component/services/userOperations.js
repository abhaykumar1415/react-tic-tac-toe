import firebase from './firebase.js';

let database = firebase.database().ref();
let match = database.child('matches');
let user = database.child('users');
let matchId = 1;
let player1;
let player2;

class Controller {

  addNewUser() {
    let newuser = {
      email: 'Mayuri@qed42.com',
      password: '123456'
    };
    user.push(newuser);
    console.log("New User added successfully.");
    console.log(user);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
      console.log("Token", idToken);
    }).catch(function (error) {
      console.log("Errors in Token retriving", error);
    });
  }

  fetchPlayers = (userEmail) => {
    console.log('userEmail :', userEmail);
    // return new Promise((resolve, reject) => {
    //   user.on('value', snap => {
    //     var usersDetails = [];
    //     snap.forEach(function (child) {
    //       usersDetails.push(child.val().email);
    //     })
    //     if (usersDetails !== [])
    //       resolve(usersDetails);
    //     else
    //       reject(usersDetails);
    //   })
    // })

    console.log("Inside controller");
    user.on('value', snap => {
      console.log("snap", snap.val());
      snap.forEach(function (child) {
        let email = child.val().email;
        // console.log('hello :', child.val().email);
        console.log("current email", email);
        if ((userEmail === "Divya@gmail.com") && (userEmail === email)) {
          player1 = email;
          console.log('yo Divya :', email);
        }
        if ((userEmail === "mayu@gmail.com") && (userEmail === email)) {
          player2 = email;
          console.log('yo Mayu:', email);
        }
      })
      console.log("Player-1:", player1);
      console.log("Player-2 :", player2);
    });
  }

  addNewMatch() {

    let newmatch = {
      x: player1 === 'mayu@gmail.com' ? 'mayu@gmail.com' : 'Divya@gmail.com',
      o: player2 === 'mayu@gmail.com' ? 'mayu@gmail.com' : 'Divya@gmail.com',
      matchId: 'dnajkd3qeq134q14e14',
      chance: 'x'
      // matchId: (Math.random() * 1e32).toString(36)
    }
    console.log('newmatch :', newmatch);
    match.push(newmatch);
    console.log("Match added successfully");
    matchId++;
  }
}
const userOperations = new Controller();
export default userOperations;