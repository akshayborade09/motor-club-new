"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface TapEffectProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  scale?: number
  opacity?: number
  style?: React.CSSProperties
}

export default function TapEffect({ 
  children, 
  className = "",
  onClick,
  disabled = false,
  scale = 0.95,
  opacity = 0.8,
  style
}: TapEffectProps) {
  return (
    <motion.div
      className={className}
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? {} : { 
        scale: scale,
        opacity: opacity,
        transition: { duration: 0.1 }
      }}
      whileHover={disabled ? {} : { 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      style={{ 
        cursor: disabled ? 'default' : 'pointer',
        userSelect: 'none',
        ...style
      }}
    >
      {children}
    </motion.div>
  )
} 