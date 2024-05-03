'use client';
import axios from 'axios';
import { useEffect } from 'react';
import { useVerifyEmployee } from '~/hooks/useVerifyEmployee';

export default function Verify({ params }) {
  useVerifyEmployee();
  // console.log(params.verifyToken);
  // const onHandleVerify = async () => {
  //   try {
  //     const res = await axios.post(
  //       'http://localhost:404/api/hr/verify-account',
  //       {},
  //       {
  //         headers: {
  //           token: params.verifyToken,
  //         },
  //       }
  //     );
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   onHandleVerify();
  // }, []);
  return (
    <div>
      <section className='py-6 bg-sky-600 text-gray-50 h-full'>
        <div className='flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48'>
          <h1 className='text-2xl font-bold leading-none text-center'>
            Welcome
          </h1>
          <p className='pt-2 font-medium text-center'>
            Your email has been verified
          </p>
          <p className='font-medium text-center'>❤️</p>
        </div>
      </section>
    </div>
  );
}
