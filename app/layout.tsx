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
      <body>
        <div className="overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}