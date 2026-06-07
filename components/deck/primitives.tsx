"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"
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

/* ---------- text bits ---------- */

export function Kicker({
  children,
  color = "primary",
}: {
  children: ReactNode
  color?: "primary" | "ua" | "sd" | "sahel" | "rdc"
}) {
  const dot: Record<string, string> = {
    primary: "bg-primary",
    ua: "bg-ua",
    sd: "bg-sd",
    sahel: "bg-sahel",
    rdc: "bg-rdc",
  }
  return (
    <Reveal>
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
        <span className={cn("h-1.5 w-1.5 rounded-full", dot[color])} />
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

/* ---------- map frame ---------- */

export function MapFrame({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <Reveal className="group">
      <figure className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40">
        <div className="overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            crossOrigin="anonymous"
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
          />
        </div>
        {caption ? (
          <figcaption className="flex items-center gap-2 border-t border-border bg-secondary/40 px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </Reveal>
  )
}

/* ---------- cards ---------- */

export function StatCard({
  value,
  label,
  accent = "primary",
}: {
  value: string
  label: string
  accent?: "primary" | "ua" | "sd" | "sahel" | "rdc"
}) {
  const text: Record<string, string> = {
    primary: "text-primary",
    ua: "text-ua",
    sd: "text-sd",
    sahel: "text-sahel",
    rdc: "text-rdc",
  }
  return (
    <motion.div
      variants={riseItem}
      className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur"
    >
      <div className={cn("font-heading text-3xl font-semibold md:text-4xl", text[accent])}>
        {value}
      </div>
      <div className="mt-1 text-sm leading-snug text-muted-foreground">{label}</div>
    </motion.div>
  )
}

export function PointCard({
  index,
  title,
  children,
  accent = "primary",
}: {
  index?: string
  title: string
  children: ReactNode
  accent?: "primary" | "ua" | "sd" | "sahel" | "rdc"
}) {
  const bar: Record<string, string> = {
    primary: "bg-primary",
    ua: "bg-ua",
    sd: "bg-sd",
    sahel: "bg-sahel",
    rdc: "bg-rdc",
  }
  return (
    <motion.div
      variants={riseItem}
      className="relative overflow-hidden rounded-xl border border-border bg-card/60 p-5 backdrop-blur"
    >
      <span className={cn("absolute inset-y-0 left-0 w-1", bar[accent])} />
      <div className="flex items-baseline gap-3">
        {index ? (
          <span className="font-mono text-xs text-muted-foreground">{index}</span>
        ) : null}
        <h3 className="font-heading text-lg font-semibold tracking-tight">{title}</h3>
      </div>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </motion.div>
  )
}

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
