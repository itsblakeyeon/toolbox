import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 정적 사이트 생성 (SSG) - Vercel 배포에 최적화
  output: "export",

  // 이미지 최적화 (정적 export에서는 unoptimized 필요)
  images: {
    unoptimized: true,
  },

  // trailing slash 설정 (SEO 일관성)
  trailingSlash: true,
};

export default nextConfig;
