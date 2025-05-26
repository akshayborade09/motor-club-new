"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Edit, Copy, ChevronRight, MoreVertical, PhoneOutgoing, Pencil } from "lucide-react"
import Avvvatars from 'avvvatars-react'
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import LandscapeMessage from "@/components/ui/landscape-message"
import RegistrationNumber from "@/components/ui/registration-number"
import PageTransition from "@/components/ui/page-transition"
import TapEffect from "@/components/ui/tap-effect"
import { navigationHaptic, buttonPressHaptic } from "@/utils/haptics"
import type { UseEmblaCarouselType } from 'embla-carousel-react'

// Mock data - in real app this would come from API/props
const vehicles = [
  {
    id: 1,
    name: "Maruti Suzuki Dzire",
    image: "/images/swift-dzire.png",
    licensePlate: "MH 02 Z 2663",
    owner: {
      name: "Raj Wadhwani",
      avatar: "/images/owner1.jpg",
    },
    insurance: {
      company: "Acko General Insurance",
      logo: "/images/insurance-logo/acko.png",
      policy_type: "Comprehensive policy",
      policy_number: "VPC1748274949000",
      valid_till: "23 Jan 2025",
      idv: "8 L",
      premium: "57,556",
      nominee: "Neetakumari Singh",
    },
    coverages: [
      { id: 1, name: "Third-party\ncoverage", icon: "/images/coverages/third-party-coverages.svg", active: true },
      { id: 2, name: "Death\ncompensation", icon: "/images/coverages/death-compensation.svg", active: true },
      { id: 3, name: "Legal\nliabilities", icon: "/images/coverages/legal-liabilities.svg", active: true },
      { id: 4, name: "Cost of treating\ninjuries", icon: "/images/coverages/cost-treating-injuries.svg", active: true },
      { id: 5, name: "Personal\naccident", icon: "/images/coverages/personal-accident.svg", active: true },
      { id: 6, name: "Own vehicle\ndamage", icon: "/images/coverages/damages-own-car.svg", active: true },
      { id: 7, name: "Theft & fire\ndamage", icon: "/images/coverages/theft-fire-damage.svg", active: true },
      { id: 8, name: "Property\ndamage", icon: "/images/coverages/property-damage.svg", active: true },
      { id: 9, name: "Engine\nprotection", icon: "/images/coverages/engine-protection.svg", active: false },
      { id: 10, name: "Zero\ndepreciation", icon: "/images/coverages/zero-depreciation.svg", active: false },
      { id: 11, name: "Tyre\nprotection", icon: "/images/coverages/tyre-protection.svg", active: false },
      { id: 12, name: "Mechanical\nfailure", icon: "/images/coverages/mechanical-failure.svg", active: false },
      { id: 13, name: "Roadside\nassistance", icon: "/images/coverages/roadside-assistance.svg", active: false },
      { id: 14, name: "Consumables", icon: "/images/coverages/consumables.svg", active: false },
    ]
  },
  {
    id: 2,
    name: "Honda City",
    image: "/images/honda-city.png",
    licensePlate: "MH 04 AB 1234",
    owner: {
      name: "Rahul Sharma",
      avatar: "/images/owner2.jpg",
    },
    insurance: {
      company: "HDFC ERGO General Insurance",
      logo: "/images/insurance-logo/hdfc-ergo.png",
      policy_type: "Third-party policy",
      policy_number: "HDC2849573821000",
      valid_till: "15 Mar 2025",
      idv: "12 L",
      premium: "23,890",
      nominee: "Sunita Sharma",
    },
    coverages: [
      { id: 1, name: "Third-party\ncoverage", icon: "/images/coverages/third-party-coverages.svg", active: true },
      { id: 2, name: "Death\ncompensation", icon: "/images/coverages/death-compensation.svg", active: true },
      { id: 3, name: "Legal\nliabilities", icon: "/images/coverages/legal-liabilities.svg", active: true },
      { id: 4, name: "Cost of treating\ninjuries", icon: "/images/coverages/cost-treating-injuries.svg", active: false },
      { id: 5, name: "Personal\naccident", icon: "/images/coverages/personal-accident.svg", active: false },
      { id: 6, name: "Own vehicle\ndamage", icon: "/images/coverages/damages-own-car.svg", active: false },
      { id: 7, name: "Theft & fire\ndamage", icon: "/images/coverages/theft-fire-damage.svg", active: false },
      { id: 8, name: "Property\ndamage", icon: "/images/coverages/property-damage.svg", active: true },
      { id: 9, name: "Engine\nprotection", icon: "/images/coverages/engine-protection.svg", active: false },
      { id: 10, name: "Zero\ndepreciation", icon: "/images/coverages/zero-depreciation.svg", active: false },
      { id: 11, name: "Tyre\nprotection", icon: "/images/coverages/tyre-protection.svg", active: false },
      { id: 12, name: "Mechanical\nfailure", icon: "/images/coverages/mechanical-failure.svg", active: false },
      { id: 13, name: "Roadside\nassistance", icon: "/images/coverages/roadside-assistance.svg", active: false },
      { id: 14, name: "Consumables", icon: "/images/coverages/consumables.svg", active: false },
    ]
  },
  {
    id: 3,
    name: "Royal Enfield Classic",
    image: "/images/roayl-enfield.png",
    licensePlate: "MH 02 CD 5678",
    owner: {
      name: "Priya Verma",
      avatar: "/images/owner3.jpg",
    },
    insurance: {
      company: "Bajaj Allianz General Insurance",
      logo: "/images/insurance-logo/bajaj-allianz.png",
      policy_type: "Comprehensive policy",
      policy_number: "BAJ9847362851000",
      valid_till: "08 Jul 2025",
      idv: "2.5 L",
      premium: "18,750",
      nominee: "Amit Verma",
    },
    coverages: [
      { id: 1, name: "Third-party\ncoverage", icon: "/images/coverages/third-party-coverages.svg", active: true },
      { id: 2, name: "Death\ncompensation", icon: "/images/coverages/death-compensation.svg", active: true },
      { id: 3, name: "Legal\nliabilities", icon: "/images/coverages/legal-liabilities.svg", active: true },
      { id: 4, name: "Cost of treating\ninjuries", icon: "/images/coverages/cost-treating-injuries.svg", active: true },
      { id: 5, name: "Personal\naccident", icon: "/images/coverages/personal-accident.svg", active: true },
      { id: 6, name: "Own vehicle\ndamage", icon: "/images/coverages/damages-own-car.svg", active: true },
      { id: 7, name: "Theft & fire\ndamage", icon: "/images/coverages/theft-fire-damage.svg", active: true },
      { id: 8, name: "Property\ndamage", icon: "/images/coverages/property-damage.svg", active: true },
      { id: 9, name: "Engine\nprotection", icon: "/images/coverages/engine-protection.svg", active: true },
      { id: 10, name: "Zero\ndepreciation", icon: "/images/coverages/zero-depreciation.svg", active: true },
      { id: 11, name: "Tyre\nprotection", icon: "/images/coverages/tyre-protection.svg", active: true },
      { id: 12, name: "Mechanical\nfailure", icon: "/images/coverages/mechanical-failure.svg", active: false },
      { id: 13, name: "Roadside\nassistance", icon: "/images/coverages/roadside-assistance.svg", active: true },
      { id: 14, name: "Consumables", icon: "/images/coverages/consumables.svg", active: false },
    ]
  },
]



