import React, { useState } from 'react';
import { User } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WriterUser extends User {
  pricePerPage: number;
}

interface WriterSignupProps {
  onSignup: (userData: Partial<WriterUser>) => void;
}

const WriterSignup: React.FC<WriterSignupProps> = ({ onSignup }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    year: '',
    pricePerPage: '',
    profileImage: '',
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup({
      ...formData,
      year: parseInt(formData.year),
      pricePerPage: parseFloat(formData.pricePerPage),
      isWriter: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Create your writer profile
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Set up your profile to start receiving writing requests
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <div className="relative flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-3 mb-2">
                  Upload profile picture
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              fullWidth
            />
            
            <Input
              type="email"
              label="College Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              fullWidth
            />
            
            <Input
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
              fullWidth
            />
            
            <Input
              type="number"
              label="Year of Study"
              min="1"
              max="6"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              required
              fullWidth
            />
            
            <Input
              type="number"
              label="Price per Page (₹)"
              min="1"
              max="12"
              step="0.5"
              value={formData.pricePerPage}
              onChange={(e) => setFormData({ ...formData, pricePerPage: e.target.value })}
              required
              fullWidth
            />
            
            <div>
              <Button type="submit" variant="primary" fullWidth>
                Create Profile
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={handleLoginClick}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterSignup;