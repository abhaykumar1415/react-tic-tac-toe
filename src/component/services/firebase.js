import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDreaJ2yb9B9CfEIFft8PjiqCfFDWDY9nE",
  authDomain: "tic-tac-toe-a6d89.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-a6d89.firebaseio.com",
  projectId: "tic-tac-toe-a6d89",
  storageBucket: "tic-tac-toe-a6d89.appspot.com",
  messagingSenderId: "906824560468"
}
firebase.initializeApp(config);

// const messaging = firebase.messaging();
// messaging
//   .requestPermission()
//   .then(() => {
//     console.log("Have Permission");
//     return messaging.getToken();
//   })
//   .then(token => {
//     console.log("hiii");
//     console.log("FCM Token:", token);
//     //you probably want to send your new found FCM token to the
//     //application server so that they can send any push
//     //notification to you.
//   })
//   .catch(error => {
//     if (error.code === "messaging/permission-blocked") {
//       console.log("Please Unblock Notification Request  Manually");
//     } else {
//       console.log("Error Occurred", error);
//     }
//   });

export default firebase;


