import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-rose-500" />
              <span className="ml-2 text-xl font-serif text-gray-900">WeddingWander</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Connecting travelers to beautiful weddings around the world since 2025.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
              Discover
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/weddings" className="text-sm text-gray-600 hover:text-rose-500">
                  All Weddings
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-sm text-gray-600 hover:text-rose-500">
                  Popular Destinations
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm text-gray-600 hover:text-rose-500">
                  Search Weddings
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-rose-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-rose-500">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-rose-500">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-rose-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-rose-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-gray-600 hover:text-rose-500">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} WeddingWander Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;