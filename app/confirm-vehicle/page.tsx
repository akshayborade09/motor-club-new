"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Edit, Copy, Pencil } from "lucide-react"
import Avvvatars from 'avvvatars-react'
import { Button } from "@/components/ui/button"
import LandscapeMessage from "@/components/ui/landscape-message"

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

  const handleConfirm = async () => {
    setIsLoading(true)
    
    // Simulate API call to add vehicle
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to dashboard after confirmation
      router.push('/dashboard')
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const handleEdit = () => {
    // Navigate back to add-vehicle page with the registration number as a query parameter
    router.push(`/add-vehicle?regNo=${encodeURIComponent(vehicleData.registration_number)}`)
  }

  return (
    <>
      <LandscapeMessage />
      <div className="min-h-screen flex flex-col">
      {/* ===== HEADER ===== */}
      <header className="bg-white px-4 py-5 flex items-center  justify-between">
        <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
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
      <main className="flex-1 px-5 pt-4 overflow-y-auto pb-24">
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
        <div className="flex justify-center mb-8">
          <div className="flex items-center rounded-[6px] overflow-hidden mx-[2px]" style={{background: 'linear-gradient(90deg, #232B34 0%, #232B34 100%)', height: '24px'}}>
            <div className="flex items-center justify-center bg-[#2563eb]" style={{width: '24px', height: '24px'}}>
              <Image
                  src="/images/reg-img.svg"
                  alt="Registration Icon"
                  width={24}
                  height={24}
                  style={{width: '24px', height: '24px'}}
                />
            </div>
            <span className="px-2 text-white font-semibold text-xs tracking-widest">
              {vehicleData.registration_number}
            </span>
          </div>
        </div>

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
        <div className="bg-white rounded-2xl mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center">
              <Image
                src="/images/insurance-logo/acko.png"
                alt="Acko Insurance"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="gap-1">
              <h3 className="font-bold text-gray-900">{vehicleData.insurance_company}</h3>
              <p className="text-xs text-gray-500">{vehicleData.insurance_policy_type}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-sm text-gray-600">Policy number : </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">{vehicleData.insurance_policy_number}</span>
                <button 
                  onClick={() => copyToClipboard(vehicleData.insurance_policy_number)}
                  className="p-1"
                >
                  <Image
                    src="/images/car-details/copy.svg"
                    alt="Copy"
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-600">Valid till : </span>
              <span className="text-sm font-medium text-gray-900">{vehicleData.insurance_valid_upto}</span>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-600">IDV : </span>
              <span className="text-sm font-medium text-gray-900">₹ {vehicleData.insurance_idv}</span>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-600">Premium : </span>
              <span className="text-sm font-medium text-gray-900">₹ {vehicleData.insurance_premium}</span>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-600">Nominee : </span>
              <span className="text-sm font-medium text-gray-900">{vehicleData.insurance_nominee}</span>
            </div>
          </div>
        </div>
      </main>

      {/* ===== FIXED CONFIRM BUTTON ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white pt-3 pb-6 px-5 border-t border-gray-100">
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
    </>
  )
} 