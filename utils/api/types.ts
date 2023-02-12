import { OutputData } from '@editorjs/editorjs';
export type CreateUserDto = {
  fullName: string;
  password: string;
  email: string;
};

export type LoginDto = {
  password: string;
  email: string;
};

export type ResponseCreateUser = {
  createdAt: string;
  email: string;
  fullName: string;
  id: number;
  updatedAt: string;
  subscriptions: any[];
  subscribe: any[];
};

export type ResponseCreateUserApi = {
  access_token: string;
  user: {
    createdAt: string;
    email: string;
    fullName: string;
    id: number;
    updatedAt: string;
  };
};

export type PostProps = {
  id: number;
  title: string;
  body: OutputData['blocks'];
  description: string;
  tags: string;
  views: number;
  user: ResponseCreateUser;
  comments: [];
  createdAt: string;
  updatedAt: string;
};

export type commentItem = {
  id: number;
  text: string;
  post: PostProps;
  user: ResponseCreateUser;
  createdAt: string;
  updatedAt: string;
};
