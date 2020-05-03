const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.firestore
    .document(`puppies/{uid}`)
    .onWrite(async (event) => {
        let title = event.after.get('title');
        let content = event.after.get('content');
        let tok = "ExponentPushToken[d7KHV4J2ErJnBly3xRxfxk]";

        admin.messaging().subscribeToTopic(tok, "all").then(()=> {

            let message = {
                notification: {
                  title: 'yhyyh up 1.43% on the day',
                  body: 'hhyh gained 11.80 points to close at 835.67, up 1.43% on the day.'
                  },
                  topic: 'all',
                };
            let response = await admin.messaging().send(message);
            console.log(response);

        })

    });
