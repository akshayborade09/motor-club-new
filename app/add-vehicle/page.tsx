"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Shield, FileText, RefreshCw, CheckCircle } from "lucide-react"
import LandscapeMessage from "@/components/ui/landscape-message"
import PageTransition from "@/components/ui/page-transition"
import { navigationHaptic, buttonPressHaptic, successHaptic } from "@/utils/haptics"

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

function AddVehicleContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPill1Index, setCurrentPill1Index] = useState(0)
  const [currentPill2Index, setCurrentPill2Index] = useState(0)
  const [inputMode, setInputMode] = useState<"text" | "numeric">("text")
  const [currentStep, setCurrentStep] = useState(0)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [validationError, setValidationError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle keyboard visibility and viewport adjustments
  useEffect(() => {
    const handleResize = () => {
      // Detect if keyboard is visible by checking viewport height change
      const viewportHeight = window.visualViewport?.height || window.innerHeight
      const windowHeight = window.innerHeight
      const keyboardHeight = windowHeight - viewportHeight
      
      setIsKeyboardVisible(keyboardHeight > 150) // Threshold for keyboard detection
    }

    const handleFocus = () => {
      setIsKeyboardVisible(true)
      // Scroll the input into view with some padding
      setTimeout(() => {
        if (inputRef.current && containerRef.current) {
          const inputRect = inputRef.current.getBoundingClientRect()
          const containerRect = containerRef.current.getBoundingClientRect()
          const viewportHeight = window.visualViewport?.height || window.innerHeight
          
          // Calculate desired position (input should be in upper third of visible area)
          const desiredTop = viewportHeight * 0.3
          const scrollAmount = inputRect.top - desiredTop
          
          if (scrollAmount > 0) {
            window.scrollBy({
              top: scrollAmount,
              behavior: 'smooth'
            })
          }
        }
      }, 300) // Delay to allow keyboard animation
    }

    const handleBlur = () => {
      setTimeout(() => {
        setIsKeyboardVisible(false)
      }, 100)
    }

    // Add event listeners
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
    } else {
      window.addEventListener('resize', handleResize)
    }

    const inputElement = inputRef.current
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus)
      inputElement.addEventListener('blur', handleBlur)
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
      } else {
        window.removeEventListener('resize', handleResize)
      }
      
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus)
        inputElement.removeEventListener('blur', handleBlur)
      }
    }
  }, [])

  // Auto-focus input and show keyboard
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Check for registration number in URL parameters and pre-fill
  useEffect(() => {
    const regNoParam = searchParams.get('regNo')
    if (regNoParam) {
      setRegistrationNumber(regNoParam)
      // Update step and input mode based on the pre-filled value
      const cleanInput = regNoParam.replace(/\s/g, '')
      const stepInfo = getCurrentInputStep(cleanInput)
      setCurrentStep(stepInfo.step)
      setInputMode(stepInfo.type as "text" | "numeric")
    }
  }, [searchParams])

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
    } else if (length === 4) {
      // Starting series code - first letter
      return { step: 2, type: "text", description: "Series Code (1 or 2 letters)", example: "A or AB" }
    } else if (length === 5) {
      // Check if 5th character is a letter (continuing series) or number (starting registration)
      const fifthChar = cleanInput[4]
      if (/[A-Z]/.test(fifthChar)) {
        // Still in series code (second letter)
        return { step: 2, type: "text", description: "Series Code (2nd letter or number for registration)", example: "AB or 1234" }
      } else {
        // Starting registration number (single letter series format)
        return { step: 3, type: "numeric", description: "Registration Number (1-4 digits)", example: "1234" }
      }
    } else if (length === 6) {
      // Check if we have double letter series or single letter + numbers
      const char5 = cleanInput[4]
      const char6 = cleanInput[5]
      
      if (/[A-Z]/.test(char5) && /[A-Z]/.test(char6)) {
        // Double letter series completed, ready for numbers
        return { step: 3, type: "numeric", description: "Registration Number (1-4 digits)", example: "1234" }
      } else if (/[A-Z]/.test(char5) && /[0-9]/.test(char6)) {
        // Single letter series + first number
        return { step: 3, type: "numeric", description: "Registration Number (continue)", example: "1234" }
      }
      // Fallback
      return { step: 3, type: "numeric", description: "Registration Number (1-4 digits)", example: "1234" }
    } else {
      // Length >= 7, definitely in registration number phase
      return { step: 3, type: "numeric", description: "Registration Number (continue)", example: "1234" }
    }
  }

  // Format registration number input with support for different formats
  const formatRegistrationNumber = (value: string) => {
    // Convert to uppercase but preserve spaces for deletion handling
    let input = value.toUpperCase()
    
    // Remove all spaces to get clean input for processing
    let cleaned = input.replace(/\s/g, '')
    
    // Filter out invalid characters based on position and context
    let filteredCleaned = ""
    for (let i = 0; i < cleaned.length && i < 10; i++) {
      const char = cleaned[i]
      if (i < 2) {
        // State code: only letters
        if (/[A-Z]/.test(char)) filteredCleaned += char
      } else if (i < 4) {
        // District code: only numbers
        if (/[0-9]/.test(char)) filteredCleaned += char
      } else if (i === 4) {
        // First series character: only letters
        if (/[A-Z]/.test(char)) filteredCleaned += char
      } else if (i === 5) {
        // Second series character OR first registration number
        // Allow both letters and numbers here
        if (/[A-Z0-9]/.test(char)) filteredCleaned += char
      } else {
        // Registration number: only numbers
        if (/[0-9]/.test(char)) filteredCleaned += char
      }
    }
    
    cleaned = filteredCleaned
    
    // Handle deletion: if input is shorter than current registration (spaces removed), 
    // it means user is deleting, so don't auto-add spaces
    const currentClean = registrationNumber.replace(/\s/g, '')
    const isDeletion = cleaned.length < currentClean.length
    
    let formatted = ""
    
    if (cleaned.length >= 1) {
      // State code (2 letters)
      formatted += cleaned.substring(0, Math.min(2, cleaned.length))
      
      // Add space after state code is complete (2 letters) - but not during deletion
      if (cleaned.length > 2 && !isDeletion) {
        formatted += " "
      }
    }
    
    if (cleaned.length >= 3) {
      // District code (2 digits)
      formatted += cleaned.substring(2, Math.min(4, cleaned.length))
      
      // Add space after district code is complete (2 digits) - but not during deletion
      if (cleaned.length > 4 && !isDeletion) {
        formatted += " "
      }
    }
    
    if (cleaned.length >= 5) {
      // Series code and registration number
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
          // Single letter series + first registration number (old format)
          seriesEnd = 5
        }
      }
      
      const seriesCode = cleaned.substring(seriesStart, Math.min(seriesEnd, cleaned.length))
      formatted += seriesCode
      
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
    
    // Format the value first
    const formatted = formatRegistrationNumber(value)
    
    // Update the registration number
    setRegistrationNumber(formatted)
    
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError("")
    }
    
    // Update input mode and step based on the formatted value
    const cleanInput = formatted.replace(/\s/g, '')
    const stepInfo = getCurrentInputStep(cleanInput)
    
    // Update step and input mode
    setCurrentStep(stepInfo.step)
    setInputMode(stepInfo.type as "text" | "numeric")
  }

  const handleFetchDetails = async () => {
    if (!registrationNumber.trim()) return
    
    // Validate registration number before proceeding
    const error = validateRegistrationNumber(registrationNumber)
    if (error) {
      setValidationError(error)
      return
    }
    
    buttonPressHaptic()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      successHaptic()
      // In real implementation, you would call the actual Vahan API
      console.log('Mock API Response:', mockVahanResponse)
      // Navigate to vehicle confirmation page
      router.push('/confirm-vehicle')
    }, 2000)
  }

  // Validation function for Indian vehicle registration numbers
  const validateRegistrationNumber = (regNumber: string): string => {
    const cleanInput = regNumber.replace(/\s/g, '').toUpperCase()
    
    // Check minimum length
    if (cleanInput.length < 8) {
      return "Registration number is too short"
    }
    
    // Check maximum length
    if (cleanInput.length > 10) {
      return "Registration number is too long"
    }
    
    // Pattern validation for Indian registration numbers
    // Format: XX##XX#### or XX##X#### (where X = letter, # = number)
    const patterns = [
      /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/, // New format: DL01AB1234
      /^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{4}$/, // Old format: DL01A1234
      /^BH[0-9]{2}[A-Z]{2}[0-9]{4}$/,       // Bharat series: BH01AA1234
    ]
    
    const isValidPattern = patterns.some(pattern => pattern.test(cleanInput))
    
    if (!isValidPattern) {
      if (cleanInput.length < 4) {
        return "Enter state and district code"
      } else if (cleanInput.length < 6) {
        return "Enter series code (letters)"
      } else if (cleanInput.length < 8) {
        return "Enter registration number (digits)"
      } else {
        return "Invalid registration number format"
      }
    }
    
    // Validate state code (first 2 letters)
    const stateCode = cleanInput.substring(0, 2)
    const validStateCodes = [
      'AP', 'AR', 'AS', 'BR', 'CG', 'GA', 'GJ', 'HR', 'HP', 'JH', 'KA', 'KL', 
      'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OR', 'PB', 'RJ', 'SK', 'TN', 'TS', 
      'TR', 'UP', 'UK', 'WB', 'AN', 'CH', 'DH', 'DD', 'DL', 'JK', 'LA', 'LD', 
      'PY', 'BH' // Including Bharat series
    ]
    
    if (!validStateCodes.includes(stateCode)) {
      return "Invalid state code"
    }
    
    return "" // No error
  }

  // Get current step info for display
  const currentStepInfo = getCurrentInputStep(registrationNumber.replace(/\s/g, ''))

  return (
    <>
      <LandscapeMessage />
      <PageTransition>
        <div ref={containerRef} className={`min-h-screen bg-indigo-600 ${isKeyboardVisible ? 'pb-4' : ''}`}>
      {/* ===== SECTION 1: HEADER ===== */}
        <section className="px-4 pt-5">
          <header className="flex items-center pb-8 gap-4">
                    <button 
          onClick={() => {
            navigationHaptic();
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
            <h1 className="text-xl font-bold text-white">Add vehicle</h1>
          </header>
        </section>

      {/* ===== SECTION 2: CAR IMAGE WITH PILLS ===== */}
      <section className={`px-5 pt-5 transition-all duration-300 ${isKeyboardVisible ? 'scale-90 opacity-70' : ''}`}>
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
              <div className="bg-green-400 rounded-full px-3 pt-[0.75rem] pb-[0.5rem] flex items-center gap-2 shadow-lg min-w-[220px]">
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
      <section className={`px-5 pt-2 ${isKeyboardVisible ? 'pb-4' : 'pb-8'}`}>
        <div className="flex flex-col items-center">
          {/* Step indicator */}
          <div className="w-full max-w-sm mb-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-xs text-white/90 font-medium">
                Step {currentStep + 1}: {currentStepInfo.description}
              </div>
              <div className="text-[10px] text-white/70 mt-1">
                Example: {currentStepInfo.example} • Keyboard: {
                  currentStep === 2 
                    ? 'Letters (ABC) - 2nd letter or number to continue' 
                    : inputMode === 'text' 
                      ? 'Letters (ABC)' 
                      : 'Numbers (123)'
                }
              </div>
            </div>
          </div>

          {/* ===== REGISTRATION NUMBER INPUT ===== */}
          <div className="w-full max-w-sm mb-6">
            <div className={`relative p-[1px] rounded-2xl transition-all duration-300 ${
              validationError
                ? 'bg-gradient-to-b from-red-400/50 to-red-500/50'
                : registrationNumber 
                  ? 'bg-gradient-to-b from-white/20 to-white' 
                  : 'bg-gradient-to-t from-white/50 to-white/10'
            }`}>
            <div className={`rounded-2xl shadow-[0px_25px_50px_0px_rgba(0,0,0,0.15)] backdrop-blur-[2px] p-4 border transition-all duration-300 ${
              validationError
                ? 'border-red-400/50 bg-[#000000]'
                : registrationNumber
                  ? 'border-transparent bg-[#000000] hover:bg-[#000000]'
                  : 'border-transparent bg-gradient-to-b from-[#2C277F] to-[#4F46E5] hover:bg-[#2C277F] hover:border-white'
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
            
            {/* Validation Error Message */}
            {validationError && (
              <div className="mt-3">
                <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-2 border border-red-400/30">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <span className="text-white text-sm font-medium">{validationError}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Format examples - HIDDEN */}
          {false && !registrationNumber && (
            <div className="w-full max-w-sm mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 ">
                <div className="text-xs text-white/90 font-medium mb-2">Supported Formats:</div>
                <div className="space-y-1 text-[10px] text-white/70">
                  <div>Old style (DL 01 A 1234), New style (DL 01 AB 1234), and Bharat series (BH 01 AA 1234).</div>
                  {/* <div>• New Format: DL 01 AB 1234</div>
                  <div>• Bharat Series: BH 01 AA 1234</div> */}
                </div>
              </div>
            </div>
          )}

          {/* ===== FETCH BUTTON ===== */}
          <div className={`w-full max-w-sm ${isKeyboardVisible ? 'mb-4' : ''}`}>
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
      </PageTransition>
    </>
  )
}

export default function AddVehicle() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddVehicleContent />
    </Suspense>
  )
}