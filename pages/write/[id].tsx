import { NextPage } from 'next';
import React from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { WriteForm } from '../../components/WriteForm';
import { Api } from '../../utils/api/index';
import { PostProps } from '../../utils/api/types';

interface WritePageProps {
  post: PostProps;
}

const WritePage: NextPage<WritePageProps> = ({ post }) => {
  return (
    <MainLayout hideComments hideMenu className='main-layout-white'>
      <WriteForm data={post} />
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const postId = ctx.params.id;
    const post = await Api(ctx).post.getOne(+postId);
    const user = await Api(ctx).user.getMe();

    console.log(post, 'POST');
    console.log(user, 'USERKA');

    if (post.user.id !== user?.id) {
      return {
        props: {},
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return {
      props: { post: post },
    };
  } catch (err) {
    console.log('WritePage', err);
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default WritePage;
