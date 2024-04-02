import Head from "next/head";
import React, { ReactNode } from "react";
import Card from "./Card";

type Props = { children?: ReactNode; title?: string; className: string };

function Layout({ children, title, className }: Props) {
  return (
    <>
      <Head>
        <title>{title || "weather app"}</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nextjs weather app" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Card className={className}>{children}</Card>
      </main>
    </>
  );
}

export default Layout;
