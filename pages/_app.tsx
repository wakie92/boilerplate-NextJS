/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ErrorLevels } from 'src/utils/constants';
import ErrorBoundary from 'src/components/shared/ErrorBoundary';
import ThemeHandler from 'src/components/shared/ThemeHandler';
import UiUxContextProvider from 'src/contexts/UiUxContext';
import RoutingContextProvider from 'src/contexts/RoutingContext';
import { GlobalStyles } from 'src/styles/styledComponents/globalStyled';

import type { AppProps } from 'next/app';

import 'src/styles/index.scss';
NProgress.configure();
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary errorLevel={ErrorLevels.application}>
      <Head>
        {/* Meta */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, maximum-scale=1, user-scalable=no, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <RoutingContextProvider>
          <UiUxContextProvider>
            <ThemeHandler>
              <>
                <GlobalStyles />
                <Hydrate state={pageProps.dehydratedState}>
                  <Component {...pageProps} />
                </Hydrate>
              </>
            </ThemeHandler>
          </UiUxContextProvider>
        </RoutingContextProvider>
        {process.env.NEXT_PUBLIC_APP_ENV !== 'production' && (
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
