export { default } from "next-auth/middleware";

// 이 경로 안에 있는 것들만 middleware에서 처리하게 됩니다.
export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
