'use client';

import { useVerifyEmployeeMutation } from '~/api/useVerifyEmployeeMutation';
import { toast } from 'react-toastify';
import { use, useEffect } from 'react';

export const useVerifyEmployee = () => {
  const { mutate: useVerifyEmployeeMutate } = useVerifyEmployeeMutation({
    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  useEffect(() => {
    useVerifyEmployeeMutate();
  }, []);
};
