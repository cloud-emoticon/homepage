import React from 'react';
import {CacheProvider} from '@emotion/react';
import {ThemeProvider, CssBaseline} from '@mui/material';

import createEmotionCache from '../utils/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';
import Container from "@mui/material/Container";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: any) => {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

  return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline/>
          <Container sx={{
            mt: 4
          }}>
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </CacheProvider>
  );
};

export default MyApp;
