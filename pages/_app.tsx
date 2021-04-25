import store from "../reducers&stone/store";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import "../styles/global.css";
// import { AuthProvider } from "../auth";
function MyApp({ Component, pageProps }) {
  return (
    // <AuthProvider>
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    // </AuthProvider>
  );
}

export default MyApp;
