import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    OAuthProvider,
    applyActionCode,
    sendEmailVerification
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJc5CY6rLY2mhPX1yLvqyaD3iEyD5Q1u8",
    authDomain: "lendo-demo01.firebaseapp.com",
    projectId: "lendo-demo01",
    storageBucket: "lendo-demo01.appspot.com",
    messagingSenderId: "826561143175",
    appId: "1:826561143175:web:81fe9c926b30560a5ff322",
    measurementId: "G-SQE5MSZXSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Social Auth Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// Function to verify email with a code
const verifyEmailWithCode = async (code: string): Promise<boolean> => {
    try {
        await applyActionCode(auth, code);
        return true;
    } catch (error: any) {
        throw new Error(`Email verification failed: ${error.message}`);
    }
};

// Function to resend verification email
const resendVerificationEmail = async (user: any): Promise<void> => {
    if (!user) {
        throw new Error("User is not authenticated or does not exist.");
    }
    try {
        await sendEmailVerification(user);
    } catch (error: any) {
        throw new Error(`Resending verification email failed: ${error.message}`);
    }
};

export {
    auth,
    googleProvider,
    facebookProvider,
    appleProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    verifyEmailWithCode,
    resendVerificationEmail,
    sendEmailVerification  // Ensure sendEmailVerification is exported
};
