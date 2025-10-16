import { useState } from 'react';
import { Link } from 'react-router';

// Header Component
const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My App</h1>
          <div className="flex gap-4">
            <Link 
              to = '/'
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 'hello' 
                  ? 'bg-white text-blue-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-400'
              }`}
            >
              Hello World
            </Link>
            <Link 
              to = '/dashboard'
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 'dashboard' 
                  ? 'bg-white text-blue-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-400'
              }`}
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;