import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "人事管理系统",
  description: "现代化的人事管理解决方案",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
