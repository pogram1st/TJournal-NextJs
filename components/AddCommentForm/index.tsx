import { Input, Button } from '@material-ui/core';
import React from 'react';
import styles from './AddCommentForm.module.scss';
import { Api } from '../../utils/api/index';
import { commentItem } from '../../utils/api/types';

interface AddCommentForm {
  postId: number;
  addComment: (obj: commentItem) => void;
  isAuth: boolean;
}

export const AddCommentForm: React.FC<AddCommentForm> = ({ postId, addComment, isAuth }) => {
  const [numRows, setNumRows] = React.useState(1);
  const [valueInput, setValueInput] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onClickInput = () => {
    if (!isAuth) {
      alert('Для того чтобы оставить комментарий нужно быть авторизованным');
    }
  };

  const onAddComment = async () => {
    try {
      if (isAuth) {
        setLoading(true);
        const comment = await Api().comment.create({ postId, text: valueInput });
        addComment(comment);
        setValueInput('');
        setNumRows(1);
      }
    } catch (err) {
      alert('Произошла ошибка при попытке создания комментария, попробуйте позже');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <Input
        disabled={isLoading}
        onFocus={() => setNumRows(5)}
        className={''}
        value={valueInput}
        onClick={onClickInput}
        onChange={(e) => setValueInput(e.target.value)}
        classes={{ root: numRows === 1 ? styles.fieldRoot : styles.fieldRoot__big }}
        placeholder='Написать комментарий...'
        multiline
        fullWidth
        minRows={numRows}
      />

      {numRows === 5 && (
        <Button
          onClick={onAddComment}
          disabled={Boolean(!valueInput) || isLoading}
          className={styles.addButton}
          variant='contained'
          color='primary'
        >
          Опубликовать
        </Button>
      )}
    </div>
  );
};
