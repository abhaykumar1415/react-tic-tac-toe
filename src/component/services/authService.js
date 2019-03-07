import firebase from './firebase.js';
import { askForPermissioToReceiveNotifications } from '../../push-notification';

var database = firebase.database().ref();
var userdata = database.child('users');
var userToken;
class UserOperation {

  getCurrentUser(emailinput) {

    // firebase.auth().currentUser.getIdToken(true).then(function (Token) {
    askForPermissioToReceiveNotifications()
      .then(result => {
        userToken = result;
        console.log('result :', userToken);
      })
    // userToken = askForPermissioToReceiveNotifications;
    userdata.once('value', snap => {
      snap.forEach(function (child) {
        let { email } = child.val();
        if (email === emailinput) {
          let id = child.key;
          if (child.val().Token === "") {
            userdata.child(id).child('Token').set(userToken);
            console.log("Added successfully at", child.key);
          } else {
            console.log("Already exists");
          }
        }
      })
    })
      // })
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
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     console.log("Logged in successfuly");
    //     isLoggedIn = true;
    //   }).catch(function (error) {
    //     console.log("log in error", error);
    //   })
    // if (isLoggedIn) {
    //   return true;
    // }
    // return false;
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

    // console.log("hii");
    // event.preventDefault();
    // console.log("hii");
    // const { email, password } = this.state;

    // return new Promise((resolve, reject) => {
    //   firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    //     let userDetails = {
    //       email: email,
    //       password: password
    //     }
    //     var didSucceed = true;
    //     userdata.push(userDetails);
    //     console.log("Registered success in service");
    //     // return resolve('registered');
    //     didSucceed ? resolve('registered') : reject('Error');

    //   })
    // })

  }

}


const Handler = new UserOperation();
export default Handler;