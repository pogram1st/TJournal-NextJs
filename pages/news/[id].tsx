import { MainLayout } from '../../layouts/MainLayout';
import { FullPost } from '../../components/FullPost';
import { Comment } from '../../components/Comment';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import { PostComments } from '../../components/PostComments';
import { useRouter } from 'next/dist/client/router';
import { Api } from '../../utils/api/index';
import { NextPage } from 'next';
import { PostProps } from '../../utils/api/types';

interface NextPageProps {
  post: PostProps;
}

const News: NextPage<NextPageProps> = ({ post }) => {
  return (
    <MainLayout className='mb-50' contentFullWidth>
      <FullPost post={post} />
      <PostComments postId={post.id} />
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const postId = ctx.params.id;
    const post = await Api(ctx).post.getOne(+postId);
    return {
      props: { post: post },
    };
  } catch (err) {
    console.log('WritePage', err);
    return {
      props: {},
    };
  }
};

export default News;
