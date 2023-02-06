import { Button, Paper, Typography, Avatar } from '@material-ui/core';
import React from 'react';
import { PostActions } from '../PostActions';
import MessageIcon from '@material-ui/icons/TextsmsOutlined';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';
import Image from 'next/image';

import styles from './FullPost.module.scss';
import { PostProps } from '../../utils/api/types';

interface FullPostPage {
  post: PostProps;
}

export const FullPost: React.FC<FullPostPage> = ({ post }) => {
  return (
    <Paper elevation={0} className={styles.paper}>
      <div className='container'>
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
            <PostActions />
          </div>
          <div className={`d-flex justify-between align-center mt-30 mb-30 ${styles.userBlock}`}>
            <div className={styles.userInfo}>
              <Avatar>{post.user.fullName[0]}</Avatar>
              <b>{post.user.fullName}</b>
              <span>+1685</span>
            </div>
            <div>
              <Button variant='contained' className='mr-15'>
                <MessageIcon />
              </Button>
              <Button className={`${styles.sunscribe_btn}`} variant='contained'>
                <UserAddIcon />
                <b className={`ml-10`}>Подписаться</b>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};
