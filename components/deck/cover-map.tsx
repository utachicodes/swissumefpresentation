"use client"

import { GeoMap, Landmass, Hotspot, GeoLabel } from "./maps/geo-map"
import { allCountries, countries } from "./maps/geo"

const FOCUS = ["Ukraine", "Mali", "Burkina Faso", "Niger", "Sudan", "Dem. Rep. Congo"]

/** Full-bleed decorative world map behind the cover title. */
export function CoverMap() {
  const focus = countries(FOCUS)
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      <div className="h-full w-full max-w-6xl">
        <GeoMap bounds={[-24, -40, 62, 66]} projection="equalEarth" w={1000} h={680} bare graticule={10}>
          <Landmass
            features={allCountries}
            fill="oklch(0.95 0.01 90 / 0.14)"
            stroke="oklch(0.95 0.01 90 / 0.26)"
            strokeWidth={0.5}
          />
          <Landmass
            features={focus}
            fill="color-mix(in oklch, var(--destructive) 18%, transparent)"
            stroke="color-mix(in oklch, var(--destructive) 60%, transparent)"
            strokeWidth={0.9}
          />
          <Hotspot at={[31, 49]} r={5} delay={0.9} />
          <Hotspot at={[30, 15.5]} r={5} delay={1.1} />
          <Hotspot at={[28.5, -1.6]} r={5} delay={1.3} />
          <Hotspot at={[0.5, 15]} r={4} delay={1.5} />

          <GeoLabel at={[31, 52.5]} size={8} color="fill-foreground/70">
            Ukraine
          </GeoLabel>
          <GeoLabel at={[0, 19]} size={8} color="fill-foreground/70">
            Sahel
          </GeoLabel>
          <GeoLabel at={[30, 19]} size={8} color="fill-foreground/70">
            Soudan
          </GeoLabel>
          <GeoLabel at={[26, -5]} size={7.5} color="fill-foreground/70">
            Est RDC
          </GeoLabel>
        </GeoMap>
      </div>
    </div>
  )
}
