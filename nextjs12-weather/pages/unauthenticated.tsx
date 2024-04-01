import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

function Unauthenticated() {
  return (
    <Layout>
      <h1>이 페이지를 보려면 로그인을 하세요.</h1>
      <Link href="/" className="mx-auto btn__secondary">
        로그인 페이지로
      </Link>
    </Layout>
  );
}

export default Unauthenticated;
