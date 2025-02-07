import React from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';

function SignIn() {
    const signInWithGoogle = async () => {
        console.log("Sign-in Button Clicked");
        const provider = new firebase.auth.GoogleAuthProvider();
        
        try {
            const result = await auth.signInWithPopup(provider);
            console.log("Sign-in Success:", result);
        } catch (error) {
            console.error("Sign-in Error:", error);
        }
    };

    return (
        <div>
            <button onClick={signInWithGoogle}>
                Sign In with Google
            </button>
        </div>
    );
}

export default SignIn;
