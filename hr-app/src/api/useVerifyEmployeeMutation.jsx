import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '~/utils/axiosIntance';

export const useVerifyEmployeeMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ verifyToken }) => {
      return await axiosInstance.post(
        '/api/hr/verify-account',
        {},
        {
          headers: {
            token: verifyToken,
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
