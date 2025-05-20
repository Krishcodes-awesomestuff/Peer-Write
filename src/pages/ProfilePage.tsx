import React from 'react';
import { User } from '../types';
import UserProfile from '../components/profile/UserProfile';

interface ProfilePageProps {
  user: User;
  onUpdateProfile: (updates: Partial<User>) => void;
  onToggleWriterMode: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateProfile, onToggleWriterMode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600 mt-1">
          Manage your personal information and account settings.
        </p>
      </div>
      
      <UserProfile 
        user={user}
        onUpdateProfile={onUpdateProfile}
        onToggleWriterMode={onToggleWriterMode}
      />
    </div>
  );
};

export default ProfilePage;