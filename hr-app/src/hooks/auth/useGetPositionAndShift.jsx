import { useGetPositionAndShiftQuery } from '~/api/useGetPositionAndShiftQuery';

export const useGetPositionAndShift = () => {
  const {
    data: dataPositionAndShift,
    isSuccess,
    isError,
  } = useGetPositionAndShiftQuery();
  console.log('Iqbal Gans Abiez');

  return {
    dataPositionAndShift: dataPositionAndShift?.data?.data,
  };
};
