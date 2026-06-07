import { OverviewMap } from "@/components/deck/maps/map-overview"
import { UkraineConflictMap } from "@/components/deck/maps/map-ukraine"
import { SahelMap } from "@/components/deck/maps/map-sahel"
import { SudanMap } from "@/components/deck/maps/map-sudan"
import { CongoMap } from "@/components/deck/maps/map-congo"

const MAPS: Record<string, React.ReactNode> = {
  overview: <OverviewMap />,
  ukraine: <UkraineConflictMap />,
  sahel: <SahelMap />,
  sudan: <SudanMap />,
  congo: <CongoMap />,
}

export default async function MapTest({
  searchParams,
}: {
  searchParams: Promise<{ map?: string }>
}) {
  const { map } = await searchParams
  const sel = map && MAPS[map] ? [MAPS[map]] : Object.values(MAPS)
  const wide = !!(map && MAPS[map])
  return (
    <main className="min-h-screen bg-background p-10">
      <div className={`mx-auto grid gap-12 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
        {sel.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
    </main>
  )
}
