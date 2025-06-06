import { useInView as useFramerInView } from 'framer-motion'
import { useRef } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const isInView = useFramerInView(ref, {
    once: true,
    margin: '-10% 0px -10% 0px',
    ...options,
  })

  return [ref, isInView] as const
} 