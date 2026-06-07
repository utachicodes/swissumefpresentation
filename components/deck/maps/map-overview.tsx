"use client"

import { GeoMap, WorldContext, Landmass, Hotspot, GeoLabel } from "./geo-map"
import { MapCard, type LegendItem } from "./map-card"
import { countries } from "./geo"

const FOCUS = ["Ukraine", "Mali", "Burkina Faso", "Niger", "Sudan", "Dem. Rep. Congo"]

const legend: LegendItem[] = [
  { label: "Théâtres étudiés", color: "var(--primary)", kind: "fill" },
  { label: "Foyer de conflit actif", color: "var(--destructive)", kind: "dot" },
]

export function OverviewMap() {
  const focus = countries(FOCUS)
  return (
    <MapCard
      index="Carte"
      region="Europe · Afrique"
      coords="2024"
      source="Synthèse · théâtres de conflit"
      caption="Conflits & crises sécuritaires contemporains"
      legend={legend}
    >
      <GeoMap bounds={[-20, -37, 53, 60]} projection="equalEarth" w={880} h={620} graticule={10}>
        <WorldContext exclude={FOCUS} />
        <Landmass
          features={focus}
          fill="color-mix(in oklch, var(--primary) 38%, var(--map-land-2))"
          stroke="color-mix(in oklch, var(--primary) 90%, transparent)"
          strokeWidth={1.2}
        />

        {/* active-conflict foci */}
        <Hotspot at={[31, 49]} delay={0.5} />
        <Hotspot at={[30, 15.5]} delay={0.7} />
        <Hotspot at={[28.5, -1.6]} delay={0.9} />
        <Hotspot at={[0.5, 15]} delay={1.1} />
        <Hotspot at={[-1.5, 12.6]} r={3} delay={1.2} />
        <Hotspot at={[3, 14.5]} r={3} delay={1.3} />

        <GeoLabel at={[31, 51.6]} delay={0} size={10} color="fill-foreground/90">
          Ukraine
        </GeoLabel>
        <GeoLabel at={[2, 17.6]} size={9.5} color="fill-foreground/90">
          Sahel
        </GeoLabel>
        <GeoLabel at={[30, 17.6]} size={9.5} color="fill-foreground/90">
          Soudan
        </GeoLabel>
        <GeoLabel at={[27.5, -4]} size={9} color="fill-foreground/90">
          Est RDC
        </GeoLabel>

        <GeoLabel at={[10, 50]} size={8} color="fill-foreground/35">
          Europe
        </GeoLabel>
        <GeoLabel at={[20, 2]} size={8} color="fill-foreground/35">
          Afrique
        </GeoLabel>
        <GeoLabel at={[18, 27]} size={7} color="fill-foreground/30" uppercase={false}>
          Sahara
        </GeoLabel>
      </GeoMap>
    </MapCard>
  )
}
