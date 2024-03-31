import Head from "next/head";
import React, { ReactNode } from "react";
import Card from "./Card";

function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <Head>
        <title>Create React App</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <Card>{children}</Card>
      </main>
    </>
  );
}

export default Layout;
