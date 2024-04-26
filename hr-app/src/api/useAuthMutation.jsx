'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const UseAuthMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ email, password }) => {
      console.log('Mutation Executed!');
      console.log(email);
      console.log(password);
      return axios.post('http://localhost:404/api/auth/login', {
        email,
        password,
      });
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
