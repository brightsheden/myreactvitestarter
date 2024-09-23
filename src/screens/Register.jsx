import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useRegister } from '../ApiHooks/auth';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('guest');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutate: register, isLoading, isError, error, isSuccess } = useRegister();

  const navigate = useNavigate()
  useEffect(()=>{
    if(isSuccess){
        navigate('/login')
    }
  },[isSuccess])
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Password confirmation check
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Trigger registration process
    register({
      username,
      email,
      user_type: userType,
      password
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white md:bg-black">
     
      <div className="w-full max-w-md bg-white p-4 md:p-8 md:rounded-lg md:shadow-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
        {isError && <Alert className="bg-red-500 text-white text-xs">{error?.response?.data?.detail}</Alert>}
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="userType">
              User Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            >
              <option value="guest">Guest</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
              placeholder="Confirm your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="w-full bg-black text-white font-bold py-4 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </div>
          {isError && <p className="text-red-500 mt-4">Error: {error.message}</p>}

          <div className='text-sm text-gray-600'>
            Have an account ? <Link to="/login" className='text-black'>Login</Link>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
