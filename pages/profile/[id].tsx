import Link from 'next/link';
import React from 'react';
import { Paper, Avatar, Typography, Button, Tabs, Tab } from '@material-ui/core';

import {
  PersonAddOutlined as UserAddIcon,
  NotificationsNoneOutlined as NotificationIcon,
  SettingsOutlined as SettingsIcon,
  TextsmsOutlined as MessageIcon,
} from '@material-ui/icons';

import { Comment } from '../../components/Comment';
import { Post } from '../../components/Post';
import { MainLayout } from '../../layouts/MainLayout';
import { Api } from '../../utils/api/index';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { ResponseCreateUser, commentItem, PostProps } from '../../utils/api/types';
import { subscribes } from '../../utils/subscribe';

interface ProfileProps {
  postsUser: PostProps[];
  userData: ResponseCreateUser;
  commentsUser: commentItem[];
}

const Profile: React.FC<ProfileProps> = ({ postsUser, userData, commentsUser }) => {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = React.useState(0);
  const me: ResponseCreateUser = useAppSelector(selectUserData);
  const isSubChannel = me?.subscribe.find((el) => +el.channel.id === +userData.id);
  const [posts, setPosts] = React.useState(postsUser);
  const [comments, setComments] = React.useState(commentsUser);

  const onRemoveComment = (id) => {
    setComments((prev) => prev.filter((item) => item.id !== id));
  };

  const subscribe = async () => {
    subscribes(dispatch, isSubChannel, userData, me);
  };

  return (
    <MainLayout contentFullWidth hideComments>
      <Paper className='pl-20 pr-20 pt-20 mb-30 profile' elevation={0}>
        <div className='d-flex justify-between'>
          <div>
            <Avatar style={{ width: 120, height: 120, borderRadius: 6 }}>
              {userData.fullName[0]}
            </Avatar>
            <Typography style={{ fontWeight: 'bold' }} className='mt-10' variant='h4'>
              {userData.fullName}
            </Typography>
          </div>
          <div className='buttons'>
            {+me?.id === +userData.id ? (
              <Link href='/profile/settings'>
                <a>
                  <Button
                    style={{ height: 42, minWidth: 45, width: 45, marginRight: 10 }}
                    variant='contained'
                  >
                    <SettingsIcon />
                  </Button>
                </a>
              </Link>
            ) : (
              <Button className='sunscribe_btn' variant='contained' color='primary'>
                <MessageIcon />
                <b className='ml-10'>Написать</b>
              </Button>
            )}

            {+me?.id !== +userData.id ? (
              !isSubChannel ? (
                <Button
                  onClick={me ? subscribe : () => alert('Нужно авторизоваться!!!')}
                  className={`sunscribe_btn ml-10`}
                  variant='contained'
                >
                  <UserAddIcon />
                  <b className={`ml-10`}>Подписаться</b>
                </Button>
              ) : (
                <Button
                  className='sunscribe_btn'
                  onClick={subscribe}
                  variant='contained'
                  color='primary'
                >
                  <NotificationIcon />
                  <b className={`ml-10`}>Вы подписаны</b>
                </Button>
              )
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='d-flex mb-10 mt-10'>
          <Typography style={{ fontWeight: 'bold', color: '#35AB66' }} className='mr-15'>
            +{userData.subscriptions.length}
          </Typography>
          <Typography>
            {userData.subscriptions.length
              ? `${userData.subscriptions.length} подписчик`
              : 'Пока нет подписчиков'}
          </Typography>
        </div>
        <Typography>На проекте с {userData.createdAt.slice(0, 10)}</Typography>

        <Tabs
          className='mt-20 tabs__profile'
          value={activeTab}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab onClick={() => setActiveTab(0)} label='Статьи' className='tabs__profile' />
          <Tab onClick={() => setActiveTab(1)} label='Комментарии' className='tabs__profile' />
          <Tab onClick={() => setActiveTab(2)} label='Закладки' className='tabs__profile' />
        </Tabs>
      </Paper>

      <div className='d-flex align-start'>
        {activeTab === 0 && (
          <div className='flex container__post'>
            {posts.length > 0 ? (
              posts.map((obj) => <Post key={obj.id} item={obj} />)
            ) : (
              <h1 className='no_posts'>Постов нет</h1>
            )}
          </div>
        )}
        {activeTab === 1 && (
          <div className='flex container__post'>
            {comments &&
              (comments.length > 0 ? (
                comments.map((obj) => (
                  <Comment
                    key={obj.id}
                    obj={obj}
                    currentUserId={me}
                    onRemoveComment={onRemoveComment}
                  />
                ))
              ) : (
                <h1 className='no_posts'>Постов нет</h1>
              ))}
          </div>
        )}
        {activeTab === 2 && <div className='flex container__post'></div>}
        <Paper style={{ width: 300 }} className='p-20 mb-20 subscribers' elevation={0}>
          <b>Подписчики</b>
          <div className='d-flex mt-15'>
            {userData.subscriptions.length ? (
              userData.subscriptions.map((item) => {
                return (
                  <Link key={item.id} href={`/profile/${item.subscriber?.id}`}>
                    <a>
                      <Avatar className='mr-10'>{item.subscriber.fullName[0]}</Avatar>
                    </a>
                  </Link>
                );
              })
            ) : (
              <b>Подписчиков пока нет =(</b>
            )}
          </div>
        </Paper>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const data = await Api().post.getPostsUser(ctx.query.id);
    const user = await Api().user.getUserById(ctx.query.id);
    const comments = await Api().comment.getAllCommentsUser(ctx.query.id);
    return { props: { postsUser: data, userData: user, commentsUser: comments } };
  } catch (err) {}
  return { props: { postsUser: null } };
};

export default Profile;
