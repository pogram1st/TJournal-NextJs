import React from 'react';
import Link from 'next/link';
import { Typography, IconButton, MenuItem, Menu, Avatar } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import { ResponseCreateUser, PostProps, commentItem } from '../../utils/api/types';
import { Api } from '../../utils/api/index';

interface CommentPostProps {
  obj: {
    id: number;
    text: string;
    createdAt: string;
    updatedAt: string;
    user: ResponseCreateUser;
    post: PostProps;
  };
  currentUserId: ResponseCreateUser;
  onRemoveComment: (id: number) => void;
}

export const Comment: React.FC<CommentPostProps> = ({ obj, currentUserId, onRemoveComment }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickRemove = async () => {
    try {
      if (window.confirm('Вы действительно хотите удалить коментарий?')) {
        await Api().comment.delete(obj.id);
        onRemoveComment(obj.id);
      }
    } catch (err) {
      alert('Произошла ошибка при удалении комментария');

      console.log(err);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <div className={styles.comment}>
        <div className={styles.userInfo}>
          <Link href={`/profile/${obj.user.id}`}>
            <a>
              <Avatar className={'mr-10'}>{obj?.user.fullName[0]}</Avatar>
              <b>{obj?.user.fullName}</b>
            </a>
          </Link>
          <span>{obj?.createdAt.replace('T', ' ').slice(0, 19)}</span>
        </div>
        <Typography className={styles.text}>{obj.text}</Typography>

        {currentUserId && <span className={styles.replyBtn}>Ответить</span>}

        {currentUserId?.id == obj.user.id && (
          <>
            <>
              <IconButton onClick={handleClick}>
                <MoreIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                elevation={2}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
              >
                <MenuItem onClick={handleClickRemove}>Удалить</MenuItem>
                <MenuItem onClick={handleClose}>Редактировать</MenuItem>
              </Menu>
            </>
          </>
        )}
      </div>
    </>
  );
};
