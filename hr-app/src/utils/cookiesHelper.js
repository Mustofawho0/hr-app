'use server';

import { cookies } from 'next/headers';

export const setCookie = (token) => {
  cookies().set('acctkn', token);
};
