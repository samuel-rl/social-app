import * as firebase from "firebase";
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyC8lDAIu6rfM22k0FXmftKG_gclmuKoRuU",
    authDomain: "social-app-7c36e.firebaseapp.com",
    databaseURL: "https://social-app-7c36e.firebaseio.com",
    projectId: "social-app-7c36e",
    storageBucket: "social-app-7c36e.appspot.com",
    messagingSenderId: "767910477331",
    appId: "1:767910477331:web:2c16ee86353e04e00d89e6"
  };

class Fire {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;