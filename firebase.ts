import firebase from "firebase/app";
import "firebase/auth";
let app: any = firebase;

if (!firebase.apps.length) {
  app = firebase.initializeApp({
    apiKey: "AIzaSyAQh6tkX3YZWnWg8cfOhu4Y4ZLcy4wmMCg",
    authDomain: "vote-b1018.firebaseapp.com",
    projectId: "vote-b1018",
    storageBucket: "vote-b1018.appspot.com",
    messagingSenderId: "511063811515",
    appId: "1:511063811515:web:2c5e4d0028144d442e909e",
  });
}
export const auth = app.auth();
export default app;
