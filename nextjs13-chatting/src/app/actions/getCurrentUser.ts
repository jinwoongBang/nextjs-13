import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "@/helpers/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    // 이메일을 이용해서 데이터베이스에서 요청 정보 찾은 후 가져오기
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    // console.log('currentUser', currentUser);
    return {
      ...currentUser,
      // 이전 Nextjs 13.3 이하 버전에서는 Node Data 객체를 문자열로 전달해줘야 함.
      //   createdAt: currentUser.createdAt.toISOString(),
      //   updatedAt: currentUser.updatedAt.toISOString(),
    };
  } catch (error) {
    return null;
  }
}
