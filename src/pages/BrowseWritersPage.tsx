import React from 'react';
import { Writer } from '../types';
import WriterList from '../components/writers/WriterList';

interface BrowseWritersPageProps {
  writers: Writer[];
  onChatClick: (writerId: string) => void;
}

const BrowseWritersPage: React.FC<BrowseWritersPageProps> = ({ writers, onChatClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Browse Writers</h1>
        <p className="text-gray-600 mt-1">
          Find the perfect writer for your assignment from our pool of qualified peers.
        </p>
      </div>
      
      <WriterList writers={writers} onChatClick={onChatClick} />
    </div>
  );
};

export default BrowseWritersPage;