import type { Metadata } from 'next'
import Head from 'next/head'
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import localFont from 'next/font/local'
import Header from './components/header'



export const metadata: Metadata = {
  title: '메담',
  description: '메이플 캐릭터 검색,메이플 전투력 검색,메이플스토리',
}
const SpoqaHanSansNeo = localFont({
  src: './font/SpoqaHanSansNeo-Thin.ttf',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kr">
      <Head>
        <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" /></Head>
      <body>
        <Header/>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
