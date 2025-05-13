import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface LivePreviewProps {
  formData: {
    name: string
    description: string
    logoUrl?: string
    bannerUrl?: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    font: string
  }
  className?: string
}

export default function LivePreview({ formData, className }: LivePreviewProps) {
  return (
    <Card className={cn('p-6 bg-white/95 backdrop-blur-md shadow-lg border border-gray-100/50', className)}>
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{ color: formData.primaryColor }}>
            {formData.name}
          </h2>
          <p className="text-gray-600 mt-2">{formData.description}</p>
          {formData.logoUrl && (
            <div className="relative w-16 h-16 mt-4 mx-auto">
              <Image
                src={formData.logoUrl}
                alt="Logo"
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
          )}
          {formData.bannerUrl && (
            <div className="relative w-full h-32 mt-4">
              <Image
                src={formData.bannerUrl}
                alt="Banner"
                width={800}
                height={128}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: formData.primaryColor }}
          >
            <p className="text-white text-center">Primary Color</p>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: formData.secondaryColor }}
          >
            <p className="text-white text-center">Secondary Color</p>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: formData.accentColor }}
          >
            <p className="text-white text-center">Accent Color</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-100">
            <p className="text-center" style={{ fontFamily: formData.font }}>
              Font: {formData.font}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
} 