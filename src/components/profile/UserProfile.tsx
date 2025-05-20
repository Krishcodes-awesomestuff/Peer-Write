import React, { useState } from 'react';
import { Edit2, Check, X, BookOpen } from 'lucide-react';
import { User } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface UserProfileProps {
  user: User;
  onUpdateProfile: (updates: Partial<User>) => void;
  onToggleWriterMode: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateProfile, onToggleWriterMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [department, setDepartment] = useState(user.department);
  const [year, setYear] = useState(user.year.toString());
  
  const handleSaveChanges = () => {
    const yearNumber = parseInt(year, 10);
    if (isNaN(yearNumber) || yearNumber < 1 || yearNumber > 6) {
      return; // Could add validation error here
    }
    
    onUpdateProfile({
      name,
      department,
      year: yearNumber
    });
    
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setName(user.name);
    setDepartment(user.department);
    setYear(user.year.toString());
    setIsEditing(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Profile</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center"
          >
            <Edit2 size={16} className="mr-1" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex items-center"
            >
              <X size={16} className="mr-1" />
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveChanges}
              className="flex items-center"
            >
              <Check size={16} className="mr-1" />
              Save
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="flex flex-col items-center bg-gray-50 rounded-lg p-6 border border-gray-200">
            <Avatar 
              src={user.profileImage} 
              alt={user.name} 
              size="lg"
              className="mb-4"
            />
            
            {!isEditing ? (
              <>
                <h3 className="text-xl font-medium text-gray-900">{user.name}</h3>
                <p className="text-gray-600 mt-1">{user.department}, Year {user.year}</p>
              </>
            ) : (
              <>
                <div className="w-full mb-3">
                  <Input
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                </div>
              </>
            )}
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">
                {user.isWriter ? 'Currently registered as a writer' : 'Looking for writing help'}
              </p>
              <Button
                variant={user.isWriter ? 'secondary' : 'primary'}
                size="sm"
                onClick={onToggleWriterMode}
                className="flex items-center"
              >
                <BookOpen size={16} className="mr-1" />
                {user.isWriter ? 'Switch to Client Mode' : 'Become a Writer'}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {isEditing ? (
                  <>
                    <div>
                      <Input
                        label="Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        fullWidth
                      />
                    </div>
                    <div>
                      <Input
                        label="Year of Study"
                        type="number"
                        min="1"
                        max="6"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        fullWidth
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="mt-1 text-gray-900 bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                        {user.email}
                        <span className="ml-2 text-xs text-gray-500">(College email, cannot be changed)</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <div className="mt-1 text-gray-900">{user.department}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Year of Study</label>
                      <div className="mt-1 text-gray-900">{user.year}</div>
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Created</label>
                  <div className="mt-1 text-gray-900">April 12, 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;