// app/layout.tsx
import { openSauceOne } from './fonts'
import './globals.css'  // Only import globals.css, not fonts.css

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${openSauceOne.variable} font-sans`}>
      <body className={openSauceOne.className}>{children}</body>
    </html>
  )
}