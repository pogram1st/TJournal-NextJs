import Cookies, { parseCookies } from 'nookies';
import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { userApi } from './user';
import { postApi } from './post';
import { commentApi } from './comment';
import { subscribeApi } from './sub';

export type ApiReturnType = {
  user: ReturnType<typeof userApi>;
  post: ReturnType<typeof postApi>;
  comment: ReturnType<typeof commentApi>;
  sub: ReturnType<typeof subscribeApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.authToken;
  // const url = process.env.REACT_APP_BACKEND_URL;
  const instance = axios.create({
    baseURL: 'https://t-journal-backend-nest-js.vercel.app/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  const apis = {
    user: userApi(instance),
    post: postApi(instance),
    comment: commentApi(instance),
    sub: subscribeApi(instance),
  };

  return apis;
};
