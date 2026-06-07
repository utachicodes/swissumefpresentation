"use client"

import { useState, useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "motion/react"
import { X, Maximize2 } from "lucide-react"

export type LegendItem = {
  label: string
  color?: string
  kind?: "fill" | "hatch" | "line" | "dash" | "dot" | "arrow"
}

function Frame({
  index, region, coords, source, caption, legend, children, expanded, onToggle,
}: {
  index: string; region: string; coords: string; source: string
  caption?: string; legend?: LegendItem[]; children: ReactNode
  expanded: boolean; onToggle: () => void
}) {
  return (
    <figure
      className={
        expanded
          ? "flex flex-col overflow-hidden rounded-xl border border-border bg-card"
          : "relative overflow-hidden rounded-xl border border-border bg-card/70 shadow-2xl shadow-black/60 backdrop-blur"
      }
      style={expanded ? { maxHeight: "90dvh" } : undefined}
    >
      {/* header */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-secondary/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
          </span>
          <span className="text-foreground/90">{index}</span>
          <span className="opacity-30">/</span>
          {region}
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden tabular-nums sm:block">{coords}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onToggle() }}
            title={expanded ? "Réduire" : "Agrandir"}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {expanded
              ? <X className="h-3.5 w-3.5" />
              : <Maximize2 className="h-3.5 w-3.5" />
            }
          </button>
        </div>
      </div>

      {/* body */}
      <div
        className={expanded ? "relative min-h-0 flex-1 overflow-hidden" : "relative cursor-zoom-in"}
        onClick={!expanded ? onToggle : undefined}
      >
        {children}
        {!expanded && (
          <>
            <Corner className="left-2 top-2" />
            <Corner className="right-2 top-2 rotate-90" />
            <Corner className="bottom-2 right-2 rotate-180" />
            <Corner className="bottom-2 left-2 -rotate-90" />
          </>
        )}
        {legend && (
          <div className="absolute bottom-3 left-3 max-w-[58%] rounded-lg border border-border/60 bg-background/85 p-2.5 backdrop-blur-md">
            <Legend items={legend} />
          </div>
        )}
      </div>

      {/* footer */}
      <figcaption className="flex shrink-0 items-center justify-between gap-2 border-t border-border bg-secondary/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span className="flex items-center gap-2 truncate">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="truncate text-foreground/80">{caption}</span>
        </span>
        <span className="hidden shrink-0 sm:block">{source}</span>
      </figcaption>
    </figure>
  )
}

export function MapCard({
  index, region, coords, source, caption, legend, children,
}: {
  index: string; region: string; coords: string; source: string
  caption?: string; legend?: LegendItem[]; children: ReactNode
}) {
  const [fullscreen, setFullscreen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!fullscreen) return
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false) }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [fullscreen])

  const frameProps = { index, region, coords, source, caption, legend, children }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Frame {...frameProps} expanded={false} onToggle={() => setFullscreen(true)} />
      </motion.div>

      {mounted && createPortal(
        <AnimatePresence>
          {fullscreen && (
            <motion.div
              key="map-fs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-background/96 p-4 backdrop-blur-xl md:p-8"
              onClick={() => setFullscreen(false)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Frame {...frameProps} expanded={true} onToggle={() => setFullscreen(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute h-3 w-3 text-foreground/20 ${className}`}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M1 1h4M1 1v4" />
    </svg>
  )
}

export function Legend({ items }: { items: LegendItem[] }) {
  return (
    <ul className="grid gap-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-2">
          <Swatch item={it} />
          <span className="text-[10px] leading-none text-foreground/85">{it.label}</span>
        </li>
      ))}
    </ul>
  )
}

function Swatch({ item }: { item: LegendItem }) {
  const color = item.color ?? "var(--primary)"
  const kind = item.kind ?? "fill"
  if (kind === "line" || kind === "dash") {
    return (
      <svg width="16" height="8" className="shrink-0">
        <line x1="0" y1="4" x2="16" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray={kind === "dash" ? "3 3" : undefined} />
      </svg>
    )
  }
  if (kind === "arrow") {
    return (
      <svg width="16" height="8" className="shrink-0">
        <line x1="0" y1="4" x2="11" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M11 1 L16 4 L11 7 Z" fill={color} />
      </svg>
    )
  }
  if (kind === "dot") {
    return <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
  }
  return (
    <span
      className="h-3 w-3 shrink-0 rounded-[3px]"
      style={{
        backgroundColor: kind === "hatch" ? "transparent" : color,
        border: `1px solid ${color}`,
        backgroundImage: kind === "hatch"
          ? `repeating-linear-gradient(45deg, ${color} 0 1.5px, transparent 1.5px 4px)`
          : undefined,
      }}
    />
  )
}
