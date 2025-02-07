import { useState } from 'react';
import './App.css';

import { auth } from './firebase'; // Import Firebase auth
import { useAuthState } from 'react-firebase-hooks/auth'; 

import SignIn from './components/SignIn';
import ChatRoom from './pages/ChatRoom';

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <div>
        <header>
          <h1>SuperChat</h1>
          {user && <button onClick={() => auth.signOut()}>Sign Out</button>}
          
        </header>
        

        <section>
          {user ? <ChatRoom /> : <SignIn />}
        </section>
      </div>
    </>
  );
}

export default App;
