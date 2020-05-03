import * as firebase from "firebase";
import { AsyncStorage } from "react-native";
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyC8lDAIu6rfM22k0FXmftKG_gclmuKoRuU",
    authDomain: "social-app-7c36e.firebaseapp.com",
    databaseURL: "https://social-app-7c36e.firebaseio.com",
    projectId: "social-app-7c36e",
    storageBucket: "social-app-7c36e.appspot.com",
    messagingSenderId: "767910477331",
    appId: "1:767910477331:web:2c16ee86353e04e00d89e6",
};

class Fire {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    uploadPhotoAsync = async (uri, filename) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase.storage().ref(filename).put(file);

            upload.on(
                "state_changed",
                (snapshot) => {},
                (err) => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

    addFriend(uid){
        let db = this.firestore.collection("friends").doc(this.uid);
        db.get().then((doc) => {
            if(!doc.exists){
                db.set({
                    [uid] : false
                });
            }
            else{
                db.update({
                    [uid] : false
                })
            }
        })   
    }

    deleteFriend(uid){
        console.log("delete...")
        let db = this.firestore.collection("friends").doc(this.uid);
        db.update({
            [uid] : firebase.firestore.FieldValue.delete()
        });
    }


    createUser = async (user) => {
        let remoteUri = null;
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection("users").doc(this.uid);

            db.set({
                name: user.name,
                firstname: user.firstname,
                email: user.email,
                avatar: null,
            });

            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(
                    user.avatar,
                    `avatars/${this.uid}`
                );
                db.set({ avatar: remoteUri }, { merge: true });
            }

            firebase.database().ref().child(`Users/${this.uid}`).set(user);


            //================
            let topic = "allUser";
            admin.messaging().subscribeToTopic("ExponentPushToken[d7KHV4J2ErJnBly3xRxfxk]", topic)
            //================

        } catch (error) {
            console.log(error);
        }
        admin
    };

    updateUser = async (user) => {
        let remoteUri = null;
        remoteUri = await this.uploadPhotoAsync(
            user.avatar,
            `avatars/${this.uid}`
        );

        let db = this.firestore.collection("users").doc(this.uid);
        db.set({ avatar: remoteUri }, { merge: true });
    };

    searchUserByName = async (search) => {
        return new Promise((resolve, reject) => {
            const res = [];
            let db = this.firestore.collection("users");
            db.get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        const temp = doc.data();
                        temp["uid"] = doc.id;              
                        res.push(temp);
                    });
                })
                .then(() => {
                    const newData = res.filter((item) => {
                        const itemData = `${item.name.toUpperCase()} ${item.firstname.toUpperCase()}`;
                        const textData = search.toUpperCase();
                        return itemData.includes(textData);
                    });
                    resolve(newData);
                }).catch(error => {
                    reject(error);
                })
        });
    };

    isFriend = async (uid) => {
        return new Promise((resolve, reject) => {
            let db = this.firestore.collection("friends").doc(this.uid);
        
            db.get().then((snapshot) => {

                res = snapshot.data();
                if(res == undefined || res == null){
                    console.log("utilisateur n'as pas d'amis")
                    resolve(null);
                }else{
                    if(uid in res){
                        if(res[uid] == true){
                            console.log("true uid = " + uid)
                            console.log(res)
                            resolve(true);
                        }else{
                            console.log("false uid = " + uid)
                            console.log(res)
                            resolve(false);
                        }
                    }
                    else{
                        console.log("null uid = " + uid)
                        console.log(res)
                        resolve(null);
                    }
                }
                
            })
        })
    }


    getPost = async () => {
        return new Promise((resolve, reject) =>{
            const res = [];
            let db = this.firestore.collection("posts");
            db.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    res.push(doc.data());
                });
            }).then(() => {
                resolve(res);
            })
        })
    }

    postMessage = async (message, user) => {
        return new Promise((res, rej) => {
            firebase.database().ref().child(`Posts/${this.uid}`).set({ message, uid: this.uid, timestamp: this.timestamp, firstname: user.firstname, name: user.name, avatar: user.avatar });
            this.firestore
                .collection("posts")
                .add({ message, uid: this.uid, timestamp: this.timestamp, firstname: user.firstname, name: user.name, avatar: user.avatar })
                .then((ref) => {
                    res(ref);
                })
                .catch((error) => {
                    rej(error);
                });
        });
    };


    signOut = () => {
        firebase.auth().signOut();
    };

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }

    get firebase(){
        return firebase;
    }
}

Fire.shared = new Fire();
export default Fire;
