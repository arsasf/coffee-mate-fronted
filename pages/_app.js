import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Head>
      <meta
        name="viewport"
        contenct="width=device-width, initial-scale=1"
      ></meta>
      <Component {...pageProps} />
    </Head>
  );
}

export default MyApp;
