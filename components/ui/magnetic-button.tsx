import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button, ButtonProps } from "@/components/ui/button"

interface MagneticButtonProps extends ButtonProps {
  children: React.ReactNode
}

export function MagneticButton({ children, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width/2)
    const middleY = clientY - (top + height/2)
    setPosition({ x: middleX, y: middleY })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      style={{ position: "relative" }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ 
        type: "spring", 
        stiffness: 100,
        damping: 25,
        mass: 0.5
      }}
    >
      <Button ref={ref} {...props}>
        {children}
      </Button>
    </motion.div>
  )
} 