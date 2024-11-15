import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginStatus, setLoginStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear any previous status messages when user starts typing
    setLoginStatus({ type: null, message: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json(); // Assume this contains user details like token or user info
        
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(data));
  
        setLoginStatus({
          type: 'success',
          message: 'Login successful! Redirecting...',
        });
        
        // Redirect after a short delay to allow the success message to display
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        const errorData = await response.json();
        setLoginStatus({
          type: 'error',
          message: errorData.message || 'Invalid email or password',
        });
      }
    } catch (error) {
      setLoginStatus({
        type: 'error',
        message: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loginStatus.type && (
        <div
          className={`p-3 rounded-lg text-center ${
            loginStatus.type === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}
        >
          {loginStatus.message}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
        <input 
          type="email" 
          id="email" 
          className="input-field" 
          value={formData.email}
          onChange={handleChange}
          required 
          placeholder="Enter your email"
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
          placeholder="Enter your password"
        />
      </div>

      <button 
        type="submit" 
        className="w-full btn-primary disabled:opacity-50"
        disabled={loginStatus.type === 'success'}
      >
        {loginStatus.type === 'success' ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
} 