import React from 'react';
import Router from 'next/router';
import { Button, Divider, Paper, Typography } from '@material-ui/core';
import { MainLayout } from '../../layouts/MainLayout';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logout, selectUserData } from '../../redux/slices/user';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserSchema } from '../../utils/schemas/updateUser';
import { FormField } from '../../components/FormField';
import { Api } from '../../utils/api/index';
import { Alert } from '@material-ui/lab';
import { destroyCookie } from 'nookies';
import Loading from '../../components/Loading/Loading';

export default function Settings() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const [userSettings, setUserSettings] = React.useState({
    fullName: userData?.fullName,
    email: userData?.email,
  });
  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      fullName: userSettings.fullName || '',
      email: userSettings.email || '',
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const [errorMessage, setErrorMesage] = React.useState<string>('');
  const [okMessage, setOkMessage] = React.useState('');

  const onSubmit = async (dto) => {
    setIsLoading(true);
    const data = await Api().user.updateUser(dto);

    if (data.message) {
      setErrorMesage(data.message);
      return;
    }
    if (userSettings.email !== dto.email) {
      alert('Вы изменили E-mail, поэтому придется перезайти в аккаунт');
      dispatch(logout());
      destroyCookie(null, 'authToken');
      Router.push('/');
    }
    setOkMessage('Данные о пользователе успешно изменены !');
    setIsLoading(false);
  };
  return (
    <MainLayout hideComments>
      <Paper className='p-20' elevation={0}>
        <Typography variant='h6'>Основные настройки</Typography>
        <Divider className='mt-20 mb-30' />
        <FormProvider {...form}>
          {errorMessage && (
            <Alert className='mb-30' severity='error'>
              {errorMessage}
            </Alert>
          )}
          {okMessage && (
            <Alert className='mb-30' severity='success'>
              {okMessage}
            </Alert>
          )}
          {isLoading && <Loading />}

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField name='fullName' label='Полное имя' />
            <FormField name='email' label='E-mail' />
            <FormField name='password' label='Пароль' />
            <FormField name='newPassword' label='Новый пароль' />
            <Divider className='mt-30 mb-20' />
            <Button
              disabled={form.formState.isSubmitting}
              color='primary'
              variant='contained'
              type='submit'
            >
              Сохранить изменения
            </Button>
          </form>
        </FormProvider>
      </Paper>
    </MainLayout>
  );
}
