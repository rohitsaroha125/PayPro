import { Fragment } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "./global.css";
import "toastr/build/toastr.min.css";
import { Provider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>PayPro</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Fragment>
  );
}

export default MyApp;
