import React from 'react';
import { auth, firestore } from '../firebase';
import firebase from 'firebase/compat/app';

function SignIn() {
    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        
        try {
            const result = await auth.signInWithPopup(provider);
            const user = result.user;

            console.log("User Signed In:", user); // Debugging Log
            
            if (user) {
                // Reference Firestore document for this user
                const userRef = firestore.collection('users').doc(user.uid);
                const userDoc = await userRef.get();

                console.log("User Document Exists:", userDoc.exists); // Debugging Log

                // If user does not exist, create a new document
                if (!userDoc.exists) {
                    console.log("Adding User to Firestore...");
                    await userRef.set({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        uid: user.uid,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    console.log("User Added Successfully! ✅");
                }
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
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
