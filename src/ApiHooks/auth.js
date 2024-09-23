// hooks/useLogin.js
import { useMutation } from 'react-query';
import axios from 'axios';
import { UserStore } from '../state/store';
import { API_URL } from '../../config';



const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/api/login/`, loginData);
  return response.data; // Assumes the API response contains user data
};

export const useLogin = () => {
  return useMutation(loginUser, {
    onSuccess: (data) => {
      // Store user data in Pullstate's UserStore
      localStorage.setItem('userInfo', JSON.stringify(data));
      UserStore.update(s => {
        s.user = data;
        s.isLoggedIn = true;
      });



      
    },

  });
};



const registerUser = async (registerData) => {
    const response = await axios.post(`${API_URL}/api/register`, registerData);
    return response.data; // Assumes the API response contains user data
  };
  
  export const useRegister = () => {
    return useMutation(registerUser, {
      onSuccess: (data) => {
        // Store user data in Pullstate's UserStore
      },
      onError: (error) => {
        console.error('Registration failed:', error);
        // Handle the error accordingly (show notification, etc.)
      }
    });
  };