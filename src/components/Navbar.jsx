import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-white shadow-md rounded-b-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div 
            onClick={() => navigate('/')}
            className="flex-shrink-0 flex items-center cursor-pointer"
          >
            <span className="text-xl font-bold text-green-600">Mohsin.io Co.</span>
          </div>
          
          {/* Primary Nav */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              About
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="hidden mobile-menu md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
          >
            Home
          </Link>
          <Link
            to="/features"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
          >
            Features
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;