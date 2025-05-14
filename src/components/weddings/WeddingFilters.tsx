import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { WeddingFilters as FiltersType, Wedding } from '../../types';

interface WeddingFiltersProps {
  onFilterChange: (filters: FiltersType) => void;
  weddings: Wedding[];
}

const WeddingFilters: React.FC<WeddingFiltersProps> = ({ onFilterChange, weddings }) => {
  const [filters, setFilters] = useState<FiltersType>({
    search: '',
    country: '',
    fromDate: '',
    toDate: '',
  });

  const [isExpanded, setIsExpanded] = useState(false);
  
  // Extract unique countries for the dropdown
  const countries = Array.from(new Set(weddings.map(wedding => wedding.location.country)));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      country: '',
      fromDate: '',
      toDate: '',
    });
    onFilterChange({
      search: '',
      country: '',
      fromDate: '',
      toDate: '',
    });
  };

  // Apply filters when they change
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters.search]);

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Search weddings..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Less Filters' : 'More Filters'}
          </Button>
          <Button 
            size="sm" 
            onClick={handleSubmit}
          >
            Search
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 border-t pt-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="country"
                    value={filters.country}
                    onChange={handleInputChange}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                  >
                    <option value="">All Countries</option>
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="fromDate"
                    value={filters.fromDate}
                    onChange={handleInputChange}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="toDate"
                    value={filters.toDate}
                    onChange={handleInputChange}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={handleReset}
                  fullWidth
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WeddingFilters;