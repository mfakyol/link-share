import "@styles/🌎.scss";
import { store } from "../store";
import { Provider } from "react-redux";
import AuthLayout from "layouts/AuthLayout";

function MyApp({ Component, pageProps, router }) {
  return (
    <Provider store={store}>
      {router.route == "/panel" ? (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}

export default MyApp;
