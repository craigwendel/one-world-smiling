import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Script from 'next/script';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Page from '../components/Page';
import { CartStateProvider } from '../lib';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Script src="https://www.paypal.com/sdk/js?client-id=AYxqfCDd5rfhN-r844NyS0s3shyY83QvZT2gI5lvLBJwLuTmtMM92XaPlUCvWM5iMiZqRECJdTgf33HO" />
      <Head>
        <title>One World Smiling</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartStateProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </CartStateProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
