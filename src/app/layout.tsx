import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "결혼정보",
  description: "결혼과 관련된 정보를 공유하는 커뮤니티",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={cn(inter.className, "flex justify-center min-h-screen bg-muted")}>
        <div className="w-full md:w-[375px] bg-background relative">
          {children}
        </div>
      </body>
    </html>
  );
}
