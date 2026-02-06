"use client"

import { useState, useEffect } from "react"
import { RotateCcw } from "lucide-react"

export default function LandscapeMessage() {
  const [isLandscape, setIsLandscape] = useState(false)

  useEffect(() => {
    const checkOrientation = () => {
      // Only show landscape message on actual mobile devices (width < 768px)
      // where the viewport is in landscape mode
      const isMobileDevice = window.innerWidth < 768
      const isLandscapeMode = window.innerWidth > window.innerHeight
      
      // Only set landscape true if it's a mobile device AND in landscape
      setIsLandscape(isMobileDevice && isLandscapeMode)
    }

    // Check initial orientation
    checkOrientation()

    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)

    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  if (!isLandscape) {
    return null
  }

  return (
    <div className="h-full bg-white flex items-center justify-center p-6 overflow-hidden">
      <div className="text-center max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <RotateCcw size={32} className="text-indigo-600" />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Rotate Your Device
        </h2>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          For the best experience, please rotate your device to portrait mode.
        </p>
        
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-5 h-8 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
              <RotateCcw size={12} />
              <div className="w-8 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 