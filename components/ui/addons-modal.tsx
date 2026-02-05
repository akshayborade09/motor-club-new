"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { buttonPressHaptic } from "@/utils/haptics"

interface Coverage {
  id: number
  name: string
  icon: string
  active: boolean
}

interface AddonsModalProps {
  isOpen: boolean
  onClose: () => void
  coverages: Coverage[]
  onUpdateCoverages: (updatedCoverages: Coverage[]) => void
}

// Coverage descriptions mapping
const coverageDescriptions: { [key: number]: string } = {
  1: "Covers injury, death, or property damage caused to a third party by the insured vehicle.",
  2: "Covers death compensation for the insured person",
  3: "Covers legal liabilities arising from vehicle accidents",
  4: "Covers cost of treating injuries sustained in accidents",
  5: "Covers personal accident benefits for the insured",
  6: "Covers damages caused to own vehicle",
  7: "Covers theft and fire damage to the vehicle",
  8: "Covers property damage caused by the vehicle",
  9: "Covers repair or replacement cost of the engine",
  10: "Full value of all parts, including rubber, glass, etc. is covered without factoring in depreciation.",
  11: "Covers tyre protection and replacement costs",
  12: "Covers mechanical failure and breakdown costs",
  13: "Offers support in case of vehicle breakdown or emergency",
  14: "Covers consumable items and their replacement"
}

export default function AddonsModal({ isOpen, onClose, coverages, onUpdateCoverages }: AddonsModalProps) {
  const [localCoverages, setLocalCoverages] = useState<Coverage[]>(coverages)

  // Reset local state whenever modal opens or coverages prop changes
  useEffect(() => {
    if (isOpen) {
      setLocalCoverages(coverages)
    }
  }, [isOpen, coverages])

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling
      document.body.style.position = 'fixed'
      document.body.style.overflow = 'hidden'
      document.body.style.width = '100%'
    } else {
      // Restore scrolling
      document.body.style.position = ''
      document.body.style.overflow = ''
      document.body.style.width = ''
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = ''
      document.body.style.overflow = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  const handleToggleCoverage = (coverageId: number) => {
    buttonPressHaptic()
    setLocalCoverages(prev => 
      prev.map(coverage => 
        coverage.id === coverageId 
          ? { ...coverage, active: !coverage.active }
          : coverage
      )
    )
  }

  const handleClearAll = () => {
    buttonPressHaptic()
    setLocalCoverages(prev => 
      prev.map(coverage => ({ ...coverage, active: false }))
    )
  }

  const handleSave = () => {
    buttonPressHaptic()
    onUpdateCoverages(localCoverages)
    onClose()
  }

  const handleClose = () => {
    buttonPressHaptic()
    // Reset local state to parent state when closing without saving
    setLocalCoverages(coverages)
    onClose()
  }

  // Get clean title without line breaks
  const getCleanTitle = (name: string) => {
    return name.replace(/\n/g, ' ')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bg-white rounded-2xl z-50 flex flex-col"
            style={{
              top: '24px',
              left: '24px',
              right: '24px',
              bottom: '24px',
              maxHeight: 'calc(100% - 48px)',
              width: 'calc(100% - 48px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Section 1: Header */}
            <div className="flex items-start justify-between p-4 border-b border-gray-100">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">Add-ons</h2>
                <p className="text-sm text-gray-600 mt-1">Update add-ons available with your existing vehicle policy</p>
              </div>
              <button
                onClick={handleClose}
                className="pl-2 pt-1 pb-2 hover:bg-gray-100 rounded-full transition-colors ml-4 flex-shrink-0"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Section 2: Add-ons List (Scrollable) */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
              {localCoverages.map((coverage) => (
                <div key={coverage.id} className="flex items-start gap-3">
                  {/* Icon - Same styling as insurance page */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    coverage.active ? 'bg-indigo-50' : 'bg-gray-100'
                  }`}>
                    <Image
                      src={coverage.icon}
                      alt={coverage.name}
                      width={64}
                      height={64}
                      className={`w-16 h-16 object-contain ${coverage.active ? 'opacity-100' : 'opacity-50 grayscale'}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          {getCleanTitle(coverage.name)}
                          {coverage.id === 10 && (
                            <span className="ml-2 px-1.5 py-1 bg-gradient-to-b from-emerald-900 to-emerald-500 rounded-[40px] text-white text-[10px] font-bold leading-none">
                              Popular
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {coverageDescriptions[coverage.id] || "Coverage description not available"}
                        </p>
                      </div>

                      {/* Checkbox */}
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => handleToggleCoverage(coverage.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                            coverage.active
                              ? 'bg-green-600 border-green-600'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {coverage.active && (
                            <svg
                              width="12"
                              height="9"
                              viewBox="0 0 12 9"
                              fill="none"
                              className="text-white"
                            >
                              <path
                                d="M1 4.5L4.5 8L11 1.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Section 3: Footer Buttons */}
            <div className="flex gap-3 p-4 border-t border-gray-100">
              <button
                onClick={handleClearAll}
                className="flex-1 py-3 px-4 bg-gray-100 border border-white text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 px-4 bg-indigo-700 text-white font-semibold rounded-xl hover:bg-indigo-800 transition-colors"
              >
                Save
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 