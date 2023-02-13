import { AxiosInstance } from 'axios';

export const subscribeApi = (instance: AxiosInstance) => ({
  async subscribe(channelId: number) {
    const { data } = await instance.post(`/subscriptions/${channelId}`);
    return data;
  },
});
