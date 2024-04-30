import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from '~/utils/cookiesHelper';

export const useEmployeeClockoutMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const cookie = await getCookie();
      return await axios.post('');
    },
  });
};
