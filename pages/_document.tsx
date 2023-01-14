import { Html, Head, Main, NextScript } from "next/document";

import NavigationBar from "../components/header/navbar";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <main className="app">
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  );
}
