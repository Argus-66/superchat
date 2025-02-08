import { useState } from 'react';
import './App.css';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './components/SignIn';
import ChatRoom from './pages/ChatRoom';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className='w-full'>
      <div className="h-screen flex flex-col bg-[#1a1a1a]">
        <header className="flex justify-between items-center px-8 py-4 bg-[#2c2c2c] border-b border-[#3a3a3a]">
          <h1 className="text-2xl font-bold text-white">SuperChat</h1>
          {user && (
            <button
              onClick={() => auth.signOut()}
              className="px-4 py-2 bg-[#0091ff] text-white rounded hover:bg-[#007ad9] transition-colors"
            >
              Sign Out
            </button>
          )}
        </header>

        <main className="flex-1 w-full max-w-none overflow-hidden mx-auto px-4">
          {user ? <ChatRoom /> : <SignIn />}
        </main>
      </div>
    </div>
  );
}

export default App;