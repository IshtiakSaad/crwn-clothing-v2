import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    SignInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.style.scss';

const defaultFormField = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormField);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormField);
    }
 
    const SignInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        try {
            await createUserDocumentFromAuth(user); 
        }catch(error){
            if(error.code === 'auth/popup-closed-by-user'){
                console.log("Pop-up closed by user.");
            }
            else{
                console.log("Error.");
            }
        }
    } 


    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await SignInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert("Incorrect Password.");
                    break;
                case 'auth/user-not-found':
                    alert("Invalid email address");
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-in-container">
        <h2>Already have an account?</h2>
        <span>Sign in with email and password.</span>
        <form onSubmit={handleSubmit}>
            
            <FormInput 
                label="Email"
                type='email' 
                required 
                onChange={handleChange}
                name="email"
                value={email}
            />

            <FormInput 
                label="Password"
                type='password' 
                required 
                onChange={handleChange}
                name="password"
                value={password}
            />

            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType={"google"} onClick={SignInWithGoogle}>Google Sign In</Button>
            </div>
        </form>
        </div>
    )
}

export default SignInForm;
