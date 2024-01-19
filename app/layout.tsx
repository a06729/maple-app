import type { Metadata } from 'next'
import './globals.css'
import Head from 'next/head'
import Link from 'next/link'
import { Toaster } from "@/components/ui/toaster"
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: '메담',
  description: '메이플 캐릭터 검색,메이플 전투력 검색,메이플스토리',
}
const SpoqaHanSansNeo = localFont({
  src: '/font/SpoqaHanSansNeo-Thin.ttf',
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
        <header className='flex justify-center items-center border-b-2 h-20'>
            <div className='max-sm:space-x-16 space-x-32'>
              <Link className='max-sm:text-[18px] text-lg' href="/">캐릭터 검색</Link>
              <Link className='max-sm:text-[18px] text-lg' href="/">랭킹</Link>
              {/* <Link className='max-sm:text-[18px] text-lg' href="/"></Link> */}
            </div>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
