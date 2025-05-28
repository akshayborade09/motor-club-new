"use client"

import Image from "next/image"
import TapEffect from "@/components/ui/tap-effect"
import { buttonPressHaptic } from "@/utils/haptics"

interface InsuranceData {
  company: string
  logo: string
  policy_type: string
  policy_number: string
  valid_till: string
  idv: string
  premium: string
  nominee: string
}

interface InsuranceDetailsProps {
  insuranceData: InsuranceData
  showTitle?: boolean
}

export default function InsuranceDetails({ insuranceData, showTitle = true }: InsuranceDetailsProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    buttonPressHaptic()
    // You could add a toast notification here
  }

  return (
    <div className="px-4 mb-6">
      {showTitle && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 relative overflow-hidden flex items-center justify-center">
            <Image 
              src="/images/insurance.svg" 
              alt="Insurance" 
              width={20} 
              height={20}
            />
          </div>
          <span className="text-gray-900 text-lg font-bold leading-normal">Insurance</span>
          <div className="px-1.5 py-1 bg-gradient-to-b from-emerald-900 to-emerald-500 rounded-[40px] flex items-center">
            <span className="text-white text-[10px] font-bold leading-none">Active</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center">
            <Image
              src={insuranceData.logo}
              alt="Insurance Company"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="gap-1">
            <h3 className="font-bold text-gray-900">{insuranceData.company}</h3>
            <p className="text-xs text-gray-500">{insuranceData.policy_type}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Policy number :&nbsp;</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">{insuranceData.policy_number}</span>
              <TapEffect 
                onClick={() => copyToClipboard(insuranceData.policy_number)}
                className="p-1"
                scale={0.9}
              >
                <Image
                  src="/images/car-details/copy.svg"
                  alt="Copy"
                  width={16}
                  height={16}
                />
              </TapEffect>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-600">Valid till :&nbsp;</span>
            <span className="text-sm font-medium text-gray-900">{insuranceData.valid_till}</span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-600">IDV :&nbsp;</span>
            <span className="text-sm font-medium text-gray-900">₹ {insuranceData.idv}</span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-600">Premium :&nbsp;</span>
            <span className="text-sm font-medium text-gray-900">₹ {insuranceData.premium}</span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-600">Nominee :&nbsp;</span>
            <span className="text-sm font-medium text-gray-900">{insuranceData.nominee}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 