import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface IAuthLayout {
  children: ReactNode | ReactNode[];
}

const AuthPageLayout = ({ children }: IAuthLayout) => {
  const currentPath = useRouter().pathname as "/auth/register" | "/auth/login";

  return (
    <section className="min-h-screen w-screen flex justify-center items-center flex-col">
      <article className="border-[1px] bg-teal-900/10 border-slate-300/20 rounded-sm p-12 w-3/4 md:w-1/2 xl:w-1/4">
        {children}
      </article>
      <p className="mt-5">
        You can also{" "}
        <Link
          className="font-bold text-pink-700 ease-in-out duration-300 hover:text-pink-900"
          href={
            currentPath === "/auth/login" ? "/auth/register" : "/auth/login"
          }
        >
          {currentPath === "/auth/login" ? "Register" : "Login"}
        </Link>{" "}
        if you want!
      </p>
    </section>
  );
};

export default AuthPageLayout;
