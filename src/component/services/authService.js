import firebase from './firebase.js';
import { askForPermissioToReceiveNotifications } from '../services/pushnotification/push_notification';

var database = firebase.database().ref();
var userdata = database.child('users');
var userToken;
class UserOperation {

  authListener() {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          console.log("user:", user.email);
          resolve(user.email);
        }
      })
    })
  }

  getCurrentUser(emailinput) {

    askForPermissioToReceiveNotifications()
      .then(result => {
        console.log("result", result);
        userToken = result;
        userdata.once('value', snap => {
          snap.forEach(function (child) {
            let { email } = child.val();
            if (email === emailinput) {
              let id = child.key;
              console.log("Token in data ", userToken);
              if (child.val().Token === "") {
                userdata.child(id).child('Token').set(userToken);
                console.log("Added successfully at", child.key);
              } else {
                console.log("Already there");
              }
            }
          })
        })
      })
      .catch(function (error) {
        console.log("error :", error);
      })
  }
  userLogin = (email, password) => {

    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
          resolve({ success: true, result: result });
        })
        .catch((err) => {
          reject({ success: false, result: err });
        })
    })
  }

  registerUser = (event, email, password) => {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          let userDetails = {
            email: email,
            password: password
          }
          userdata.push(userDetails);
          resolve({ success: true, result: result });
        })
        .catch(err => {
          reject({ success: false, result: err });
        })
    })
  }
}
const Handler = new UserOperation();
export default Handler;