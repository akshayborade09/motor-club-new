"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { CirclePlus } from "lucide-react"
import TapEffect from "@/components/ui/tap-effect"
import { navigationHaptic, buttonPressHaptic } from "@/utils/haptics"
import type { UseEmblaCarouselType } from 'embla-carousel-react'

interface Vehicle {
  id: number
  name: string
  image: string
  licensePlate: string
}

interface VehicleTabsProps {
  vehicles: Vehicle[]
  selected: number
  onVehicleSelect: (index: number) => void
  carouselApi?: UseEmblaCarouselType[1] | null
  className?: string
}

export default function VehicleTabs({ 
  vehicles, 
  selected, 
  onVehicleSelect, 
  carouselApi,
  className = ""
}: VehicleTabsProps) {
  const router = useRouter()

  const handleVehicleSelect = (index: number) => {
    navigationHaptic()
    onVehicleSelect(index)
    if (carouselApi) {
      carouselApi.scrollTo(index)
    }
  }

  return (
    <div className={`flex justify-start border-b border-gray-200 px-3 ${className}`}>
      <div className="flex items-end gap-3">
        {vehicles.map((vehicle, index) => (
          <TapEffect
            key={vehicle.id}
            onClick={() => handleVehicleSelect(index)}
            className="flex flex-col items-center group relative"
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
          </TapEffect>
        ))}
        <TapEffect 
          className="flex flex-col items-center"
          onClick={() => {
            buttonPressHaptic()
            router.push('/add-vehicle')
          }}
        >
          <div className="flex items-center justify-center" style={{ height: '24px' }}>
            <CirclePlus 
              size={28} 
              className="text-gray-800" 
              strokeWidth={1} 
            />
          </div>
          <div className="h-1 w-6 mt-2" style={{ visibility: 'hidden' }}></div>
        </TapEffect>
      </div>
    </div>
  )
} 