"use client"

export default function MobileContainer({
  children,
}: {
  children: React.ReactNode
}) {
  // Always render the same structure - use CSS to handle responsive behavior
  return (
    <div className="mobile-wrapper">
      <div className="mobile-frame">
        {children}
      </div>
    </div>
  )
}
