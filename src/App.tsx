import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WriterSignup from './components/auth/WriterSignup';
import Login from './components/auth/Login';
import BrowseWritersPage from './pages/BrowseWritersPage';
import ChatsPage from './pages/ChatsPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import { mockUsers, mockWriters, mockChats, mockMessages, currentUser } from './data/mockData';
import { User, Writer, Message } from './types';

function App() {
  // State for active page and role
  const [activePage, setActivePage] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'writer' | 'seeker' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State for data
  const [users, setUsers] = useState<Record<string, User>>({
    ...mockUsers.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}),
    ...mockWriters.reduce((acc, writer) => ({ ...acc, [writer.id]: writer }), {})
  });
  
  const [chats, setChats] = useState(mockChats);
  const [messages, setMessages] = useState(mockMessages);
  const [userData, setUserData] = useState(currentUser);
  
  const handleRoleSelect = (role: 'writer' | 'seeker') => {
    setSelectedRole(role);
    if (role === 'writer') {
      setActivePage('signup');
    } else {
      setActivePage('browse');
      setIsAuthenticated(true);
    }
  };
  
  const handleWriterSignup = (formData: Partial<User>) => {
    setUserData({ ...userData, ...formData });
    setIsAuthenticated(true);
    setActivePage('dashboard');
  };
  
  // Remove or comment out the handleSkipSignup function since it's no longer needed
  // const handleSkipSignup = () => {
  //   setIsAuthenticated(true);
  //   setActivePage('dashboard');
  // };

  const handleLogin = () => {
    // In a real app, this would show a login form
    setIsAuthenticated(true);
    setActivePage('dashboard');
  };
  
  // Handler for starting a chat with a writer
  const handleChatClick = (writerId: string) => {
    const existingChat = chats.find(chat => 
      chat.participants.includes(userData.id) && 
      chat.participants.includes(writerId)
    );
    
    if (existingChat) {
      setActivePage('chats');
    } else {
      const newChat = {
        id: `chat${chats.length + 1}`,
        participants: [userData.id, writerId] as [string, string],
        updatedAt: new Date()
      };
      
      setChats([...chats, newChat]);
      setMessages({
        ...messages,
        [newChat.id]: []
      });
      
      setActivePage('chats');
    }
  };
  
  // Handler for sending a message
  const handleSendMessage = (chatId: string, content: string) => {
    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: userData.id,
      receiverId: chats.find(chat => chat.id === chatId)?.participants.find(id => id !== userData.id) || '',
      content,
      timestamp: new Date(),
      isRead: false
    };
    
    setMessages({
      ...messages,
      [chatId]: [...(messages[chatId] || []), newMessage]
    });
  };
  
  // Handler for reporting a user
  const handleReport = (userId: string, reason?: string) => {
    console.log(`Reported user ${userId}: ${reason}`);
    alert('Your report has been submitted and will be reviewed by our team.');
  };
  
  // Handler for updating user profile
  const handleUpdateProfile = (updates: Partial<User>) => {
    setUserData({
      ...userData,
      ...updates
    });
  };
  
  // Handler for toggling writer mode
  const handleToggleWriterMode = () => {
    if (userData.isWriter) {
      setUserData({
        ...userData,
        isWriter: false
      });
    } else {
      setUserData({
        ...userData,
        isWriter: true,
        pricePerPage: 10,
        availability: 'available',
        rating: 0,
        completedJobs: 0
      } as Writer);
    }
  };
  
  // Render content based on authentication and page state
  const renderContent = () => {
    if (!selectedRole) {
      return <HeroSection onRoleSelect={handleRoleSelect} />;
    }
    
    if (selectedRole === 'writer' && !isAuthenticated) {
      return (
        <WriterSignup 
          onSignup={handleWriterSignup}
        />
      );
    }
    
    switch (activePage) {
      case 'browse':
        return (
          <BrowseWritersPage 
            writers={mockWriters}
            onChatClick={handleChatClick}
          />
        );
      case 'chats':
        return (
          <ChatsPage 
            chats={chats}
            messages={messages}
            currentUser={userData}
            allUsers={users}
            onSendMessage={handleSendMessage}
            onReport={handleReport}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage 
            currentUser={userData}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'profile':
        return (
          <ProfilePage 
            user={userData}
            onUpdateProfile={handleUpdateProfile}
            onToggleWriterMode={handleToggleWriterMode}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {isAuthenticated && (
          <Navbar 
            currentUser={userData}
            activePage={activePage || ''}
            onNavigate={setActivePage}
          />
        )}
        
        <main className="flex-1 bg-gradient-to-b from-gray-50 to-white">
          <Routes>
            <Route path="/browse" element={<BrowseWritersPage writers={mockWriters} onChatClick={handleChatClick} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={renderContent()} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
