import { jwtVerify } from "jose";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { getCookie, TOKEN_COOKIE_NAME } from "../../service/cookie.service";

interface IProtectedRoute {
  children: ReactNode | ReactNode[];
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = getCookie(TOKEN_COOKIE_NAME);
    const secretKey = process.env.JWT_SECRET;

    if (token) {
      try {
        jwtVerify(token, new TextEncoder().encode(secretKey)).then(() =>
          setIsAllowed(true)
        );
      } catch (error) {
        router.push("/auth/login");
      }
    } else {
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAllowed) return <>Loading...</>;
  else return <>{children}</>;
};
export default ProtectedRoute;
