"use client"

export default function MobileContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mobile-wrapper">
      <div className="mobile-frame">
        {children}
      </div>
    </div>
  )
}
