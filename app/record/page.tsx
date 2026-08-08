import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { ProjectOffice } from "../components/ProjectOffice";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";
import { evidenceSources, glossary, impactDimensions } from "../lib/record-data";
import { pageVisuals } from "../lib/visuals";

export const metadata: Metadata = {
  title: "Development Readiness Workspace",
  description:
    "Review a proposed editorial framework for Bosumpra evidence, programme dependencies, financial assumptions and records still required for project readiness.",
  alternates: {
    canonical: "/record",
  },
};

const evidenceKey = [
  ["Established", "Directly supported by the cited Bosumpra publication."],
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
    body: "GhaLII publishes the National Museum Decree, 1969 (NLCD 387) and notes that an outstanding 2007 amendment is not applied in its displayed text. Obtain current Ghanaian legal advice before relying on it.",
    label: "Read the published text",
    href: "https://ghalii.org/akn/gh/act/nlcd/1969/387/eng%401969-09-08",
  },
  {
    title: "Responsible visitor economy",
    body: "GhaLII publishes Ghana’s Tourism Act, 2011 (Act 817). The link is a general legal reference and does not establish this project’s licensing, standards compliance or approval position.",
    label: "Read the published text",
    href: "https://ghalii.org/akn/gh/act/2011/817/eng%402019-09-27",
  },
  {
    title: "International status check",
    body: "Checked 7 August 2026: UNESCO’s Ghana page listed two inscribed properties and six Tentative List entries; Bosumpra was not among them. This time-bounded check is not a national heritage-status determination.",
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
          eyebrow="Project planning and evidence"
          title={<>Development Readiness<br /><em>Workspace</em></>}
          description="Review a proposed editorial planning framework for evidence, dependencies, assumptions and records required before the proposed museum centre could demonstrate readiness."
          stat="22"
          statLabel="Proposed record requirements · not proof of existing documents"
          media={pageVisuals.record}
          nextHref="#workspace"
          nextLabel="Open the Readiness Workspace"
        />

        <section className="record-intro-section">
          <div className="page-shell record-intro-grid">
            <Reveal>
              <span className="kicker">Purpose</span>
              <h2>Project information, proposed review controls and evidence registers.</h2>
            </Reveal>
            <Reveal className="record-intro-copy" delay={80}>
              <p>
                This website organises its review framework into six areas: programme, financial planning, governance, evidence, decision packs and a consolidated overview. The 18 gates, 22 record IDs, decision sequence, roles, risk screen and indicators were created for this platform. They are not adopted project governance, official approvals, appointments or evidence that the named documents exist.
              </p>
              <div className="record-boundary">
                <strong>Editorial and service limitations</strong>
                <p>No form is transmitted. The platform does not confirm a visit, investment, approval, permission, legal entity, land position or official project status. User-defined scenarios and generated documents remain on the user’s device.</p>
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
            <ProjectOffice />
          </div>
        </section>

        <section className="section impact-framework-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading">
              <div><span className="kicker kicker-light">Proposed performance framework</span><h2>Heritage, community and institutional indicators.</h2></div>
              <p>Each indicator requires a definition, baseline, responsible data owner, privacy safeguard and reporting schedule before publication.</p>
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
              <span className="kicker">Legal and regulatory references</span>
              <h2>Formal permissions and approvals remain required.</h2>
              <p>
                These links help users locate the relevant public framework. They are not legal advice and do not establish the project’s current permissions, land position, licensing or heritage designation.
              </p>
            </Reveal>
            <div className="operating-reference-list">
              {operatingReferences.map((item, index) => (
                <Reveal className="operating-reference" key={item.title} delay={index * 50}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{item.title}</h3><p>{item.body}</p></div>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label} <span aria-hidden="true">↗</span></a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section record-source-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading">
              <div><span className="kicker">Institutional and research sources</span><h2>Source register.</h2></div>
              <p>Links open official institutional pages or publication records. General institutional guidance is not Bosumpra-specific evidence and does not imply endorsement, approval, compliance or partnership. Records checked 7 August 2026; publisher access conditions may apply.</p>
            </Reveal>
            <div className="record-source-grid">
              {evidenceSources.map((source, index) => (
                <Reveal className="record-source-card" key={source.id} delay={index * 40}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">
                    <span>{source.year}</span>
                    <small>{source.kind}</small>
                    <h3>{source.author}</h3>
                    <p>{source.title}</p>
                    <strong>{source.contribution}</strong>
                    <small>{source.scope}</small>
                    <small>{source.checked}</small>
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
              <span className="kicker kicker-light">Glossary</span>
              <h2>Archaeological and conservation terms.</h2>
              <Link href="/research" className="text-link text-link-light">Review research information <span aria-hidden="true">→</span></Link>
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
