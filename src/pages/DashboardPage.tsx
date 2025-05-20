import React from 'react';
import { User, Writer } from '../types';
import WriterDashboard from '../components/dashboard/WriterDashboard';

interface DashboardPageProps {
  currentUser: User;
  onUpdateProfile: (updates: Partial<User>) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ currentUser, onUpdateProfile }) => {
  if (!currentUser.isWriter) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Writer Dashboard</h1>
          <p className="text-gray-600 mb-6">
            You need to be registered as a writer to access the dashboard.
          </p>
          <p className="text-gray-600">
            Head to your profile to switch to writer mode.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Writer Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage your writer profile, set your availability, and track your orders.
        </p>
      </div>
      
      <WriterDashboard 
        currentUser={currentUser as User & { isWriter: true; pricePerPage: number; availability: string; }}
        onUpdateProfile={onUpdateProfile}
      />
    </div>
  );
};

export default DashboardPage;