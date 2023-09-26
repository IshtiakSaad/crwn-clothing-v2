import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'
import { useSyncExternalStore } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyD9esyBFbDrbNz7s4ukZAG8ZNqZ9gl-n10",
    authDomain: "crwn-clothing-cc.firebaseapp.com",
    projectId: "crwn-clothing-cc",
    storageBucket: "crwn-clothing-cc.appspot.com",
    messagingSenderId: "1083302338429",
    appId: "1:1083302338429:web:06038d998ef0e0a7d47614"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ 
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userStapshot = await getDoc(userDocRef);

    if(!userStapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }catch(error){
            console.log("Error creating the user", error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const SignInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}