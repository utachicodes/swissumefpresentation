"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  geoMercator,
  geoEqualEarth,
  geoConicConformal,
  geoPath,
  geoGraticule,
  type GeoProjection,
  type GeoPath,
} from "d3-geo"
import { motion } from "motion/react"
import {
  allCountries,
  countryBorders,
  bboxPolygon,
  provinces,
  type NamedFeature,
  type RegionKey,
} from "./geo"

/* ============================================================= context ====== */

type GeoCtx = { projection: GeoProjection; path: GeoPath; w: number; h: number }
const Ctx = createContext<GeoCtx | null>(null)
const useGeo = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error("Geo primitive used outside <GeoMap>")
  return c
}

type ProjName = "mercator" | "equalEarth" | "conic"

function makeProjection(name: ProjName, bounds: [number, number, number, number]): GeoProjection {
  const [w, s, e, n] = bounds
  const midLon = (w + e) / 2
  if (name === "conic") {
    return geoConicConformal()
      .parallels([s + (n - s) / 3, n - (n - s) / 3])
      .rotate([-midLon, 0])
  }
  if (name === "equalEarth") return geoEqualEarth().rotate([-midLon, 0])
  return geoMercator()
}

/* ================================================================= shell ===== */

export function GeoMap({
  bounds,
  projection = "mercator",
  w = 880,
  h = 560,
  pad = 26,
  graticule = 5,
  bare = false,
  children,
}: {
  bounds: [number, number, number, number]
  projection?: ProjName
  w?: number
  h?: number
  pad?: number
  graticule?: number | false
  /** Decorative embed: no sea fill, no vignette — transparent over the page. */
  bare?: boolean
  children: ReactNode
}) {
  const { proj, path } = useMemo(() => {
    const p = makeProjection(projection, bounds)
    p.fitExtent(
      [
        [pad, pad],
        [w - pad, h - pad],
      ],
      bboxPolygon(bounds) as never,
    )
    return { proj: p, path: geoPath(p) }
  }, [bounds, projection, w, h, pad])

  // Projection math relies on transcendental functions that are not bit-identical
  // across V8 builds, so SVG coordinates differ between SSR and the browser. Render
  // the geographic layers on the client only to avoid hydration mismatches.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <Ctx.Provider value={{ projection: proj, path, w, h }}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full"
        style={{ display: "block" }}
        role="img"
      >
        <MapDefs />
        {!bare && <rect x={0} y={0} width={w} height={h} fill="url(#sea)" />}
        {mounted && (
          <>
            {graticule !== false && <Graticule step={graticule} />}
            {children}
          </>
        )}
        {/* subtle vignette so labels sit comfortably */}
        {!bare && <rect x={0} y={0} width={w} height={h} fill="url(#vignette)" pointerEvents="none" />}
      </svg>
    </Ctx.Provider>
  )
}

/* ================================================================= defs ===== */

function MapDefs() {
  return (
    <defs>
      <radialGradient id="sea" cx="50%" cy="36%" r="85%">
        <stop offset="0%" stopColor="var(--map-sea)" />
        <stop offset="100%" stopColor="var(--map-sea-edge)" />
      </radialGradient>
      <radialGradient id="vignette" cx="50%" cy="46%" r="78%">
        <stop offset="60%" stopColor="color-mix(in oklch, var(--map-sea-edge) 0%, transparent)" />
        <stop offset="100%" stopColor="color-mix(in oklch, var(--map-graticule) 14%, transparent)" />
      </radialGradient>

      {/* hatching for contested / insecure zones */}
      <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="5" height="5" fill="transparent" />
        <line x1="0" y1="0" x2="0" y2="5" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
      </pattern>

      <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="softglow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
  )
}

/* ============================================================ base layers ==== */

function Graticule({ step }: { step: number }) {
  const { path } = useGeo()
  const g = useMemo(() => geoGraticule().step([step, step])(), [step])
  return (
    <path
      d={path(g) ?? ""}
      fill="none"
      stroke="color-mix(in oklch, var(--map-graticule) 16%, transparent)"
      strokeWidth={0.6}
    />
  )
}

