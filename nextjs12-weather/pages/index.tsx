import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import WelcomeContent from "@/components/WelcomeContent";
import AuthForm from "@/components/AuthForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Layout>
        <WelcomeContent />
        <AuthForm />
      </Layout>
    </>
  );
}
