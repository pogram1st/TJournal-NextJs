import React from 'react';
import clsx from 'clsx';
import { LeftMenu } from '../components/LeftMenu';
import { SideComments } from '../components/SideComments';
import { Header } from '../components/Header/index';

interface MainLayoutProps {
  hideComments?: boolean;
  contentFullWidth?: boolean;
  hideMenu?: boolean;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  contentFullWidth,
  hideComments,
  className,
  hideMenu,
}) => {
  const [menuHidden, setMenuHidden] = React.useState(true);
  return (
    <>
      <Header menuHidden={menuHidden} setMenuHidden={setMenuHidden} />
      <div className={clsx('wrapper', className)}>
        {menuHidden && (
          <div className='leftSide'>
            <LeftMenu />
          </div>
        )}
        <div className={clsx('content', { 'content--full': contentFullWidth })}>{children}</div>
        {!hideComments && (
          <div className='rightSide'>
            <SideComments />
          </div>
        )}
      </div>
    </>
  );
};
