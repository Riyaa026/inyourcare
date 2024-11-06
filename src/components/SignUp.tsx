import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const indianCities = [
  'Mumbai', 'Delhi', 'Chennai', 
  'Kolkata'
].sort();

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'India',
    city: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
  
    try {
      // Make a POST request to the backend API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

  
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          alert("User already exists!");
        } else {
          alert(errorData.message || "Signup failed. Please try again.");
        }
        return;
      }
  
      // If signup is successful, redirect to the login page
      alert("You can proceed to login now.");
      navigate('/login');
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="userId" className="block text-gray-700 mb-2">User ID</label>
        <input 
          type="text" 
          id="userId" 
          className="input-field" 
          value={formData.userId}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div>
        <label htmlFor="userName" className="block text-gray-700 mb-2">Full Name</label>
        <input 
          type="text" 
          id="userName" 
          className="input-field" 
          value={formData.userName}
          onChange={handleChange}
          required 
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
        <input 
          type="email" 
          id="email" 
          className="input-field" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
        <input 
          type="password" 
          id="password" 
          className="input-field" 
          value={formData.password}
          onChange={handleChange}
          required 
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
        <input 
          type="password" 
          id="confirmPassword" 
          className="input-field" 
          value={formData.confirmPassword}
          onChange={handleChange}
          required 
        />
      </div>

      <div>
        <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
        <select 
          id="country" 
          className="input-field" 
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="India">India</option>
        </select>
      </div>

      <div>
        <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
        <select 
          id="city" 
          className="input-field" 
          value={formData.city}
          onChange={handleChange}
          required
        >
          <option value="">Select a city</option>
          {indianCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="w-full btn-primary">
        Sign Up
      </button>
    </form>
  );
} 