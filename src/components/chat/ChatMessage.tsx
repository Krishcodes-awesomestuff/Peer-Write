import React from 'react';
import { Flag } from 'lucide-react';
import { Message, User } from '../../types';
import Avatar from '../ui/Avatar';

interface ChatMessageProps {
  message: Message;
  currentUser: User;
  sender: User;
  onReport: (messageId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUser, sender, onReport }) => {
  const isOwnMessage = message.senderId === currentUser.id;
  const timeString = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isOwnMessage && (
        <Avatar
          src={sender.profileImage}
          alt={sender.name}
          size="sm"
          className="mr-2 mt-1"
        />
      )}
      
      <div className={`max-w-[70%] group ${isOwnMessage ? 'order-1' : 'order-2'}`}>
        <div
          className={`relative px-4 py-2 rounded-lg ${
            isOwnMessage 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          {message.content}
          
          {!isOwnMessage && (
            <button 
              className="absolute top-0 right-0 -mt-2 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onReport(message.id)}
              title="Report message"
            >
              <Flag size={16} className="text-red-500 bg-white rounded-full p-0.5 shadow-sm" />
            </button>
          )}
        </div>
        
        <div className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          {timeString}
        </div>
      </div>
      
      {isOwnMessage && (
        <Avatar
          src={currentUser.profileImage}
          alt={currentUser.name}
          size="sm"
          className="ml-2 mt-1"
        />
      )}
    </div>
  );
};

export default ChatMessage;