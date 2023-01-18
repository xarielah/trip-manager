import Image from "next/image";
import Link from "next/link";
import Button from "../classic/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectCurrentUser } from "../../app/slices/authSlice";
import { removeCookie, TOKEN_COOKIE_NAME } from "../../service/cookie.service";

const NavigationBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const logoutAction = () => {
    removeCookie(TOKEN_COOKIE_NAME);
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    <nav className="p-8 flex justify-between w-full">
      <Link href="/">
        <Image
          src="/images/airplane.svg"
          alt="Airplane Logo"
          width={50}
          height={50}
        />
      </Link>
      {currentUser.username ? (
        <div className="text-center">
          Hello {currentUser.username}
          <br className="md:hidden" />
          <div className="lg:inline lg:mx-3">
            <Link href="/client-area">
              <span className="text-teal-600 hover:text-teal-700 duration-300 ease-in-out hover:underline cursor-pointer uppercase mx-2">
                client area
              </span>
            </Link>
            <span
              className="text-red-400 hover:text-red-700 duration-300 ease-in-out hover:underline cursor-pointer uppercase mx-2"
              onClick={logoutAction}
            >
              logout
            </span>
          </div>
        </div>
      ) : (
        <Link href="/auth/login">
          <Button value={"Get Started"} />
        </Link>
      )}
    </nav>
  );
};

export default NavigationBar;
