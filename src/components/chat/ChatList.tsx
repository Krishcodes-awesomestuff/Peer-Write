import React from 'react';
import { User, Chat } from '../../types';
import Avatar from '../ui/Avatar';

interface ChatListProps {
  chats: Chat[];
  users: Record<string, User>;
  currentUser: User;
  activeChat: string | null;
  onSelectChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ 
  chats, 
  users, 
  currentUser, 
  activeChat, 
  onSelectChat 
}) => {
  // Sort chats by most recent activity
  const sortedChats = [...chats].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  // Get the other user in a chat (not the current user)
  const getOtherUser = (chat: Chat) => {
    const otherUserId = chat.participants.find(id => id !== currentUser.id);
    return otherUserId ? users[otherUserId] : null;
  };
  
  // Format the date for display
  const formatDate = (date: Date) => {
    const now = new Date();
    const chatDate = new Date(date);
    
    // If it's today, return time
    if (chatDate.toDateString() === now.toDateString()) {
      return chatDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If it's within the last week, return day name
    const diffDays = Math.round((now.getTime() - chatDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return chatDate.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise return short date
    return chatDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {sortedChats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            You don't have any conversations yet.
          </div>
        ) : (
          sortedChats.map(chat => {
            const otherUser = getOtherUser(chat);
            if (!otherUser) return null;
            
            return (
              <button
                key={chat.id}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                  activeChat === chat.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="flex items-center">
                  <Avatar 
                    src={otherUser.profileImage} 
                    alt={otherUser.name} 
                    className="mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {otherUser.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatDate(chat.updatedAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.lastMessage ? chat.lastMessage.content : 'No messages yet'}
                    </p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;