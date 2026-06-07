// Geographic data layer for the bespoke conflict maps.
// World context comes from Natural Earth 50m (topojson); regional detail comes
// from geoBoundaries ADM1 provinces, pre-simplified into compact GeoJSON.
import { feature, mesh } from "topojson-client"
import type { Feature, FeatureCollection, Geometry } from "geojson"

import world50m from "./data/world-50m.json"
import ukraineAdm1 from "./data/ukraine-adm1.json"
import sudanAdm1 from "./data/sudan-adm1.json"
import congoAdm1 from "./data/congo-adm1.json"
import sahelAdm1 from "./data/sahel-adm1.json"

/* eslint-disable @typescript-eslint/no-explicit-any */
const topo = world50m as any

export type NamedFeature = Feature<Geometry, { name: string }>

const countriesFC = feature(topo, topo.objects.countries) as unknown as FeatureCollection<
  Geometry,
  { name: string }
>

/** Inner borders of all countries, as one mesh path-able geometry. */
export const countryBorders = mesh(topo, topo.objects.countries, (a, b) => a !== b)

/** Outer coastline / land outline. */
export const landOutline = mesh(topo, topo.objects.countries, (a, b) => a === b)

export const allCountries: NamedFeature[] = countriesFC.features as NamedFeature[]

export function countries(names: string[]): NamedFeature[] {
  const set = new Set(names)
  return allCountries.filter((f) => set.has(f.properties.name))
}

export function country(name: string): NamedFeature | undefined {
  return allCountries.find((f) => f.properties.name === name)
}

/* ---- regional ADM1 province sets ---- */

export const regions = {
  ukraine: ukraineAdm1 as unknown as FeatureCollection<Geometry, { name: string }>,
  sudan: sudanAdm1 as unknown as FeatureCollection<Geometry, { name: string }>,
  congo: congoAdm1 as unknown as FeatureCollection<Geometry, { name: string }>,
  sahel: sahelAdm1 as unknown as FeatureCollection<Geometry, { name: string }>,
}

export type RegionKey = keyof typeof regions

export function provinces(region: RegionKey): NamedFeature[] {
  return regions[region].features as NamedFeature[]
}

/** Build a rectangular GeoJSON polygon from a [w, s, e, n] bbox for fitExtent.
    Wound clockwise so d3-geo treats it as a small region, not the global complement. */
export function bboxPolygon([w, s, e, n]: [number, number, number, number]): Feature {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [w, s],
          [w, n],
          [e, n],
          [e, s],
          [w, s],
        ],
      ],
    },
  }
}
