import PropTypes from "prop-types";
import "../styles/globals.css";
import Head from "next/head";

const propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired, // eslint-disable-line
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />;
      <Head>
        <title>Nerd Pool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    </>
  );
}
MyApp.propTypes = propTypes;
export default MyApp;
