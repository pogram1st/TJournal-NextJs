import Head from 'next/head';

import { Header } from '../components/Header';
import { Provider } from 'react-redux';

import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../theme';

import '../styles/globals.scss';
import 'macro-css';
import { wrapper } from '../redux/store';
import { setUserData } from '../redux/slices/user';
import { Api } from '../utils/api';

function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <>
      <Head>
        <title>RJournal</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </MuiThemeProvider>
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
  try {
    const userData = await Api(ctx).user.getMe();
    store.dispatch(setUserData(userData));
  } catch (err) {
    if (ctx.asPath === '/write') {
      ctx.res.writeHead(302, {
        Location: '/',
      });
      ctx.res.end();
    }
  }
  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  };
});

export default App;
