import React, { useEffect, useState } from 'react';
import { useLogin } from '../ApiHooks/auth';
import { Alert, Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { UserStore } from '../state/store';

const Login = () => {
  const userData = UserStore.useState(s => s.user);
  const isLoggedIn = UserStore.useState(s => s.isLoggedIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isLoading, isError, error, isSuccess, data } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const navigate = useNavigate()

  useEffect(() => {
    if (userData) {
      navigate('/');

    }
  }, [userData, navigate]);


  useEffect(()=>{
    console.log(userData, 'from login')
    console.log(isLoggedIn)
  },[userData,isLoggedIn])

  console.log(error?.data?.response?.detail)

  return (
    <div className="flex items-center justify-center min-h-screen bg-white md:bg-black">
       {isSuccess  && (
        <p>Login successful</p>
      )}
      <div className="w-full max-w-md bg-white p-8 md:rounded-lg md:shadow-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {isError && <Alert className="bg-red-500 text-white text-xs">{error?.response?.data?.detail}</Alert>}
          
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
          <div className="flex items-center justify-between">
            {
              isLoading ? (
                <Button
                  loading={true}
                  type="submit"
                  className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500"
                >
                  Login
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500"
                >
                  Login
                </Button>
              )
            }
          </div>

          <div className='text-sm text-gray-600'>
            Don't have an account ? <Link to="/register" className='text-black'>Register</Link>



          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;