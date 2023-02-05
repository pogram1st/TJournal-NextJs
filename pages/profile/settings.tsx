import React from 'react';
import { Button, Divider, Paper, TextField, Typography } from '@material-ui/core';
import { MainLayout } from '../../layouts/MainLayout';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';

export default function Settings() {
  const userData = useAppSelector(selectUserData);
  const [userSettings, setUserSettings] = React.useState({
    fullName: userData?.fullName,
    email: userData?.email,
  });
  return (
    <MainLayout hideComments>
      <Paper className='p-20' elevation={0}>
        <Typography variant='h6'>Основные настройки</Typography>
        <Divider className='mt-20 mb-30' />
        <form>
          <TextField
            className='mb-20'
            size='small'
            label='Никнейм'
            variant='outlined'
            value={userSettings.fullName}
            onChange={(e) => setUserSettings((prev) => ({ ...prev, fullName: e.target.value }))}
            fullWidth
            required
          />
          <TextField
            className='mb-20'
            size='small'
            label='Эл. почта'
            variant='outlined'
            value={userSettings.email}
            onChange={(e) => setUserSettings((prev) => ({ ...prev, email: e.target.value }))}
            fullWidth
            required
          />
          <TextField size='small' label='Пароль' variant='outlined' fullWidth required />
          <Divider className='mt-30 mb-20' />
          <Button color='primary' variant='contained'>
            Сохранить изменения
          </Button>
        </form>
      </Paper>
    </MainLayout>
  );
}
