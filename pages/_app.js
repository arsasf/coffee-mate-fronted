// // import "../styles/globals.css";
// // import "bootstrap/dist/css/bootstrap.css";

// // function MyApp({ Component, pageProps }) {
// //   return <Component {...pageProps} />;
// // }

// // export default MyApp;

// import Head from "next/head";
// import "../styles/globals.css";
// import "bootstrap/dist/css/bootstrap.css";
// import { Provider } from "react-redux";
// //==================================
// // import { useStore } from "redux/store";
// //==================================
// function MyApp({ Component, pageProps }) {
//   //==================================
//   // const store = useStore(pageProps.initialReduxState);
//   //==================================
//   return (
//     <>
//       {/* <Provider store={store}> */}
//       <Head>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>
//       <Component {...pageProps} />
//       {/* </Provider> */}
//     </>
//   );
// }

// export default MyApp;

import Head from "next/head";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { useStore } from "redux/store";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
