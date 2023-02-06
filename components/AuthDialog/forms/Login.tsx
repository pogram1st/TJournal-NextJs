import { Button, Divider, TextField } from '@material-ui/core';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@material-ui/lab/Alert';

import styles from '../AuthDialog.module.scss';
import * as yup from 'yup';
import { LoginFormSchema } from '../../../utils/schemas/loginValidation';
import { FormField } from '../../FormField';
import { userApi } from '../../../utils/api/user';
import { CreateUserDto } from '../../../utils/api/types';
import { setCookie } from 'nookies';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';
import { Api } from '../../../utils/api';
import { useRouter } from 'next/dist/client/router';

type FormType = 'login' | 'register' | 'main';

interface LoginProps {
  setFormType: (formType: FormType) => void;
}

export const Login: React.FC<LoginProps> = ({ setFormType }) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [errorMessage, setErrorMessage] = React.useState('');

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await Api().user.login(dto);
      if (data.access_token) {
        setCookie(null, 'authToken', data.access_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
      }
      setErrorMessage('');
      dispatch(setUserData(data.user));
      router.push(router.asPath);
    } catch (err) {
      if (err?.response.data.message === 'Неверный логин / пароль') {
        setErrorMessage(err.response.data.message);
        return;
      }
      setErrorMessage('Ошибка при авторизации попробуйте позже');
      console.warn('Register err', err);
    }
  };

  React.useEffect(() => {
    setErrorMessage('');
  }, []);

  return (
    <FormProvider {...form}>
      <p className={styles.regText}>
        или <b onClick={() => setFormType('register')}>зарегистрироваться</b>
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {errorMessage && (
          <Alert className='mb-10' severity='error'>
            {errorMessage}
          </Alert>
        )}

        <FormField name='email' label='E-mail' />
        <FormField name='password' label='Пароль' />
        <Button
          disabled={form.formState.isSubmitting}
          type='submit'
          color='primary'
          variant='contained'
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
