import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { templates } from '@/config/storefrontTemplates'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface TemplatePreviewProps {
  templateId: string
  onClose: () => void
}

export default function TemplatePreview({ templateId, onClose }: TemplatePreviewProps) {
  const template = templates.find(t => t.id === templateId)
  const [currentView, setCurrentView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  if (!template) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl bg-white/95 backdrop-blur-md shadow-2xl border border-gray-100/50">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{template.name}</h2>
              <p className="text-gray-500">{template.description}</p>
            </div>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant={currentView === 'desktop' ? 'default' : 'outline'}
              onClick={() => setCurrentView('desktop')}
            >
              Desktop
            </Button>
            <Button
              variant={currentView === 'tablet' ? 'default' : 'outline'}
              onClick={() => setCurrentView('tablet')}
            >
              Tablet
            </Button>
            <Button
              variant={currentView === 'mobile' ? 'default' : 'outline'}
              onClick={() => setCurrentView('mobile')}
            >
              Mobile
            </Button>
          </div>

          <div className={cn(
            'relative mx-auto transition-all duration-300',
            currentView === 'desktop' && 'w-full max-w-4xl',
            currentView === 'tablet' && 'w-[768px]',
            currentView === 'mobile' && 'w-[375px]'
          )}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={template.previewImage}
                alt={template.name}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 