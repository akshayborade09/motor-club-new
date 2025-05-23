"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Shield, FileText, RefreshCw, CheckCircle } from "lucide-react"
import { useOrientation } from "../hooks/useOrientation"
import OrientationMessage from "../components/OrientationMessage"

// Mock Vahan API response
const mockVahanResponse = {
  "status": "success",
  "data": {
    "registration_number": "MH12AB1234",
    "owner_name": "Rajesh Kumar Sharma",
    "father_name": "Mahesh Sharma",
    "vehicle_class": "Motor Car",
    "fuel_type": "Petrol",
    "manufacturer": "Maruti Suzuki",
    "model": "Swift VXI",
    "registration_date": "2018-07-15",
    "engine_number": "K12MN345678",
    "chassis_number": "MA3FHEB1S00712345",
    "rc_status": "Active",
    "vehicle_category": "LMV",
    "pucc_status": "Valid",
    "pucc_valid_upto": "2025-02-14",
    "insurance_status": "Valid",
    "insurance_company": "Bajaj Allianz",
    "insurance_valid_upto": "2025-06-30",
    "fitness_status": "Valid",
    "fitness_valid_upto": "2033-07-14",
    "registration_authority": "RTO Pune",
    "permit_type": "Private",
    "blacklist_status": "Not Blacklisted",
    "hypothecation": "HDFC Bank"
  }
}

// Rotating content for pills
const pill1Content = [
  { icon: CheckCircle, text: "Check challan in 2 min" },
  { icon: Shield, text: "Verify insurance status" },
  { icon: FileText, text: "Check PUC validity" },
  { icon: RefreshCw, text: "Update vehicle info" }
]

const pill2Content = [
  { icon: Shield, text: "Get insurance renewals reminder" },
  { icon: CheckCircle, text: "Track fitness certificate" },
  { icon: FileText, text: "Monitor RC status" },
  { icon: RefreshCw, text: "Auto-sync documents" }
]

export default function AddVehicle() {
  const router = useRouter()
  const { orientation, device } = useOrientation()
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPill1Index, setCurrentPill1Index] = useState(0)
  const [currentPill2Index, setCurrentPill2Index] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Check orientation
  if (orientation === 'landscape' || device === 'desktop') {
    return <OrientationMessage device={device} />
  }

  // Auto-focus input and show keyboard
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Rotating text animation for pills
  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentPill1Index((prev) => (prev + 1) % pill1Content.length)
    }, 3000)

    const interval2 = setInterval(() => {
      setCurrentPill2Index((prev) => (prev + 1) % pill2Content.length)
    }, 3500)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
    }
  }, [])

  // Format registration number input
  const formatRegistrationNumber = (value: string) => {
    // Remove all spaces and convert to uppercase
    const cleaned = value.replace(/\s/g, '').toUpperCase()
    
    // Detect pattern and format accordingly
    if (cleaned.length <= 10) {
      // Type 1: MH 01 47 8830 or similar
      if (cleaned.length >= 2) {
        let formatted = cleaned.substring(0, 2)
        if (cleaned.length > 2) {
          formatted += ' ' + cleaned.substring(2, 4)
        }
        if (cleaned.length > 4) {
          formatted += ' ' + cleaned.substring(4, 6)
        }
        if (cleaned.length > 6) {
          formatted += ' ' + cleaned.substring(6)
        }
        return formatted
      }
    }
    return cleaned
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRegistrationNumber(e.target.value)
    setRegistrationNumber(formatted)
  }

  const handleFetchDetails = async () => {
    if (!registrationNumber.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // In real implementation, you would call the actual Vahan API
      console.log('Mock API Response:', mockVahanResponse)
      // Navigate to vehicle details or dashboard
      router.push('/dashboard')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
      {/* ===== HEADER SECTION ===== */}
      <header className="flex items-center px-4 py-4 pt-12">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white ml-4">Add vehicle</h1>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-col items-center px-4 mt-8">
        {/* ===== CAR IMAGE WITH ANIMATED PILLS ===== */}
        <div className="relative w-full max-w-sm mb-8">
          {/* Pill 1 - Top Right */}
          <div className="absolute -top-4 right-4 z-10">
            <div className="bg-green-400 rounded-full px-3 py-2 flex items-center gap-2 shadow-lg min-w-[200px]">
              <div className="relative w-4 h-4">
                {pill1Content.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Icon
                      key={index}
                      size={16}
                      className={`absolute inset-0 text-gray-800 transition-opacity duration-500 ${
                        index === currentPill1Index ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )
                })}
              </div>
              <div className="relative h-5 overflow-hidden flex-1">
                {pill1Content.map((item, index) => (
                  <span
                    key={index}
                    className={`absolute inset-0 text-gray-800 text-xs font-medium transition-transform duration-500 ${
                      index === currentPill1Index 
                        ? 'transform translate-y-0' 
                        : index < currentPill1Index 
                          ? 'transform -translate-y-full' 
                          : 'transform translate-y-full'
                    }`}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pill 2 - Left */}
          <div className="absolute top-16 -left-4 z-10">
            <div className="bg-green-400 rounded-full px-3 py-2 flex items-center gap-2 shadow-lg min-w-[220px]">
              <div className="relative w-4 h-4">
                {pill2Content.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Icon
                      key={index}
                      size={16}
                      className={`absolute inset-0 text-gray-800 transition-opacity duration-500 ${
                        index === currentPill2Index ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )
                })}
              </div>
              <div className="relative h-5 overflow-hidden flex-1">
                {pill2Content.map((item, index) => (
                  <span
                    key={index}
                    className={`absolute inset-0 text-gray-800 text-xs font-medium transition-transform duration-500 ${
                      index === currentPill2Index 
                        ? 'transform translate-y-0' 
                        : index < currentPill2Index 
                          ? 'transform -translate-y-full' 
                          : 'transform translate-y-full'
                    }`}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Car Image */}
          <div className="w-full h-48 relative">
            <Image
              src="/images/swift-dzire.png"
              alt="Car"
              fill
              className="object-contain filter brightness-110"
              priority
            />
          </div>
        </div>

        {/* ===== REGISTRATION NUMBER INPUT ===== */}
        <div className="w-full max-w-sm mb-6">
          <div className="bg-gray-800 rounded-2xl p-4">
            <input
              ref={inputRef}
              type="text"
              value={registrationNumber}
              onChange={handleInputChange}
              placeholder="DL 12 AB 2010"
              className="w-full bg-transparent text-white text-center text-2xl font-bold tracking-wider outline-none placeholder-gray-400"
              maxLength={13}
              autoFocus
              inputMode="text"
            />
          </div>
        </div>

        {/* ===== FETCH BUTTON ===== */}
        <div className="w-full max-w-sm">
          <button
            onClick={handleFetchDetails}
            disabled={!registrationNumber.trim() || isLoading}
            className="w-full bg-white text-indigo-700 py-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                Fetching details...
              </>
            ) : (
              'Fetch vehicle details'
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 