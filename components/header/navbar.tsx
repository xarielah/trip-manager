import Image from "next/image";
import Link from "next/link";
import Button from "../classic/button";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/slices/authSlice";

const NavigationBar = () => {
  const currentUser = useSelector(selectCurrentUser);

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
        <Link href="/client-area">
          <Button value={`Logged as ${currentUser.username}`} />
        </Link>
      ) : (
        <Link href="/auth/login">
          <Button value={"Get Started"} />
        </Link>
      )}
    </nav>
  );
};

export default NavigationBar;
