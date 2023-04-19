import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQf4MBY2eAM7CsKlR32m0v5lcMaqIn2tg",
  authDomain: "rn-geolocation-8276d.firebaseapp.com",
  databaseURL: "https://rn-geolocation-8276d-default-rtdb.firebaseio.com",
  projectId: "rn-geolocation-8276d",
  storageBucket: "rn-geolocation-8276d.appspot.com",
  messagingSenderId: "215223110780",
  appId: "1:215223110780:web:585d7730141256f05d8df9",
  measurementId: "G-L9TSBP761Y",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
