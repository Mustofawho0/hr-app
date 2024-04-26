import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';

// export const useGetPositionAndShiftQuery = () => {
//   const { data, isSuccess, isError } = useQuery({
//     queryFn: async () => {
//       console.log('Iqbal Smoker');
//       return await axios.get('http://localhost:404/api/employee/position');
//     },
//   });
//   console.log(data);
//   return {
//     data,
//     isSuccess,
//     isError,
//   };
// };

export const useGetPositionAndShiftQuery = () => {
  const [position, shift] = useQueries({
    queries: [
      {
        queryKey: ['position'],
        queryFn: async () => {
          return await axios.get('http://localhost:404/api/employee/position');
        },
      },
    ],
  });
};
