import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { 
    signInWithGooglePopup, 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";
import './sign-in-form.style.scss';

const defaultFormField = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormField);
    const {email, password} = formFields;

    console.log(formFields);
    const resetFormFields = () => {
        setFormFields(defaultFormField);
    }
 
    const SignInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user); 
    } 


    const handleSubmit = async (event) => {
        event.preventDefault();

        try{


        }catch(error){
            
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
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

            <Button type="submit">Sign In</Button>
            <Button onClick={SignInWithGoogle}>Sign In With Google</Button>
        </form>
        </div>
    )
}

export default SignInForm;
