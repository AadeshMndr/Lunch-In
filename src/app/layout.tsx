import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="w-screen h-full relative bg-gradient-to-b from-primaryBrown from-[20%] to-[#af6e3f]">{children}</body>
    </html>
  )
}
