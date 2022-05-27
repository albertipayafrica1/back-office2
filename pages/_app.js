import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Paper } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { PersistGate } from "redux-persist/integration/react";

import { Provider, useStore } from "react-redux";
import NextProgress from "nextjs-progressbar";
import theme from "../styles/theme";
import createEmotionCache from "../config/createEmotionCache";
import { wrapper } from "../redux/store";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  const store = useStore((state) => state);
  const router = useRouter();

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
            <Paper>
              <CssBaseline />
              <NextProgress
                color={router.pathname === "/" ? "#F29103" : "#124AA1"}
                startPosition={0.3}
                stopDelayMs={200}
                height={4}
                options={{ showSpinner: false }}
                showOnShallow={false}
              />

              {getLayout(<Component {...pageProps} />)}
            </Paper>
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
            <Paper>
              <CssBaseline />
              <NextProgress
                color={router.pathname === "/" ? "#F29103" : "#124AA1"}
                startPosition={0.3}
                stopDelayMs={200}
                height={4}
                options={{ showSpinner: false }}
                showOnShallow={false}
              />

              {getLayout(<Component {...pageProps} />)}
            </Paper>
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
