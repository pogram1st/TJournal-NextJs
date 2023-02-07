import React, { useEffect } from 'react';
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
  const widthScreen = React.useRef<number>();
  const [menuHidden, setMenuHidden] = React.useState(
    widthScreen.current && (window.screen.availWidth > 630 ? true : false),
  );

  React.useEffect(() => {
    setMenuHidden(window.screen.availWidth > 630 ? true : false);
  }, []);
  React.useEffect(() => {
    if (menuHidden && window.screen.availWidth < 630) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [menuHidden]);
  return (
    <>
      <Header menuHidden={menuHidden} setMenuHidden={setMenuHidden} />
      <div className={clsx('wrapper', className)}>
        <LeftMenu menuHidden={menuHidden} />
        <div className={clsx('content', { 'content--full': contentFullWidth || !menuHidden })}>
          {children}
        </div>
        {!hideComments && (
          <div className='rightSide'>
            <SideComments />
          </div>
        )}
      </div>
    </>
  );
};
