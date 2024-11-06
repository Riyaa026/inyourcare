import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Booking from './pages/Booking';
import BookingHistory from './pages/BookingHistory';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/bookings" element={<BookingHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
