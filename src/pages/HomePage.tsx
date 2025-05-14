import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../components/ui/Button';
import WeddingCard from '../components/weddings/WeddingCard';
import { Wedding } from '../types';
import { mockWeddings, initMockData } from '../data/mockData';

const HomePage: React.FC = () => {
  const [featuredWeddings, setFeaturedWeddings] = useState<Wedding[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [searchDate, setSearchDate] = useState<string>('');

  useEffect(() => {
    // Initialize mock data
    initMockData();
    
    // Get featured weddings (first 3)
    setFeaturedWeddings(mockWeddings.slice(0, 3));
    
    // Get unique countries
    const uniqueCountries = Array.from(new Set(mockWeddings.map(wedding => wedding.location.country)));
    setCountries(uniqueCountries);
  }, []);

  const handleSearch = () => {
    // Build the search URL with query parameters
    let searchUrl = '/weddings?';
    
    if (selectedCountry) {
      searchUrl += `country=${encodeURIComponent(selectedCountry)}&`;
    }
    
    if (searchDate) {
      searchUrl += `fromDate=${encodeURIComponent(searchDate)}`;
    }
    
    // Navigate to search URL
    window.location.href = searchUrl;
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg')",
            opacity: 0.6,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold mb-6">
            Discover and Attend <br />
            <span className="text-rose-300">Beautiful Weddings</span> <br />
            Around the World
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
            Connect with couples and celebrate love in breathtaking destinations.
            Register as a guest for weddings across different countries.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Wedding Date"
                />
              </div>
              <Button fullWidth size="lg" onClick={handleSearch}>
                Find Weddings
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Weddings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-serif font-medium text-gray-900">
              Featured Weddings
            </h2>
            <Link 
              to="/weddings" 
              className="flex items-center text-rose-500 hover:text-rose-600 text-sm font-medium"
            >
              View all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWeddings.map(wedding => (
              <WeddingCard key={wedding.id} wedding={wedding} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              WeddingWander makes it easy to discover and attend beautiful weddings 
              around the world in just a few simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Discover Weddings
              </h3>
              <p className="text-gray-600">
                Browse through our curated selection of weddings from around the world.
                Filter by location, date, and more.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-rose-500">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Create an Account
              </h3>
              <p className="text-gray-600">
                Sign up for a free account to register for weddings and receive
                important updates and notifications.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Attend Weddings
              </h3>
              <p className="text-gray-600">
                Register for weddings you'd like to attend. Receive confirmation
                and event details directly in your inbox.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gradient-to-r from-rose-500 to-rose-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-medium text-white mb-6">
            Ready to Discover Beautiful Weddings?
          </h2>
          <p className="text-lg text-rose-100 max-w-2xl mx-auto mb-8">
            Join our community today and start exploring weddings in breathtaking destinations
            around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50">
                Create an Account
              </Button>
            </Link>
            <Link to="/weddings">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-rose-400">
                Browse Weddings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;