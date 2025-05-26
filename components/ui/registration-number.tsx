import Image from "next/image"

interface RegistrationNumberProps {
  registrationNumber: string
  size?: "small" | "medium" | "large"
  className?: string
}

export default function RegistrationNumber({ 
  registrationNumber, 
  size = "medium",
  className = ""
}: RegistrationNumberProps) {
  // Size configurations
  const sizeConfig = {
    small: {
      height: "22px",
      iconSize: 20,
      textSize: "text-xs",
      padding: "px-1.5"
    },
    medium: {
      height: "24px", 
      iconSize: 24,
      textSize: "text-xs",
      padding: "px-2"
    },
    large: {
      height: "32px",
      iconSize: 28,
      textSize: "text-sm", 
      padding: "px-3"
    }
  }

  const config = sizeConfig[size]

  return (
    <div className={`flex justify-center ${className}`}>
      <div 
        className="flex items-center rounded-[6px] overflow-hidden mx-[2px]" 
        style={{
          background: 'linear-gradient(90deg, #232B34 0%, #232B34 100%)', 
          height: config.height
        }}
      >
        <div 
          className="flex items-center justify-center bg-[#2563eb]" 
          style={{
            width: config.height, 
            height: config.height
          }}
        >
          <Image
            src="/images/reg-img.svg"
            alt="Registration Icon"
            width={config.iconSize}
            height={config.iconSize}
            style={{
              width: `${config.iconSize}px`, 
              height: `${config.iconSize}px`
            }}
          />
        </div>
        <span className={`${config.padding} text-white font-semibold ${config.textSize} tracking-widest`}>
          {registrationNumber}
        </span>
      </div>
    </div>
  )
} 