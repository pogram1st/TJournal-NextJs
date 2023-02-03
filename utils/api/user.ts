import axios, { AxiosInstance } from 'axios';
import { CreateUserDto, LoginDto, ResponseCreateUser } from './types';

export const userApi = (instance: AxiosInstance) => ({
  async register(dto: CreateUserDto): Promise<ResponseCreateUser> {
    const { data } = await instance.post<CreateUserDto, { data: ResponseCreateUser }>(
      '/auth/register',
      dto,
    );
    return data;
  },
  async login(dto: LoginDto): Promise<ResponseCreateUser> {
    const { data } = await instance.post<LoginDto, { data: ResponseCreateUser }>(
      '/auth/login',
      dto,
    );
    return data;
  },
  async getMe(): Promise<ResponseCreateUser> {
    const { data } = await instance.get<ResponseCreateUser>('/users/me');
    return data;
  },
});
