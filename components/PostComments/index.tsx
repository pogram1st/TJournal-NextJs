import React from 'react';
import { Typography, Tabs, Tab, Divider, Paper } from '@material-ui/core';
import { Comment } from '../Comment';
import { AddCommentForm } from '../AddCommentForm';

import { Api } from '../../utils/api/index';
import { commentItem } from '../../utils/api/types';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';

interface PostCommentsProps {
  postId: number;
}

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [comments, setComments] = React.useState<commentItem[]>([]);
  const userData = useAppSelector(selectUserData);

  React.useEffect(() => {
    (async () => {
      const comm = await Api().comment.getCommentsByIdPost(postId);
      if (comm.items[0] != null && comm.items.length > 0) {
        setComments(comm.items);
      }
    })();
  }, []);

  const addComment = (obj: commentItem) => {
    setComments((prev) => [obj, ...prev]);
  };
  const onRemoveComment = (id) => {
    setComments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Paper elevation={0} className='mt-40 p-30'>
      <div className='container'>
        <Typography variant='h6' className='mb-20'>
          {comments?.length > 0
            ? comments?.length + ' комментария'
            : 'Комментариев нет, будьте первыми'}
        </Typography>
        <Tabs className='mt-20' value={activeTab} indicatorColor='primary' textColor='primary'>
          <Tab onClick={() => setActiveTab(0)} label='Новые' />
          <Tab onClick={() => setActiveTab(1)} label='Популярные' />
        </Tabs>
        <Divider />
        {userData && <AddCommentForm isAuth={!!userData} addComment={addComment} postId={postId} />}
        <div className='mb-20' />
        {comments?.length > 0 &&
          comments.map((obj) => (
            <Comment
              key={obj.text + obj.id}
              onRemoveComment={onRemoveComment}
              obj={obj}
              currentUserId={userData}
            />
          ))}
      </div>
    </Paper>
  );
};
