// app/layout.tsx
import { openSauceOne } from './fonts'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={openSauceOne.variable}>
      <body>{children}</body>
    </html>
  )
}