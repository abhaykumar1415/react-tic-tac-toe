import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "906824560468"
  });
}
const messaging = firebase.messaging();

export const askForPermissioToReceiveNotifications = async () => {
  try {

    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token do usuário:', token);
    return token;
  } catch (error) {
    console.error(error);
  }
}

messaging.onMessage((data) => {
  console.log('Message received. ', data);
  alert('Msg aaya !');
  // ...
});

// export const postData = () => {
//   let data = {
//     "notification": {
//       "title": "Firebase",
//       "body": "Firebase is awesome",
//       "click_action": "http://localhost:3000/",
//       "icon": "http://url-to-an-icon/icon.png"
//     },
//     "to": "f0miCbT5rkE:APA91bFM3J2CNcqjYnqM7nNKD25WJc1ZupvOc3pykrl76CRU1yfh1_3w31uZCFwHLNKybBwS8ti5n30pJKEHADqmJVLSXVL3wkWxiU-XgP4A8RmeA1B52cc1WHpCnQIOUXnwjSH9ACqF"
//   }
//   return fetch({
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",

//     },
//     body: JSON.stringify(data),
//   })
//     .then(response => {
//       response.json()
//       console.log("data", response.json());
//       console.log("response", response);
//     });
// }


