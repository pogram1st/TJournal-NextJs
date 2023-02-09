import { Button, Paper, Typography, Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import { PostActions } from '../PostActions';
import MessageIcon from '@material-ui/icons/TextsmsOutlined';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';
import { Close as CloseIcon, Create as PenIcon } from '@material-ui/icons';

import Image from 'next/image';

import styles from './FullPost.module.scss';
import { PostProps, ResponseCreateUser } from '../../utils/api/types';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import Router from 'next/router';
import { Api } from '../../utils/api/index';

interface FullPostPage {
  post: PostProps;
}

export const FullPost: React.FC<FullPostPage> = ({ post }) => {
  const userData: ResponseCreateUser = useAppSelector(selectUserData);

  const EditPost = () => {
    Router.push(`/write/${post.id}`);
  };

  const DeletePost = async () => {
    if (window.confirm('Вы действительно хотите удалить пост?')) {
      const data = await Api().post.delete(post.id);
      console.log(data);
    }
  };

  return (
    <Paper elevation={0} className={styles.paper}>
      <div className='container__full'>
        <Typography variant='h4' className={styles.title}>
          {post.title}
        </Typography>
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
              <Avatar>{post.user.fullName[0]}</Avatar>
              <b>{post.user.fullName}</b>
              <span>+1685</span>
            </div>
            {userData.id !== post.user.id ? (
              <div>
                <Button variant='contained' className='mr-15'>
                  <MessageIcon />
                </Button>
                <Button className={`${styles.sunscribe_btn}`} variant='contained'>
                  <UserAddIcon />
                  <b className={`ml-10`}>Подписаться</b>
                </Button>
              </div>
            ) : (
              <div className={`${styles.settingsPostIcon}`}>
                <Button onClick={EditPost} className='mr-10'>
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
