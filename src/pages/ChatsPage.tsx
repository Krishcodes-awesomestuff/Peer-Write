import React, { useState, useEffect } from 'react';
import { User, Chat, Message } from '../types';
import ChatList from '../components/chat/ChatList';
import ChatInterface from '../components/chat/ChatInterface';
import { useNavigate } from 'react-router-dom';

interface ChatsPageProps {
  chats: Chat[];
  messages: Record<string, Message[]>;
  currentUser: User;
  allUsers: Record<string, User>;
  onSendMessage: (chatId: string, content: string) => void;
  onReport: (userId: string, reason?: string) => void;
}

const ChatsPage: React.FC<ChatsPageProps> = ({
  chats,
  messages,
  currentUser,
  allUsers,
  onSendMessage,
  onReport,
}) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showChatList, setShowChatList] = useState(true);
  const navigate = useNavigate();
  
  const handleBackToBrowse = () => {
    navigate('/browse');
  };
  
  useEffect(() => {
    // Set the first chat as active if there are chats and none is selected
    if (chats.length > 0 && !activeChat) {
      setActiveChat(chats[0].id);
      if (isMobileView) {
        setShowChatList(false);
      }
    }
    
    // Handle window resize
    const handleResize = () => {
      const newIsMobileView = window.innerWidth < 768;
      setIsMobileView(newIsMobileView);
      if (!newIsMobileView) {
        setShowChatList(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chats, activeChat, isMobileView]);
  
  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId);
    if (isMobileView) {
      setShowChatList(false);
    }
  };
  
  const handleBackToList = () => {
    setShowChatList(true);
  };
  
  const handleSendMessage = (content: string) => {
    if (activeChat) {
      onSendMessage(activeChat, content);
    }
  };
  
  // Get the other user in the active chat
  const getOtherUser = () => {
    if (!activeChat) return null;
    
    const chat = chats.find(c => c.id === activeChat);
    if (!chat) return null;
    
    const otherUserId = chat.participants.find(id => id !== currentUser.id);
    return otherUserId ? allUsers[otherUserId] : null;
  };
  
  // Get messages for the active chat
  const getChatMessages = () => {
    return activeChat ? messages[activeChat] || [] : [];
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Conversations</h1>
        
        {isMobileView && activeChat && !showChatList && (
          <button
            onClick={handleBackToList}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to list
          </button>
        )}
      </div>
      
      {chats.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
          <p className="text-gray-600">
            Browse writers and start a conversation to get help with your assignments.
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-240px)]">
          {(showChatList || !isMobileView) && (
            <div className={`${isMobileView ? 'w-full' : 'w-1/3'}`}>
              <ChatList
                chats={chats}
                users={allUsers}
                currentUser={currentUser}
                activeChat={activeChat}
                onSelectChat={handleSelectChat}
              />
            </div>
          )}
          
          {activeChat && (!showChatList || !isMobileView) && (
            <div className={`${isMobileView ? 'w-full' : 'w-2/3'}`}>
              {getOtherUser() && (
                // In ChatsPage component
                <ChatInterface
                  chatId={activeChat}
                  currentUser={currentUser}
                  otherUser={getOtherUser()!}
                  messages={getChatMessages()}
                  onSendMessage={handleSendMessage}
                  onReport={onReport}
                  onBack={handleBackToBrowse}  // Changed to use the new navigation function
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatsPage;