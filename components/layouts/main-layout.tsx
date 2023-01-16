import { ReactNode } from "react";
import NavigationBar from "../header/navbar";

interface IMainLayout {
  children: ReactNode | ReactNode[];
}

const MainLayout = ({ children }: IMainLayout) => {
  return (
    <>
      <header>
        <NavigationBar />
      </header>
      <main className="app">{children}</main>
    </>
  );
};

export default MainLayout;