/** Faint world context — every country except the highlighted ones. */
export function WorldContext({ exclude = [] }: { exclude?: string[] }) {
  const { path } = useGeo()
  const ex = useMemo(() => new Set(exclude), [exclude])
  return (
    <g>
      {allCountries.map((f, i) =>
        ex.has(f.properties.name) ? null : (
          <path
            key={i}
            d={path(f) ?? ""}
            fill="var(--map-land-2)"
            stroke="color-mix(in oklch, var(--map-stroke) 60%, transparent)"
            strokeWidth={0.45}
          />
        ),
      )}
      <path
        d={path(countryBorders as never) ?? ""}
        fill="none"
        stroke="color-mix(in oklch, var(--map-stroke) 70%, transparent)"
        strokeWidth={0.4}
      />
    </g>
  )
}

/** A specific set of countries, filled a touch brighter (the "stage"). */
export function Landmass({
  features,
  fill = "var(--map-land)",
  stroke = "var(--map-stroke)",
  strokeWidth = 0.7,
}: {
  features: NamedFeature[]
  fill?: string
  stroke?: string
  strokeWidth?: number
}) {
  const { path } = useGeo()
  return (
    <g>
      {features.map((f, i) => (
        <path key={i} d={path(f) ?? ""} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      ))}
    </g>
  )
}

/* ============================================================ provinces ===== */

export type ProvinceStyle = { fill: string; stroke?: string; pattern?: boolean; glow?: boolean }

/** Render ADM1 provinces for a region; status map keys provinces to a style. */
export function Provinces({
  region,
  styles,
  base = "var(--map-land)",
  border = "var(--map-stroke)",
  labels,
}: {
  region: RegionKey
  styles: Record<string, ProvinceStyle>
  base?: string
  border?: string
  labels?: boolean
}) {
  const { path } = useGeo()
  const feats = useMemo(() => provinces(region), [region])
  return (
    <g>
      {feats.map((f, i) => {
        const s = styles[f.properties.name]
        const fill = s ? s.fill : base
        return (
          <g key={i}>
            <path
              d={path(f) ?? ""}
              fill={fill}
              stroke={s?.stroke ?? border}
              strokeWidth={s ? 1 : 0.5}
              style={s?.glow ? { filter: "url(#glow)" } : undefined}
            />
            {s?.pattern && (
              <path d={path(f) ?? ""} fill="url(#hatch)" stroke="none" style={{ color: s.fill }} opacity={0.9} />
            )}
          </g>
        )
      })}
      {labels &&
        feats.map((f, i) => {
          const c = path.centroid(f)
          if (!isFinite(c[0])) return null
          return (
            <text
              key={`l${i}`}
              x={c[0]}
              y={c[1]}
              textAnchor="middle"
              className="fill-foreground/45"
              style={{ fontSize: 6.5, fontWeight: 500 }}
            >
              {f.properties.name}
            </text>
          )
        })}
    </g>
  )
}

/* ============================================================== overlays ==== */

/** A free-form zone drawn from [lng,lat] rings. */
export function Zone({
  coords,
  fill,
  stroke,
  pattern,
  delay = 0,
}: {
  coords: [number, number][]
  fill: string
  stroke?: string
  pattern?: boolean
  delay?: number
}) {
  const { path } = useGeo()
  const d = path({ type: "Polygon", coordinates: [coords] } as never) ?? ""
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
    >
      <path d={d} fill={fill} stroke={stroke ?? "none"} strokeWidth={1.2} />
      {pattern && <path d={d} fill="url(#hatch)" stroke="none" style={{ color: stroke ?? fill }} />}
    </motion.g>
  )
}

