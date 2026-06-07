"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"
import { stagger } from "./primitives"
import { cn } from "@/lib/utils"

export function Slide({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className={cn(
        "relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-6 py-24 md:px-10",
        className,
      )}
    >
      {children}
    </motion.section>
  )
}
