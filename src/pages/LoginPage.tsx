import { useState } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-md mx-auto card">
      <div className="flex justify-center mb-8">
        <button
          className={`px-4 py-2 ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? (
        <>
          <Login />
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="text-primary hover:underline"
            >
              Sign up here
            </button>
          </p>
        </>
      ) : (
        <SignUp />
      )}
    </div>
  );
} 