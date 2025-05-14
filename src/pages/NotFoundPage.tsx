import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Heart className="h-20 w-20 text-rose-500 mb-6" />
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4 text-center">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 max-w-md text-center mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button size="lg">
            Return Home
          </Button>
        </Link>
        <Link to="/weddings">
          <Button size="lg" variant="outline">
            Browse Weddings
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;