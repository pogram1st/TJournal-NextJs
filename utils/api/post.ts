import { OutputData } from '@editorjs/editorjs';
import axios, { AxiosInstance } from 'axios';
import { PostProps } from './types';

type CreatePostDto = {
  title: string;
  body: OutputData['blocks'];
  tags: string;
};

export type SearchPostDto = {
  title?: string;

  body?: string;

  views?: 'DESK' | 'ASK';

  limit?: number;

  take?: number;

  tag?: string;
};

export const postApi = (instance: AxiosInstance) => ({
  async getAllPosts() {
    const { data } = await instance.get('/posts');
    return data;
  },
  async create(dto: CreatePostDto): Promise<PostProps> {
    const { data } = await instance.post<PostProps>('/posts', dto);
    return data;
  },
  async getOne(id: number): Promise<PostProps> {
    const { data } = await instance.get<PostProps>(`/posts/${id}`);
    return data;
  },

  async update(id: number, dto: CreatePostDto) {
    const { data } = await instance.patch(`/posts/${id}`, dto);
    return data;
  },
  async search(query: SearchPostDto) {
    const { data } = await instance.get(`/posts/search`, { params: query });
    return data;
  },
});
