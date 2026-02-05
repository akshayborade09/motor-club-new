"use client"

import { useEffect, useState } from "react"

export default function MobileContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    // Check if the viewport is mobile-sized and calculate scale
    const checkSizeAndScale = () => {
      // Consider it "mobile" if width is less than 768px (tablet breakpoint)
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      if (!mobile) {
        // Calculate scale to fit the container in viewport
        const CONTAINER_WIDTH = 440
        const CONTAINER_HEIGHT = 956
        const PADDING = 64 // 32px on each side
        const BORDER = 28 // 14px border on each side

        const availableHeight = window.innerHeight - PADDING
        const availableWidth = window.innerWidth - PADDING

        // Calculate scale based on height and width constraints
        const scaleHeight = availableHeight / (CONTAINER_HEIGHT + BORDER)
        const scaleWidth = availableWidth / (CONTAINER_WIDTH + BORDER)

        // Use the smaller scale to ensure it fits
        const calculatedScale = Math.min(scaleHeight, scaleWidth, 1)
        setScale(calculatedScale)
      }
    }

    checkSizeAndScale()
    window.addEventListener("resize", checkSizeAndScale)

    return () => window.removeEventListener("resize", checkSizeAndScale)
  }, [])

  // On mobile devices, render full screen
  if (isMobile) {
    return <div className="overflow-hidden h-screen">{children}</div>
  }

  // On desktop, render in a centered mobile container
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center p-8 overflow-auto">
      {/* Simple Container - 440x956 */}
      <div 
        className="relative bg-white shadow-2xl"
        style={{
          width: "440px",
          height: "956px",
          maxHeight: "956px",
          overflow: "hidden",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          marginTop: "32px",
          marginBottom: "32px",
          borderRadius: "32px",
        }}
      >
        {/* Content */}
        <div 
          className="w-full h-full bg-white scrollbar-hide relative"
          style={{
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
