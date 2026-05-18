'use client'
import { motion } from 'motion/react'

export const Loading = () => {
  return (
    <div className="flex flex-col items-center text-center z-10">
      <div className="flex gap-2 mb-20">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-accent"
            animate={{
              y: [0, -20, 0],
              backgroundColor: [
                "#f9a8d4",
                "#ec4899",
              ],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            style={{
              boxShadow:
                "0 0 18px rgba(236,72,153,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  )
}
