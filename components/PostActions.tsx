import React, { CSSProperties } from 'react';
import { IconButton } from '@material-ui/core';
import {
  ModeCommentOutlined as CommentsIcon,
  RepeatOutlined as RepostIcon,
  BookmarkBorderOutlined as FavoriteIcon,
  ShareOutlined as ShareIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';

const styles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  top: '5',
  listStyle: 'none',
  padding: '0',
  margin: '0',
};

interface PostActionsProps {
  views?: number;
  countComments?: number;
}

export const PostActions: React.FC<PostActionsProps> = ({ views, countComments }) => {
  return (
    <ul className='align-center' style={styles}>
      <li className='d-flex'>
        <IconButton>
          <VisibilityIcon />
        </IconButton>
        <p>{views}</p>
      </li>
      <li className='d-flex'>
        <IconButton>
          <CommentsIcon />
        </IconButton>
        <p>{countComments}</p>
      </li>
      <li>
        <IconButton>
          <RepostIcon />
        </IconButton>
      </li>
      <li>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </li>
      <li>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </li>
    </ul>
  );
};
