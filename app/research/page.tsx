import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";
import { sourceReferences } from "../lib/content";
import { proposalSources } from "../lib/record-data";
import { pageVisuals } from "../lib/visuals";

export const metadata: Metadata = {
  title: "Research, Sources and Collections",
  description: "Access the Bosumpra bibliography, interpretation standards, research themes and proposed collections infrastructure.",
};

const sourceLinks = [
  "https://doi.org/10.1017/S0079497X00020016",
  "https://doi.org/10.1017/S0079497X00010975",
  "https://doi.org/10.1007/s00334-015-0514-2",
  "https://doi.org/10.1080/0067270X.2017.1393925",
];

export default function ResearchPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          route="/research"
          eyebrow="Research + collections"
          title={<>Research, sources<br /><em>and collections</em></>}
          description="This section provides the core bibliography, claim standards and proposed collections infrastructure."
          stat="4"
          statLabel="Core scholarly sources supplied"
          media={pageVisuals.research}
          nextHref="#library"
          nextLabel="Open the bibliography"
        />

        <section className="section research-charter-section" id="editorial-integrity">
          <div className="page-shell research-charter-grid">
            <Reveal><span className="kicker">Editorial integrity statement</span><h2>What each kind of source can—and cannot—establish.</h2><p>External records and programme pages were checked on 7 August 2026. A citation supports only the specific claim and time period stated; it is not an endorsement, approval, partnership or eligibility decision.</p></Reveal>
            <div>
              {[
                ["Cite the source and locator", "Each claim identifies a named source. A page, table, figure or section locator is included only when it has been verified from the accessible source; a DOI or bibliographic record alone is not a pinpoint citation."],
                ["Name the inference", "Possible management, exchange, seasonality and technology relationships remain interpretations."],
                ["Separate source classes", "Published Bosumpra research, source-reported history, supplied project documents, external general guidance and website-authored planning frameworks are not treated as interchangeable evidence."],
                ["Time-bound current claims", "A publication records what its authors reported at that time. Present-day use, custodians, access, project status and community protocols require current confirmation."],
                ["Protect rights", "Supplied journal figures and photographs are not republished without permission."],
                ["Invite correction", "New research and community knowledge should update the platform through a documented review process."],
              ].map(([title, copy], index) => <Reveal className="charter-row" key={title} delay={index * 55}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section visual-provenance-section" id="visual-provenance" aria-labelledby="visual-provenance-title">
          <div className="page-shell visual-provenance-layout">
            <Reveal className="visual-provenance-lead">
              <span className="kicker kicker-light">Evidence versus visual interpretation</span>
              <h2 id="visual-provenance-title">What is evidence—and what is illustration.</h2>
              <p>Images on this platform are not used as proof. Every current photographic-style image and the opening film are AI-generated interpretive or concept media. Archaeological claims are carried by the cited publications; proposal claims are carried by the supplied project documents and are labelled with their limits.</p>
            </Reveal>
            <div className="visual-provenance-grid">
              {[
                ["A", "Published evidence", "Cited archaeological publications support named claims, dates and interpretations. Use the bibliography and claim-status labels to trace each statement."],
                ["B", "Supplied proposal material", "The architectural set, manuscript and preliminary BOQ describe proposals. They do not establish approval, funding, final cost or construction status."],
                ["C", "AI-generated media", "Every current image and the opening film are illustration only. They do not document Bosumpra, current facilities, people, partners, records or completed work."],
                ["D", "Verification required", "Present-day authority, land, access, custodians, permissions, funding and operating arrangements require current written confirmation."],
              ].map(([code, title, copy], index) => (
                <Reveal className="visual-provenance-card" key={code} delay={index * 55}>
                  <span>{code}</span><h3>{title}</h3><p>{copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section library-section" id="library">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker kicker-light">Core bibliography</span><h2>Core bibliography, 1944–2017.</h2></div><p>Links lead to the official DOI records. Access may depend on the publisher or your institution.</p></Reveal>
            <div className="source-library">
              {sourceReferences.map((source, index) => <Reveal className="source-entry" key={source.year} delay={index * 70}><span>{source.year}</span><div><small>{source.author}</small><h3>{source.title}</h3><p>{source.publication}</p></div><a href={sourceLinks[index]} target="_blank" rel="noopener noreferrer" aria-label={`Open DOI for ${source.title}`}>DOI ↗</a></Reveal>)}
            </div>
            <Reveal className="section-heading split-heading proposal-source-heading"><div><span className="kicker kicker-light">Supplied proposal source register</span><h2>Stable source IDs, with unverified locators shown plainly.</h2></div><p>These IDs make proposal claims traceable without inventing page, sheet, version or checksum details that were not retained in the public source record.</p></Reveal>
            <div className="source-library">
              {proposalSources.map((source, index) => (
                <Reveal className="source-entry" key={source.id} delay={index * 60}>
                  <span>PROP</span>
                  <div>
                    <small>{source.id} · {source.sourceClass}</small>
                    <h3>{source.title}</h3>
                    <p>{source.version} · {source.locator}. {source.limitation}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section research-themes-section">
          <div className="page-shell">
            <Reveal className="section-heading"><span className="kicker">Evidence domains</span><h2>Research themes represented in the published record.</h2></Reveal>
            <div className="themes-grid">
              {[
                ["Chronology", "Radiocarbon model, stratigraphic integrity and episodic use"],
                ["Technology", "Quartz reduction, geometric microliths, celts, pottery and iron-related evidence"],
                ["Foodways", "Incense tree, oil palm, trace domesticates and possible plant management"],
                ["Mobility", "Greenstone-source, movement and exchange questions"],
                ["Documented religious history", "Former Pra association and later Christian use reported in published research; present-day meanings and protocols require consultation"],
                ["Conservation", "Visitor pressure, collections care, digital documentation and climate resilience"],
              ].map(([title, copy], index) => <Reveal className="theme-card" key={title} delay={index * 55}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section archive-vision-section">
          <div className="page-shell archive-grid">
            <Reveal><span className="status-pill status-proposed">Proposed research infrastructure</span><h2>Collections care, library and digital archive.</h2><p>The project manuscript proposes conservation and repair workshops, storage, a heritage library and a digital archive. Future access and any artefact transfer remain subject to institutional, legal and conservation agreements. Source: PROP-MAN-01; locator not yet verified.</p></Reveal>
            <Reveal className="archive-stack" delay={80}>
              {[
                ["01", "Object record", "Provenance · material · condition · rights"],
                ["02", "Context record", "Unit · layer · horizon · date · interpretation"],
                ["03", "Digital object", "Image/scan · derivatives · access · preservation"],
                ["04", "Public interpretation record", "Audience · evidence status · language · review"],
              ].map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
            </Reveal>
          </div>
        </section>

        <section className="section research-rights-section"><div className="page-shell rights-note"><Reveal><span className="kicker">Use of published sources and images</span><h2>Publication rights and permitted use.</h2></Reveal><Reveal delay={80}><p>Figures and photographs in the supplied Shaw, Smith, Oas and Watson publications remain subject to their publishers’ rights and are not reproduced here. Future documentary use should rely on permissioned originals or newly commissioned site photography with a named source, date, credit and licence. Current platform imagery remains explicitly labelled AI-generated media.</p><Link href="/record" className="button button-dark">Search the evidence register <span aria-hidden="true">↗</span></Link></Reveal></div></section>
      </main>
      <Footer />
    </>
  );
}
