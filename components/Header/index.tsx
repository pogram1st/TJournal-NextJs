import React from 'react';
import Link from 'next/link';

import { Paper, Button, IconButton, Avatar, ListItem, List } from '@material-ui/core';
import {
  SearchOutlined as SearchIcon,
  CreateOutlined as PenIcon,
  SmsOutlined as MessageIcon,
  Menu as MenuIcon,
  ExpandMoreOutlined as ArrowBottom,
  NotificationsNoneOutlined as NotificationIcon,
  AccountCircle,
} from '@material-ui/icons';

import styles from './Header.module.scss';
import { AuthDialog } from '../AuthDialog';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { PostProps } from '../../utils/api/types';
import { Api } from '../../utils/api/index';

type FormType = 'login' | 'register' | 'main';

export const Header: React.FC = () => {
  const userData = useAppSelector(selectUserData);

  const [authVisible, setAuthVisible] = React.useState(false);

  const [valueInput, setValueInput] = React.useState('');

  const [searchResult, setSearchResult] = React.useState<PostProps[]>([]);

  const [formType, setFormType] = React.useState<FormType>('main');

  const OpenAuthDialog = () => {
    setAuthVisible(true);
  };

  const CloseAuthDialog = () => {
    setAuthVisible(false);
    setFormType('main');
  };

  const handleChangeInput = async (e) => {
    setValueInput(e.target.value);
    try {
      const posts = await Api().post.search({ title: e.target.value });
      setSearchResult(posts.items);
    } catch (err) {
      console.warn(err);
    }
  };

  React.useEffect(() => {
    if (authVisible && userData) {
      CloseAuthDialog();
    }
  }, [authVisible, userData]);
  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className='d-flex align-center'>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link href='/'>
          <a>
            <img height={35} className='mr-20' src='/static/img/logo.svg' alt='Logo' />
          </a>
        </Link>

        <div className={styles.searchBlock}>
          <SearchIcon />
          <input value={valueInput} onChange={handleChangeInput} placeholder='Поиск' />
          {searchResult.length > 0 && valueInput && (
            <Paper className={styles.results__search}>
              <List>
                {searchResult.map((obj) => (
                  <Link key={obj.id} href={`/news/${obj.id}`}>
                    <ListItem button>{obj.title}</ListItem>
                  </Link>
                ))}
              </List>
            </Paper>
          )}
        </div>
        <Link href='/write'>
          <a>
            <Button variant='contained' className={styles.penButton}>
              Новая запись
            </Button>
          </a>
        </Link>
      </div>
      <div className='d-flex align-center'>
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {userData ? (
          <Link href='/profile/1'>
            <a className='d-flex align-center'>
              <Avatar
                className={styles.avatar}
                alt='Remy Sharp'
                src='https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/'
              />
              <ArrowBottom />
            </a>
          </Link>
        ) : (
          <div onClick={OpenAuthDialog} className={styles.loginButton}>
            <img width={24} height={24} src='../../static/img/user.png' alt='' />
            <p>Войти</p>
          </div>
        )}
      </div>
      <AuthDialog
        onClose={CloseAuthDialog}
        open={authVisible}
        formType={formType}
        setFormType={setFormType}
      />
    </Paper>
  );
};
