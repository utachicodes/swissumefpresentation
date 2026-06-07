"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"
import { riseItem, stagger } from "./primitives"
import { cn } from "@/lib/utils"

/* ============================================================== icons ====== */

function Ic({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cn("h-5 w-5", className)}>
      {d.split("|").map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  )
}

const ICON = {
  flag: "M4 22V4|M4 4c4-2 8 2 12 0v9c-4 2-8-2-12 0",
  shield: "M12 3l7 3v5c0 4.5-3 7-7 9-4-2-7-4.5-7-9V6l7-3z",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18|M3 12h18|M12 3c2.5 2.5 2.5 15 0 18|M12 3c-2.5 2.5-2.5 15 0 18",
  crosshair: "M12 3v4|M12 17v4|M3 12h4|M17 12h4|M12 9a3 3 0 100 6 3 3 0 000-6",
  users: "M16 19v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1|M9 10a3 3 0 100-6 3 3 0 000 6|M22 19v-1a4 4 0 00-3-3.8|M16 4.2a3 3 0 010 5.6",
  mic: "M12 14a3 3 0 003-3V6a3 3 0 00-6 0v5a3 3 0 003 3z|M19 11a7 7 0 01-14 0|M12 18v3",
  handshake: "M8 13l3 3 5-5 3 3|M3 9l4-4 4 3|M21 9l-4-4-3 2",
  building: "M5 21V5a1 1 0 011-1h8a1 1 0 011 1v16|M15 21V9h3a1 1 0 011 1v11|M8 8h2|M8 12h2|M8 16h2",
  sprout: "M12 21v-7|M12 14c0-3-2-5-6-5 0 3 2 5 6 5z|M12 14c0-4 3-6 7-6-.5 4-3 6-7 6z",
  scale: "M12 3v18|M7 21h10|M6 7l-3 6h6l-3-6z|M18 7l-3 6h6l-3-6z|M6 7h12|M9 5h6",
}

/* ============================================================ actors ======= */

type ActorItem = { icon: keyof typeof ICON; title: string; body: string; ex: string }

const stateActors: ActorItem[] = [
  { icon: "flag", title: "États & gouvernements", body: "Décident des politiques diplomatiques et militaires.", ex: "Russie · Ukraine" },
  { icon: "shield", title: "Armées nationales", body: "Principal instrument de la puissance des États.", ex: "Forces régulières" },
  { icon: "globe", title: "Organisations internationales", body: "Arbitrent, sanctionnent, déploient des missions.", ex: "ONU · OTAN · UA" },
]

const nonStateActors: ActorItem[] = [
  { icon: "crosshair", title: "Groupes armés & terroristes", body: "Combattent les États et contrôlent des territoires.", ex: "JNIM · M23 · FSR" },
  { icon: "users", title: "Société civile", body: "Défend les droits humains et l'aide humanitaire.", ex: "ONG · médias" },
  { icon: "shield", title: "Acteurs privés", body: "Sociétés militaires privées et puissances émergentes.", ex: "Wagner · mercenaires" },
]

export function ActorsDiagram() {
  return (
    <motion.div variants={stagger} className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
      <ActorColumn label="A · Acteurs étatiques" items={stateActors} accent="ua" align="right" />
      <div className="relative flex items-center justify-center">
        <div className="hidden h-full w-px bg-gradient-to-b from-transparent via-border to-transparent lg:block" />
        <motion.div
          variants={riseItem}
          className="absolute flex flex-col items-center gap-1 rounded-full border border-primary/40 bg-background px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-primary shadow-lg shadow-black/40"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
          Conflit
        </motion.div>
      </div>
      <ActorColumn label="B · Acteurs non étatiques" items={nonStateActors} accent="sahel" align="left" />
    </motion.div>
  )
}

