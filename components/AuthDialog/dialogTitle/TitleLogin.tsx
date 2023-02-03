import React from 'react';

import styles from '../AuthDialog.module.scss';

type FormType = 'login' | 'register' | 'main';

interface TitleLoginProps {
  setFormType: (type: FormType) => void;
  formType: string;
}

export const TitleLogin: React.FC<TitleLoginProps> = ({ setFormType, formType }) => {
  return (
    <>
      <p className={styles.emailTitleBlock} onClick={() => setFormType('main')}>
        {formType === 'login' && (
          <img
            onClick={() => setFormType('main')}
            className={styles.back}
            width={16}
            height={16}
            src='../../static/img/arrow.png'
            alt='back'
          />
        )}
        Варианты входа
      </p>
      <p className={styles.titleForm}>Войти через почту</p>
    </>
  );
};
