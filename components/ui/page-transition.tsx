"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
}

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      transition={pageTransition}
      className={`${className} overflow-hidden w-full h-full`}
    >
      {children}
    </motion.div>
  )
} 