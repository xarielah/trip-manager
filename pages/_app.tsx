import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { jwtVerify } from "jose";
import AuthProvider from "../components/auth/auth-provider";
import MainLayout from "../components/layouts/main-layout";

export default function App({
  Component,
  pageProps,
  currentUser,
}: AppProps & { currentUser: any }) {
  return (
    <Provider store={store}>
      <AuthProvider currentUser={currentUser}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthProvider>
    </Provider>
  );
}

App.getInitialProps = async ({ ctx }: any): Promise<any> => {
  const token = ctx?.req?.cookies?.token;
  const secretKey = process.env.JWT_SECRET;
  let currentUser;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secretKey)
    );
    currentUser = payload;
  } catch (error) {
    currentUser = null;
  }

  return { currentUser };
};
