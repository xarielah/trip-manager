import Cookies from "js-cookie";
import type { CookieAttributes } from "js-cookie";

const TOKEN_COOKIE_NAME = "j_id";

const setCookie = (name: string, value: string): void => {
  const expirationDate = new Date().setDate(new Date().getDate() + 7);

  const cookieOptions: CookieAttributes = {
    expires: new Date(expirationDate),
    sameSite: "Strict",
    path: "/",
  };

  Cookies.set(name, value, cookieOptions);
};

const removeCookie = (name: string, stateAction?: () => any): void => {
  Cookies.remove(name);

  if (stateAction) {
    stateAction();
  }
};

const getCookie = (name: string): string | undefined => {
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(";").shift();
  }
};

export { setCookie, removeCookie, getCookie, TOKEN_COOKIE_NAME };
