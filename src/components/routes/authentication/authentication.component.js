import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth'
import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth 
} from "../../../utils/firebase/firebase.utils";

import SignUpForm from '../../sign-up-form/sign-up-form.component';
import SignInForm from '../../sign-in-form/sign-in-form.component';

const Authentication = () => {

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign In with Google PopUp
            </button>

            <SignInForm />
            <SignUpForm />
        </div>      
    );
};

export default Authentication;