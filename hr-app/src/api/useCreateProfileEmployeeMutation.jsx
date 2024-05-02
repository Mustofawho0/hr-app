import { axiosInstance } from '~/utils/axiosIntance';
import { useMutation } from '@tanstack/react-query';

export const useCreateEmployeeProfileMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (fd) => {
      return await axiosInstance.post('api/employee/upload-image/', fd);
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
