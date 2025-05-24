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
            <span style={{ fontFamily: "'Open Sauce One', sans-serif", fontSize: '10px', fontWeight: 'bold' }}>SOS</span>
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
              <span className="ml-2 mr-2"
                style={{
                  color: '#fff',
                  fontFamily: 'Open Sauce One, monospace',
                  fontWeight: 700,
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  lineHeight: '14px',
                  display: 'inline-block',
                }}
              >
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
          <div className="bg-indigo-50 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-gray-800" />
                <span className="font-bold text-coolgray-900">Insurance</span>
                <span className="bg-gradient-to-b from-emerald-900 to-emerald-500 text-white rounded-[40px] inline-flex justify-start items-center px-1.5 py-1.5 text-xs font-semibold  font-['Open_Sauce_One'] leading-none">Active</span>
              </div>
              <span className="text-gray-700 text-xs font-medium font-['Open_Sauce_One'] leading-none">valid till 23 Jan 2025</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-xs">ACKO</span>
                </div>
                <div>
                  <div className="text-gray-800 text-sm font-medium font-['Open_Sauce_One'] leading-tight">Acko General Insurance</div>
                  <div className="text-gray-600 text-xs font-normal font-['Open_Sauce_One'] leading-none">Comprehensive policy</div>
                </div>
              </div>
              <ArrowRight size={20} className="text-gray-400" />
            </div>
          </div>

          {/* ===== FASTAG CARD ===== */}
          <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Car size={20} className="text-gray-800" />
                <span className="font-bold text-coolgray-900">FASTag</span>
                <span className="bg-gradient-to-b from-emerald-900 to-emerald-500 text-white rounded-[40px] inline-flex justify-start items-center px-1.5 py-1.5 text-xs font-medium font-['Open_Sauce_One'] leading-none">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <Image src="/generic-financial-logo.png" alt="HDFC Bank" width={30} height={30} />
                </div>
                <div>
                  <div className="text-gray-800 text-sm font-medium font-['Open_Sauce_One'] leading-tight">HDFC Bank</div>
                  <div>
                    <span className="text-gray-800 text-base font-bold font-['Inter'] leading-tight">₹</span>
                    <span className="text-gray-800 text-base font-bold font-['Open_Sauce_One'] leading-tight"> 510</span>
                  </div>
                </div>
              </div>
              <button className="bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold font-['Open_Sauce_One'] leading-none flex items-center">
                Recharge <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* ===== CHALLAN CARD ===== */}
          <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-gray-800" />
                <span className="font-bold text-coolgray-900">Challan</span>
              </div>
              <div className="flex items-center gap-1 text-red-600 text-xs font-medium font-['Open_Sauce_One'] leading-none">
                <AlertTriangle size={16} />
                <span>Needs attention</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <div className="text-gray-800 text-sm font-semibold font-['Open_Sauce_One'] leading-none">1 Challan found</div>
                <div className="text-gray-500 text-xs font-normal font-['Open_Sauce_One'] leading-none">last checked on 03 Mar 2025</div>
              </div>
              <button className="bg-indigo-700 text-white px-3 py-1.5 rounded-lg flex items-center">
                <span className="text-white text-xs font-bold font-['Open_Sauce_One'] leading-none">Pay now</span> <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* ===== PUC CARD ===== */}
          <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Activity size={20} className="text-gray-800" />
                <span className="font-bold text-coolgray-900">PUC</span>
                <span className="bg-gradient-to-b from-emerald-900 to-emerald-500 text-white rounded-[40px] inline-flex justify-start items-center px-1.5 py-1.5 text-xs font-medium font-['Open_Sauce_One'] leading-none">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <div className="text-gray-500 text-xs font-normal font-['Open_Sauce_One'] leading-none">expiry 03 Mar 2025</div>
              </div>
              <button className="bg-gray-200 text-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold font-['Open_Sauce_One'] leading-none">
                Set reminder
              </button>
            </div>
          </div>
        </div>

        {/* ===== FUEL PRICES SECTION ===== */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-gray-900 text-xl font-bold font-['Open_Sauce_One'] leading-normal">Fuel prices</h3>
              <p className="text-slate-600 text-xs font-normal font-['Open_Sauce_One'] leading-none tracking-tight">updated as of 6th March 2024</p>
            </div>
            <button className="flex items-center gap-1">
              <MapPin size={16} />
              <span className="text-gray-900 text-xs font-bold font-['Open_Sauce_One'] leading-none">Location: Delhi</span>
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="bg-white rounded-xl p-4 grid grid-cols-3 gap-4 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-800">⛽</span>
                </div>
              </div>
              <div className="text-gray-900 text-xs font-bold font-['Open_Sauce_One'] leading-none">Petrol</div>
              <div className="text-gray-900 text-lg font-bold font-['Open_Sauce_One'] leading-relaxed">₹ 103.21</div>
              <div className="text-gray-500 text-xs font-normal font-['Open_Sauce_One'] leading-none">per litre</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-800">🛢️</span>
                </div>
              </div>
              <div className="text-gray-900 text-xs font-bold font-['Open_Sauce_One'] leading-none">Diesel</div>
              <div className="text-gray-900 text-lg font-bold font-['Open_Sauce_One'] leading-relaxed">₹ 99.87</div>
              <div className="text-gray-500 text-xs font-normal font-['Open_Sauce_One'] leading-none">per litre</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-800">🍃</span>
                </div>
              </div>
              <div className="text-gray-900 text-xs font-bold font-['Open_Sauce_One'] leading-none">CNG</div>
              <div className="text-gray-900 text-lg font-bold font-['Open_Sauce_One'] leading-relaxed">₹ 72.65</div>
              <div className="text-gray-500 text-xs font-normal font-['Open_Sauce_One'] leading-none">per kg</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
