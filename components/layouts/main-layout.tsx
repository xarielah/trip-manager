import { ReactNode } from "react";
import NavigationBar from "../header/navbar";

interface IMainLayout {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayout) => {
  return (
    <main className="w-screen">
      <header>
        <NavigationBar />
      </header>
      {children}
    </main>
  );
};

export default MainLayout;
