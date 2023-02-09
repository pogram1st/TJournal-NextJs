import React from 'react';
import dynamic from 'next/dynamic';
import { Button, Input } from '@material-ui/core';

import styles from './WriteForm.module.scss';
import { Api } from '../../utils/api/index';
import { useRouter } from 'next/dist/client/router';
import { PostProps } from '../../utils/api/types';
import Loading from '../Loading/Loading';

const Editor = dynamic(() => import('../Editor').then((m) => m.Editor), { ssr: false });

interface WriteForm {
  data?: PostProps;
}

export const WriteForm: React.FC<WriteForm> = ({ data }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState(data?.title || '');
  const [blocks, setBlocks] = React.useState(data?.body || []);
  const router = useRouter();

  const onAddPost = async () => {
    try {
      setIsLoading(true);
      const obj = {
        title,
        body: blocks,
        tags: '',
      };
      if (!data) {
        const post = await Api().post.create(obj);
        router.push(`/news/${post.id}`);
      } else {
        if (window.confirm('Вы действительно хотите изменить пост?')) {
          const post = await Api().post.update(data.id, obj);
          router.push(`/news/${data.id}`);
        }
      }
    } catch (err) {
      console.log(err);
      alert('Ошибка при создании статьи');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.writer__block}>
      <div className={styles.editor__block}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          classes={{ root: styles.titleField }}
          placeholder='Заголовок'
        />
        <div className={styles.editor}>
          <Editor initialBlocks={data?.body || []} onChange={(arr) => setBlocks(arr)} />
        </div>
      </div>
      {isLoading && <Loading />}

      <Button
        disabled={isLoading || (!blocks.length && !title.length)}
        className={styles.button}
        onClick={() => onAddPost()}
        variant='contained'
        color='primary'
      >
        {data ? 'Изменить' : 'Опубликовать'}
      </Button>
    </div>
  );
};
