import Cookies, { parseCookies } from 'nookies';
import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { userApi } from './user';
import { postApi } from './post';
import { commentApi } from './comment';

export type ApiReturnType = {
  user: ReturnType<typeof userApi>;
  post: ReturnType<typeof postApi>;
  comment: ReturnType<typeof commentApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.authToken;

  const instance = axios.create({
    baseURL: 'https://t-journal-nest-js.vercel.app',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  const apis = {
    user: userApi(instance),
    post: postApi(instance),
    comment: commentApi(instance),
  };

  return apis;
};
