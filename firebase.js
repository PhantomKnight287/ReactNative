import firebase from 'firebase';
import {apiKey,authDomain,databaseURL,projectId,storageBucket,messagingSenderId,appId,measurementId} from '@env'
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

// Initialize Firebase
let app;
if(!firebase.apps.length){
    app=firebase.initializeApp(firebaseConfig);
}
else{
    app=firebase.app();
}
const db = firebase.firestore();
const storage = firebase.storage();
const storageref = firebase.storage().ref();
export {app,db,storage,storageref};