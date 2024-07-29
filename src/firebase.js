import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCJc5CY6rLY2mhPX1yLvqyaD3iEyD5Q1u8",
    authDomain: "lendo-demo01.firebaseapp.com",
    projectId: "lendo-demo01",
    storageBucket: "lendo-demo01.appspot.com",
    messagingSenderId: "826561143175",
    appId: "1:826561143175:web:81fe9c926b30560a5ff322",
    measurementId: "G-SQE5MSZXSF"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export { auth, googleProvider, facebookProvider, appleProvider, createUserWithEmailAndPassword };