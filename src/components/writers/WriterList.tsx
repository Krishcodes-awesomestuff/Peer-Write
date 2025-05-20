import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Writer } from '../../types';
import WriterCard from './WriterCard';
import Input from '../ui/Input';

interface WriterListProps {
  writers: Writer[];
  onChatClick: (writerId: string) => void;
}

const WriterList: React.FC<WriterListProps> = ({ writers, onChatClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('');
  
  // Extract unique departments for the filter dropdown
  const departments = [...new Set(writers.map(writer => writer.department))];
  
  // Filter writers based on search term and filters
  const filteredWriters = writers.filter(writer => {
    const matchesSearch = writer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         writer.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment ? writer.department === selectedDepartment : true;
    const matchesAvailability = availabilityFilter ? writer.availability === availabilityFilter : true;
    
    return matchesSearch && matchesDepartment && matchesAvailability;
  });
  
  return (
    <div>
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              fullWidth
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-48">
              <select
                className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="w-40">
              <select
                className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
              >
                <option value="">All Availability</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {filteredWriters.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No writers found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWriters.map(writer => (
            <WriterCard 
              key={writer.id} 
              writer={writer} 
              onChatClick={onChatClick} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WriterList;