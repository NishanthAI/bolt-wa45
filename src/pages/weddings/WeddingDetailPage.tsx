import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Globe, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../../components/ui/Button';
import RegisterForm from '../../components/weddings/RegisterForm';
import { Wedding } from '../../types';
import { mockWeddings, initMockData } from '../../data/mockData';

const WeddingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  
  useEffect(() => {
    // Initialize mock data
    initMockData();
    
    // Get wedding details
    if (id) {
      const storedWeddings = localStorage.getItem('weddings');
      const weddingsData = storedWeddings ? JSON.parse(storedWeddings) : mockWeddings;
      
      const weddingDetail = weddingsData.find((w: Wedding) => w.id === id);
      setWedding(weddingDetail || null);
      setLoading(false);
    }
  }, [id]);
  
  const handleRegistrationSuccess = () => {
    setRegistered(true);
    
    // Update wedding in state to reflect registration
    if (wedding) {
      setWedding({
        ...wedding,
        registered: wedding.registered + 1,
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block animate-spin h-8 w-8 border-4 border-rose-200 rounded-full border-t-rose-600"></div>
        <p className="ml-3 text-gray-600">Loading wedding details...</p>
      </div>
    );
  }
  
  if (!wedding) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 text-gray-400 mb-4"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" 
          />
        </svg>
        <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4">Wedding Not Found</h2>
        <p className="text-gray-600 mb-6">
          The wedding you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/weddings">
          <Button>
            Browse Other Weddings
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Image */}
      <div className="relative h-96 sm:h-[500px] bg-gray-900">
        <img
          src={wedding.photoUrl}
          alt={wedding.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <Link to="/weddings" className="inline-flex items-center text-white mb-4 opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to weddings
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {wedding.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-white">
            <div className="flex items-center text-sm sm:text-base">
              <Calendar className="h-5 w-5 mr-2 text-rose-300" />
              {format(new Date(wedding.date), 'MMMM d, yyyy')}
            </div>
            <div className="flex items-center text-sm sm:text-base">
              <MapPin className="h-5 w-5 mr-2 text-rose-300" />
              {wedding.location.city}, {wedding.location.country}
            </div>
            <div className="flex items-center text-sm sm:text-base">
              <Users className="h-5 w-5 mr-2 text-rose-300" />
              {wedding.registered} / {wedding.capacity} guests
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
              <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4">
                About This Wedding
              </h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {wedding.description}
              </p>
              
              <h3 className="text-xl font-serif font-medium text-gray-900 mb-3">
                Wedding Hosts
              </h3>
              <div className="flex items-center gap-4 mb-6">
                {wedding.hosts.map((host, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-medium mr-2">
                      {host.name.charAt(0)}
                    </div>
                    <span className="text-gray-800">{host.name}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-serif font-medium text-gray-900 mb-3">
                Venue Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start mb-2">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">{wedding.location.venue}</p>
                    <p className="text-gray-600">
                      {wedding.location.city}, {wedding.location.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-gray-600">
                      Coordinates: {wedding.location.coordinates.lat}, {wedding.location.coordinates.lng}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                <p className="text-gray-500">Interactive map would be displayed here</p>
                {/* In a real application, you would integrate a map service like Google Maps or Mapbox */}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {registered ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-gray-900 mb-2">
                    You're all set!
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Your registration for this wedding has been confirmed. We've sent you an email
                    with all the details.
                  </p>
                </div>
                <Link to="/dashboard">
                  <Button fullWidth variant="secondary">
                    View My Registrations
                  </Button>
                </Link>
              </div>
            ) : (
              <RegisterForm wedding={wedding} onSuccess={handleRegistrationSuccess} />
            )}
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-serif font-medium text-gray-900 mb-4">
                Event Details
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Date</p>
                    <p className="text-gray-600">
                      {format(new Date(wedding.date), 'EEEE, MMMM d, yyyy')}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Location</p>
                    <p className="text-gray-600">
                      {wedding.location.venue}<br />
                      {wedding.location.city}, {wedding.location.country}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Capacity</p>
                    <p className="text-gray-600">
                      {wedding.capacity} maximum guests
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          (wedding.registered / wedding.capacity) * 100 >= 80
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${(wedding.registered / wedding.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {wedding.capacity - wedding.registered} spots remaining
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingDetailPage;