import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WeddingCard from '../../components/weddings/WeddingCard';
import WeddingFilters from '../../components/weddings/WeddingFilters';
import { Wedding, WeddingFilters as FiltersType } from '../../types';
import { mockWeddings, initMockData } from '../../data/mockData';

const WeddingsPage: React.FC = () => {
  const location = useLocation();
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [filteredWeddings, setFilteredWeddings] = useState<Wedding[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialFilters: FiltersType = {
    search: '',
    country: queryParams.get('country') || '',
    fromDate: queryParams.get('fromDate') || '',
    toDate: queryParams.get('toDate') || '',
  };
  
  const [filters, setFilters] = useState<FiltersType>(initialFilters);
  
  useEffect(() => {
    // Initialize mock data
    initMockData();
    
    // Get weddings from localStorage or fall back to mockWeddings
    const storedWeddings = localStorage.getItem('weddings');
    const weddingsData = storedWeddings ? JSON.parse(storedWeddings) : mockWeddings;
    
    setWeddings(weddingsData);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    filterWeddings(filters);
  }, [weddings, filters]);
  
  const filterWeddings = (filters: FiltersType) => {
    let filtered = [...weddings];
    
    // Filter by search text
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        wedding => 
          wedding.title.toLowerCase().includes(searchLower) ||
          wedding.description.toLowerCase().includes(searchLower) ||
          wedding.location.country.toLowerCase().includes(searchLower) ||
          wedding.location.city.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by country
    if (filters.country) {
      filtered = filtered.filter(
        wedding => wedding.location.country === filters.country
      );
    }
    
    // Filter by date range
    if (filters.fromDate) {
      filtered = filtered.filter(
        wedding => new Date(wedding.date) >= new Date(filters.fromDate)
      );
    }
    
    if (filters.toDate) {
      filtered = filtered.filter(
        wedding => new Date(wedding.date) <= new Date(filters.toDate)
      );
    }
    
    setFilteredWeddings(filtered);
  };
  
  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-medium text-gray-900 mb-4">
            Discover Beautiful Weddings
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our curated collection of weddings from around the world.
            Filter by location, date, and more to find the perfect wedding to attend.
          </p>
        </div>
        
        <WeddingFilters 
          onFilterChange={handleFilterChange} 
          weddings={weddings}
        />
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-rose-200 rounded-full border-t-rose-600"></div>
            <p className="mt-4 text-gray-600">Loading weddings...</p>
          </div>
        ) : filteredWeddings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
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
            <h3 className="text-xl font-medium text-gray-900 mb-2">No weddings found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any weddings matching your search criteria. 
              Try adjusting your filters or check back later for new events.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWeddings.map(wedding => (
              <WeddingCard key={wedding.id} wedding={wedding} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeddingsPage;