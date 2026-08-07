import type { Metadata } from "next";
import { BudgetExplorer } from "../components/BudgetExplorer";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PartnershipBuilder } from "../components/PartnershipBuilder";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Partnerships",
  description: "Review partnership requirements, the preliminary construction estimate, due-diligence records, risks and potential funding programmes.",
};

const capitalLayers = [
  ["Conservation", "Conservation planning, site stabilisation, documentation and cultural protocols."],
  ["Building and services", "Professionally coordinated museum structure, accessibility, services and public realm."],
  ["Exhibitions and collections", "Exhibitions, collections care, digital archive, learning and research infrastructure."],
  ["Operations", "People, systems, maintenance, marketing, visitor safety and commercial readiness."],
  ["Community benefit", "Training, enterprise, local procurement and transparent impact reporting."],
];

const grants = [
  { name: "UNESCO IFCD", status: "2026 call closed", fit: "Creative-industry policy/structural impact; not pure construction", href: "https://www.unesco.org/creativity/en/ifcd/apply" },
  { name: "African World Heritage Fund", status: "2026 cycle closed", fit: "Fit depends on official heritage status and government linkage", href: "https://awhf.net/grants/" },
  { name: "EUNIC Spaces of Culture", status: "2026 call closed", fit: "Requires a multi-partner cultural cooperation structure", href: "https://eunic.eu/news/spaces-of-culture-2026" },
  { name: "GEF Small Grants Ghana", status: "2026 cited call closed", fit: "The cited geography did not include Abetifi; monitor future calls", href: "https://www.undp.org/ghana/press-releases/2026-call-proposals-gef-small-grant-programme-ghana" },
  { name: "HerMaP Africa small grants", status: "Monitor / reconfirm", fit: "Heritage management and organisational development pathway", href: "https://heritagemanagement.org/call-for-applications-small-grants-for-african-heritage-projects/" },
];

export default function InvestPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          index="04"
          eyebrow="Partnership and funding information"
          title={<>Partnership and<br /><em>funding information</em></>}
          description="The project is at concept-development stage. Partnership discussions require verification of governance, authority, design, cost and operating assumptions. This material is not an investment offer."
          stat="GHS 8.88M"
          statLabel="Supplied BOQ summary · under review"
          nextHref="#case"
          nextLabel="Review the case"
        />

        <section className="section investment-case-section" id="case">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker">Funding scope</span><h2>Requirements across conservation, construction and operations.</h2></div><p>Funding decisions should address the protected resource, interpretation, people, operations and community benefit alongside the building scope.</p></Reveal>
            <div className="capital-layers">
              {capitalLayers.map(([title, copy], index) => <Reveal className="capital-layer" key={title} delay={index * 60}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section budget-section">
          <div className="page-shell">
            <Reveal className="section-heading"><span className="kicker kicker-light">Cost transparency</span><h2>Preliminary cost estimate and limitations.</h2><p className="heading-note">The supplied BOQ contains material arithmetic inconsistencies and important omissions. It should be independently remeasured and reissued before fundraising or procurement relies on it.</p></Reveal>
            <Reveal><BudgetExplorer /></Reveal>
            <Reveal className="budget-caveats">
              {[
                ["Not priced clearly", "VAT, contingency, escalation, professional fees and pre-opening costs"],
                ["Programme gaps", "Exhibition fit-out, museum cases/media, collections controls and complete external works"],
                ["Status gaps", "QS attribution/sign-off, price-base date, secured capital and actual funding gap"],
                ["Technical risk", "Basement is provisional; major item and subtotal discrepancies require correction"],
              ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
            </Reveal>
          </div>
        </section>

        <section className="section diligence-section">
          <div className="page-shell diligence-grid">
            <Reveal><span className="kicker">Due-diligence requirements</span><h2>Six requirements before commitment.</h2><p>Each requirement should produce controlled documents with an accountable owner and review date.</p></Reveal>
            <div>
              {[
                ["G1", "Authority", "Legal entity, land/tenure, decision rights and cultural-custodian approval"],
                ["G2", "Conservation", "Condition baseline, significance, carrying limits and collections agreement"],
                ["G3", "Design", "Coordinated professional design, approvals, safety, access and operating brief"],
                ["G4", "Economics", "Demand, revenue, opex, capex, funding gap, sensitivity and lifecycle replacement"],
                ["G5", "Delivery", "Procurement, programme, cost control, risks, safeguards and owner capability"],
                ["G6", "Impact", "Community benefit, environment, learning, reporting and independent oversight"],
              ].map(([gate, title, copy], index) => <Reveal className="diligence-row" key={gate} delay={index * 50}><span>{gate}</span><div><h3>{title}</h3><p>{copy}</p></div><i>Pending</i></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section grant-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker">Potential grant programmes</span><h2>Eligibility and application status.</h2></div><p>Status checked against official programme pages on 6 August 2026. Calls change, and each programme requires current eligibility verification.</p></Reveal>
            <div className="grant-table" role="table" aria-label="Target grant pipeline">
              {grants.map((grant, index) => <Reveal className="grant-row" key={grant.name} delay={index * 50}><span>0{index + 1}</span><strong>{grant.name}</strong><i>{grant.status}</i><p>{grant.fit}</p><a href={grant.href} target="_blank" rel="noreferrer">Official programme ↗</a></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section builder-section">
          <div className="page-shell"><Reveal><PartnershipBuilder /></Reveal></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
