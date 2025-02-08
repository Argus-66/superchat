import React, { useState, useRef, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from '../components/ChatMessage';

function ChatRoom() {
    const messagesRef = collection(firestore, 'messages');
    const messagesQuery = query(
        messagesRef,
        orderBy('createdAt', 'asc'),
        limit(50)
    );
    
    const [messages, loading] = useCollectionData(messagesQuery, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
    const dummy = useRef();

    useEffect(() => {
        dummy.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!formValue.trim()) return;

        try {
            const user = auth.currentUser;
            await addDoc(messagesRef, {
                text: formValue,
                createdAt: serverTimestamp(),
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName
            });

            setFormValue('');
            dummy.current?.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Messages container with fixed height and scrolling */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="text-center text-gray-400 p-4">Loading messages...</div>
                ) : (
                    <div className="flex flex-col gap-2 py-4">
                        {messages && messages.map((msg, index) => (
                            <ChatMessage 
                                key={msg.id || `temp-${index}`} 
                                message={msg} 
                            />
                        ))}
                        <div ref={dummy}></div>
                    </div>
                )}
            </div>

            {/* Message input form */}
            <form onSubmit={sendMessage} className="p-4 bg-[#2c2c2c] mt-auto">
                <div className="flex gap-2">
                    <input
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow p-3 rounded bg-[#383838] text-white placeholder-gray-400 outline-none"
                    />
                    <button 
                        type="submit" 
                        disabled={!formValue} 
                        className="px-6 py-3 bg-[#0091ff] text-white rounded hover:bg-[#007ad9] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatRoom;