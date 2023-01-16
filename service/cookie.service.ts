import Cookies from "js-cookie";
import type { CookieAttributes } from "js-cookie";

export const TOKEN_COOKIE_NAME = "j_id";

const setCookie = (name: string, value: string): void => {
  const expirationDate = new Date().setDate(new Date().getDate() + 7);

  const cookieOptions: CookieAttributes = {
    expires: new Date(expirationDate),
    sameSite: "Strict",
    path: "/",
  };

  Cookies.set(name, value, cookieOptions);
};

const removeCookie = (name: string): void => {
  Cookies.remove(name);
};

const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export { setCookie, removeCookie, getCookie };
