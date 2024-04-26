'use client';

import { useCreateEmployeeMutation } from '~/api/useCreateEmployeeMutation';
import { toast } from 'react-toastify';

export const useAuthRegister = () => {
  const { mutate: mutationAuth } = useCreateEmployeeMutation({
    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return {
    mutationAuth,
  };
};
