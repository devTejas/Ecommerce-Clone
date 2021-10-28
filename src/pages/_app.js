import { Provider as AuthProvider } from "next-auth/client";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "../app/store";
import { selectItems } from "../slices/basketSlice";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;
