import React from 'react';
import { Dialog, DialogContent, DialogContentText, Typography } from '@material-ui/core';

import styles from './AuthDialog.module.scss';
import { Main } from './forms/Main';
import { Login } from './forms/Login';
import { Register } from './forms/Register';
import { TitleLogin } from './dialogTitle/TitleLogin';
import { TitleRegister } from './dialogTitle/TitleRegister';

type FormType = 'login' | 'register' | 'main';

interface AuthDialogProps {
  onClose: () => void;
  open: boolean;
  formType: string;
  setFormType: (formType: FormType) => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, open, formType, setFormType }) => {
  return (
    <Dialog
      className={styles.root}
      open={open}
      onClose={onClose}
      aria-labelledby='responsive-dialog-title'
      fullWidth
      maxWidth='xs'
    >
      <DialogContent>
        <DialogContentText>
          <img
            onClick={onClose}
            className={styles.closeImg}
            width={16}
            height={16}
            src='../../static/img/close.png'
            alt='close'
          />

          <Typography className={styles.title}>
            {formType === 'main' && <p className={styles.signInText}>Вход в TJ</p>}
            {formType === 'login' && <TitleLogin setFormType={setFormType} formType={formType} />}
            {formType === 'register' && (
              <TitleRegister setFormType={setFormType} formType={formType} />
            )}
          </Typography>
          <div className={styles.content}>
            {formType === 'main' && <Main setFormType={setFormType} />}
            {formType === 'login' && <Login setFormType={setFormType} />}
            {formType === 'register' && <Register setFormType={setFormType} />}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
