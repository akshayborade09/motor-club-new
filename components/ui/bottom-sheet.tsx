"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  children?: React.ReactNode
  showCloseButton?: boolean
}

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  description,
  children,
  showCloseButton = true
}: BottomSheetProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Lock scroll on both body and html
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.documentElement.style.overflow = 'hidden'
    } else {
      // Restore scroll
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.documentElement.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.4
            }}
            className="absolute z-50"
            style={{
              bottom: '24px',
              left: '24px',
              right: '24px',
              maxHeight: 'calc(75% - 24px)'
            }}
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden scrollbar-hide">
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>

              {/* Header */}
              <div className="px-6 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="ml-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors"
                    >
                      <X size={20} className="text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Content - With scrolling */}
              <div className="px-6 py-6 pb-8 max-h-[60vh] overflow-y-auto scrollbar-hide">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 