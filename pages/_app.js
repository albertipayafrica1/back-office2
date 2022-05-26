import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { PersistGate } from "redux-persist/integration/react";

import { Provider, useStore } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import theme from "../styles/theme";
import createEmotionCache from "../config/createEmotionCache";
import { wrapper } from "../redux/store";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  const store = useStore((state) => state);

  // incase we get any issues with rehydation, remove <Provide>
  return typeof window !== "undefined" ? (
    <Provider store={store}>
      <PersistGate persistor={store.persistor} loading={<div>Loading</div>}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NextNProgress
              color="#124AA1"
              startPosition={0.3}
              stopDelayMs={200}
              height={4}
              options={{ showSpinner: false }}
              showOnShallow={false}
            />

            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  ) : (
    <Provider store={store}>
      <PersistGate persistor={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NextNProgress
              color="#29D"
              startPosition={0.3}
              stopDelayMs={200}
              options={{ showSpinner: false }}
              height={3}
              showOnShallow
            />

            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.shape({}).isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default wrapper.withRedux(MyApp);
