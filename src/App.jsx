import { useState } from 'react'
import './App.css'

import firebase from 'firebase/app' // Import the Firebase SDK for Google Cloud Firestore
import 'firebase/firestore'; // Import the Firebase SDK for Firestore
import 'firebase/auth'; // Import the Firebase SDK for Authentication

import { useAuthState } from'react-firebase-hooks/auth'; // Import the Firebase SDK for Auth
import { useCollectionData } from'react-firebase-hooks/firestore'; // Import the Firebase SDK for Firestore



const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
      </div>
    </>
  )
}

export default App