/** Animated frontline drawn through a sequence of [lng,lat] points. */
export function Frontline({
  points,
  color = "var(--destructive)",
  width = 2,
  dash = false,
  delay = 0,
}: {
  points: [number, number][]
  color?: string
  width?: number
  dash?: boolean
  delay?: number
}) {
  const { path } = useGeo()
  const d = path({ type: "LineString", coordinates: points } as never) ?? ""
  return (
    <g style={{ filter: "url(#glow)" }}>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dash ? "5 5" : undefined}
        className={dash ? "flow-march" : undefined}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay, duration: 1.2, ease: "easeInOut" }}
      />
    </g>
  )
}

function project(proj: GeoProjection, c: [number, number]) {
  return proj(c) ?? [0, 0]
}

/** Curved arrow between two geo points. type styles offensive vs flow. */
export function Arrow({
  from,
  to,
  color = "var(--destructive)",
  width = 2.4,
  curve = 0.25,
  flow = false,
  label,
  delay = 0,
}: {
  from: [number, number]
  to: [number, number]
  color?: string
  width?: number
  curve?: number
  flow?: boolean
  label?: string
  delay?: number
}) {
  const { projection } = useGeo()
  const [x1, y1] = project(projection, from)
  const [x2, y2] = project(projection, to)
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  // control point offset perpendicular to the chord
  const cx = mx - (dy / len) * len * curve
  const cy = my + (dx / len) * len * curve
  const d = `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`
  // tangent at end (from control point to end) for the arrowhead
  const ang = Math.atan2(y2 - cy, x2 - cx)
  const head = 8 + width
  const ax = x2 - head * Math.cos(ang)
  const ay = y2 - head * Math.sin(ang)
  const wing = head * 0.6
  const headPath = `M${x2},${y2} L${ax - wing * Math.sin(ang)},${ay + wing * Math.cos(ang)} L${
    ax + wing * Math.sin(ang)
  },${ay - wing * Math.cos(ang)} Z`

  return (
    <g style={{ filter: "url(#glow)" }}>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={flow ? "6 6" : undefined}
        className={flow ? "flow-march" : undefined}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay, duration: 1, ease: "easeOut" }}
      />
      <motion.path
        d={headPath}
        fill={color}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.9, duration: 0.3 }}
        style={{ transformOrigin: `${x2}px ${y2}px` }}
      />
      {label && (
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className="fill-foreground/70"
          style={{ fontSize: 7, fontWeight: 600, letterSpacing: 0.3 }}
        >
          {label}
        </text>
      )}
    </g>
  )
}

/* ================================================================ markers ==== */

export function City({
  at,
  name,
  capital = false,
  align = "right",
  dim = false,
  delay = 0,
}: {
  at: [number, number]
  name: string
  capital?: boolean
  align?: "left" | "right" | "top" | "bottom"
  dim?: boolean
  delay?: number
}) {
  const { projection } = useGeo()
  const [x, y] = project(projection, at)
  const dx = align === "left" ? -6 : align === "right" ? 6 : 0
  const dy = align === "top" ? -7 : align === "bottom" ? 11 : 2.6
  const anchor = align === "left" ? "end" : align === "right" ? "start" : "middle"
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {capital ? (
        <>
          <circle cx={x} cy={y} r={4.4} fill="none" stroke="var(--paper)" strokeWidth={1.4} />
          <circle cx={x} cy={y} r={1.7} fill="var(--paper)" />
        </>
      ) : (
        <>
          <circle cx={x} cy={y} r={2.8} fill="var(--paper)" opacity={dim ? 0.6 : 1} />
          <circle cx={x} cy={y} r={2.8} fill="none" stroke="oklch(0.19 0.03 258)" strokeWidth={0.8} />
        </>
      )}
      <text
        x={x + dx}
        y={y + dy}
        textAnchor={anchor}
        className={dim ? "fill-foreground/55" : "fill-foreground"}
        style={{ fontSize: capital ? 8.5 : 7.5, fontWeight: capital ? 700 : 600, letterSpacing: 0.2 }}
        paintOrder="stroke"
        stroke="oklch(0.19 0.03 258)"
        strokeWidth={2.4}
        strokeLinejoin="round"
      >
        {name}
      </text>
    </motion.g>
  )
}

