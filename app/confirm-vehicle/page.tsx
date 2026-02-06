"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Edit, Copy, Pencil } from "lucide-react"
import Avvvatars from 'avvvatars-react'
import { Button } from "@/components/ui/button"
import LandscapeMessage from "@/components/ui/landscape-message"
import BottomSheet from "@/components/ui/bottom-sheet"
import RegistrationNumber from "@/components/ui/registration-number"
import PageTransition from "@/components/ui/page-transition"
import TapEffect from "@/components/ui/tap-effect"
import InsuranceDetails from "@/components/ui/insurance-details"
import { navigationHaptic, buttonPressHaptic, successHaptic } from "@/utils/haptics"

// Mock vehicle data (this would come from the API response)
const vehicleData = {
  registration_number: "MH 02 Z 2663",
  owner_name: "Raj Wadhwani",
  vehicle_class: "Motor Car",
  fuel_type: "Petrol",
  manufacturer: "Maruti Suzuki",
  model: "Dzire",
  registration_date: "2018-07-15",
  engine_number: "K12MN345678",
  chassis_number: "MA3FHEB1S00712345",
  rc_status: "Active",
  vehicle_category: "LMV",
  pucc_status: "Valid",
  pucc_valid_upto: "2025-02-14",
  insurance_status: "Valid",
  insurance_company: "Acko General Insurance",
  insurance_policy_type: "Comprehensive policy",
  insurance_policy_number: "VPC1748274949000",
  insurance_valid_upto: "23 Jan 2025",
  insurance_idv: "8 L",
  insurance_premium: "57,556",
  insurance_nominee: "Neetakumari Singh",
  fitness_status: "Valid",
  fitness_valid_upto: "2033-07-14",
  registration_authority: "RTO Pune",
  permit_type: "Private",
  blacklist_status: "Not Blacklisted",
  hypothecation: "HDFC Bank",
  // Vehicle specifications
  seats: 5,
  bags: 4,
  doors: 4,
  transmission: "Auto"
}

