import store from "../reducers&stone/store";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import "../styles/global.css";
import LoggedInUserCheck from "../components/LoggedInUserCheck";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LoggedInUserCheck>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LoggedInUserCheck>
    </Provider>
  );
}

export default MyApp;
