import { motion, useInView } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface AnimationProps {
  children: ReactNode
  className?: string
}

interface DelayedAnimationProps extends AnimationProps {
  delay?: number
}

interface StaggerAnimationProps extends AnimationProps {
  staggerDelay?: number
}

interface SlideAnimationProps extends DelayedAnimationProps {
  direction: 'left' | 'right' | 'up' | 'down'
}

export const FadeIn = ({ children, delay = 0, className = '' }: DelayedAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-10% 0px -10% 0px'
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const FadeInStagger = ({ children, staggerDelay = 0.1, className = '' }: StaggerAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-10% 0px -10% 0px'
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const ScaleIn = ({ children, delay = 0, className = '' }: DelayedAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-10% 0px -10% 0px'
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const SlideIn = ({ children, direction, delay = 0, className = '' }: SlideAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-10% 0px -10% 0px'
  })

  const directionMap = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 100 },
    down: { x: 0, y: -100 }
  } as const

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionMap[direction] }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const FloatingAnimation = ({ children, className = '' }: AnimationProps) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
) 