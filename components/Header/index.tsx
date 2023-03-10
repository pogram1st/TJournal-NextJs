import React from 'react';
import Link from 'next/link';
import { destroyCookie } from 'nookies';

import { Paper, Button, IconButton, Avatar, ListItem, List } from '@material-ui/core';
import {
  SearchOutlined as SearchIcon,
  CreateOutlined as PenIcon,
  SmsOutlined as MessageIcon,
  Menu as MenuIcon,
  ExpandMoreOutlined as ArrowBottom,
  NotificationsNoneOutlined as NotificationIcon,
  AccountCircle,
  Settings as SettingsIcon,
  FormatListBulletedOutlined as ListIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

import styles from './Header.module.scss';
import { AuthDialog } from '../AuthDialog';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logout, selectUserData, userReducer } from '../../redux/slices/user';
import { PostProps, ResponseCreateUser } from '../../utils/api/types';
import { Api } from '../../utils/api/index';

type FormType = 'login' | 'register' | 'main';

interface HeaderProps {
  setMenuHidden: (bool: boolean) => void;
  menuHidden: boolean;
}

export const Header: React.FC<HeaderProps> = ({ setMenuHidden, menuHidden }) => {
  const userData: ResponseCreateUser = useAppSelector(selectUserData);

  const dispatch = useAppDispatch();

  const [authVisible, setAuthVisible] = React.useState(false);

  const [valueInput, setValueInput] = React.useState('');

  const [searchResult, setSearchResult] = React.useState<PostProps[]>([]);

  const [formType, setFormType] = React.useState<FormType>('main');

  const [visibleUserMenu, setVisibleUserMenu] = React.useState(true);

  const popupRef = React.useRef();

  const handleOutsideClick = React.useCallback((e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(popupRef.current)) {
      setVisibleUserMenu(true);
    }
  }, []);

  const OpenAuthDialog = () => {
    setAuthVisible(true);
  };

  const CloseAuthDialog = () => {
    setAuthVisible(false);
    setFormType('main');
  };

  const onClickBurger = () => {
    setMenuHidden(!menuHidden);
  };

  const onClickLogout = () => {
    destroyCookie(null, 'authToken');
    dispatch(logout());
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
  React.useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
  }, []);
  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className='d-flex align-center'>
        <IconButton onClick={onClickBurger}>
          <MenuIcon />
        </IconButton>
        <Link href='/'>
          <a>
            <img height={35} className='mr-20' src='/static/img/logo.svg' alt='Logo' />
          </a>
        </Link>

        <div className={styles.searchBlock}>
          <SearchIcon />
          <input value={valueInput} onChange={handleChangeInput} placeholder='??????????' />
          {searchResult.length > 0 && valueInput && (
            <Paper className={styles.results__search}>
              <List>
                {searchResult.map((obj) => (
                  <Link key={obj.id} href={`/news/${obj.id}`}>
                    <a>
                      <ListItem button>{obj.title}</ListItem>
                    </a>
                  </Link>
                ))}
              </List>
            </Paper>
          )}
        </div>
        {userData && (
          <Link href='/write'>
            <a>
              <Button variant='contained' className={styles.penButton}>
                <PenIcon />
                <p>?????????? ????????????</p>
              </Button>
            </a>
          </Link>
        )}
      </div>
      <div className='d-flex align-center'>
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {userData ? (
          <>
            <div
              className={`cu-p d-flex align-center ${styles.popap_user}`}
              onClick={() => setVisibleUserMenu(!visibleUserMenu)}
              ref={popupRef}
            >
              <Avatar className={styles.avatar} alt='logo user'>
                {userData && userData.fullName[0]}
              </Avatar>
              <ArrowBottom />
              <div className={`${styles.popup} ${visibleUserMenu ? styles.popup__hidden : ''}`}>
                <ul>
                  <li className=''>
                    <Link href={`/profile/${userData.id}`}>
                      <a>
                        <Button variant='outlined'>
                          <AccountCircle />
                          ??????????????
                        </Button>
                      </a>
                    </Link>
                  </li>
                  <li className=''>
                    <Link href={`/follows`}>
                      <a>
                        <Button variant='outlined'>
                          <ListIcon />
                          ????????????????
                        </Button>
                      </a>
                    </Link>
                  </li>
                  <li className=''>
                    <Link href={`/profile/settings`}>
                      <a>
                        <Button variant='outlined'>
                          <SettingsIcon />
                          ??????????????????
                        </Button>
                      </a>
                    </Link>
                  </li>
                  <li className='' onClick={onClickLogout}>
                    <Button variant='outlined'>
                      <ExitToAppIcon />
                      ??????????
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          // </a>
          // </Link>
          <div onClick={OpenAuthDialog} className={styles.loginButton}>
            <img width={24} height={24} src='../../static/img/user.png' alt='' />
            <p>??????????</p>
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
