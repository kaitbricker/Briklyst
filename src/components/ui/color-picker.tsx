'use client'

import * as React from 'react'
import { HexColorPicker } from 'react-colorful'
import { cn } from '@/lib/utils'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  className?: string
}

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        className="flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm text-muted-foreground">{color}</span>
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2 rounded-md border bg-popover p-2 shadow-md">
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  )
} 