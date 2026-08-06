import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";
import { sourceReferences } from "../lib/content";

export const metadata: Metadata = {
  title: "Research & Evidence Room",
  description: "Access the Bosumpra research bibliography, evidence standards, research themes and future archive vision.",
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
          index="06"
          eyebrow="Research + collections"
          title={<>Evidence is not<br /><em>decoration.</em></>}
          description="This room makes the project’s claims traceable, preserves uncertainty and creates a foundation for future research, collections care and public learning."
          stat="4"
          statLabel="Core scholarly sources supplied"
          nextHref="#library"
          nextLabel="Open the bibliography"
        />

        <section className="section research-charter-section">
          <div className="page-shell research-charter-grid">
            <Reveal><span className="kicker">Evidence charter</span><h2>Traceable. Proportionate. Open about limits.</h2></Reveal>
            <div>
              {[
                ["Cite the source", "Dates, proportions, site dimensions and scholarly claims link to a named publication."],
                ["Name the inference", "Possible management, exchange, seasonality and technology relationships remain interpretations."],
                ["Separate time layers", "Late Pleistocene evidence, historical traditions and contemporary sacred use are not collapsed into one story."],
                ["Protect rights", "Supplied journal figures and photographs are not republished without permission."],
                ["Invite correction", "New research and community knowledge should update the platform through a documented review process."],
              ].map(([title, copy], index) => <Reveal className="charter-row" key={title} delay={index * 55}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section library-section" id="library">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker kicker-light">Core bibliography</span><h2>Four works. Eight decades of inquiry.</h2></div><p>Links lead to the official DOI records. Access may depend on the publisher or your institution.</p></Reveal>
            <div className="source-library">
              {sourceReferences.map((source, index) => <Reveal className="source-entry" key={source.year} delay={index * 70}><span>{source.year}</span><div><small>{source.author}</small><h3>{source.title}</h3><p>{source.publication}</p></div><a href={sourceLinks[index]} target="_blank" rel="noreferrer" aria-label={`Open DOI for ${source.title}`}>DOI ↗</a></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section research-themes-section">
          <div className="page-shell">
            <Reveal className="section-heading"><span className="kicker">Evidence domains</span><h2>A research infrastructure hiding in plain sight.</h2></Reveal>
            <div className="themes-grid">
              {[
                ["Chronology", "Radiocarbon model, stratigraphic integrity and episodic use"],
                ["Technology", "Quartz reduction, geometric microliths, celts, pottery and iron-related evidence"],
                ["Foodways", "Incense tree, oil palm, trace domesticates and landscape management"],
                ["Mobility", "Non-local materials, exchange and plateau–lowland relationships"],
                ["Living heritage", "Shrine/church evidence, memory, worship and contemporary cultural protocols"],
                ["Conservation", "Visitor pressure, collections care, digital documentation and climate resilience"],
              ].map(([title, copy], index) => <Reveal className="theme-card" key={title} delay={index * 55}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section archive-vision-section">
          <div className="page-shell archive-grid">
            <Reveal><span className="status-pill status-proposed">Proposed research infrastructure</span><h2>Collections care, library and digital archive.</h2><p>The project manuscript proposes conservation and repair workshops, storage, a heritage library and a digital archive. Future access and any artefact transfer remain subject to institutional, legal and conservation agreements.</p></Reveal>
            <Reveal className="archive-stack" delay={80}>
              {[
                ["01", "Object record", "Provenance · material · condition · rights"],
                ["02", "Context record", "Unit · layer · horizon · date · interpretation"],
                ["03", "Digital object", "Image/scan · derivatives · access · preservation"],
                ["04", "Public story", "Audience · evidence status · language · review"],
              ].map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
            </Reveal>
          </div>
        </section>

        <section className="section research-rights-section"><div className="page-shell rights-note"><Reveal><span className="kicker">Source and image rights</span><h2>The papers informed this platform; they are not redistributed here.</h2></Reveal><Reveal delay={80}><p>Figures and photographs in the supplied Shaw, Smith, Oas and Watson publications remain subject to their publishers’ rights. Public use should rely on permissioned originals, newly commissioned site photography, independently recreated data graphics and clear provenance.</p></Reveal></div></section>
      </main>
      <Footer />
    </>
  );
}

