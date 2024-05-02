import { useCreateEmployeeProfileMutation } from '~/api/useCreateProfileEmployeeMutation';
import { toast } from 'react-toastify';

export const useCreateEmployeeProfile = () => {
  const { mutate: mutationCreateEmployeeProfile } =
    useCreateEmployeeProfileMutation({
      onSuccess: (res) => {
        toast.success(res.data.message);
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    });
  return {
    mutationCreateEmployeeProfile,
  };
};
