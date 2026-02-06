"use client"

export default function MobileContainer({
  children,
}: {
  children: React.ReactNode
}) {
  // Always render the same structure - CSS handles responsive behavior
  // No useState/useEffect = no hydration mismatch between server and client
  return (
    <div className="mobile-wrapper">
      <div className="mobile-frame relative">
        {children}
      </div>
    </div>
  )
}
