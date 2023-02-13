import { setUserData } from '../redux/slices/user';
import { Api } from './api/index';
import { ResponseCreateUser } from './api/types';

export const subscribes = async (
  dispatch,
  isSubChannel: boolean,
  userData: ResponseCreateUser,
  me: ResponseCreateUser,
) => {
  if (isSubChannel) {
    if (window.confirm('Вы действительно хотите отписаться?')) {
      Api().sub.subscribe(+userData.id);
      const unSub = me.subscribe.filter((item) => +item.channel.id !== +userData.id);
      dispatch(setUserData({ ...me, subscribe: unSub }));
    }
  } else {
    Api().sub.subscribe(+userData.id);
    dispatch(
      setUserData({
        ...me,
        subscribe: [
          ...me.subscribe,
          { id: new Date().getTime(), channel: { id: userData.id }, subscriber: { id: me.id } },
        ],
      }),
    );
  }
};
