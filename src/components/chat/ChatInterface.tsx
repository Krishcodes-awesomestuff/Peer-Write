import React, { useState, useRef, useEffect } from 'react';
import { Send, Flag, ArrowLeft } from 'lucide-react';
import { User, Message } from '../../types';
import ChatMessage from './ChatMessage';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

interface ChatInterfaceProps {
  chatId: string;
  currentUser: User;
  otherUser: User;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onReport: (userId: string, reason?: string) => void;
  onBack: () => void;  // Add this prop
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentUser,
  otherUser,
  messages,
  onSendMessage,
  onReport,
  onBack,  // Add this prop
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };
  
  const handleReportUser = () => {
    onReport(otherUser.id, reportReason);
    setShowReportModal(false);
    setReportReason('');
  };
  
  const handleReportMessage = (messageId: string) => {
    // Could extend report functionality to include specific messages
    setShowReportModal(true);
  };
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="mr-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
          </Button>
          <Avatar 
            src={otherUser.profileImage} 
            alt={otherUser.name}
            size="md"
            className="mr-3"
          />
          <div>
            <h3 className="text-base font-medium text-gray-900">{otherUser.name}</h3>
            <p className="text-sm text-gray-500">{otherUser.department}, Year {otherUser.year}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowReportModal(true)}
          className="text-red-600 hover:text-red-700 flex items-center"
        >
          <Flag size={16} className="mr-1" />
          Report
        </Button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message}
              currentUser={currentUser}
              sender={message.senderId === currentUser.id ? currentUser : otherUser}
              onReport={handleReportMessage}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 rounded-l-md border-r-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={!newMessage.trim()}
          >
            <Send size={18} className="mr-2" />
            Send
          </button>
        </div>
      </form>
      
      {/* Report modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Report {otherUser.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide details about why you're reporting this user. Our moderators will review your report.
            </p>
            <textarea
              className="w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 h-32"
              placeholder="Describe the issue..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
            <div className="mt-5 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowReportModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleReportUser}
                disabled={!reportReason.trim()}
              >
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;