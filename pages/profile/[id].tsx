import Link from 'next/link';
import React from 'react';
import { Paper, Avatar, Typography, Button, Tabs, Tab } from '@material-ui/core';
import {
  SettingsOutlined as SettingsIcon,
  TextsmsOutlined as MessageIcon,
} from '@material-ui/icons';

import { Comment } from '../../components/Comment';
import { Post } from '../../components/Post';
import { MainLayout } from '../../layouts/MainLayout';
import { Api } from '../../utils/api/index';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';

function Profile({ postsUser, userData, commentsUser }) {
  const [activeTab, setActiveTab] = React.useState(0);
  const me = useAppSelector(selectUserData);
  const [posts, setPosts] = React.useState(postsUser.data);
  const [comments, setComments] = React.useState(commentsUser);
  const onRemoveComment = (id) => {
    setComments((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <MainLayout contentFullWidth hideComments>
      <Paper className='pl-20 pr-20 pt-20 mb-30 profile' elevation={0}>
        <div className='d-flex justify-between'>
          <div>
            <Avatar style={{ width: 120, height: 120, borderRadius: 6 }}>
              {userData.user.fullName[0]}
            </Avatar>
            <Typography style={{ fontWeight: 'bold' }} className='mt-10' variant='h4'>
              {userData.user.fullName}
            </Typography>
          </div>
          <div>
            {+me?.id === +userData.user.id ? (
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
              <Button style={{ height: 42 }} variant='contained' color='primary'>
                <MessageIcon className='mr-10' />
                Написать
              </Button>
            )}
            {}
          </div>
        </div>
        <div className='d-flex mb-10 mt-10'>
          <Typography style={{ fontWeight: 'bold', color: '#35AB66' }} className='mr-15'>
            +{userData.user.subscriptions.length}
          </Typography>
          <Typography>
            {userData.user.subscriptions.length
              ? `${userData.user.subscriptions.length} подписчик`
              : 'Пока нет подписчиков'}
          </Typography>
        </div>
        <Typography>На проекте с {userData.user.createdAt.slice(0, 10)}</Typography>

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
              posts.map((obj) => <Post key={obj.id} setPosts={setPosts} item={obj} />)
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
            {userData.user.subscriptions.length ? (
              userData.user.subscriptions.map((item) => {
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
}

export const getServerSideProps = async (ctx) => {
  try {
    const data = await Api().post.getPostsUser(ctx.query.id);
    const user = await Api().user.getUserById(ctx.query.id);
    const comments = await Api().comment.getAllCommentsUser(ctx.query.id);
    return { props: { postsUser: { data }, userData: { user }, commentsUser: comments } };
  } catch (err) {}
  return { props: { postsUser: null } };
};

export default Profile;
