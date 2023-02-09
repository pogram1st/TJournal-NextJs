import React from 'react';

import { MainLayout } from '../layouts/MainLayout';
import { Post } from '../components/Post/index';
import { Api } from '../utils/api/index';
import { NextPage } from 'next';
import { PostProps } from '../utils/api/types';

interface HomeProps {
  posts: { data: PostProps[] };
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const [homePosts, setHomePosts] = React.useState(posts.data);
  return (
    <MainLayout>
      {homePosts.length > 0 &&
        homePosts.map((obj) => <Post key={obj.id} item={obj} setPosts={setHomePosts} />)}
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const data = await Api().post.getAllPosts();
    return { props: { posts: { data } } };
  } catch (err) {}
  return { props: { posts: null } };
};

export default Home;
