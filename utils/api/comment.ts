import { AxiosInstance } from 'axios';
import { commentItem } from './types';
import nc from 'next-connect';
import cors from 'cors';

type CreateCommentDto = {
  postId: number;
  text: string;
};

export type CommentByIdDto = {
  items: commentItem[];
};

export const commentApi = (instance: AxiosInstance) => ({
  async getAllComments(): Promise<commentItem[]> {
    const { data } = await instance.get<CreateCommentDto, { data: commentItem[] }>('/comments');
    return data;
  },
  async create(dto: CreateCommentDto): Promise<commentItem> {
    const { data } = await instance.post<CreateCommentDto, { data: commentItem }>('/comments', {
      postId: dto.postId,
      text: dto.text,
    });
    return data;
  },
  async delete(id: number) {
    const { data } = await instance.delete(`/comments/${id}`);
    return data;
  },
  async getCommentsByIdPost(postId: number) {
    const { data } = await instance.get<CommentByIdDto>(`/comments/post/${postId}`);
    return data;
  },
});
