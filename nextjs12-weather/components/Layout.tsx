import Head from "next/head";
import React, { ReactNode } from "react";
import Card from "./Card";

function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <Head>
        <title>Create React App</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nextjs weather app" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Card>{children}</Card>
      </main>
    </>
  );
}

export default Layout;
