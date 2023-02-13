import React from 'react';

import { MainLayout } from '../layouts/MainLayout';
import { Post } from '../components/Post/index';
import { Api } from '../utils/api/index';
import { NextPage } from 'next';
import { PostProps } from '../utils/api/types';
import { useAppSelector } from '../redux/hooks';
import { wrapper } from '../redux/store';
import { setPosts } from '../redux/slices/posts';
import { connect } from 'react-redux';

const Home: NextPage = () => {
  const posts = useAppSelector((state) => state.posts.data);
  return (
    <MainLayout>
      {posts.length > 0 && posts.map((obj) => <Post key={obj.id} item={obj} />)}
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    const data = await Api().post.getAllPosts();
    store.dispatch(setPosts(data));
    return { props: {} };
  } catch (err) {}
  return { props: {} };
});
export default connect((state) => state)(Home);
