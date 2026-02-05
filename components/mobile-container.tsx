"use client"

import { useEffect, useState } from "react"

export default function MobileContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Always render the same structure to avoid hydration issues
  // Use CSS media queries to handle responsive behavior
  return (
    <div className="mobile-container-wrapper">
      <style jsx>{`
        .mobile-container-wrapper {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #f3f4f6, #f9fafb, #f3f4f6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: auto;
        }

        .mobile-container {
          width: 440px;
          height: 956px;
          max-height: 956px;
          background: white;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border-radius: 32px;
          overflow: hidden;
          position: relative;
          margin: 32px 0;
          transform-origin: center center;
        }

        .mobile-content {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        /* Mobile: full screen */
        @media (max-width: 767px) {
          .mobile-container-wrapper {
            padding: 0;
            background: white;
          }
          
          .mobile-container {
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
            margin: 0;
            border-radius: 0;
            box-shadow: none;
          }
        }

        /* Tablet/Desktop: scale to fit */
        @media (min-width: 768px) and (max-height: 1000px) {
          .mobile-container {
            transform: scale(0.85);
          }
        }

        @media (min-width: 768px) and (max-height: 900px) {
          .mobile-container {
            transform: scale(0.75);
          }
        }

        @media (min-width: 768px) and (max-height: 800px) {
          .mobile-container {
            transform: scale(0.65);
          }
        }
      `}</style>
      
      <div className="mobile-container">
        <div className="mobile-content">
          {children}
        </div>
      </div>
    </div>
  )
}
