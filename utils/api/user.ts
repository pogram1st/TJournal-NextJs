import axios, { AxiosInstance } from 'axios';
import { CreateUserDto, LoginDto, ResponseCreateUser, ResponseCreateUserApi } from './types';

export const userApi = (instance: AxiosInstance) => ({
  async register(dto: CreateUserDto): Promise<ResponseCreateUser> {
    const { data } = await instance.post<CreateUserDto, { data: ResponseCreateUser }>(
      '/auth/register',
      dto,
    );
    return data;
  },
  async login(dto: LoginDto): Promise<ResponseCreateUserApi> {
    const { data } = await instance.post<LoginDto, { data: ResponseCreateUserApi }>(
      '/auth/login',
      dto,
    );
    return data;
  },
  async getMe(): Promise<ResponseCreateUser> {
    const { data } = await instance.get<ResponseCreateUser>('/users/me');
    return data;
  },
  async getUserById(id: number): Promise<ResponseCreateUser> {
    const { data } = await instance.get<ResponseCreateUser>(`/users/${id}`);
    return data;
  },
});
