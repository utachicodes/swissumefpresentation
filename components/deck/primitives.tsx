"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { cn } from "@/lib/utils"

/* ---------- animation helpers ---------- */

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
}

export const riseItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- text primitives ---------- */

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {children}
      </span>
    </Reveal>
  )
}

export function Title({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <Reveal>
      <h2
        className={cn(
          "font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl",
          className,
        )}
      >
        {children}
      </h2>
    </Reveal>
  )
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
        {children}
      </p>
    </Reveal>
  )
}

/* ---------- stat card with count-up ---------- */

function parseStatValue(raw: string): { prefix: string; num: number; suffix: string } | null {
  const m = raw.match(/^([^0-9]*)([0-9][0-9\s]*)([,.](\d+))?([\s\S]*)$/)
  if (!m) return null
  const intPart = m[2].replace(/\s/g, "")
  const decPart = m[4] ?? ""
  const num = parseFloat(`${intPart}${decPart ? "." + decPart : ""}`)
  if (isNaN(num)) return null
  return { prefix: m[1], num, suffix: m[5] }
}

function CountUp({ raw }: { raw: string }) {
  const parsed = parseStatValue(raw)
  const mv = useMotionValue(0)
  const display = useTransform(mv, (v) => {
    if (!parsed) return raw
    const rounded = parsed.num % 1 === 0 ? Math.round(v) : Math.round(v * 10) / 10
    const formatted = rounded.toLocaleString("fr-FR")
    return `${parsed.prefix}${formatted}${parsed.suffix}`
  })

  useEffect(() => {
    if (!parsed) return
    const ctrl = animate(mv, parsed.num, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    })
    return ctrl.stop
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!parsed) return <>{raw}</>
  return <motion.span>{display}</motion.span>
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      variants={riseItem}
      className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-6 backdrop-blur"
    >
      {/* top accent bar — animates in */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-primary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* number */}
      <div className="whitespace-nowrap font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        <CountUp raw={value} />
      </div>

      {/* label */}
      <div className="mt-3 text-[13px] leading-snug text-muted-foreground">{label}</div>
    </motion.div>
  )
}

/* ---------- point card ---------- */

export function PointCard({
  index,
  title,
  children,
}: {
  index?: string
  title: string
  children: ReactNode
}) {
  return (
    <motion.div
      variants={riseItem}
      className="relative overflow-hidden rounded-xl border border-border bg-card/60 p-5 backdrop-blur"
    >
      <span className="absolute inset-y-0 left-0 w-[3px] bg-primary" />
      <div className="flex items-baseline gap-3 pl-1">
        {index && (
          <span className="font-mono text-xs text-muted-foreground">{index}</span>
        )}
        <h3 className="font-heading text-lg font-semibold tracking-tight">{title}</h3>
      </div>
      <div className="mt-2 pl-1 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </motion.div>
  )
}

/* ---------- bullets ---------- */

export function Bullets({ items }: { items: string[] }) {
  return (
    <motion.ul variants={stagger} className="space-y-3">
      {items.map((it, i) => (
        <motion.li
          key={i}
          variants={riseItem}
          className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="text-pretty">{it}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}

/* ---------- grid ---------- */

export function Grid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={stagger} className={cn("grid gap-4", className)}>
      {children}
    </motion.div>
  )
}
