import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Check, X, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { Wedding, Registration } from '../../types';
import { getUserRegistrations, cancelRegistration, mockWeddings } from '../../data/mockData';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<(Registration & { wedding?: Wedding })[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  
  useEffect(() => {
    if (user) {
      // Get user registrations
      const userRegs = getUserRegistrations(user.id);
      
      // Get weddings data
      const storedWeddings = localStorage.getItem('weddings');
      const weddingsData = storedWeddings ? JSON.parse(storedWeddings) : mockWeddings;
      
      // Combine registrations with wedding details
      const regsWithWeddings = userRegs.map(reg => {
        const wedding = weddingsData.find((w: Wedding) => w.id === reg.weddingId);
        return {
          ...reg,
          wedding,
        };
      });
      
      setRegistrations(regsWithWeddings);
      setLoading(false);
    }
  }, [user]);
  
  const handleCancelRegistration = (registrationId: string) => {
    setCancelingId(registrationId);
    
    // Cancel registration
    try {
      cancelRegistration(registrationId);
      
      // Update registrations state
      setRegistrations(prev => prev.map(reg => 
        reg.id === registrationId
          ? { ...reg, status: 'canceled' }
          : reg
      ));
      
      // Simulate email notification
      if (user) {
        console.log(`Email notification sent to ${user.email} for cancellation`);
      }
    } catch (error) {
      console.error('Error canceling registration:', error);
    } finally {
      setCancelingId(null);
    }
  };
  
  const upcomingRegistrations = registrations.filter(
    reg => reg.status === 'confirmed' && reg.wedding && new Date(reg.wedding.date) >= new Date()
  );
  
  const pastRegistrations = registrations.filter(
    reg => reg.status === 'confirmed' && reg.wedding && new Date(reg.wedding.date) < new Date()
  );
  
  const canceledRegistrations = registrations.filter(
    reg => reg.status === 'canceled'
  );
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block animate-spin h-8 w-8 border-4 border-rose-200 rounded-full border-t-rose-600"></div>
        <p className="ml-3 text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-serif font-medium text-gray-900">
                Welcome, {user?.name.split(' ')[0]}!
              </h1>
              <p className="text-gray-600">
                Manage your wedding registrations and discover new events.
              </p>
            </div>
            <Link to="/weddings">
              <Button>
                Discover Weddings
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {upcomingRegistrations.length}
                </h3>
                <p className="text-gray-500">Upcoming Weddings</p>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {pastRegistrations.length}
                </h3>
                <p className="text-gray-500">Attended Weddings</p>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <X className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {canceledRegistrations.length}
                </h3>
                <p className="text-gray-500">Canceled Registrations</p>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Upcoming Weddings */}
        <div className="mb-10">
          <h2 className="text-xl font-serif font-medium text-gray-900 mb-4">
            Your Upcoming Weddings
          </h2>
          
          {upcomingRegistrations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No upcoming weddings
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't registered for any upcoming weddings yet.
              </p>
              <Link to="/weddings">
                <Button>
                  Discover Weddings
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingRegistrations.map(reg => (
                <Card key={reg.id} className="overflow-hidden">
                  {reg.wedding && (
                    <>
                      <div className="relative h-40">
                        <img
                          src={reg.wedding.photoUrl}
                          alt={reg.wedding.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-white bg-opacity-90 m-2 px-2 py-1 text-xs font-medium rounded-full">
                          {format(new Date(reg.wedding.date), 'MMM d, yyyy')}
                        </div>
                      </div>
                      <div className="p-4">
                        <Link to={`/weddings/${reg.wedding.id}`}>
                          <h3 className="text-lg font-serif font-medium text-gray-900 hover:text-rose-500 mb-2">
                            {reg.wedding.title}
                          </h3>
                        </Link>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{reg.wedding.location.city}, {reg.wedding.location.country}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">{reg.guests}</span> {reg.guests === 1 ? 'guest' : 'guests'}
                          </div>
                          <div className="flex space-x-2">
                            <Link to={`/weddings/${reg.wedding.id}`}>
                              <Button variant="text" size="sm">
                                View Details
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelRegistration(reg.id)}
                              loading={cancelingId === reg.id}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Past Weddings */}
        {pastRegistrations.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-serif font-medium text-gray-900 mb-4">
              Past Weddings
            </h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wedding
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Guests
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pastRegistrations.map(reg => (
                      <tr key={reg.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {reg.wedding?.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {reg.wedding ? format(new Date(reg.wedding.date), 'MMM d, yyyy') : 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {reg.wedding ? `${reg.wedding.location.city}, ${reg.wedding.location.country}` : 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {reg.guests}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          {reg.wedding && (
                            <Link 
                              to={`/weddings/${reg.wedding.id}`}
                              className="text-rose-500 hover:text-rose-600 font-medium"
                            >
                              View
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Discover More */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg shadow-sm overflow-hidden">
          <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <h2 className="text-2xl font-serif font-medium text-white mb-3">
                Discover More Weddings
              </h2>
              <p className="text-rose-100 max-w-md">
                Browse our collection of beautiful weddings from around the world and register
                for the ones you'd like to attend.
              </p>
            </div>
            <Link to="/weddings">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 shadow-sm">
                <span>Browse Weddings</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;