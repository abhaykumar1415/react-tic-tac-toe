import firebase from 'firebase';


export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "906824560468"
  });
}
const messaging = firebase.messaging();

export const askForPermissioToReceiveNotifications = async () => {
  try {
    let temp = await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token of user:', token);
    return token;
  } catch (error) {
    console.error(error);
  }
}

messaging.onMessage((data) => {
  console.log('Message received. ', data);
  alert('Message REceived!');
});

export const sendNotification = () => {
  setTimeout(function () {
    let payload = {
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
      .then(data => {
        console.log('responce', data);
      });
  },
    5000);
}


