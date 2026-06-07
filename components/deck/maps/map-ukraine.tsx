"use client"

import { GeoMap, WorldContext, Provinces, Frontline, Arrow, City, GeoLabel } from "./geo-map"
import { MapCard, type LegendItem } from "./map-card"

const RED = "var(--destructive)"

const annexed = "color-mix(in oklch, var(--destructive) 48%, transparent)"
const occupied = "color-mix(in oklch, var(--destructive) 26%, transparent)"

const styles = {
  "Autonomous Republic of Crimea": { fill: annexed, stroke: RED },
  Sevastopol: { fill: annexed, stroke: RED },
  "Luhansk Oblast": { fill: occupied, stroke: RED, pattern: true },
  "Donetsk Oblast": { fill: occupied, stroke: RED, pattern: true },
  "Zaporizhia Oblast": { fill: occupied, stroke: RED, pattern: true },
  "Kherson Oblast": { fill: occupied, stroke: RED, pattern: true },
}

// approximate front line, May 2024 (NE → S), in [lng, lat]
const front: [number, number][] = [
  [37.5, 50.25],
  [37.7, 49.6],
  [38.1, 48.6],
  [37.85, 48.0],
  [37.2, 47.75],
  [36.0, 47.55],
  [35.7, 47.4],
  [33.6, 46.65],
  [32.5, 46.5],
]

const legend: LegendItem[] = [
  { label: "Annexé (2014)", color: RED, kind: "fill" },
  { label: "Occupé / contesté", color: RED, kind: "hatch" },
  { label: "Ligne de front", color: RED, kind: "line" },
  { label: "Axes d'offensive russe", color: RED, kind: "arrow" },
]

export function UkraineConflictMap() {
  return (
    <MapCard
      index="Fig. 01"
      region="Ukraine"
      coords="48.4°N · 31.2°E"
      source="ISW · 24 mai 2024"
      caption="Contrôle territorial & axes d'offensive"
      legend={legend}
    >
      <GeoMap bounds={[21.5, 43.6, 41.2, 52.8]} projection="conic" w={880} h={560} graticule={4}>
        <WorldContext exclude={["Ukraine"]} />
        <Provinces region="ukraine" styles={styles} />

        {/* offensive axes (2022) */}
        <Arrow from={[30.6, 52.4]} to={[30.7, 50.9]} curve={0.12} delay={0.5} label="Kiev" />
        <Arrow from={[38.6, 50.6]} to={[36.7, 50.05]} curve={0.18} delay={0.65} label="Kharkiv" />
        <Arrow from={[39.6, 48.4]} to={[38.2, 48.3]} curve={-0.2} delay={0.8} label="Donbass" />
        <Arrow from={[34.2, 45.0]} to={[35.4, 47.0]} curve={0.22} delay={0.95} label="Sud" />

        <Frontline points={front} color={RED} width={2.4} dash delay={1.1} />

        <City at={[30.52, 50.45]} name="Kiev" capital align="left" delay={1.2} />
        <City at={[36.25, 49.99]} name="Kharkiv" align="right" delay={1.3} />
        <City at={[30.74, 46.48]} name="Odessa" align="left" delay={1.35} />
        <City at={[37.55, 47.1]} name="Marioupol" align="right" delay={1.4} />
        <City at={[24.03, 49.84]} name="Lviv" align="left" delay={1.45} />

        <GeoLabel at={[37.5, 51.6]} size={9} color="fill-foreground/40">
          Russie
        </GeoLabel>
        <GeoLabel at={[28.5, 52.4]} size={8} color="fill-foreground/35">
          Biélorussie
        </GeoLabel>
        <GeoLabel at={[31.5, 44.4]} size={7.5} color="fill-foreground/35" uppercase={false}>
          Mer Noire
        </GeoLabel>
      </GeoMap>
    </MapCard>
  )
}
