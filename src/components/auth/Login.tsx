import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  };

  const handleSignupClick = () => {
    navigate('/writer-signup');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="College Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              fullWidth
            />
            
            <Input
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              fullWidth
            />
            
            <div>
              <Button type="submit" variant="primary" fullWidth className="bg-orange-600 hover:bg-orange-700">
                LOGIN
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={handleSignupClick}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;