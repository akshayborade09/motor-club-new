// app/layout.tsx
import { openSauceOne } from './fonts'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={openSauceOne.variable} data-theme="light" style={{ colorScheme: 'light only' }}>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-navbutton-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body style={{ colorScheme: 'light only' }}>
        <div className="overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}