'use client'

import React from 'react'

export default function ThemeSelector() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-2xl font-bold mb-2">Sleek Noir</div>
      <div className="rounded-2xl shadow-lg bg-gradient-to-br from-[#18181B] to-[#E04FD4] w-64 h-40 flex items-center justify-center">
        <span className="text-white text-lg font-semibold">This is the only theme available right now.</span>
      </div>
    </div>
  )
} 