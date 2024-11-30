import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBc2TeLIrvJYEFCPhBtaNALgpq51R8bTmM",
    authDomain: "encryption-app-deee2.firebaseapp.com",
    projectId: "encryption-app-deee2",
    storageBucket: "encryption-app-deee2.firebasestorage.app",
    messagingSenderId: "571249397471",
    appId: "1:571249397471:web:fc55178cd404b245a6636a"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
