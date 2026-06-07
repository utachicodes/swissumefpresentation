"use client"

import { GeoMap, WorldContext, Provinces, Hotspot, City, GeoLabel, type ProvinceStyle } from "./geo-map"
import { MapCard, type LegendItem } from "./map-card"

const V = "var(--sahel)" // violet conflict tone

const high: ProvinceStyle = { fill: "color-mix(in oklch, var(--sahel) 30%, transparent)", stroke: V, pattern: true }
const med: ProvinceStyle = { fill: "color-mix(in oklch, var(--sahel) 16%, transparent)", stroke: "color-mix(in oklch, var(--sahel) 50%, transparent)" }

const styles: Record<string, ProvinceStyle> = {
  // Mali — north & centre
  Kidal: high,
  Gao: high,
  Tombouctou: high,
  Mopti: high,
  Segou: med,
  // Burkina Faso
  Sahel: high,
  Est: high,
  Nord: med,
  "Centre-Nord": high,
  "Boucle du Mouhoun": med,
  // Niger — west & east
  Tillaberi: high,
  "Tahoua/Agadez": med,
  "Zinder/Diffa": med,
}

const legend: LegendItem[] = [
  { label: "Zone d'insécurité élevée", color: V, kind: "hatch" },
  { label: "Pression sécuritaire", color: V, kind: "fill" },
  { label: "Triple frontière (foyer)", color: "var(--destructive)", kind: "dot" },
  { label: "Capitale", color: "var(--paper)", kind: "dot" },
]

export function SahelMap() {
  return (
    <MapCard
      index="Fig. 02"
      region="Sahel central"
      coords="Mali · Burkina · Niger"
      source="Synthèse géopolitique · 2024"
      caption="Zones d'insécurité & activité des groupes armés"
      legend={legend}
    >
      <GeoMap bounds={[-12.5, 8.8, 16.5, 25.6]} projection="mercator" w={880} h={560} graticule={5}>
        <WorldContext exclude={["Mali", "Burkina Faso", "Niger"]} />
        <Provinces region="sahel" styles={styles} />

        {/* tri-border hotspot (Liptako-Gourma) */}
        <Hotspot at={[0.2, 14.7]} r={5} delay={0.6} />

        <City at={[-8.0, 12.65]} name="Bamako" capital align="left" delay={0.9} />
        <City at={[-1.52, 12.37]} name="Ouagadougou" capital align="bottom" delay={1.0} />
        <City at={[2.11, 13.51]} name="Niamey" capital align="right" delay={1.1} />
        <City at={[-0.04, 16.27]} name="Gao" align="right" delay={1.2} />
        <City at={[-3.0, 16.77]} name="Tombouctou" align="top" delay={1.25} />
        <City at={[1.41, 18.44]} name="Kidal" align="right" delay={1.3} />

        <GeoLabel at={[1.4, 13.7]} size={7} color="fill-destructive/90" align="middle" dy={-10}>
          Triple frontière
        </GeoLabel>

        <GeoLabel at={[3, 24.3]} size={8} color="fill-foreground/35">
          Algérie
        </GeoLabel>
        <GeoLabel at={[-10.5, 20]} size={8} color="fill-foreground/35">
          Mauritanie
        </GeoLabel>
        <GeoLabel at={[8.5, 11]} size={8} color="fill-foreground/35">
          Nigéria
        </GeoLabel>
        <GeoLabel at={[15, 15.5]} size={7.5} color="fill-foreground/35">
          Tchad
        </GeoLabel>
        <GeoLabel at={[-6, 23]} size={7} color="fill-foreground/25" uppercase={false}>
          Sahara
        </GeoLabel>
      </GeoMap>
    </MapCard>
  )
}
