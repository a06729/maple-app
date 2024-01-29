import type { Metadata } from 'next'
import "../globals.css";
import Head from 'next/head'
import { Toaster } from "@/components/ui/toaster"
// import localFont from 'next/font/local'
import Header from '../components/header';

export const metadata: Metadata = {
  title: '랭킹',
  description: '메이플 캐릭터 검색,메이플 전투력 검색,메이플스토리',
}

export default function RankingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div>
        {children}
      </div>
  )
}
