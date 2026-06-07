"use client"

import { Slide } from "./slide"
import {
  Bullets,
  Grid,
  Kicker,
  Lead,
  PointCard,
  Reveal,
  StatCard,
  Title,
} from "./primitives"
import { motion } from "motion/react"
import { CoverMap } from "./cover-map"
import { OverviewMap } from "./maps/map-overview"
import { UkraineConflictMap } from "./maps/map-ukraine"
import { SahelMap } from "./maps/map-sahel"
import { SudanMap } from "./maps/map-sudan"
import { CongoMap } from "./maps/map-congo"
import { ActorsDiagram, ComparisonMatrix, SolutionsInfographic } from "./infographics"

/* =================== 0. COVER =================== */
function Cover() {
  return (
    <Slide className="items-center justify-center py-16 text-center">
      {/* real vector world map with animated conflict markers */}
      <CoverMap />
      {/* atmosphere: above the map, beneath the content */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-grid opacity-20" />
      <div className="pointer-events-none absolute inset-0 z-[1] [background:radial-gradient(ellipse_48%_40%_at_center,color-mix(in_oklch,var(--background)_72%,transparent)_0%,color-mix(in_oklch,var(--background)_28%,transparent)_55%,transparent_80%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] [background:radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--destructive)_12%,transparent),transparent_55%)]" />

      <div className="relative z-10 flex w-full flex-col items-center">
      {/* brand */}
      <Reveal>
        <div className="flex flex-col items-center gap-1.5">
          <p className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            Swiss Umef University
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Excellence · Innovation · Global Impact
          </p>
        </div>
      </Reveal>

      {/* title */}
      <Reveal delay={0.12}>
        <h1 className="mt-8 font-heading text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-balance md:text-6xl">
          Conflits contemporains
          <br />
          <span className="text-primary">dans le monde</span>
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Étude de cas : Ukraine, Soudan, RDC et le Sahel
        </p>
      </Reveal>

      {/* footer credits */}
      <Reveal delay={0.3} className="w-full">
        <div className="mt-10 w-full max-w-4xl border-t border-border pt-6">
          <div className="grid gap-8 md:grid-cols-[1fr_auto_auto]">
            {/* Students — 2-col grid */}
            <div>
              <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Étudiantes
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-muted-foreground">
                {[
                  "Fa Bintou Gaye",
                  "Tracy Ruth Nkouka Champlin",
                  "Fatou Binetou Sarr",
                  "Mame Awa Sow Diallo",
                  "Thrissia Charlene Mendoza Languina",
                  "Henriette Diarra Ngom",
                  "Odilia Tavares",
                ].map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>

            {/* Professor */}
            <div className="md:border-l md:border-border md:pl-8">
              <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Professeur
              </p>
              <p className="text-sm text-muted-foreground">Ruch Jean Daniel</p>
            </div>

            {/* Class */}
            <div className="md:border-l md:border-border md:pl-8">
              <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Cours
              </p>
              <p className="text-sm text-muted-foreground">Géopolitique</p>
              <p className="text-sm text-muted-foreground">2025 – 2026</p>
            </div>
          </div>
        </div>
      </Reveal>
      </div>
    </Slide>
  )
}

/* =================== 1. INTRO =================== */
/* =================== SOMMAIRE =================== */
function Sommaire() {
  const parts: { num: string; title: string; sub?: string[] }[] = [
    {
      num: "I",
      title: "Les conflits contemporains en Europe : le cas de l'Ukraine",
      sub: ["Origines", "Déroulement", "Conséquences géopolitiques"],
    },
    {
      num: "II",
      title: "Les conflits contemporains en Afrique",
      sub: ["Le Sahel", "Le Soudan", "L'est de la RDC"],
    },
    {
      num: "III",
      title: "Les acteurs des conflits contemporains",
      sub: ["Acteurs étatiques", "Acteurs non étatiques"],
    },
    {
      num: "IV",
      title: "Analyse comparative des conflits",
      sub: ["Des causes communes", "Des conséquences convergentes"],
    },
    {
      num: "V",
      title: "Perspectives de résolution et enjeux pour l'avenir",
      sub: ["Le rôle des organisations internationales", "Les solutions envisageables"],
    },
  ]
  return (
    <Slide className="items-start justify-center">
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <Kicker>Sommaire</Kicker>
      <Title className="mt-5 mb-10">Plan de l'étude</Title>
      <div className="grid w-full gap-x-12 gap-y-6 md:grid-cols-2">
        {parts.map((p, i) => (
          <Reveal key={p.num} delay={i * 0.08}>
            <div className="flex gap-4 border-l border-border pl-5">
              <span className="font-heading text-3xl font-semibold leading-none text-primary">
                {p.num}
              </span>
              <div>
                <p className="font-heading text-lg font-medium leading-snug text-foreground text-pretty">
                  {p.title}
                </p>
                {p.sub && (
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {p.sub.map((s) => (
                      <li key={s} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={parts.length * 0.08}>
          <div className="flex items-center gap-4 border-l border-primary/40 pl-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Introduction · Conclusion
            </span>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}

function Intro() {
  return (
    <Slide>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <Kicker>Introduction</Kicker>
          <Title>Une transformation brutale des conflits mondiaux</Title>
          <Lead>
            Loin des promesses de paix, guerre de haute intensité en Europe avec
            l'invasion de l'Ukraine et des crises complexes en Afrique (Soudan,
            Sahel, RDC) impliquent désormais une multitude d'acteurs étatiques
            et non étatiques.
          </Lead>
          <Reveal>
            <p className="rounded-xl border border-primary/30 bg-primary/5 p-5 font-heading text-lg italic leading-relaxed text-foreground md:text-xl">
              « Quelles sont les dynamiques communes à ces conflits
              contemporains et comment bouleversent-ils la diplomatie mondiale ? »
            </p>
          </Reveal>
        </div>
        <OverviewMap />
      </div>
    </Slide>
  )
}

/* =================== PART DIVIDER =================== */
function PartDivider({
  num,
  title,
  subtitle,
  color,
}: {
  num: string
  title: string
  subtitle: string
  color: "ua" | "sahel" | "primary"
}) {
  const text = "text-primary"
  return (
    <Slide className="items-start">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <Reveal>
        <span className={`font-heading text-[26vw] font-semibold leading-none ${text} opacity-15 md:text-[18rem]`}>
          {num}
        </span>
      </Reveal>
      <div className="-mt-10 md:-mt-24">
        <Title>{title}</Title>
        <div className="mt-5 max-w-xl">
          <Lead>{subtitle}</Lead>
        </div>
      </div>
    </Slide>
  )
}

/* =================== UKRAINE =================== */
function UkraineOrigins() {
  return (
    <Slide>
      <div className="flex flex-col gap-7">
        <Kicker>I. Europe · le cas de l'Ukraine</Kicker>
        <Title>A. Origines du conflit</Title>
        <Lead>
          Le conflit trouve son origine dans des tensions politiques,
          historiques et territoriales nourries depuis l'indépendance de
          l'Ukraine en 1991.
        </Lead>
        <Grid className="md:grid-cols-3">
          <PointCard index="1991" title="Rapprochement occidental">
            Après son indépendance, l'Ukraine se rapproche de l'Europe. La Russie
            la considère comme faisant partie de sa zone d'influence.
          </PointCard>
          <PointCard index="2014" title="Annexion de la Crimée">
            À la suite d'un changement de gouvernement, la Russie annexe la
            péninsule ukrainienne située sur la mer Noire.
          </PointCard>
          <PointCard index="2014" title="Donbass">
            Des mouvements séparatistes pro-russes apparaissent à l'est,
            provoquant des affrontements armés.
          </PointCard>
        </Grid>
      </div>
    </Slide>
  )
}

function UkraineCourse() {
  return (
    <Slide>
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <UkraineConflictMap />
        <div className="flex flex-col gap-6">
          <Kicker>I. Ukraine · Déroulement</Kicker>
          <Title>B. Déroulement</Title>
          <Bullets
            items={[
              "Le conflit débute réellement en 2014 avec les combats dans le Donbass.",
              "Le 24 février 2022, la Russie lance une offensive de grande ampleur : Kiev, Kharkiv et le sud du pays.",
              "L'armée ukrainienne organise une forte résistance avec le soutien financier, humanitaire et militaire de l'Occident.",
              "Depuis 2022, les combats se poursuivent malgré plusieurs tentatives de médiation internationale.",
            ]}
          />
        </div>
      </div>
    </Slide>
  )
}

function UkraineConsequences() {
  return (
    <Slide>
      <div className="flex flex-col gap-7">
        <Kicker>I. Ukraine · Conséquences</Kicker>
        <Title>C. Conséquences du conflit</Title>
        <Grid className="grid-cols-2 md:grid-cols-4">
          <StatCard value="+150 000" label="Morts (combattants et civils)" />
          <StatCard value="+10 M" label="Réfugiés et déplacés" />
          <StatCard value="−30 %" label="Contraction du PIB ukrainien (2022)" />
          <StatCard value="Monde" label="Hausse des prix de l'énergie et de l'alimentation" />
        </Grid>
        <Grid className="md:grid-cols-2">
          <PointCard title="Destructions massives">
            Logements, écoles, hôpitaux et routes détruits ; accès humanitaire
            difficile dans les zones de combat.
          </PointCard>
          <PointCard title="Répercussions géopolitiques">
            Renforcement des tensions politiques et militaires en Europe, avec un
            impact qui dépasse largement les frontières ukrainiennes.
          </PointCard>
        </Grid>
      </div>
    </Slide>
  )
}

/* =================== SAHEL =================== */
function Sahel() {
  return (
    <Slide>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <Kicker>II. Afrique · le Sahel</Kicker>
          <Title>D'une crise locale à un défi géopolitique majeur</Title>
          <Lead>
            Mali, Burkina Faso et Niger occupent une position stratégique entre
            Sahara et Afrique de l'Ouest. La crise s'enracine dans une longue
            histoire de fragilités politiques, sociales et économiques.
          </Lead>
          <Bullets
            items={[
              "Des frontières coloniales tracées sans tenir compte des réalités ethniques fragmentent les peuples, dont les Touaregs, qui dénoncent leur marginalisation.",
              "2011 : la chute de Kadhafi disperse un immense arsenal et renvoie des combattants armés vers le Mali et le Niger.",
              "2012 : rébellion au nord du Mali (MNLA), vite supplantée par des groupes djihadistes liés à Al-Qaïda à Gao, Tombouctou et Kidal.",
            ]}
          />
        </div>
        <SahelMap />
      </div>
    </Slide>
  )
}

function SahelSpiral() {
  return (
    <Slide>
      <div className="flex flex-col gap-7">
        <Kicker>II. Le Sahel</Kicker>
        <Title>Une spirale qui dépasse le terrorisme</Title>
        <Grid className="md:grid-cols-3">
          <PointCard index="2013" title="Opération Serval">
            La France intervient pour stopper l'avancée vers Bamako. Plusieurs
            villes sont reprises, mais les causes profondes demeurent.
          </PointCard>
          <PointCard index="2014" title="Barkhane & MINUSMA">
            L'intervention s'élargit à plusieurs pays ; l'ONU déploie la MINUSMA
            pour stabiliser le Mali et protéger les civils.
          </PointCard>
          <PointCard index="2020–23" title="Vague de coups d'État">
            Mali (2020, 2021), Burkina Faso (2022), Niger (2023) : perte de
            confiance entre populations, armées et gouvernements.
          </PointCard>
        </Grid>
        <Reveal>
          <p className="rounded-xl border border-primary/30 bg-primary/5 p-5 text-pretty leading-relaxed text-foreground">
            Réduire la situation au seul terrorisme serait une erreur : c'est une
            crise large combinant faiblesse de l'État, marginalisation, pauvreté,
            chômage et absence de services publics. La réponse militaire, seule,
            ne peut résoudre le conflit.
          </p>
        </Reveal>
      </div>
    </Slide>
  )
}

/* =================== SOUDAN =================== */
function Soudan() {
  return (
    <Slide>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <SudanMap />
        <div className="flex flex-col gap-6">
          <Kicker>II. Afrique · le Soudan</Kicker>
          <Title>Une guerre entre deux armées</Title>
          <Lead>
            Sur fond d'effondrement de l'État, la guerre n'a pas commencé en 2023 :
            elle est l'aboutissement d'une longue histoire de luttes de pouvoir
            entre élites militaires.
          </Lead>
          <Bullets
            items={[
              "Années 2000 : le conflit du Darfour et les milices Janjawids font des centaines de milliers de morts. De ces milices naissent les Forces de soutien rapide (RSF) d'Hemedti.",
              "2019 : chute d'Omar el-Béchir ; rivalité entre l'armée (général al-Burhan) et les RSF, financièrement autonomes via l'or.",
              "Avril 2023 : un désaccord sur l'intégration des RSF déclenche la guerre ouverte à Khartoum, puis au Darfour.",
            ]}
          />
        </div>
      </div>
    </Slide>
  )
}

function SoudanStats() {
  return (
    <Slide>
      <div className="flex flex-col gap-7">
        <Kicker>II. Le Soudan</Kicker>
        <Title>Un État fracturé, une crise régionale</Title>
        <Grid className="grid-cols-2 md:grid-cols-4">
          <StatCard value="+25 000" label="Morts estimés" />
          <StatCard value="+8 M" label="Déplacés" />
          <StatCard value="+150 %" label="Inflation galopante" />
          <StatCard value="−18,3 %" label="Chute du PIB (2023)" />
        </Grid>
        <Grid className="md:grid-cols-2">
          <PointCard title="Fragmentation du territoire">
            Chaque camp contrôle des zones et des axes stratégiques, rendant
            l'État incapable d'exercer une autorité unifiée.
          </PointCard>
          <PointCard title="Onde de choc régionale">
            Des centaines de milliers de réfugiés fuient vers le Tchad, le Soudan
            du Sud, l'Égypte et la Centrafrique, déjà vulnérables.
          </PointCard>
        </Grid>
      </div>
    </Slide>
  )
}

/* =================== RDC =================== */
function Rdc() {
  return (
    <Slide>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <Kicker>II. Afrique · l'est de la RDC</Kicker>
          <Title>Une guerre au cœur des richesses minérales</Title>
          <Lead>
            Or, diamants, étain, tungstène et surtout le coltan, essentiel à
            l'électronique : cette richesse n'a pas conduit au développement mais
            à une instabilité durable.
          </Lead>
          <Bullets
            items={[
              "1994 : le génocide des Tutsis au Rwanda pousse réfugiés et milices vers l'est du Zaïre, internationalisant le conflit.",
              "1996 puis 1998 : deux guerres du Congo impliquent plusieurs États africains et font des millions de morts et de déplacés.",
              "FDLR, M23 et autres groupes contrôlent des zones minières, finançant la guerre par l'exploitation illégale des ressources.",
            ]}
          />
        </div>
        <CongoMap />
      </div>
    </Slide>
  )
}

/* =================== ACTEURS =================== */
function Acteurs() {
  return (
    <Slide>
      <div className="flex flex-col gap-7">
        <Kicker>III. Les acteurs des conflits</Kicker>
        <Title>Acteurs étatiques et non étatiques</Title>
        <Lead>
          Les conflits contemporains opposent et impliquent une multitude
          d'acteurs : d'un côté les États et leurs armées, de l'autre des groupes
          armés, une société civile mobilisée et de nouveaux acteurs privés.
        </Lead>
        <ActorsDiagram />
      </div>
    </Slide>
  )
}

/* =================== COMPARAISON =================== */
function Comparaison() {
  return (
    <Slide>
      <div className="flex flex-col gap-7">
        <Kicker>IV. Analyse comparative</Kicker>
        <Title>A. Des causes communes</Title>
        <Grid className="md:grid-cols-3">
          <PointCard index="1" title="Fragilité des États">
            Sahel, Soudan, RDC : l'État peine à contrôler son territoire et à
            garantir la sécurité des populations.
          </PointCard>
          <PointCard index="2" title="Compétition pour les ressources">
            Coltan, or et cobalt en RDC ; mines au Soudan ; terre et eau entre
            agriculteurs et éleveurs au Sahel.
          </PointCard>
          <PointCard index="3" title="Divisions communautaires">
            Rivalités ethniques, religieuses et identitaires exploitées par des
            acteurs politiques ou militaires.
          </PointCard>
        </Grid>
        <ComparisonMatrix />
      </div>
    </Slide>
  )
}

function ConsequencesCommunes() {
  return (
    <Slide>
      <div className="flex flex-col gap-7">
        <Kicker>IV. Analyse comparative</Kicker>
        <Title>B. Des conséquences communes</Title>
        <Grid className="md:grid-cols-3">
          <PointCard index="1" title="Grave crise humanitaire">
            Des millions de personnes ont besoin d'aide ; l'insécurité limite
            l'accès à la nourriture, aux soins et à l'éducation.
          </PointCard>
          <PointCard index="2" title="Déplacements massifs">
            Le Soudan connaît l'une des plus grandes crises de déplacement au
            monde ; la RDC compte des millions de déplacés internes.
          </PointCard>
          <PointCard index="3" title="Recul économique">
            Infrastructures détruites, activités agricoles et commerciales
            perturbées, chute des investissements.
          </PointCard>
        </Grid>
      </div>
    </Slide>
  )
}

/* =================== PERSPECTIVES =================== */
function Organisations() {
  return (
    <Slide>
      <div className="flex flex-col gap-7">
        <Kicker>V. Perspectives de résolution</Kicker>
        <Title>A. Le rôle des organisations internationales</Title>
        <Lead>
          La résolution des conflits montre les limites actuelles du
          multilatéralisme face aux intérêts des grandes puissances.
        </Lead>
        <Grid className="md:grid-cols-2">
          <PointCard title="L'ONU, un rôle central mais bloqué">
            En Ukraine, le veto russe au Conseil de sécurité empêche certaines
            décisions. En Afrique, des missions comme la MONUSCO sont critiquées
            pour leur manque d'efficacité.
          </PointCard>
          <PointCard title="Les organisations régionales">
            En Europe, l'UE et l'OTAN soutiennent fortement l'Ukraine. En Afrique,
            l'UA et la CEDEAO cherchent des solutions africaines, mais manquent de
            moyens financiers et logistiques.
          </PointCard>
        </Grid>
      </div>
    </Slide>
  )
}

function Solutions() {
  return (
    <Slide>
      <div className="flex flex-col gap-7">
        <Kicker>V. Perspectives de résolution</Kicker>
        <Title>B. Les solutions envisageables</Title>
        <Lead>
          Aucune réponse militaire ne suffit à elle seule : la sortie de crise
          repose sur trois leviers complémentaires, à articuler ensemble.
        </Lead>
        <SolutionsInfographic />
      </div>
    </Slide>
  )
}

/* =================== CONCLUSION =================== */
function Conclusion() {
  return (
    <Slide className="items-start justify-center">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <Kicker>Conclusion</Kicker>
      <Title className="mt-5 max-w-4xl">
        Deux réalités stratégiques distinctes mais interconnectées.
      </Title>
      <div className="mt-6 max-w-3xl">
        <Lead>
          Les conflits contemporains en Europe et en Afrique mettent en lumière
          des logiques de violence opposées dans leur forme, mais liées par des
          dynamiques globales communes.
        </Lead>
      </div>

      <div className="mt-8 grid w-full gap-5 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              En Europe
            </p>
            <p className="mt-3 font-heading text-lg font-medium text-foreground">
              Un conflit interétatique et classique
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Une guerre entre États qui marque le retour de la rivalité des
              blocs et de la guerre de haute intensité.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              En Afrique
            </p>
            <p className="mt-3 font-heading text-lg font-medium text-foreground">
              Une conflictualité intra-étatique et asymétrique
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Nourrie par des faiblesses institutionnelles, des enjeux
              socio-économiques et le terrorisme, souvent exacerbée par des
              interventions extérieures.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="w-full">
        <div className="mt-6 flex items-start gap-4 rounded-xl border border-primary/30 bg-primary/5 p-6">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
          <p className="text-base leading-relaxed text-foreground text-pretty">
            Néanmoins, ces deux continents subissent tous deux le choc de la{" "}
            <span className="font-semibold text-primary">
              « guerre de l'information »
            </span>{" "}
            et l'implication de nouveaux acteurs globaux : entreprises
            paramilitaires privées et puissances émergentes.
          </p>
        </div>
      </Reveal>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.4 } }}
        className="mt-8 border-t border-border pt-5 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
      >
        Agir ensemble aujourd'hui pour un monde plus juste et pacifique demain.
      </motion.div>
    </Slide>
  )
}

/* =================== EXPORT =================== */
export const slides = [
  { id: "cover", label: "Couverture", node: <Cover /> },
  { id: "intro", label: "Introduction", node: <Intro /> },
  { id: "sommaire", label: "Sommaire", node: <Sommaire /> },
  {
    id: "part-1",
    label: "I. Europe",
    node: (
      <PartDivider
        num="I"
       
        title="Les conflits contemporains en Europe"
        subtitle="Le cas de l'Ukraine : origines, déroulement et conséquences."
      />
    ),
  },
  { id: "ua-origins", label: "Ukraine — Origines", node: <UkraineOrigins /> },
  { id: "ua-course", label: "Ukraine — Déroulement", node: <UkraineCourse /> },
  { id: "ua-cons", label: "Ukraine — Conséquences", node: <UkraineConsequences /> },
  {
    id: "part-2",
    label: "II. Afrique",
    node: (
      <PartDivider
        num="II"
       
        title="Les conflits contemporains en Afrique"
        subtitle="Le Sahel, le Soudan et l'est de la RDC."
      />
    ),
  },
  { id: "sahel-1", label: "Sahel", node: <Sahel /> },
  { id: "sahel-2", label: "Sahel — Spirale", node: <SahelSpiral /> },
  { id: "soudan-1", label: "Soudan", node: <Soudan /> },
  { id: "soudan-2", label: "Soudan — Bilan", node: <SoudanStats /> },
  { id: "rdc", label: "Est de la RDC", node: <Rdc /> },
  { id: "acteurs", label: "III. Acteurs", node: <Acteurs /> },
  { id: "comparaison", label: "IV. Causes communes", node: <Comparaison /> },
  { id: "consequences", label: "IV. Conséquences", node: <ConsequencesCommunes /> },
  { id: "organisations", label: "V. Organisations", node: <Organisations /> },
  { id: "solutions", label: "V. Solutions", node: <Solutions /> },
  { id: "conclusion", label: "Conclusion", node: <Conclusion /> },
]