const actionItems = [
  {
    id: 1,
    title: "Claim process",
    icon: "/images/claim-process.svg",
    description: "File and track insurance claims"
  },
  {
    id: 2,
    title: "Policy documents",
    icon: "/images/polciy-doc.svg",
    description: "View and download policy papers"
  },
  {
    id: 3,
    title: "Insured members",
    icon: "/images/insured-member.svg",
    description: "Manage covered family members"
  },
  {
    id: 4,
    title: "About insurer",
    icon: "/images/about-insurer.svg",
    description: "Company information and ratings"
  },
  {
    id: 5,
    title: "Contact insurer",
    icon: "/images/contact-insurer.svg",
    description: "Get in touch with support"
  },
]

export default function Insurance() {
  const router = useRouter()
  const [selected, setSelected] = useState(0)
  const [carouselApi, setCarouselApi] = useState<UseEmblaCarouselType[1] | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    buttonPressHaptic()
    // You could add a toast notification here
  }

  const currentVehicle = vehicles[selected]
  const activeCoverages = currentVehicle?.coverages.filter(c => c.active).length || 0
  const inactiveCoverages = currentVehicle?.coverages.filter(c => !c.active).length || 0

  return (
    <>
      <LandscapeMessage />
      <PageTransition>
        <div className="min-h-screen bg-white">
          {/* ===== HEADER ===== */}
          <header className="bg-white px-4 py-5 flex items-center justify-between">
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
              <h1 className="text-xl font-bold text-gray-900">Insurance</h1>
            </div>
            <div className="flex items-center gap-3">
              <TapEffect 
                className="bg-[#E13F48] text-white px-2 pt-0.5 pb-0 flex flex-col items-center justify-center gap-0.5 w-10 h-10" 
                style={{ borderRadius: '10px' }}
                onClick={() => buttonPressHaptic()}
                scale={0.9}
              >
                <PhoneOutgoing size={16} strokeWidth={2} fill="white" style={{ fill: "white" }} />
                <span style={{ fontFamily: "'Open Sauce One', sans-serif", fontSize: '10px', fontWeight: 'bold' }}>SOS</span>
              </TapEffect>
              <TapEffect 
                className="p-2.5 bg-gray-100 rounded-full"
                onClick={() => buttonPressHaptic()}
                scale={0.9}
              >
                <MoreVertical size={20} className="text-gray-900" />
              </TapEffect>
            </div>
          </header>

          {/* ===== VEHICLE SECTION ===== */}
          <div className="relative pb-8">
            {/* ===== VEHICLE OWNER INFO ===== */}
            {vehicles[selected]?.owner && (
              <div className="w-full flex justify-center items-center mb-3 h-fit">
                <div className="flex flex-col items-center" style={{ width: 'max-content' }}>
                  <svg width="24" height="8" viewBox="0 0 24 8" className="mx-auto" style={{ display: 'block' }} fill="white">
                    <polygon points="0,0 24,0 12,8" fill="white" />
                  </svg>
                  <div className="relative bg-white rounded-full pt-1 pb-1 pl-1 pr-2 flex items-center gap-1 shadow-sm" style={{ borderRadius: '2rem', boxShadow: '0 2px 12px 0 rgba(16,30,54,0.06)' }}>
                    <div className="w-8 h-8">
                      <Avvvatars
                        value={vehicles[selected].owner.name}
                        style="shape"
                        size={32}
                        shadow={true}
                        border={true}
                        borderSize={2}
                        borderColor="#fff"
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700">{vehicles[selected].owner.name}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ===== VEHICLE CAROUSEL ===== */}
            <Carousel
              opts={{ align: "center", loop: false }}
              className="w-full"
              setApi={(api) => {
                setCarouselApi(api || null);
                if (api) {
                  api.on('select', () => {
                    const selectedIndex = api.selectedScrollSnap();
                    setSelected(selectedIndex);
                  });
                }
              }}
            >
              <CarouselContent>
                {vehicles.map((vehicle, idx) => (
                  <CarouselItem
                    key={vehicle.id}
                    className="flex items-center justify-center"
                    style={{
                      width: "60vw",
                      aspectRatio: "4/1.92",
                      position: "relative",
                      transform: `scale(${selected === idx ? 0.8 : 0.7})`,
                      transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
                      zIndex: selected === idx ? 10 : 1,
                      height: "80%",
                    }}
                  >
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className="object-contain rounded-xl w-full h-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* ===== VEHICLE NAME ===== */}
            <h2 className="text-center text-xl font-bold text-coolgray-900 mt-2">{vehicles[selected]?.name}</h2>

            {/* ===== VEHICLE REGISTRATION NUMBER ===== */}
            <RegistrationNumber 
              registrationNumber={vehicles[selected]?.licensePlate || ""}
              size="medium"
              className="mt-2"
            />
          </div>

          {/* ===== INSURANCE DETAILS ===== */}
          <div className="px-4 mb-6">
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

            <div className="bg-white rounded-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center">
                  <Image
                    src={currentVehicle?.insurance.logo || "/images/insurance-logo/acko.png"}
                    alt="Insurance Company"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="gap-1">
                  <h3 className="font-bold text-gray-900">{currentVehicle?.insurance.company}</h3>
                  <p className="text-xs text-gray-500">{currentVehicle?.insurance.policy_type}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">Policy number : </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{currentVehicle?.insurance.policy_number}</span>
                    <TapEffect 
                      onClick={() => copyToClipboard(currentVehicle?.insurance.policy_number || '')}
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
                  <span className="text-sm text-gray-600">Valid till : </span>
                  <span className="text-sm font-medium text-gray-900">{currentVehicle?.insurance.valid_till}</span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm text-gray-600">IDV : </span>
                  <span className="text-sm font-medium text-gray-900">₹ {currentVehicle?.insurance.idv}</span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm text-gray-600">Premium : </span>
                  <span className="text-sm font-medium text-gray-900">₹ {currentVehicle?.insurance.premium}</span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm text-gray-600">Nominee : </span>
                  <span className="text-sm font-medium text-gray-900">{currentVehicle?.insurance.nominee}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-b border-gray-100 mx-4 mb-6"></div>

          {/* ===== COVERAGES SECTION ===== */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4 px-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 relative overflow-hidden flex items-center justify-center">
                    <Image 
                    src="/images/coverages.svg" 
                    alt="Insurance" 
                    width={20} 
                    height={20}
                    />
                </div>
                <span className="text-gray-900 text-lg font-bold leading-normal">Coverages</span>
                <span className="text-gray-900 text-md font-bold leading-normal">({activeCoverages} active & {inactiveCoverages} inactive)</span>
              </div>
              <TapEffect 
                className="p-2 bg-gray-100 rounded-full"
                onClick={() => buttonPressHaptic()}
                scale={0.9}
              >
                <Pencil size={16} className="text-gray-600" strokeWidth={2.5} />
              </TapEffect>
            </div>

            {/* Horizontal scroll of coverages - end to end */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-4">
              {currentVehicle?.coverages.map((coverage) => (
                <div key={coverage.id} className="flex-shrink-0 flex flex-col items-center gap-3 w-24">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    coverage.active ? 'bg-indigo-50' : 'bg-gray-100'
                  }`}>
                    <Image
                      src={coverage.icon}
                      alt={coverage.name}
                      width={64}
                      height={64}
                      className={`w-16 h-16 object-contain ${coverage.active ? 'opacity-100' : 'grayscale opacity-70'}`}
                    />
                  </div>
                  <span className={`text-xs text-center leading-tight h-8 flex justify-center whitespace-pre-line ${
                    coverage.active ? 'text-gray-900 font-medium' : 'text-gray-500'
                  }`}>
                    {coverage.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ===== ACTION ITEMS LIST ===== */}
          <div className="px-4 pb-8">
            <div className="border border-gray-100 rounded-2xl overflow-hidden py-2">
                {actionItems.map((item, index) => (
                <>
                    <TapEffect
                    key={item.id}
                    className="bg-white p-2 flex items-center justify-between"
                    onClick={() => buttonPressHaptic()}
                    scale={0.98}
                    >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                        <Image
                            src={item.icon}
                            alt={item.title}
                            width={20}
                            height={20}
                        />
                        </div>
                        <div>
                        <h3 className="text-gray-900 font-semibold text-sm mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-xs">{item.description}</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                    </TapEffect>
                    {index !== actionItems.length - 1 && (
                    <div className="border-b border-gray-100 mt-2 mb-2" />
                    )}
                </>
                ))}
            </div>
        </div>
        </div>
      </PageTransition>
    </>
  )
} 