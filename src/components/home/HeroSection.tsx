import React from 'react';
import { PenLine, BookOpen } from 'lucide-react';
import Button from '../ui/Button';

interface HeroSectionProps {
  onRoleSelect: (role: 'writer' | 'seeker') => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRoleSelect }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-50 to-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to PeerWrite
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Connect with talented academic writers or share your expertise with peers who need assistance.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:border-primary-300 transition-colors">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 rounded-full p-4">
                <PenLine size={32} className="text-primary-600" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Writer</h2>
            <p className="text-gray-600 mb-6">
              Share your academic expertise and earn by helping fellow students with their assignments.
            </p>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => onRoleSelect('writer')}
            >
              Join as Writer
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:border-primary-300 transition-colors">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 rounded-full p-4">
                <BookOpen size={32} className="text-primary-600" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Assignment Help</h2>
            <p className="text-gray-600 mb-6">
              Find experienced writers to help you with your academic assignments and papers.
            </p>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => onRoleSelect('seeker')}
            >
              Find Writers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;