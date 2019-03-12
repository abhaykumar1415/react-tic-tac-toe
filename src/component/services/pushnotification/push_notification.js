import firebase from 'firebase';
import playerDetails from '../notification-data';
import Invitation from '../../invitations';
const messaging = firebase.messaging();

//values of second player selected 
let notifiedUser = {
  email: '',
  token: '',
  isSend: false
}

let currentUserDetails = {
  email: '',
  token: ''
}

//vaues of recieved player
let receivedPayload = {
  email: '',
  token: ''
}

let currentUserToken;
let database = firebase.database().ref();
let user = database.child('users');
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "906824560468"
  });
}

export const askForPermissioToReceiveNotifications = async () => {
  try {
    console.log("hiiii");
    await messaging.requestPermission();
    currentUserToken = await messaging.getToken();
    currentUserDetails.token = currentUserToken;
    if (currentUserToken) {
      console.log("Token exist", currentUserToken);
      window.localStorage.setItem('current player', JSON.stringify(currentUserDetails));
    } else {
      console.log('user Token doenst exist');
    }
    return currentUserToken;
  } catch (error) {
    console.error("ERROR IN PUSH-NOTI", error);
  }
}

// window.addEventListener("notificationclick", (payload) => {
//   console.log("In background", payload);
// })

export const getTokenofReceiver = async (sendto, currentUserEmail) => {
  await user
    .once('value', snap => {
      currentUserDetails.email = currentUserEmail;
      snap.forEach(child => {
        if (child.val().email === sendto) {
          console.log("matched");
          notifiedUser.token = child.val().Token;
          notifiedUser.email = sendto;
        } else { console.log("not match"); }
      })
    }).catch(err => {
      console.log("error in getting player token", err);
    })
}


// messaging.onTokenRefresh = async () => {
//   await messaging.requestPermission();
//   const token = await messaging.getToken();
//   if (token) {
//     console.log("token ", token);
//   }
//   return token;
// }
messaging.onMessage(function (payload) {
  alert("Received msg");
  let parsedPayload = JSON.parse(payload.data['gcm.notification.data']);
  console.log("data", parsedPayload);
  receivedPayload.email = parsedPayload.email;
  receivedPayload.token = parsedPayload.token;
  console.log("received user email", receivedPayload.email);
  console.log("received user token", receivedPayload.token);
  window.localStorage.setItem('received player', JSON.stringify(receivedPayload));
  window.localStorage.setItem('notified player', JSON.stringify(notifiedUser));
  window.location.href = '/gamesetup';
});

export const sendNotification = () => {
  setTimeout(() => {
    let payload = {
      "notification": {
        "title": "Notofication From Divya",
        "body": "Start a match!",
        "click_action": "http://localhost:3000/gamesetup",
        "icon": "http://url-to-an-icon/icon.png",
        "data": {
          "email": currentUserDetails.email,
          "token": currentUserDetails.token
        }
      },
      "to": notifiedUser.token,
    }
    //}
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "key=AAAA0yL0r1Q:APA91bGkFFzCqJsf5JgHMDwwH7xB4452PL15-xXRtUx5B7fVWzxDtk5yZG_x1_ggkTBWIDik1EvVPonbfbSBCF_4iDznCaDfQl0ygGklu5i5k1kokUwGnfZ0fJnxuZeWuvPSuJNGPtMF",
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("responce", data.success);
        if (data.success) {
          notifiedUser.isSend = true;
        }
      })
  }, 3000)

}

