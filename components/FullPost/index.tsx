import { Button, Paper, Typography, Avatar } from '@material-ui/core';
import React from 'react';
import { PostActions } from '../PostActions';
import MessageIcon from '@material-ui/icons/TextsmsOutlined';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';
import {
  Close as CloseIcon,
  Create as PenIcon,
  NotificationsNoneOutlined as NotificationIcon,
} from '@material-ui/icons';

import Image from 'next/image';

import styles from './FullPost.module.scss';
import { PostProps, ResponseCreateUser } from '../../utils/api/types';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import Router from 'next/router';
import { Api } from '../../utils/api/index';
import Link from 'next/link';
import { subscribes } from '../../utils/subscribe';
import { setPosts } from '../../redux/slices/posts';
import Loading from '../Loading/Loading';

interface FullPostPage {
  post: PostProps;
}

export const FullPost: React.FC<FullPostPage> = ({ post }) => {
  const dispatch = useAppDispatch();
  const userData: ResponseCreateUser = useAppSelector(selectUserData);

  const [isLoading, setIsLoading] = React.useState(false);

  const isSubChannel = userData?.subscribe.find((el) => +el.channel.id === +post.user.id);

  const DeletePost = async () => {
    if (window.confirm('Вы действительно хотите удалить пост?')) {
      setIsLoading(true);
      const data = await Api().post.delete(post.id);
      Router.push('/');
      setIsLoading(false);
    }
  };

  const subscribe = async () => {
    subscribes(dispatch, isSubChannel, post.user, userData);
  };

  return (
    <Paper elevation={0} className={styles.paper}>
      <div className='container__full'>
        <Typography variant='h4' className={styles.title}>
          {post.title}
        </Typography>
        {isLoading && <Loading />}
        <div className={styles.text}>
          {post.body.map((obj) => {
            if (obj.type === 'image') {
              return <img key={obj.id} width={600} src={obj.data.url} alt='' />;
            }
            if (obj.type === 'paragraph') {
              return (
                <Typography dangerouslySetInnerHTML={{ __html: obj.data.text }} key={obj.id} />
              );
            }
          })}
          <div style={{ width: 250, marginLeft: -14 }}>
            <PostActions views={post.views} countComments={post.comments.length} />
          </div>
          <div className={`d-flex justify-between align-center mt-30 mb-30 ${styles.userBlock}`}>
            <div className={styles.userInfo}>
              <Link href={`/profile/${post.user.id}`}>
                <a>
                  <Avatar>{post.user.fullName[0]}</Avatar>
                  <b>{post.user.fullName}</b>
                </a>
              </Link>

              <span>+10</span>
            </div>
            {userData?.id !== post.user.id ? (
              <div className={`${styles.buttons}`}>
                <Button variant='contained' className='mr-15'>
                  <MessageIcon />
                </Button>
                {!isSubChannel ? (
                  <Button
                    onClick={userData ? subscribe : () => alert('Нужно авторизоваться!!!')}
                    className={`${styles.sunscribe_btn}`}
                    variant='contained'
                  >
                    <UserAddIcon />
                    <b className={`ml-10`}>Подписаться</b>
                  </Button>
                ) : (
                  <Button
                    onClick={subscribe}
                    variant='contained'
                    className={`${styles.sunscribe_btn} ${styles.sunscribe_btn__sub}`}
                  >
                    <NotificationIcon />
                    <b className={`ml-10`}>Вы подписаны</b>
                  </Button>
                )}
              </div>
            ) : (
              <div className={`${styles.settingsPostIcon}`}>
                <Button onClick={() => Router.push(`/write/${post.id}`)} className='mr-10'>
                  <PenIcon color='primary' />
                </Button>
                <Button onClick={DeletePost} className='mr-10'>
                  <CloseIcon color='error' />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
};
