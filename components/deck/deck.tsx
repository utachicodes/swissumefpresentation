"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { slides } from "./slides"

export function Deck() {
  const [index, setIndex] = useState(0)
  const total = slides.length

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => Math.min(total - 1, Math.max(0, i + dir)))
    },
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") go(1)
      else if (e.key === "ArrowLeft" || e.key === "PageUp") go(-1)
      else if (e.key === "Home") setIndex(0)
      else if (e.key === "End") setIndex(total - 1)
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
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {slides[index].node}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
