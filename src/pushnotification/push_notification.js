import firebase from 'firebase';
const messaging = firebase.messaging();

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "906824560468"
  });
}

export const askForPermissioToReceiveNotifications = async () => {
  try {
    console.log("hiiii");
    await messaging.requestPermission();
    const token = await messaging.getToken();
    if (token) {
      console.log("Token exist", token);
    } else {
      console.log('user Token doenst exist');
    }
    return token;
  } catch (error) {
    console.error("ERROR IN PUSH-NOTI", error);
  }
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
  if (alert("received  notifiction from")) {
    console.log('Message received. ', payload);
  } else {
    console.log("NOt approved for game");
  }
});

export const sendNotification = () => {
  setTimeout(function () {
    // let payload = {
    //   "notification": {
    //     "title": "Firebase",
    //     "body": "Firebase is awesome",
    //     "click_action": "http://localhost:3000/pushnotification/push_notification",
    //     "icon": "http://url-to-an-icon/icon.png"
    //   },
    //   "to": "e61wc_5N_a0:APA91bH3qd3G190Uo7wh-CKr95_k8nGKja6VXzo8QNwh_I4SnfVoNkM62C9BE40uJEu1Q-qOyoFikZmKogNws8m__A5kPERJwPHQGglfiNI8dDmvGrqCMCvbJwFw2vFkcv3UsWgg-1tF"
    // }
    let payload = {
      // "message": {
      //   "token": "e61wc_5N_a0:APA91bH3qd3G190Uo7wh-CKr95_k8nGKja6VXzo8QNwh_I4SnfVoNkM62C9BE40uJEu1Q-qOyoFikZmKogNws8m__A5kPERJwPHQGglfiNI8dDmvGrqCMCvbJwFw2vFkcv3UsWgg-1tF",
      "notification": {
        "title": "Portugal vs. Denmark",
        "body": "great match!",
        "click_action": "http://localhost:3000/homepage",
        "icon": "http://url-to-an-icon/icon.png",
        "data": {
          "Nick": "Mario",
          "Room": "PortugalVSDenmark"
        }
      },
      "to": "e61wc_5N_a0:APA91bH3qd3G190Uo7wh-CKr95_k8nGKja6VXzo8QNwh_I4SnfVoNkM62C9BE40uJEu1Q-qOyoFikZmKogNws8m__A5kPERJwPHQGglfiNI8dDmvGrqCMCvbJwFw2vFkcv3UsWgg-1tF",

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
        console.log('response 1 :', response);
        return response.json();
      })
      .then(yo => {
        // yo.json();
        console.log("responce", yo);
      });
  },
    5000);
}
