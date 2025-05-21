import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { User } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface WriterDashboardProps {
  currentUser: User & { isWriter: true; pricePerPage: number; availability: string; };
  onUpdateProfile: (updates: Partial<User & { pricePerPage: number; availability: string; }>) => void;
}

const WriterDashboard: React.FC<WriterDashboardProps> = ({ currentUser, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(currentUser.pricePerPage.toString());
  const [availability, setAvailability] = useState(currentUser.availability);
  
  const handleSaveChanges = () => {
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      return;
    }
    
    onUpdateProfile({
      pricePerPage: priceNumber,
      availability: availability as 'available' | 'busy' | 'unavailable'
    });
    
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setPrice(currentUser.pricePerPage.toString());
    setAvailability(currentUser.availability);
    setIsEditing(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Writer Dashboard</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center"
          >
            <Edit2 size={16} className="mr-1" />
            Edit Settings
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
      
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="sm:w-1/3">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex flex-col items-center">
              <Avatar 
                src={currentUser.profileImage} 
                alt={currentUser.name} 
                size="lg"
                className="mb-3"
              />
              <h3 className="text-lg font-medium text-gray-900">{currentUser.name}</h3>
              <p className="text-gray-600">{currentUser.department}, Year {currentUser.year}</p>
              
              <div className="mt-3">
                {!isEditing ? (
                  <Badge
                    variant={
                      availability === 'available' ? 'success' :
                      availability === 'busy' ? 'warning' : 'danger'
                    }
                  >
                    {availability.charAt(0).toUpperCase() + availability.slice(1)}
                  </Badge>
                ) : (
                  <select
                    className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                )}
              </div>
              
              <div className="mt-4">
                {!isEditing ? (
                  <p className="text-lg font-semibold">
                    ₹{currentUser.pricePerPage.toFixed(2)}<span className="text-sm font-normal text-gray-600">/page</span>
                  </p>
                ) : (
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-1">₹</span>
                    <Input
                      type="number"
                      min="1"
                      step="0.5"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-20"
                    />
                    <span className="text-gray-600 ml-1">/page</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="sm:w-2/3">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Active Chats</h3>
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 text-center text-gray-500">
                You don't have any active chats at the moment.
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Previous Chats</h3>
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 text-center text-gray-500">
                You don't have any previous chats at the moment.
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Earnings Overview</h3>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded p-3 text-center">
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-semibold text-gray-900">₹0.00</p>
                </div>
                <div className="border border-gray-200 rounded p-3 text-center">
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-semibold text-gray-900">₹0.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterDashboard;