import React from 'react';
import { setCookie } from 'nookies';
import { Button, Divider, TextField } from '@material-ui/core';
import { FormField } from '../../FormField';
import Alert from '@material-ui/lab/Alert';

import styles from '../AuthDialog.module.scss';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormSchema } from '../../../utils/schemas/registerValidation';
import { userApi } from '../../../utils/api/user';
import { CreateUserDto } from '../../../utils/api/types';
import { Api } from '../../../utils/api';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';

type FormType = 'login' | 'register' | 'main';

interface RegisterProps {
  setFormType: (formType: FormType) => void;
}

export const Register: React.FC<RegisterProps> = ({ setFormType }) => {
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = React.useState('');
  const [okMessage, setOkMessage] = React.useState('');

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });
  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await Api().user.register(dto);
      setOkMessage('Вы успешно зарегестрировались!');
      setErrorMessage('');
    } catch (err) {
      if (err?.response.data.message === 'Пользователь с такой почтой уже сущевствует') {
        setErrorMessage(err.response.data.message);
        return;
      }
      setErrorMessage('Ошибка при регистрации');
      console.warn('Register err', err);
    }
  };
  React.useEffect(() => {
    setErrorMessage('');
  }, []);
  return (
    <FormProvider {...form}>
      <p className={styles.regText}>
        или <b onClick={() => setFormType('login')}>войти в аккаунт</b>
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {errorMessage && (
          <Alert className='mb-10' severity='error'>
            {errorMessage}
          </Alert>
        )}
        {okMessage && (
          <Alert className='mb-10' severity='success'>
            {okMessage}
          </Alert>
        )}
        <FormField name='fullName' label='Имя и фамилия' />
        <FormField name='email' label='E-mail' />
        <FormField name='password' label='Пароль' />
        <Button
          disabled={form.formState.isSubmitting}
          type='submit'
          color='primary'
          variant='contained'
        >
          Зарегестрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
