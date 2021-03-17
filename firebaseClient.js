import firebaseClient from "firebase/app";
import "firebase/auth";
import 'firebase/firestore'

const CLIENT_CONFIG = {
	apiKey: 'AIzaSyAq32Q1TQ5FSfCMq_yMbjBVSBChtiaas_4',
	authDomain: 'sithumina-management-sys.firebaseapp.com',
	projectId: 'sithumina-management-sys',
	storageBucket: 'sithumina-management-sys.appspot.com',
	messagingSenderId: '634556643697',
	appId: '1:634556643697:web:97c959537c32bfac995ed0',
	measurementId: 'G-QC91XWTV7S',
}

if (!firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
}

export { firebaseClient };