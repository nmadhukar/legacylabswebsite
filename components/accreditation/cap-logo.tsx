import Image from "next/image"

interface CAPLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizes = {
  sm: { width: 120, height: 80 },
  md: { width: 180, height: 120 },
  lg: { width: 240, height: 160 },
}

export function CAPLogo({ className = "", size = "md" }: CAPLogoProps) {
  const dimensions = sizes[size]
  
  return (
    <Image
      src="/images/cap-accredited-logo.jpg"
      alt="CAP Accredited - College of American Pathologists"
      width={dimensions.width}
      height={dimensions.height}
      className={`object-contain ${className}`}
      priority
    />
  )
}
