import { Button } from '@material-ui/core';
import React from 'react';
import styles from '../AuthDialog.module.scss';

type FormType = 'login' | 'register' | 'main';

interface MainProps {
  setFormType: (type: FormType) => void;
}

export const Main: React.FC<MainProps> = ({ setFormType }) => {
  return (
    <>
      <div className={styles.bigButtons}>
        <Button className='mb-15' variant='contained' fullWidth>
          <img width={24} height={24} src='../../static/img/vk.png' alt='' />
          ВКонтакте
        </Button>
        <Button className='mb-15' variant='contained' fullWidth>
          <img width={24} height={24} src='../../static/img/google.png' alt='' />
          Google
        </Button>
        <Button
          onClick={() => setFormType('login')}
          className='mb-15'
          variant='contained'
          fullWidth
        >
          <img width={24} height={24} src='../../static/img/email.png' alt='' />
          Через почту
        </Button>
      </div>
      <div className={styles.miniButton}>
        <Button className='mb-15' variant='contained'>
          <img width={24} height={24} src='../../static/img/facebook.png' alt='' />
        </Button>
        <Button className='mb-15' variant='contained'>
          <img width={24} height={24} src='../../static/img/twitter.png' alt='' />
        </Button>
        <Button className='mb-15' variant='contained'>
          <img width={24} height={24} src='../../static/img/apple-logo.png' alt='' />
        </Button>
      </div>
    </>
  );
};
