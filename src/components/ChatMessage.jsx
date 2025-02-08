import React from 'react';
import { auth } from '../firebase';

function ChatMessage({ message }) {
    const { text, uid, photoURL, displayName, createdAt } = message;
    const isUserMessage = uid === auth.currentUser?.uid;

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const messageClasses = `
        flex flex-col
        ${isUserMessage ? 'items-end self-end' : 'items-start self-start'}
        max-w-[60%] p-3 rounded-2xl
        ${isUserMessage ? 'bg-[#0091ff]' : 'bg-[#383838]'}
        relative m-1
    `;

    return (
        <div className={messageClasses}>
            <div className="flex items-center gap-2 mb-1">
                <img
                    src={photoURL || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                />
                <span className="font-bold text-white">
                    {displayName || 'Unknown User'}
                </span>
            </div>
            
            <p className="text-white m-0 break-words">{text}</p>
            
            <div className="text-xs text-gray-200 mt-1 text-right">
                {formatTimestamp(createdAt)}
            </div>
        </div>
    );
}

export default ChatMessage;