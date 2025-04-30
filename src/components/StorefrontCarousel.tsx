import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const mockups = [
  {
    title: "Beauty & Lifestyle",
    username: "@beautyessentials",
    image: "/mockups/beauty-storefront.png",
    color: "#FFE0F4", // Light pink
    accent: "#FF5DA2" // Bubblegum pink
  },
  {
    title: "Tech Reviews",
    username: "@techinsider",
    image: "/mockups/tech-storefront.png",
    color: "#E0F4FF", // Light blue
    accent: "#0099FF" // Bright blue
  },
  {
    title: "Fitness Gear",
    username: "@fitnessfirst",
    image: "/mockups/fitness-storefront.png",
    color: "#E0FFE4", // Light green
    accent: "#00CC33" // Bright green
  }
]

export function StorefrontCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % mockups.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  return (
    <div 
      className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/5 p-4"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full"
        >
          {/* Mockup Frame */}
          <div 
            className="relative h-full rounded-lg p-4"
            style={{ backgroundColor: mockups[current].color }}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold" style={{ color: mockups[current].accent }}>
                  {mockups[current].title}
                </h3>
                <p className="text-sm text-gray-600">{mockups[current].username}</p>
              </div>
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md bg-white/50"
                  style={{ backgroundColor: `${mockups[current].accent}10` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {mockups.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => {
              setCurrent(index)
              setIsAutoPlaying(false)
            }}
          />
        ))}
      </div>
    </div>
  )
} 