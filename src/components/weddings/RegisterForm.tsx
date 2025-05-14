import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../context/AuthContext';
import { registerForWedding } from '../../data/mockData';
import { Wedding } from '../../types';

interface RegisterFormProps {
  wedding: Wedding;
  onSuccess: () => void;
}

interface FormData {
  guests: number;
  specialRequests?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ wedding, onSuccess }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      guests: 1,
      specialRequests: '',
    },
  });

  const availableSpots = wedding.capacity - wedding.registered;

  const onSubmit = async (data: FormData) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: `/weddings/${wedding.id}` } });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      if (user) {
        registerForWedding(user.id, wedding.id, data.guests);
        
        // Simulate email notification
        console.log(`Email notification sent to ${user.email} for wedding ${wedding.title}`);
        
        setTimeout(() => {
          setIsLoading(false);
          onSuccess();
        }, 1000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  if (availableSpots <= 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
        <h3 className="text-amber-800 font-medium">This wedding is fully booked</h3>
        <p className="text-amber-700 text-sm mt-1">
          Please check back later or explore other weddings.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-100 rounded-lg p-6">
      <h3 className="text-xl font-serif font-medium text-gray-900 mb-4">
        Register for this Wedding
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {availableSpots} {availableSpots === 1 ? 'spot' : 'spots'} remaining
      </p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Guests
          </label>
          <select
            {...register('guests', { 
              required: 'Required',
              min: {
                value: 1,
                message: 'At least 1 guest is required'
              },
              max: {
                value: availableSpots,
                message: `Maximum ${availableSpots} guests allowed`
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
          >
            {Array.from({ length: Math.min(10, availableSpots) }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
          {errors.guests && (
            <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests (Optional)
          </label>
          <textarea
            {...register('specialRequests')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Any dietary restrictions, accessibility needs, etc."
          />
        </div>
        
        <Button 
          type="submit" 
          fullWidth 
          loading={isLoading}
        >
          {isAuthenticated ? 'Confirm Registration' : 'Login to Register'}
        </Button>
        
        <p className="mt-4 text-xs text-gray-500 text-center">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;