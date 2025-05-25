"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Shield, FileText, RefreshCw, CheckCircle } from "lucide-react"

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
  { icon: Shield, text: "Insurance renewals reminder" },
  { icon: CheckCircle, text: "Track fitness certificate" },
  { icon: FileText, text: "Monitor RC status" },
  { icon: RefreshCw, text: "Auto-sync documents" }
]

export default function AddVehicle() {
  const router = useRouter()
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPill1Index, setCurrentPill1Index] = useState(0)
  const [currentPill2Index, setCurrentPill2Index] = useState(0)
  const [inputMode, setInputMode] = useState<"text" | "numeric">("text")
  const [currentStep, setCurrentStep] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

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

  // Determine current input step and format
  const getCurrentInputStep = (cleanInput: string) => {
    const length = cleanInput.length
    
    if (length < 2) {
      return { step: 0, type: "text", description: "State Code (2 letters)", example: "DL" }
    } else if (length < 4) {
      return { step: 1, type: "numeric", description: "District Code (2 digits)", example: "01" }
    } else if (length < 5) {
      // Check if this is old format (single letter) or new format (double letter)
      // At length 4, we're starting the series code
      return { step: 2, type: "text", description: "Series Code (1-2 letters)", example: "A or AB" }
    } else if (length === 5) {
      // Check if 5th character is a letter (continuing series) or number (starting registration)
      const fifthChar = cleanInput[4]
      if (/[A-Z]/.test(fifthChar)) {
        // Still in series code (double letter format)
        return { step: 2, type: "text", description: "Series Code (2nd letter)", example: "AB" }
      } else {
        // Starting registration number (old format with single letter)
        return { step: 3, type: "numeric", description: "Registration Number (1-4 digits)", example: "1234" }
      }
    } else {
      // Length >= 6, definitely in registration number phase
      return { step: 3, type: "numeric", description: "Registration Number (1-4 digits)", example: "1234" }
    }
  }

  // Format registration number input with support for different formats
  const formatRegistrationNumber = (value: string) => {
    // Remove all spaces and convert to uppercase
    const cleaned = value.replace(/\s/g, '').toUpperCase()
    
    // Limit total length
    if (cleaned.length > 10) {
      return registrationNumber // Return previous value if exceeding limit
    }
    
    let formatted = ""
    
    if (cleaned.length >= 1) {
      // State code (2 letters)
      formatted += cleaned.substring(0, Math.min(2, cleaned.length))
    }
    
    if (cleaned.length >= 3) {
      // Add space and district code (2 digits)
      formatted += " " + cleaned.substring(2, Math.min(4, cleaned.length))
    }
    
    if (cleaned.length >= 5) {
      // Add space and series code
      const seriesStart = 4
      let seriesEnd = 5
      
      // Detect format by looking at positions 4 and 5
      if (cleaned.length >= 6) {
        const char5 = cleaned[4] // First series character
        const char6 = cleaned[5] // Could be second series character or first number
        
        if (/[A-Z]/.test(char5) && /[A-Z]/.test(char6)) {
          // Double letter series (new format or Bharat series)
          seriesEnd = 6
        } else if (/[A-Z]/.test(char5) && /[0-9]/.test(char6)) {
          // Single letter series (old format)
          seriesEnd = 5
        }
      }
      
      const seriesCode = cleaned.substring(seriesStart, Math.min(seriesEnd, cleaned.length))
      formatted += " " + seriesCode
      
      // Add registration number if available
      if (cleaned.length > seriesEnd) {
        const regNumber = cleaned.substring(seriesEnd)
        formatted += " " + regNumber
      }
    }
    
    return formatted
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    const cleanInput = value.replace(/\s/g, '')
    
    // Get current step info
    const stepInfo = getCurrentInputStep(cleanInput)
    
    // Filter input based on current step
    let filteredValue = value
    if (stepInfo.type === "text") {
      // Only allow letters and spaces for state/series codes
      filteredValue = value.replace(/[^A-Z\s]/g, '')
    } else {
      // Only allow numbers and spaces for district/registration codes
      filteredValue = value.replace(/[^0-9\s]/g, '')
    }
    
    const formatted = formatRegistrationNumber(filteredValue)
    setRegistrationNumber(formatted)
    
    // Update input mode and step if changed
    const newCleanInput = formatted.replace(/\s/g, '')
    const newStepInfo = getCurrentInputStep(newCleanInput)
    
    if (newStepInfo.step !== currentStep || newStepInfo.type !== inputMode) {
      setCurrentStep(newStepInfo.step)
      setInputMode(newStepInfo.type as "text" | "numeric")
      
      // Force re-focus to apply new input attributes on mobile
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.blur()
          inputRef.current.focus()
        }
      }, 50)
    }
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

  // Get current step info for display
  const currentStepInfo = getCurrentInputStep(registrationNumber.replace(/\s/g, ''))

  return (
    <div className="min-h-screen bg-indigo-600">
      {/* ===== SECTION 1: HEADER ===== */}
        <section className="px-5 pt-5">
          <header className="flex items-center pb-8">
            <button 
              onClick={() => {
                if (window.history.length > 1) {
                  router.back();
                } else {
                  // Fallback if there's no history
                  router.push('/dashboard');
                }
              }}
              className="p-2 bg-indigo-500 rounded-full" // Removed the -ml-2
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-xl font-bold text-white ml-4">Add vehicle</h1>
          </header>
        </section>

      {/* ===== SECTION 2: CAR IMAGE WITH PILLS ===== */}
      <section className="px-5 pt-5">
        <div className="flex flex-col items-center">
          {/* ===== CAR IMAGE WITH ANIMATED PILLS ===== */}
          <div className="relative w-full px-3">
            {/* Pill 1 - Top Right */}
            <div className="absolute -top-8 right-10 z-10">
              <div className="bg-green-400 rounded-full px-3 pt-[0.75rem] pb-[0.5rem] flex items-center gap-2 shadow-lg min-w-[186px]">
                <div className="relative w-4 h-4 pb-5">
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
            <div className="absolute top-6 left-12 z-10">
              <div className="bg-green-400 rounded-full px-3 pt-[0.75rem] pb-[0.5rem] flex items-center gap-2 shadow-lg min-w-[216px]">
                <div className="relative w-4 h-4 pb-5">
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
            <div className="w-full aspect-[4/3] relative">
              <Image
                src="/images/car.png"
                alt="Car"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: REGISTRATION NUMBER AND FETCH BUTTON ===== */}
      <section className="px-5 pt-2">
        <div className="flex flex-col items-center">
          {/* Step indicator */}
          {registrationNumber && (
            <div className="w-full max-w-sm mb-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-xs text-white/90 font-medium">
                  Step {currentStep + 1}: {currentStepInfo.description}
                </div>
                <div className="text-[10px] text-white/70 mt-1">
                  Example: {currentStepInfo.example} • Keyboard: {inputMode === 'text' ? 'Letters (ABC)' : 'Numbers (123)'}
                </div>
              </div>
            </div>
          )}

          {/* ===== REGISTRATION NUMBER INPUT ===== */}
          <div className="w-full max-w-sm mb-6">
            <div className={`relative p-[1px] rounded-2xl transition-all duration-300 ${
              registrationNumber 
                ? 'bg-gradient-to-b from-white/20 to-white' 
                : 'bg-gradient-to-t from-white/50 to-white/10'
            }`}>
            <div className={`rounded-2xl shadow-[0px_25px_50px_0px_rgba(0,0,0,0.15)] backdrop-blur-[2px] p-4 border border-transparent transition-all duration-300 ${
              registrationNumber
                ? 'bg-[#000000] hover:bg-[#000000]'
                : 'bg-gradient-to-b from-[#2C277F] to-[#4F46E5] hover:bg-[#2C277F] hover:border-white'
            }`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={registrationNumber}
                  onChange={handleInputChange}
                  placeholder="DL 01 AB 1234"
                  className="w-full bg-transparent text-white text-center text-2xl font-semibold tracking-wider outline-none placeholder-white/20"
                  maxLength={13}
                  autoFocus
                  inputMode={inputMode}
                  autoComplete="off"
                  autoCapitalize="characters"
                />
              </div>
            </div>
          </div>

          {/* Format examples */}
          {!registrationNumber && (
            <div className="w-full max-w-sm mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-xs text-white/90 font-medium mb-2">Supported Formats:</div>
                <div className="space-y-1 text-[10px] text-white/70">
                  <div>• Old Format: DL 01 A 1234</div>
                  <div>• New Format: DL 01 AB 1234</div>
                  <div>• Bharat Series: BH 01 AA 1234</div>
                </div>
              </div>
            </div>
          )}

          {/* ===== FETCH BUTTON ===== */}
          <div className="w-full max-w-sm">
            <button
              onClick={handleFetchDetails}
              disabled={isLoading}
              className={`w-full bg-white text-indigo-700 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] ${
                !registrationNumber.trim() && !isLoading 
                  ? "cursor-not-allowed"
                  : isLoading 
                    ? "opacity-50 cursor-not-allowed"
                    : ""
              }`}
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
      </section>
    </div>
  )
}