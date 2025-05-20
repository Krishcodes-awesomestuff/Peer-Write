import React from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { Writer } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface WriterCardProps {
  writer: Writer;
  onChatClick: (writerId: string) => void;
}

const WriterCard: React.FC<WriterCardProps> = ({ writer, onChatClick }) => {
  const getAvailabilityBadge = () => {
    switch(writer.availability) {
      case 'available':
        return <Badge variant="success">Available</Badge>;
      case 'busy':
        return <Badge variant="warning">Busy</Badge>;
      case 'unavailable':
        return <Badge variant="danger">Unavailable</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start">
        <Avatar 
          src={writer.profileImage} 
          alt={writer.name} 
          size="lg"
          className="mr-4"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{writer.name}</h3>
              <p className="text-sm text-gray-600">{writer.department}, Year {writer.year}</p>
            </div>
            <div>
              {getAvailabilityBadge()}
            </div>
          </div>
          
          <div className="mt-2 flex items-center">
            <div className="flex items-center text-amber-500">
              <Star size={16} className="fill-current" />
              <span className="ml-1 text-sm font-medium">{writer.rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-600">{writer.completedJobs} completed</span>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-base font-semibold text-gray-900">
              ₹{writer.pricePerPage.toFixed(2)}<span className="text-sm font-normal text-gray-600">/page</span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onChatClick(writer.id)}
              className="flex items-center"
              disabled={writer.availability === 'unavailable'}
            >
              <MessageSquare size={16} className="mr-1" />
              Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterCard;