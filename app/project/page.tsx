import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { MuseumExplorer } from "../components/MuseumExplorer";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Museum & Development Project",
  description: "Explore the proposed Bosumpra Museum Centre, delivery sequence, sustainability concepts and readiness gates.",
};

const delivery = [
  ["01", "Site preparation", "2 months"],
  ["02", "Foundations", "2 months"],
  ["03", "Structure", "5 months"],
  ["04", "Roofing", "2 months"],
  ["05", "Finishes", "5 months"],
  ["06", "Museum installation", "3 months"],
  ["07", "Landscape + external works", "2 months"],
  ["08", "Commissioning", "1 month"],
];

export default function ProjectPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          index="02"
          eyebrow="The development"
          title={<>A museum built<br /><em>around encounter.</em></>}
          description="The proposed circular museum centre brings conservation, exhibition, learning, research, community gathering and hospitality into one layered public experience."
          stat="4"
          statLabel="Proposed programme levels"
          nextHref="#museum"
          nextLabel="Explore the floors"
        />

        <section className="section project-status-section">
          <div className="page-shell status-banner">
            <Reveal>
              <span className="status-pill status-proposed">Concept documentation · March 2026</span>
              <h2>A serious proposal—and still a proposal.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p>The supplied 14-sheet architectural set establishes a compelling circular/radial concept. Approval fields are blank, and structural, fire, HVAC, plumbing, accessibility, area schedules and operational coordination still require completion and professional sign-off.</p>
            </Reveal>
          </div>
        </section>

        <section className="section floor-section" id="museum">
          <div className="page-shell">
            <Reveal className="section-heading split-heading">
              <div><span className="kicker">The museum stack</span><h2>From collections care to panoramic view.</h2></div>
              <p>Select a level to understand the intended programme. The navigator reinterprets the supplied circular plans without reproducing copyrighted or approval-sensitive drawings.</p>
            </Reveal>
            <Reveal><MuseumExplorer /></Reveal>
          </div>
        </section>

        <section className="section delivery-section">
          <div className="page-shell">
            <Reveal className="section-heading"><span className="kicker kicker-light">Indicative delivery path</span><h2>Twenty-two months in the source programme.</h2><p className="heading-note">The phases below sum to 22 months. A validated programme must account for approvals, procurement, conservation, design coordination, exhibitions and funding conditions.</p></Reveal>
            <div className="delivery-track">
              {delivery.map(([number, label, time], index) => (
                <Reveal className="delivery-step" key={number} delay={index * 45}>
                  <span>{number}</span><strong>{label}</strong><small>{time}</small>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section readiness-section">
          <div className="page-shell readiness-grid">
            <Reveal><span className="kicker">Readiness before construction</span><h2>Turn ambition into a bankable, buildable and governable project.</h2></Reveal>
            <div className="readiness-list">
              {[
                ["Land + authority", "Confirm title, surveyed extent, permitted use and cultural-custodian agreements."],
                ["Design + safety", "Coordinate architecture, structure, fire, accessibility, services, visitor flow and collections environment."],
                ["Cost + procurement", "Re-measure and reissue the BOQ with a price base, VAT, contingency, professional fees, fit-out and external works."],
                ["Collections + rights", "Confirm custody, MoU conditions, inventory, display rights, conservation standards and research access."],
                ["Operations + demand", "Complete visitor demand, pricing, staffing, maintenance, revenue, safeguarding and operating-cost models."],
                ["Governance + impact", "Establish board roles, community/traditional representation, audit, procurement, complaints and impact reporting."],
              ].map(([title, copy], index) => (
                <Reveal className="readiness-row" key={title} delay={index * 55}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section sustainability-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker">Environmental intent</span><h2>Let infrastructure teach, too.</h2></div><p>The project manuscript proposes systems visitors can understand as part of the experience. Each remains subject to engineering and environmental review.</p></Reveal>
            <div className="sustainability-grid">
              {[
                ["Water", "Rainwater storage below the museum and proposed reuse of restaurant water in a stone-waterfall landscape feature."],
                ["Sanitation", "A proposed biogas sanitation approach, requiring public-health and engineering design verification."],
                ["Material", "Local stone and landscape-sensitive paths intended to strengthen place identity and local procurement."],
                ["Energy", "Solar readiness is described as an ambition; system capacity and lifecycle economics remain to be designed."],
                ["Landscape", "Tree planting and restoration can protect soils, create habitat and repair a formerly degraded setting."],
              ].map(([title, copy], index) => <Reveal className="sustainability-card" key={title} delay={index * 60}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section future-vision-section">
          <div className="page-shell future-vision-grid">
            <Reveal><span className="status-pill status-open">Long-term · feasibility dependent</span><h2>A wider destination could grow from a protected core.</h2></Reveal>
            <Reveal delay={80}><p>The manuscript imagines a Stone Age Experience Village, cave-inspired lodging and even a cable-car connection. These ideas are not current scope. They require conservation limits, land and community consent, demand analysis, environmental assessment, transport studies and separate funding decisions.</p></Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

