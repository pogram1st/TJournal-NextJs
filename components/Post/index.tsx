import React from 'react';
import Link from 'next/link';
import { Button, Paper, Typography, IconButton } from '@material-ui/core';

import { Close as CloseIcon, Create as PenIcon } from '@material-ui/icons';

import styles from './Post.module.scss';
import { PostActions } from '../PostActions';
import { PostProps, ResponseCreateUser } from '../../utils/api/types';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import Router from 'next/router';
import { Api } from '../../utils/api/index';

interface ThisPostProps {
  item: PostProps;
  setPosts?: (prev: any) => any;
}

export const Post: React.FC<ThisPostProps> = ({ item, setPosts }) => {
  const userData: ResponseCreateUser = useAppSelector(selectUserData);

  const EditPost = () => {
    Router.push(`/write/${item.id}`);
  };

  const DeletePost = async () => {
    if (window.confirm('Вы действительно хотите удалить пост?')) {
      const data = await Api().post.delete(item.id);
      setPosts((prev) => prev.filter((obj) => obj.id !== item.id));
      console.log(data);
    }
  };

  const imagesPost = item.body.map((obj) => {
    if (obj.type === 'image') {
      return obj.data.url;
    }
  });
  return (
    <Paper elevation={0} className='p-40' classes={{ root: styles.paper }}>
      {item.user.id === userData.id && (
        <div className={`${styles.settingsPostIcon}`}>
          <IconButton onClick={EditPost} className='mr-10'>
            <PenIcon color='primary' />
          </IconButton>

          <IconButton onClick={DeletePost} className='mr-10'>
            <CloseIcon color='error' />
          </IconButton>
        </div>
      )}
      <Typography variant='h5' className={styles.title}>
        <Link href={`/news/${item.id}`}>
          <a>{item.title}</a>
        </Link>
      </Typography>
      <Typography className='mt-10 mb-15'>
        {(imagesPost[0] || imagesPost[1]) && (
          <img width={600} height={400} src={imagesPost[0] || imagesPost[1]} alt={imagesPost[0]} />
        )}
        <Typography dangerouslySetInnerHTML={{ __html: item.description }} />
      </Typography>
      <PostActions views={item.views} countComments={item.comments.length} />
    </Paper>
  );
};
