"use client"

import { GeoMap, WorldContext, Provinces, Arrow, City, GeoLabel, Hotspot, type ProvinceStyle } from "./geo-map"
import { MapCard, type LegendItem } from "./map-card"

const RSF = "var(--sd)" // amber
const SAF = "oklch(0.66 0.11 235)" // steel blue
const HOT = "var(--destructive)"

const rsf: ProvinceStyle = { fill: "color-mix(in oklch, var(--sd) 26%, transparent)", stroke: RSF, pattern: true }
const saf: ProvinceStyle = { fill: "color-mix(in oklch, oklch(0.66 0.11 235) 22%, transparent)", stroke: SAF }
const hot: ProvinceStyle = { fill: "color-mix(in oklch, var(--destructive) 34%, transparent)", stroke: HOT, glow: true }

const styles: Record<string, ProvinceStyle> = {
  // RSF-dominant (Darfur + western Kordofan)
  "North Darfur": rsf,
  "South Darfur": rsf,
  "West Darfur": rsf,
  "Central Darfur": rsf,
  "East Darfur": rsf,
  "West Kordofan": rsf,
  "South Kordofan": rsf,
  // SAF-dominant (east & north)
  "Red Sea": saf,
  "River Nile": saf,
  Northern: saf,
  Kassala: saf,
  Gedaref: saf,
  "Blue Nile": saf,
  Sennar: saf,
  // contested epicentre
  Khartoum: hot,
  Gezira: hot,
  "North Kordofan": { fill: "color-mix(in oklch, var(--destructive) 18%, transparent)", stroke: HOT },
  "White Nile": { fill: "color-mix(in oklch, var(--destructive) 14%, transparent)", stroke: HOT },
}

const legend: LegendItem[] = [
  { label: "Zone sous influence FSR", color: RSF, kind: "hatch" },
  { label: "Zone sous influence armée (SAF)", color: SAF, kind: "fill" },
  { label: "Épicentre des combats", color: HOT, kind: "fill" },
  { label: "Flux de réfugiés", color: RSF, kind: "arrow" },
]

export function SudanMap() {
  return (
    <MapCard
      index="Fig. 03"
      region="Soudan"
      coords="15.5°N · 32.5°E"
      source="Synthèse · juin 2024"
      caption="Guerre SAF / FSR & onde de choc régionale"
      legend={legend}
    >
      <GeoMap bounds={[20, 7.6, 40, 23.8]} projection="mercator" w={880} h={560} graticule={4}>
        <WorldContext exclude={["Sudan"]} />
        <Provinces region="sudan" styles={styles} />

        <Hotspot at={[32.53, 15.59]} r={4.5} delay={0.6} />

        {/* refugee / displacement flows */}
        <Arrow from={[22.6, 13.5]} to={[20.7, 14]} flow color={RSF} curve={0.18} delay={0.9} />
        <Arrow from={[28.5, 11]} to={[29.2, 9]} flow color={RSF} curve={0.1} delay={1.0} />
        <Arrow from={[31.5, 19]} to={[31.8, 22.6]} flow color={RSF} curve={-0.12} delay={1.1} />
        <Arrow from={[35.2, 14.5]} to={[37, 13]} flow color={RSF} curve={0.16} delay={1.2} />

        <City at={[32.53, 15.59]} name="Khartoum" capital align="right" delay={1.3} />
        <City at={[25.35, 13.63]} name="El Fasher" align="left" delay={1.35} />
        <City at={[24.88, 12.05]} name="Nyala" align="left" delay={1.4} />
        <City at={[37.22, 19.62]} name="Port-Soudan" align="right" delay={1.45} />
        <City at={[30.22, 13.18]} name="El Obeid" align="bottom" delay={1.5} />

        <GeoLabel at={[20.6, 14.6]} size={8} color="fill-foreground/45">
          Tchad
        </GeoLabel>
        <GeoLabel at={[31.5, 23.2]} size={8} color="fill-foreground/45">
          Égypte
        </GeoLabel>
        <GeoLabel at={[29.5, 8.3]} size={7.5} color="fill-foreground/45">
          Soudan du Sud
        </GeoLabel>
        <GeoLabel at={[37.6, 12.4]} size={7.5} color="fill-foreground/45">
          Éthiopie
        </GeoLabel>
        <GeoLabel at={[24, 9.5]} size={7.5} color="fill-foreground/35" align="middle">
          Darfour
        </GeoLabel>
        <GeoLabel at={[36, 18]} size={7} color="fill-foreground/30" uppercase={false}>
          Mer Rouge
        </GeoLabel>
      </GeoMap>
    </MapCard>
  )
}