export default function ConfirmVehicle() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessSheet, setShowSuccessSheet] = useState(false)

  const handleConfirm = async () => {
    buttonPressHaptic()
    setIsLoading(true)
    
    // Simulate API call to add vehicle
    setTimeout(() => {
      setIsLoading(false)
      successHaptic()
      // Show success bottom sheet instead of immediate navigation
      setShowSuccessSheet(true)
    }, 1500)
  }

  const handleSuccessClose = () => {
    setShowSuccessSheet(false)
    // Navigate to dashboard after closing the success sheet
    setTimeout(() => {
      router.push('/dashboard')
    }, 300) // Small delay for smooth transition
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const handleEdit = () => {
    buttonPressHaptic()
    // Navigate back to add-vehicle page with the registration number as a query parameter
    router.push(`/add-vehicle?regNo=${encodeURIComponent(vehicleData.registration_number)}`)
  }

  // Transform vehicle data to match InsuranceDetails component interface
  const insuranceData = {
    company: vehicleData.insurance_company,
    logo: "/images/insurance-logo/acko.png",
    policy_type: vehicleData.insurance_policy_type,
    policy_number: vehicleData.insurance_policy_number,
    valid_till: vehicleData.insurance_valid_upto,
    idv: vehicleData.insurance_idv,
    premium: vehicleData.insurance_premium,
    nominee: vehicleData.insurance_nominee,
  }

  return (
    <>
      <LandscapeMessage />
      <PageTransition>
        <div className="h-full flex flex-col relative">
      {/* ===== HEADER ===== */}
      <header className="bg-white px-4 pb-5 flex items-center justify-between" style={{ paddingTop: 'max(20px, env(safe-area-inset-top))' }}>
        <div className="flex items-center gap-4">
        <button 
          onClick={() => {
            navigationHaptic();
            router.back();
          }}
          className="p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} strokeWidth={2.5} className="text-gray-800" />
        </button>
          <h1 className="text-xl font-bold text-gray-900">Confirm vehicle</h1>
        </div>
        <button 
          onClick={handleEdit}
          className="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          <Pencil size={20} strokeWidth={2.5} className="text-gray-800" />
        </button>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 px-4 pt-4 overflow-y-auto scrollbar-hide" style={{ paddingBottom: '300px' }}>
        {/* ===== OWNER INFO ===== */}
        <div className="flex justify-center mb-">
          <div className="relative bg-white rounded-full pt-1 pb-1 pl-1 pr-2 flex items-center gap-1 shadow-sm" style={{ borderRadius: '2rem', boxShadow: '0 2px 12px 0 rgba(16,30,54,0.06)' }}>
            <div className="w-8 h-8">
              <Avvvatars
                value={vehicleData.owner_name}
                style="shape"
                size={32}
                shadow={true}
                border={true}
                borderSize={2}
                borderColor="#fff"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{vehicleData.owner_name}</span>
          </div>
        </div>

        {/* ===== VEHICLE IMAGE ===== */}
        <div className="flex justify-center mb-6">
          <div className="w-80 h-48 relative">
            <Image
              src="/images/swift-dzire.png"
              alt="Vehicle"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* ===== VEHICLE NAME ===== */}
        <h2 className="text-center text-xl font-bold text-coolgray-900 mb-2">
          {vehicleData.manufacturer} {vehicleData.model}
        </h2>

        {/* ===== REGISTRATION NUMBER ===== */}
        <RegistrationNumber 
          registrationNumber={vehicleData.registration_number}
          size="medium"
          className="mb-8"
        />

        {/* ===== VEHICLE SPECS ===== */}
        <div className="grid grid-cols-4 divide-x divide-gray-100 gap-4 mb-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Image
                src="/images/car-details/seats.svg"
                alt="Seats"
                width={24}
                height={24}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{vehicleData.seats} seats</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Image
                src="/images/car-details/bags.svg"
                alt="Bags"
                width={24}
                height={24}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{vehicleData.bags} bags</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Image
                src="/images/car-details/car-door.svg"
                alt="Doors"
                width={24}
                height={24}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{vehicleData.doors} doors</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Image
                src="/images/car-details/engine.svg"
                alt="Engine"
                width={24}
                height={24}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{vehicleData.transmission}</span>
          </div>
        </div>
        
        {/* Horizontal line */}
        <div className="border-b border-gray-100 mb-6"></div>

        {/* ===== INSURANCE DETAILS ===== */}
        <div className="px-0">
          <InsuranceDetails 
            insuranceData={insuranceData} 
            showTitle={false} 
          />
        </div>
      </main>

      {/* ===== FIXED CONFIRM BUTTON ===== */}
      <div className="absolute bottom-0 left-0 right-0 bg-white pt-3 px-5 border-t border-gray-100" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <Button
          variant="primary-medium"
          size="primary-medium"
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding vehicle...
            </>
          ) : (
            <>
              Confirm
              <ArrowLeft size={20} className="rotate-180" />
            </>
          )}
        </Button>
      </div>
    </div>
      </PageTransition>

    {/* Success Bottom Sheet */}
    <BottomSheet
      isOpen={showSuccessSheet}
      onClose={handleSuccessClose}
      title="Car added to motor club"
      showCloseButton={false}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Success Icon */}
        {/* <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div> */}

                 {/* Vehicle Info */}
         <div className="text-center">
           <div className="w-32 h-20 relative mx-auto mb-4">
             <Image
               src="/images/swift-dzire.png"
               alt="Vehicle"
               fill
               className="object-contain"
             />
           </div>
           <h3 className="text-lg font-semibold text-gray-900 mb-2">
             {vehicleData.manufacturer} {vehicleData.model}
           </h3>
           <RegistrationNumber 
             registrationNumber={vehicleData.registration_number}
             size="small"
             className=""
           />
         </div>

        {/* Features List */}
        <div className="w-full space-y-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span>Track insurance status and renewals</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span>Recharge FASTag instantly</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span>Check and pay traffic challans</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span>Monitor PUC certificate validity</span>
          </div>
        </div>

        {/* Okay Button */}
        <Button
          variant="primary-medium"
          size="primary-medium"
          onClick={handleSuccessClose}
          className="w-full mt-6"
        >
          Okay
        </Button>
      </div>
    </BottomSheet>
    </>
  )
} 