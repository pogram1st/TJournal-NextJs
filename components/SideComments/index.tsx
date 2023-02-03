import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import CommentItem from './CommentItem';

import styles from './SideComments.module.scss';
import { Api } from '../../utils/api/index';
import { commentItem } from '../../utils/api/types';

export const SideComments = () => {
  const [hideComments, setHideComments] = React.useState(false);

  const [allComments, setAllComments] = React.useState<commentItem[]>([]);

  console.log(allComments);

  const toggleVisibleComments = () => {
    setHideComments((prev) => !prev);
  };

  React.useEffect(() => {
    (async () => {
      const comments = await Api().comment.getAllComments();
      setAllComments(comments);
    })();
  }, []);

  return (
    <div className={hideComments ? `${styles.root} ${styles.rotated}` : `${styles.root}`}>
      <h3 onClick={toggleVisibleComments}>
        Комментарии <ArrowRightIcon />
      </h3>
      {!hideComments &&
        allComments &&
        allComments.map((obj) => <CommentItem key={obj.id} {...obj} />)}
    </div>
  );
};
