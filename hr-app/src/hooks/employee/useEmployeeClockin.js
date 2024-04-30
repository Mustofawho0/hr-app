import { useEmployeeClockinMutation } from '~/api/useCreateClockinMutation';
import { toast } from 'react-toastify';

export const useEmployeeClockin = () => {
  const { mutate: mutationEmployeeClockin } = useEmployeeClockinMutation({
    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return {
    mutationEmployeeClockin,
  };
};
