import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data exists in localStorage to set login state
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    // Remove user data from localStorage and update state
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              InYourCare
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
            <Link to="/explore" className="text-gray-700 hover:text-primary">Explore</Link>
            <Link to="/profile" className="text-gray-700 hover:text-primary">Profiles</Link>
            {/* <Link to="/booking" className="text-gray-700 hover:text-primary">Book Service</Link> */}
            <Link to="/bookings" className="text-gray-700 hover:text-primary">Booking History</Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-gray-700 hover:text-primary">Logout</button>
            ) : (
              <Link to="/login" className="btn-primary">Login</Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-primary">Home</Link>
              <Link to="/explore" className="block px-3 py-2 text-gray-700 hover:text-primary">Explore</Link>
              <Link to="/profile" className="block px-3 py-2 text-gray-700 hover:text-primary">Profiles</Link>
              {/* <Link to="/booking" className="block px-3 py-2 text-gray-700 hover:text-primary">Book Service</Link> */}
              <Link to="/bookings" className="block px-3 py-2 text-gray-700 hover:text-primary">Booking History</Link>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="block px-3 py-2 text-gray-700 hover:text-primary">Logout</button>
              ) : (
                <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-primary">Login</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