function ActorColumn({
  label,
  items,
  accent,
  align,
}: {
  label: string
  items: ActorItem[]
  accent: "ua" | "sahel"
  align: "left" | "right"
}) {
  const text = accent === "ua" ? "text-ua" : "text-sahel"
  const bar = accent === "ua" ? "bg-ua" : "bg-sahel"
  return (
    <div className="flex flex-col gap-3">
      <p className={cn("font-mono text-[11px] font-semibold uppercase tracking-[0.2em]", text, align === "right" && "lg:text-right")}>
        {label}
      </p>
      {items.map((it) => (
        <motion.div
          key={it.title}
          variants={riseItem}
          className="relative overflow-hidden rounded-xl border border-border bg-card/60 p-4 backdrop-blur"
        >
          <span className={cn("absolute inset-y-0 left-0 w-1", bar)} />
          <div className="flex items-start gap-3">
            <span className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/40", text)}>
              <Ic d={ICON[it.icon]} />
            </span>
            <div>
              <h4 className="font-heading text-base font-semibold leading-tight text-foreground">{it.title}</h4>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{it.body}</p>
              <p className={cn("mt-1.5 font-mono text-[10px] uppercase tracking-wider", text)}>{it.ex}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ========================================================= comparison ====== */

type Col = { key: string; name: string; accent: string }
const COLS: Col[] = [
  { key: "ua", name: "Ukraine", accent: "var(--ua)" },
  { key: "sahel", name: "Sahel", accent: "var(--sahel)" },
  { key: "sd", name: "Soudan", accent: "var(--sd)" },
  { key: "rdc", name: "Est RDC", accent: "var(--rdc)" },
]

const ROWS: { label: string; cells: [string, string, string, string] }[] = [
  { label: "Type de conflit", cells: ["Interétatique, haute intensité", "Asymétrique, djihadiste", "Intra-étatique, deux armées", "Régional, milices armées"] },
  { label: "Depuis", cells: ["2014 · 2022", "2012", "2023", "1996"] },
  { label: "Acteurs clés", cells: ["Russie · Ukraine · OTAN", "États · JNIM · EIGS", "SAF · FSR", "M23 · FDLR · voisins"] },
  { label: "Cause dominante", cells: ["Territoire & influence", "Faiblesse de l'État", "Lutte de pouvoir", "Ressources minières"] },
  { label: "Bilan humain", cells: ["+150 000 morts · +10 M déplacés", "Milliers de morts · millions déplacés", "+25 000 morts · +8 M déplacés", "Millions de morts (cumul)"] },
  { label: "Conséquence majeure", cells: ["Crise énergétique mondiale", "Vague de coups d'État", "Crise de déplacement majeure", "Économie de guerre minière"] },
]

export function ComparisonMatrix() {
  return (
    <motion.div
      variants={riseItem}
      className="overflow-hidden rounded-xl border border-border bg-card/50 shadow-2xl shadow-black/40 backdrop-blur"
    >
      {/* header */}
      <div className="grid grid-cols-[1.1fr_repeat(4,1fr)] border-b border-border bg-secondary/30">
        <div className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Dimension
        </div>
        {COLS.map((c) => (
          <div key={c.key} className="flex items-center gap-2 px-3 py-3">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: c.accent }} />
            <span className="font-heading text-sm font-semibold text-foreground">{c.name}</span>
          </div>
        ))}
      </div>
      {/* rows */}
      {ROWS.map((row, ri) => (
        <div
          key={row.label}
          className={cn(
            "grid grid-cols-[1.1fr_repeat(4,1fr)] border-b border-border/60 last:border-0",
            ri % 2 === 1 && "bg-secondary/15",
          )}
        >
          <div className="flex items-center px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {row.label}
          </div>
          {row.cells.map((cell, ci) => (
            <div
              key={ci}
              className="border-l border-border/40 px-3 py-3 text-[12.5px] leading-snug text-foreground/90"
              style={{ boxShadow: `inset 2px 0 0 -1px color-mix(in oklch, ${COLS[ci].accent} 25%, transparent)` }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  )
}

/* ========================================================== solutions ====== */

type Pillar = { icon: keyof typeof ICON; n: string; title: string; body: string }
const PILLARS: Pillar[] = [
  { icon: "handshake", n: "01", title: "Diplomatie & médiation", body: "Renforcer la diplomatie pour favoriser cessez-le-feu et négociations." },
  { icon: "building", n: "02", title: "Reconstruire l'État", body: "Améliorer la gouvernance dans les pays fragiles : Sahel, RDC, Soudan." },
  { icon: "sprout", n: "03", title: "Paix & développement", body: "Investir dans l'éducation, l'emploi et les infrastructures." },
]

export function SolutionsInfographic() {
  return (
    <motion.div variants={stagger} className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-3">
        {PILLARS.map((p) => (
          <motion.div
            key={p.n}
            variants={riseItem}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-border bg-card/60 p-5 backdrop-blur"
          >
            <span className="absolute right-4 top-3 font-heading text-3xl font-semibold text-foreground/10">{p.n}</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
              <Ic d={ICON[p.icon]} className="h-5 w-5" />
            </span>
            <h4 className="font-heading text-lg font-semibold leading-tight text-foreground">{p.title}</h4>
            <p className="text-[13px] leading-relaxed text-muted-foreground">{p.body}</p>
          </motion.div>
        ))}
      </div>
      {/* convergence toward durable peace */}
      <motion.div
        variants={riseItem}
        className="flex items-center justify-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-5 py-4"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 text-primary">
          <Ic d={ICON.scale} className="h-4 w-4" />
        </span>
        <p className="text-pretty text-sm leading-snug text-foreground">
          Associer <span className="font-semibold text-primary">sécurité, gouvernance et développement</span> : la réponse militaire seule ne suffit pas.
        </p>
      </motion.div>
    </motion.div>
  )
}
