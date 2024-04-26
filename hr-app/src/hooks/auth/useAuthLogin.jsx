import { toast } from 'react-toastify';
import { UseAuthMutation } from '~/api/useAuthMutation';

export const useAuthLogin = () => {
  const { mutate: mutationAuth } = UseAuthMutation({
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
