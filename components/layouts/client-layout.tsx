import { ReactNode } from "react";
import ClientNav from "../header/client-nav";

interface IClientLayout {
  children: ReactNode | ReactNode[];
}

const ClientLayout = ({ children }: IClientLayout) => {
  return (
    <main>
      <ClientNav />
      <article className="px-8">{children}</article>
    </main>
  );
};

export default ClientLayout;
