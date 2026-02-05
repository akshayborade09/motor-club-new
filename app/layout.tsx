// app/layout.tsx
import { openSauceOne } from './fonts'
import './globals.css'
import MobileContainer from '@/components/mobile-container'
import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover', // This enables safe-area-inset-* support
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={openSauceOne.variable}>
      <body>
        <MobileContainer>
          {children}
        </MobileContainer>
      </body>
    </html>
  )
}