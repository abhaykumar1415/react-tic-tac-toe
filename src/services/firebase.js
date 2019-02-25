import * as firebase from 'firebase';

// const settings = {timestampsInSnapshots: true};

var config = {
  apiKey: "AIzaSyDreaJ2yb9B9CfEIFft8PjiqCfFDWDY9nE",
  authDomain: "tic-tac-toe-a6d89.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-a6d89.firebaseio.com",
  projectId: "tic-tac-toe-a6d89",
  storageBucket: "",
  messagingSenderId: "906824560468"
};

firebase.initializeApp(config);

// firebase.firestore().settings(settings);

export default firebase;