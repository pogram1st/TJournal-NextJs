import React from 'react';

import styles from '../AuthDialog.module.scss';

type FormType = 'login' | 'register' | 'main';

interface TitleRegisterProps {
  setFormType: (type: FormType) => void;
  formType: string;
}

export const TitleRegister: React.FC<TitleRegisterProps> = ({ setFormType, formType }) => {
  return (
    <>
      <p className={styles.emailTitleBlock} onClick={() => setFormType('login')}>
        {formType === 'register' && (
          <img
            onClick={() => setFormType('login')}
            className={styles.back}
            width={16}
            height={16}
            src='../../static/img/arrow.png'
            alt='back'
          />
        )}
        К авторизации
      </p>
      <p className={styles.titleForm}>Создание аккаунта</p>
    </>
  );
};
