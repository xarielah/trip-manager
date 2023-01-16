import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { jwtVerify } from "jose";
import AuthProvider from "../components/auth/auth-provider";
import MainLayout from "../components/layouts/main-layout";
import { useEffect, useState } from "react";
import { AuthState } from "../app/slices/authSlice";
import {
  TOKEN_COOKIE_NAME,
  getCookie,
  removeCookie,
} from "../service/cookie.service";
import ProtectedRoute from "../components/layouts/protected-route";
import ClientLayout from "../components/layouts/client-layout";

export default function App({ Component, pageProps, router }: AppProps) {
  const [currentUser, setCurrentUser] = useState<AuthState>({
    username: null,
    email: null,
  });

  useEffect(() => {
    const token = getCookie(TOKEN_COOKIE_NAME);
    const secretKey = process.env.JWT_SECRET;

    if (token) {
      try {
        jwtVerify(token, new TextEncoder().encode(secretKey)).then(
          ({ payload }) => {
            setCurrentUser({
              username: (payload as AuthState).username,
              email: (payload as AuthState).email,
            });
          }
        );
      } catch (error) {
        removeCookie(TOKEN_COOKIE_NAME);
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider currentUser={currentUser}>
        <MainLayout>
          {router.pathname.startsWith("/client-area") ? (
            <ProtectedRoute>
              <ClientLayout>
                <Component {...pageProps} />
              </ClientLayout>
            </ProtectedRoute>
          ) : (
            <Component {...pageProps} />
          )}
        </MainLayout>
      </AuthProvider>
    </Provider>
  );
}
