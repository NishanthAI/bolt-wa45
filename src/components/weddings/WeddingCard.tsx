import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';
import Card from '../ui/Card';
import { Wedding } from '../../types';

interface WeddingCardProps {
  wedding: Wedding;
}

const WeddingCard: React.FC<WeddingCardProps> = ({ wedding }) => {
  const registrationPercentage = (wedding.registered / wedding.capacity) * 100;
  const isNearlyFull = registrationPercentage >= 80;

  return (
    <Card hoverable className="h-full flex flex-col">
      <Link to={`/weddings/${wedding.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={wedding.photoUrl}
            alt={wedding.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-0 right-0 bg-white bg-opacity-90 m-2 px-2 py-1 text-xs font-medium rounded-full">
            <span className={`${isNearlyFull ? 'text-amber-600' : 'text-emerald-600'}`}>
              {wedding.capacity - wedding.registered} spots left
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4 flex-grow flex flex-col">
        <div className="text-xs text-gray-500 font-medium flex items-center mb-2">
          <Calendar className="h-3 w-3 mr-1" />
          {format(new Date(wedding.date), 'MMMM d, yyyy')}
        </div>
        <Link to={`/weddings/${wedding.id}`} className="block">
          <h3 className="text-lg font-serif font-medium text-gray-900 hover:text-rose-500 transition-colors mb-1">
            {wedding.title}
          </h3>
        </Link>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-3.5 w-3.5 text-gray-400 mr-1" />
          <span>{wedding.location.city}, {wedding.location.country}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {wedding.description}
        </p>
        <div className="mt-auto">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${
                isNearlyFull ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${registrationPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <div className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>
                {wedding.registered} / {wedding.capacity} guests
              </span>
            </div>
            <Link 
              to={`/weddings/${wedding.id}`}
              className="text-rose-500 font-medium hover:text-rose-600 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeddingCard;