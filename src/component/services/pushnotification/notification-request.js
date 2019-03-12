// curl -i -X POST \
//    -H "Content-Type:application/json" \
//    -H "Authorization:key=AAAA0yL0r1Q:APA91bGkFFzCqJsf5JgHMDwwH7xB4452PL15-xXRtUx5B7fVWzxDtk5yZG_x1_ggkTBWIDik1EvVPonbfbSBCF_4iDznCaDfQl0ygGklu5i5k1kokUwGnfZ0fJnxuZeWuvPSuJNGPtMF" \
//    -d \
// '{
//     "notification": {
//         "title": "Firebase",
//         "body": "Firebase is awesome",
//         "click_action": "http://localhost:3000/",
//         "icon": "http://url-to-an-icon/icon.png"
//     },
//     "to": "e61wc_5N_a0:APA91bH3qd3G190Uo7wh-CKr95_k8nGKja6VXzo8QNwh_I4SnfVoNkM62C9BE40uJEu1Q-qOyoFikZmKogNws8m__A5kPERJwPHQGglfiNI8dDmvGrqCMCvbJwFw2vFkcv3UsWgg-1tF"
// }
// ' \
//  'https://fcm.googleapis.com/fcm/send'


export const requestData = () => {
    let payload = {
        "notification": {
            "title": "Firebase",
            "body": "Firebase is awesome",
            "data": "{vrushali}",
            "click_action": "http://localhost:3000/",
            "icon": "http://url-to-an-icon/icon.png"
        },
        "to": "e61wc_5N_a0:APA91bH3qd3G190Uo7wh-CKr95_k8nGKja6VXzo8QNwh_I4SnfVoNkM62C9BE40uJEu1Q-qOyoFikZmKogNws8m__A5kPERJwPHQGglfiNI8dDmvGrqCMCvbJwFw2vFkcv3UsWgg-1tF"
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
            response.json();
            console.log("responce-json", response.json());
            console.log("responce", response);
        });
}

