"use client"

import { useEffect, useState } from "react"

export default function MobileContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobile, setIsMobile] = useState(true) // Start with mobile to avoid hydration issues
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Don't show desktop container until mounted
  if (!mounted || isMobile) {
    return <>{children}</>
  }

  // Desktop: show in container
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        background: "linear-gradient(to bottom right, #f3f4f6, #f9fafb, #f3f4f6)"
      }}
    >
      <div 
        className="bg-white shadow-2xl overflow-hidden relative"
        style={{
          width: "440px",
          height: "956px",
          borderRadius: "32px",
          margin: "32px 0",
        }}
      >
        {children}
      </div>
    </div>
  )
}
