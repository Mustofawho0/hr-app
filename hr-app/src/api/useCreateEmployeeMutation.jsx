'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateEmployeeMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({
      email,
      fullname,
      password,
      positionId,
      shiftId,
      address,
    }) => {
      return axios.post(
        'http://localhost:404/api/hr/employee',
        {
          email,
          fullname,
          password,
          positionId,
          shiftId,
          address,
        },
        {
          headers: {
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjbHZkYzFybmIwMDAxMTI0M2pmNnVlMHoyIiwiaWF0IjoxNzE0MDI3NzU4LCJleHAiOjE3MTQwMzEzNTh9.4D-El1NrXxswEH5nCvpA7Nm3SfQwdemqRAJPuw4vPxU',
          },
        }
      );
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
