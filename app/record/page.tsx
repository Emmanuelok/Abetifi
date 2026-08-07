import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { LivingRecord } from "../components/LivingRecord";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";
import { evidenceSources, glossary, impactDimensions } from "../lib/record-data";

export const metadata: Metadata = {
  title: "The Living Record",
  description:
    "Search Bosumpra evidence, review project-readiness gates, prepare participation and visit briefs, and learn how archaeological claims are tested.",
  alternates: {
    canonical: "/record",
  },
};

const evidenceKey = [
  ["Established", "Directly supported by the cited published or institutional source."],
  ["Interpretation", "A reasoned scholarly reading that remains open to testing or debate."],
  ["Documented history", "A sourced event in the history of research at Bosumpra."],
  ["Open question", "The evidence does not yet support one settled answer."],
];

const operatingReferences = [
  {
    title: "National heritage authority",
    body: "Ghana Museums and Monuments Board identifies itself as the legal custodian of Ghana’s movable and immovable material cultural heritage.",
    label: "Open GMMB",
    href: "https://gmmb.gov.gh/about-us/",
  },
  {
    title: "Archaeological safeguards",
    body: "The National Museum Act, 1969 (NLCD 387) addresses excavation permission, antiquities, notification of finds and protection from unauthorised damage.",
    label: "Read the Act",
    href: "https://ghalii.org/akn/gh/act/nlcd/1969/387/eng%401969-09-08",
  },
  {
    title: "Responsible visitor economy",
    body: "The Tourism Act, 2011 (Act 817) provides the legal framework for tourism regulation and responsible, sustainable tourism in Ghana.",
    label: "Read the Act",
    href: "https://ghalii.org/akn/gh/act/2011/817/eng%402019-09-27",
  },
  {
    title: "International status check",
    body: "Bosumpra is not shown on UNESCO’s World Heritage List or Ghana’s Tentative List. The platform does not describe it as UNESCO-listed.",
    label: "Check UNESCO",
    href: "https://whc.unesco.org/en/statesparties/gh/",
  },
];

export default function RecordPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          index="07"
          eyebrow="Public evidence + action utility"
          title={<>A living record,<br /><em>built to be checked.</em></>}
          description="Move from story to source, proposal to diligence and interest to a practical next-action brief—without hiding uncertainty or pretending that an unverified service is live."
          stat="18"
          statLabel="Project-readiness gates"
          nextHref="#workspace"
          nextLabel="Open the workspace"
        />

        <section className="record-intro-section">
          <div className="page-shell record-intro-grid">
            <Reveal>
              <span className="kicker">What this changes</span>
              <h2>One public workspace for evidence, delivery, participation, visits and learning.</h2>
            </Reveal>
            <Reveal className="record-intro-copy" delay={80}>
              <p>
                The Living Record turns the platform into a working instrument. It connects archaeological claims to sources, exposes what a responsible project still needs, and gives every user something useful they can prepare now.
              </p>
              <div className="record-boundary">
                <strong>Honest service boundary</strong>
                <p>No form is transmitted. No visit, investment, approval or official status is confirmed here. Personal progress and generated text remain on this device.</p>
              </div>
            </Reveal>
          </div>
          <div className="page-shell evidence-key" aria-label="Evidence-status key">
            {evidenceKey.map(([label, copy], index) => (
              <Reveal className="evidence-key-card" key={label} delay={index * 45}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{label}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="record-workspace-section" id="workspace">
          <div className="page-shell">
            <LivingRecord />
          </div>
        </section>

        <section className="section impact-framework-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading">
              <div><span className="kicker kicker-light">Public-value framework</span><h2>Measure the place, the people and the institution.</h2></div>
              <p>A useful dashboard begins with definitions, baselines, responsible data owners and a reporting cadence—not decorative numbers.</p>
            </Reveal>
            <div className="impact-dimensions">
              {impactDimensions.map((dimension, index) => (
                <Reveal className="impact-dimension" key={dimension.title} delay={index * 45}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{dimension.title}</h3>
                  <small>Measure</small>
                  <p>{dimension.measure}</p>
                  <strong>{dimension.principle}</strong>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section operating-reference-section">
          <div className="page-shell operating-reference-grid">
            <Reveal className="operating-reference-lead">
              <span className="kicker">Authority + compliance reference</span>
              <h2>A project gate is not a permit.</h2>
              <p>
                These links help users locate the relevant public framework. They are not legal advice and do not establish the project’s current permissions, land position, licensing or heritage designation.
              </p>
            </Reveal>
            <div className="operating-reference-list">
              {operatingReferences.map((item, index) => (
                <Reveal className="operating-reference" key={item.title} delay={index * 50}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{item.title}</h3><p>{item.body}</p></div>
                  <a href={item.href} target="_blank" rel="noreferrer">{item.label} <span aria-hidden="true">↗</span></a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section record-source-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading">
              <div><span className="kicker">Source shelf</span><h2>The shortest route from a public claim to its authority.</h2></div>
              <p>Links open official institutional pages or publication records. Publisher access conditions may apply.</p>
            </Reveal>
            <div className="record-source-grid">
              {evidenceSources.map((source, index) => (
                <Reveal className="record-source-card" key={source.id} delay={index * 40}>
                  <a href={source.href} target="_blank" rel="noreferrer">
                    <span>{source.year}</span>
                    <small>{source.kind}</small>
                    <h3>{source.author}</h3>
                    <p>{source.title}</p>
                    <strong>{source.contribution}</strong>
                    <i aria-hidden="true">↗</i>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section record-glossary-section">
          <div className="page-shell glossary-layout">
            <Reveal>
              <span className="kicker kicker-light">Plain-language glossary</span>
              <h2>Technical words should clarify evidence—not guard it.</h2>
              <Link href="/research" className="text-link text-link-light">Enter the research room <span aria-hidden="true">→</span></Link>
            </Reveal>
            <div className="glossary-list">
              {glossary.map(([term, definition], index) => (
                <Reveal className="glossary-item" key={term}>
                  <details open={index === 0}>
                    <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{term}</strong><i aria-hidden="true">+</i></summary>
                    <p>{definition}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
