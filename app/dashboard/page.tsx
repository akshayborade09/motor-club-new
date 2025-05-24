"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Avvvatars from 'avvvatars-react'
import {
  ArrowRight,
  Shield,
  Car,
  FileText,
  Activity,
  Plus,
  MapPin,
  ChevronDown,
  AlertTriangle,
  MoreVertical,
  CirclePlus,
  PhoneOutgoing,
  RotateCwSquare,
} from "lucide-react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { UseEmblaCarouselType } from 'embla-carousel-react'
import { useOrientation } from "../hooks/useOrientation"
import OrientationMessage from "../components/OrientationMessage"

export default function Dashboard() {
  const [selected, setSelected] = useState(0)
  const [carouselApi, setCarouselApi] = useState<UseEmblaCarouselType[1] | null>(null)
  const { orientation, device } = useOrientation()
  const router = useRouter()
  
  // If in landscape mode or on desktop, show the orientation message
  if (orientation === 'landscape' || device === 'desktop') {
    return <OrientationMessage device={device} />
  }

  const vehicles = [
    {
      id: 1,
      name: "Maruti Suzuki Dzire",
      image: "/images/swift-dzire.png",
      licensePlate: "MH 02 Z 2663",
      owner: {
        name: "Neetakuamri Singh",
        avatar: "/images/owner1.jpg",
      },
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
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HEADER SECTION ===== */}
      <header className="bg-white px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Motor Club</h1>
        <div className="flex items-center gap-3">
          <button className="bg-[#E13F48] text-white px-2 pt-0.5 pb-0 flex flex-col items-center justify-center gap-0.5 w-10 h-10" style={{ borderRadius: '10px' }}>
            <PhoneOutgoing size={16} strokeWidth={2} fill="white" style={{ fill: "white" }} />
            <span className="font-opensauce text-[10px] font-bold">SOS</span>
          </button>
          <button className="p-2.5 bg-gray-100 rounded-full">
            <MoreVertical size={20} className="text-gray-900" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="pb-6">
        {/* ===== VEHICLE DISPLAY SECTION ===== */}
        <div className="relative">
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
          <div className="flex justify-center mt-2">
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
              <span className="ml-2 mr-2 text-white font-opensauce font-bold text-[10px] tracking-[0.1em] leading-[14px]">
                {vehicles[selected]?.licensePlate}
              </span>
            </div>
          </div>
        </div>

        {/* ===== VEHICLE TABS WITH ADD BUTTON ===== */}
        <div className="mt-8 flex justify-start border-b border-gray-200 px-3">
          <div className="flex items-end gap-3">
            {vehicles.map((vehicle, index) => (
              <button
                key={vehicle.id}
                onClick={() => {
                  setSelected(index);
                  if (carouselApi) {
                    carouselApi.scrollTo(index);
                  }
                }}
                className="flex flex-col items-center group relative"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <div className="flex items-center justify-center" style={{ height: '24px' }}>
                  <Image
                    src={vehicle.image || "/placeholder.svg?height=40&width=40&query=vehicle"}
                    alt={vehicle.name}
                    width={0}
                    height={24}
                    style={{ height: '24px', width: 'auto' }}
                    className="object-contain"
                  />
                </div>
                <div className="h-1 w-14 mt-2" style={{ visibility: selected === index ? 'visible' : 'hidden' }}>
                  {selected === index && (
                    <div className="h-1 w-full bg-indigo-500 rounded-full transition-all duration-200" />
                  )}
                </div>
              </button>
            ))}
            <button 
              className="flex flex-col items-center"
              onClick={() => router.push('/add-vehicle')}
            >
              <div className="flex items-center justify-center" style={{ height: '24px' }}>
                <CirclePlus 
                  size={28} 
                  className="text-gray-800" 
                  strokeWidth={1} 
                />
              </div>
              <div className="h-1 w-6 mt-2" style={{ visibility: 'hidden' }}></div>
            </button>
          </div>
        </div>

        {/* ===== VEHICLE DOCUMENTS SECTION ===== */}
        <div className="flex flex-col gap-4 px-4 mt-4">
          {/* ===== INSURANCE CARD ===== */}
          <div className="bg-indigo-50 rounded-2xl p-3 flex flex-col gap-4">
            {/* Top row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 overflow-hidden flex items-center justify-center">
                <Image 
                  src="/images/insurance.svg" 
                  alt="Insurance" 
                  width={20} 
                  height={20}
                />
              </div>
                <span className="text-gray-900 text-base font-bold leading-normal">Insurance</span>
                <div className="px-1.5 py-1 bg-gradient-to-b from-emerald-900 to-emerald-500 rounded-[40px] flex items-center">
                  <span className="text-white text-[10px] font-bold leading-none">Active</span>
                </div>
              </div>
              <span className="text-gray-700 text-xs font-medium leading-none">valid till 23 Jan 2025</span>
            </div>
            
            {/* Bottom row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 relative bg-white rounded-xl outline outline-1 outline-offset-[-0.50px] outline-white overflow-hidden flex items-center justify-center">
                  <img 
                    src="/images/insurance-logo/acko.png" 
                    alt="Acko Insurance" 
                    className="object-contain w-10 h-auto"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-gray-800 text-sm font-medium leading-tight">Acko General Insuance</div>
                  <div className="text-gray-600 text-xs font-normal leading-none">Comprehensive policy</div>
                </div>
              </div>
              <div className="w-8 h-8 bg-white rounded-[30px] flex items-center justify-center">
                <ArrowRight size={20} className="text-gray-600" />
              </div>
            </div>
          </div>

          {/* ===== FASTAG CARD ===== */}
          <div className="p-3 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col gap-4">
            {/* Top row */}
            <div className="flex justify-between items-center h-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 relative overflow-hidden flex items-center justify-center">
                    <img 
                      src="/images/fastag.svg" 
                      alt="FASTag" 
                      width={20} 
                      height={20}
                    />
                  </div>
                  <div className="text-gray-900 text-base font-bold leading-normal">FASTag</div>
                </div>
                <div className="px-1.5 py-1 bg-gradient-to-b from-emerald-900 to-emerald-500 rounded-[40px] flex items-center">
                  <div className="text-white text-[10px] font-bold leading-none">Active</div>
                </div>
              </div>
              <div className="flex items-center gap-3"></div>
            </div>
            
            {/* Bottom row */}
            <div className="flex items-center gap-3">
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 relative bg-white rounded-xl outline outline-1 outline-offset-[-0.50px] outline-gray-200 flex items-center justify-center p-2">
                  <Image 
                    src="/images/insurance-logo/hdfc-ergo.png" 
                    alt="HDFC Bank" 
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-800 text-sm font-semibold leading-none">HDFC Bank</div>
                    <div className="flex items-center gap-2">
                      <div>
                        <span className="text-gray-800 text-base font-bold font-['Inter'] leading-tight">₹</span>
                        <span className="text-gray-800 text-base font-bold leading-tight"> 510</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-24 h-8 px-2 py-1.5 bg-indigo-800 rounded-lg flex justify-center items-center gap-0.5">
                <div className="text-white text-xs font-bold leading-none">Recharge</div>
                <div className="w-4 h-4 relative flex items-center justify-center">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* ===== CHALLAN CARD ===== */}
          <div className="px-3 py-4 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center gap-6">
            <div className="flex-1 flex flex-col gap-4">
              {/* Top row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 relative overflow-hidden flex items-center justify-center">
                    <img 
                      src="/images/challan.svg" 
                      alt="Challan" 
                      width={20} 
                      height={20}
                    />
                  </div>
                  <div className="text-gray-900 text-base font-bold leading-normal">Challan</div>
                </div>
                <div className="flex items-center gap-[3px]">
                  <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
                    <img 
                      src="/images/exclamation.svg" 
                      alt="Alert" 
                      width={20} 
                      height={2}
                      className="text-red-600"
                    />
                  </div>
                  <div className="text-red-600 text-xs font-medium leading-none">Needs attention</div>
                </div>
              </div>
              
              {/* Bottom row */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <div className="text-gray-800 text-sm font-semibold leading-none">1 Challan found</div>
                  <div className="text-gray-500 text-xs font-normal leading-none">last checked on 03 Mar 2025</div>
                </div>
                <div className="w-24 h-8 px-2 py-1.5 bg-indigo-800 rounded-lg flex justify-center items-center gap-0.5">
                  <div className="text-white text-xs font-bold leading-none">Pay now</div>
                  <div className="w-4 h-4 relative flex items-center justify-center">
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== PUC CARD ===== */}
          <div className="px-3 py-4 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-between items-center">
            <div className="w-48 flex flex-col justify-center items-start gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 relative overflow-hidden flex items-center justify-center">
                      <img 
                        src="/images/puc.svg" 
                        alt="PUC" 
                        width={20} 
                        height={20}
                      />
                    </div>
                    <div className="text-gray-900 text-base font-bold leading-normal">PUC</div>
                  </div>
                  <div className="px-1.5 py-1 bg-gradient-to-b from-emerald-900 to-emerald-500 rounded-[40px] flex justify-start items-center gap-1 overflow-hidden">
                    <div className="text-white text-[10px] font-bold leading-none">Active</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2">
                <div className="text-gray-500 text-xs font-normal leading-none">expiry 03 Mar 2025</div>
              </div>
            </div>
            <div className="w-24 h-8 px-2 py-1.5 bg-gray-200 rounded-[10px] flex justify-center items-center gap-0.5">
              <div className="text-gray-900 text-xs font-bold leading-none">Set reminder</div>
            </div>
          </div>
        </div>

        {/* ===== FUEL PRICES SECTION ===== */}
        <div className="mt-8 px-4 flex flex-col gap-4">
          <div className="flex justify-start items-center gap-5">
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="text-gray-900 text-xl font-bold leading-normal">Fuel prices</div>
              <div className="text-slate-600 text-xs font-normal leading-none tracking-tight">updated as of 6th March 2024</div>
            </div>
            <div className="p-2 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-slate-200 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src="/images/location.svg" 
                    alt="Location" 
                    width={16}
                    height={16}
                  />
                </div>
                <div className="text-gray-900 text-xs font-bold leading-none">Location :  Delhi</div>
              </div>
              <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
                <img 
                  src="/images/dropdown.svg" 
                  alt="Dropdown" 
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
          
          <div className="py-3 bg-slate-100 rounded-2xl flex justify-between items-center">
            <div className="flex-1 flex flex-col items-center gap-2.5">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 bg-white rounded-3xl flex items-center justify-center">
                  <img 
                    src="/images/petrol.svg" 
                    alt="Petrol" 
                    width={20}
                    height={20}
                  />
                </div>
                <div className="text-gray-900 text-xs font-bold leading-none">Petrol</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-gray-900 text-lg font-bold leading-relaxed">₹ 103.21</div>
                <div className="text-gray-500 text-xs font-normal leading-none">per litre</div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center gap-2.5">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 bg-white rounded-3xl flex items-center justify-center">
                  <img 
                    src="/images/diesel.svg" 
                    alt="Diesel" 
                    width={20}
                    height={20}
                  />
                </div>
                <div className="text-gray-900 text-xs font-bold leading-none">Diesel</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-gray-900 text-lg font-bold leading-relaxed">₹ 99.87</div>
                <div className="text-gray-500 text-xs font-normal leading-none">per litre</div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center gap-2.5">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 bg-white rounded-3xl flex items-center justify-center">
                  <img 
                    src="/images/cng.svg" 
                    alt="CNG" 
                    width={20}
                    height={20}
                  />
                </div>
                <div className="text-gray-900 text-xs font-bold leading-none">CNG</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-gray-900 text-lg font-bold leading-relaxed">₹ 72.65</div>
                <div className="text-gray-500 text-xs font-normal leading-none">per kg</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
