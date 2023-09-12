import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth'
import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth 
} from "../../../utils/firebase/firebase.utils";

const SignIn = () => {
    useEffect( async () => {
        const response = await getRedirectResult(auth);
        console.log(response);
    }, []);
    
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user); 
    } 


    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign In with Google PopUp
            </button>
            <button onClick={logInGoogleRedirect}>
                Sign In with Google signInWithRedirect
            </button>
        </div>      
    );
};

export default SignIn;