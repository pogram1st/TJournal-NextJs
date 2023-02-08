import React from 'react';
import Link from 'next/link';
import { Paper, Typography } from '@material-ui/core';
import Image from 'next/image';

import styles from './Post.module.scss';
import { PostActions } from '../PostActions';
import { OutputData } from '@editorjs/editorjs';
import { PostProps } from '../../utils/api/types';

export const Post: React.FC<{ item: PostProps }> = ({ item }) => {
  const imagesPost = item.body.map((obj) => {
    if (obj.type === 'image') {
      return obj.data.url;
    }
  });
  return (
    <Paper elevation={0} className='p-20' classes={{ root: styles.paper }}>
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