/** Pulsing conflict hotspot. */
export function Hotspot({
  at,
  color = "var(--destructive)",
  r = 4,
  delay = 0,
}: {
  at: [number, number]
  color?: string
  r?: number
  delay?: number
}) {
  const { projection } = useGeo()
  const [x, y] = project(projection, at)
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <circle cx={x} cy={y} r={r * 2.6} fill={color} opacity={0.16}>
        <animate attributeName="r" values={`${r};${r * 3.4};${r}`} dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.35;0;0.35" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx={x} cy={y} r={r} fill={color} style={{ filter: "url(#glow)" }} />
      <circle cx={x} cy={y} r={r * 0.45} fill="var(--paper)" />
    </motion.g>
  )
}

/** A body of water drawn from a [lng,lat] ring (lakes for orientation). */
export function Water({ coords, label }: { coords: [number, number][]; label?: string }) {
  const { path } = useGeo()
  const d = path({ type: "Polygon", coordinates: [coords] } as never) ?? ""
  const c = path.centroid({ type: "Polygon", coordinates: [coords] } as never)
  return (
    <g>
      <path d={d} fill="oklch(0.42 0.07 232 / 0.7)" stroke="oklch(0.6 0.08 230 / 0.5)" strokeWidth={0.6} />
      {label && isFinite(c[0]) && (
        <text
          x={c[0]}
          y={c[1]}
          textAnchor="middle"
          className="fill-foreground/45"
          style={{ fontSize: 5.5, fontStyle: "italic", letterSpacing: 0.2 }}
        >
          {label}
        </text>
      )}
    </g>
  )
}

/** A resource / mineral-zone marker (diamond) with label. */
export function Resource({
  at,
  label,
  color = "var(--primary)",
  align = "right",
  delay = 0,
}: {
  at: [number, number]
  label: string
  color?: string
  align?: "left" | "right"
  delay?: number
}) {
  const { projection } = useGeo()
  const [x, y] = project(projection, at)
  const dx = align === "left" ? -7 : 7
  const anchor = align === "left" ? "end" : "start"
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <rect
        x={x - 3}
        y={y - 3}
        width={6}
        height={6}
        fill={color}
        stroke="oklch(0.19 0.03 258)"
        strokeWidth={0.8}
        transform={`rotate(45 ${x} ${y})`}
      />
      <text
        x={x + dx}
        y={y + 2.4}
        textAnchor={anchor}
        className="fill-foreground/85"
        style={{ fontSize: 6.5, fontWeight: 600, letterSpacing: 0.2 }}
        paintOrder="stroke"
        stroke="oklch(0.19 0.03 258)"
        strokeWidth={2.2}
        strokeLinejoin="round"
      >
        {label}
      </text>
    </motion.g>
  )
}

/** Standalone text label placed at a geo point. */
export function GeoLabel({
  at,
  children,
  size = 9,
  color = "fill-foreground",
  weight = 700,
  uppercase = true,
  align = "middle",
  dy = 0,
}: {
  at: [number, number]
  children: ReactNode
  size?: number
  color?: string
  weight?: number
  uppercase?: boolean
  align?: "start" | "middle" | "end"
  dy?: number
}) {
  const { projection } = useGeo()
  const [x, y] = project(projection, at)
  return (
    <text
      x={x}
      y={y + dy}
      textAnchor={align}
      className={color}
      style={{
        fontSize: size,
        fontWeight: weight,
        letterSpacing: uppercase ? 1.2 : 0.2,
        textTransform: uppercase ? "uppercase" : "none",
      }}
      paintOrder="stroke"
      stroke="oklch(0.19 0.03 258)"
      strokeWidth={2.6}
      strokeLinejoin="round"
    >
      {children as never}
    </text>
  )
}
