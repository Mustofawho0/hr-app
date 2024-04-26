import { toast } from 'react-toastify';
import { UseAuthMutation } from '~/api/useAuthMutation';
import { setCookie } from '~/utils/cookiesHelper';
import { setUser } from '~/redux/slice/userSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export const useAuthLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate: mutationAuth } = UseAuthMutation({
    onSuccess: (res) => {
      setCookie(res.data.data.token);
      toast.success(res.data.message);
      dispatch(
        setUser({
          fullname: res.data.data.fullname,
        })
      );
      router.push('/');
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return {
    mutationAuth,
  };
};
