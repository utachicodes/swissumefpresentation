"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { slides } from "./slides"

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "5%" : "-5%",
    opacity: 0,
    scale: 0.975,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-3.5%" : "3.5%",
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.26, ease: [0.55, 0, 1, 0.45] as const },
  }),
}

export function Deck() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const total = slides.length

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir)
      setIndex((i) => Math.min(total - 1, Math.max(0, i + dir)))
    },
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") go(1)
      else if (e.key === "ArrowLeft" || e.key === "PageUp") go(-1)
      else if (e.key === "Home") { setDirection(1); setIndex(0) }
      else if (e.key === "End") { setDirection(1); setIndex(total - 1) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, total])

  const progress = ((index + 1) / total) * 100

  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-background text-foreground">
      {/* progress bar */}
      <div className="fixed inset-x-0 top-0 z-40 h-0.5 bg-border">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* slide counter */}
      <div className="fixed bottom-4 right-5 z-40 select-none font-mono text-[11px] tabular-nums text-muted-foreground/40">
        {index + 1} / {total}
      </div>

      {/* slide viewport */}
      <div className="h-full w-full overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slides[index].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="h-full"
          >
            {slides[index].node}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
