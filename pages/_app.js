import PropTypes from "prop-types";
import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";

const propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired, // eslint-disable-line
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Nerd Pool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
MyApp.propTypes = propTypes;
export default MyApp;
