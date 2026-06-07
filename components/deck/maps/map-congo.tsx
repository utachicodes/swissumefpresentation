"use client"

import {
  GeoMap,
  WorldContext,
  Provinces,
  Water,
  Resource,
  City,
  GeoLabel,
  type ProvinceStyle,
} from "./geo-map"
import { MapCard, type LegendItem } from "./map-card"

const C = "var(--rdc)" // green conflict tone
const AU = "var(--primary)" // resource amber

const conflict: ProvinceStyle = {
  fill: "color-mix(in oklch, var(--destructive) 24%, transparent)",
  stroke: "var(--destructive)",
  pattern: true,
}
const spill: ProvinceStyle = {
  fill: "color-mix(in oklch, var(--destructive) 11%, transparent)",
  stroke: "color-mix(in oklch, var(--destructive) 45%, transparent)",
}

const styles: Record<string, ProvinceStyle> = {
  Ituri: conflict,
  "North Kivu": conflict,
  "South Kivu": conflict,
  Maniema: spill,
  Tanganyika: spill,
}

// approximate lake outlines for orientation
const lakeAlbert: [number, number][] = [
  [30.95, 1.0], [31.05, 1.5], [31.35, 2.2], [31.25, 2.35], [30.95, 1.7], [30.85, 1.1], [30.95, 1.0],
]
const lakeEdward: [number, number][] = [
  [29.2, -0.05], [29.45, -0.1], [29.7, -0.35], [29.6, -0.62], [29.3, -0.55], [29.18, -0.3], [29.2, -0.05],
]
const lakeKivu: [number, number][] = [
  [28.92, -1.6], [29.18, -1.6], [29.42, -1.95], [29.35, -2.35], [29.05, -2.4], [28.86, -2.05], [28.92, -1.6],
]
const lakeTanganyika: [number, number][] = [
  [29.05, -3.35], [29.3, -3.4], [29.55, -4.3], [29.85, -5.6], [30.2, -6.8], [30.0, -6.9], [29.6, -5.6],
  [29.3, -4.3], [29.05, -3.35],
]

const legend: LegendItem[] = [
  { label: "Province en conflit armé", color: "var(--destructive)", kind: "hatch" },
  { label: "Débordement régional", color: "var(--destructive)", kind: "fill" },
  { label: "Zone minière (coltan / or)", color: AU, kind: "fill" },
  { label: "Groupe armé", color: "var(--paper)", kind: "dot" },
]

export function CongoMap() {
  return (
    <MapCard
      index="Fig. 04"
      region="Est de la RDC"
      coords="Kivu · Ituri · Grands Lacs"
      source="Synthèse · 2024"
      caption="Conflit armé & économie minière de guerre"
      legend={legend}
    >
      <GeoMap bounds={[25.8, -6.4, 32, 3.4]} projection="mercator" w={760} h={620} graticule={2}>
        <WorldContext exclude={["Dem. Rep. Congo"]} />
        <Provinces region="congo" styles={styles} />

        <Water coords={lakeAlbert} label="L. Albert" />
        <Water coords={lakeEdward} label="L. Édouard" />
        <Water coords={lakeKivu} label="L. Kivu" />
        <Water coords={lakeTanganyika} label="Lac Tanganyika" />

        {/* mineral zones */}
        <Resource at={[28.0, -1.35]} label="Coltan / Walikale" color={AU} align="left" delay={0.8} />
        <Resource at={[30.1, 1.9]} label="Or / Ituri" color={AU} align="right" delay={0.95} />

        {/* armed groups */}
        <GeoLabel at={[28.75, -0.85]} size={8} color="fill-destructive" weight={800}>
          M23
        </GeoLabel>
        <GeoLabel at={[28.45, -2.05]} size={7} color="fill-foreground/80" weight={700}>
          FDLR
        </GeoLabel>
        <GeoLabel at={[30.25, 2.35]} size={7} color="fill-foreground/80" weight={700}>
          CODECO
        </GeoLabel>
        <GeoLabel at={[29.7, 0.7]} size={7} color="fill-foreground/80" weight={700}>
          ADF
        </GeoLabel>

        <City at={[29.22, -1.68]} name="Goma" align="left" delay={1.1} />
        <City at={[28.84, -2.51]} name="Bukavu" align="left" delay={1.15} />
        <City at={[30.25, 1.56]} name="Bunia" align="right" delay={1.2} />
        <City at={[29.47, 0.49]} name="Beni" align="right" delay={1.25} />

        <GeoLabel at={[26.6, -0.6]} size={9} color="fill-foreground/35">
          RDC
        </GeoLabel>
        <GeoLabel at={[30.05, -2.0]} size={7} color="fill-foreground/55">
          Rwanda
        </GeoLabel>
        <GeoLabel at={[31.4, 0.9]} size={7.5} color="fill-foreground/45">
          Ouganda
        </GeoLabel>
        <GeoLabel at={[29.95, -3.45]} size={7} color="fill-foreground/45">
          Burundi
        </GeoLabel>
        <GeoLabel at={[31.2, -4.6]} size={7.5} color="fill-foreground/40">
          Tanzanie
        </GeoLabel>
      </GeoMap>
    </MapCard>
  )
}
