import {
    initializeApp
} from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut
} from "firebase/auth";
import {
    getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAqnqrqmK6IB-Rog_cPXNX3rBTzQ6sl-Bc",
    authDomain: "restorum-8d849.firebaseapp.com",
    projectId: "restorum-8d849",
    storageBucket: "restorum-8d849.appspot.com",
    messagingSenderId: "944284047669",
    appId: "1:944284047669:web:9577cb52de64954cf0947c",
    measurementId: "G-WHQKHWDR8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
        }).catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(error);
        });
}

export const logOut = () => {
    signOut(auth).then(() => {
        console.log('logged out');
    }).catch((error) => {
        console.log(error.message);
    });
}