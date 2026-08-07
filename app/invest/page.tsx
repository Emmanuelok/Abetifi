import Link from "next/link";
import type { Metadata } from "next";
import { BudgetExplorer } from "../components/BudgetExplorer";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PartnershipBuilder } from "../components/PartnershipBuilder";
import { PartnershipPathways } from "../components/PartnershipPathways";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";
import { evidenceRecords, deliveryGates, documentRegister, decisionRegister, impactDimensions, riskScreening } from "../lib/record-data";
import { pageVisuals } from "../lib/visuals";

export const metadata: Metadata = {
  title: "Partnerships",
  description: "Explore evidence-led partnership pathways, fundable workstreams, safeguards, cost limitations and due-diligence requirements for Bosumpra.",
};

const publicValue = [
  ["Protect", "Conservation planning, cultural protocols and site safeguards before increased visitor pressure."],
  ["Learn", "Research, collections care, archives and education built around a published archaeological record."],
  ["Belong", "Community participation, cultural authority and local-benefit pathways embedded in programme decisions."],
  ["Sustain", "Operating capability, enterprise, environmental care and lifecycle planning developed alongside capital works."],
];

const workstreams = [
  ["Authority + enablement", "Legal authority, land and boundary verification, governance, permissions and the community mandate.", "Mandate and rights pack"],
  ["Conservation + collections", "Condition baseline, significance, management plan, collections custody, documentation and monitoring.", "Conservation evidence pack"],
  ["Design + accessibility", "Coordinated architecture, structure, services, safety, universal access, landscape and environment.", "Issued design package"],
  ["Museum + interpretation", "Exhibitions, collections controls, digital archive, learning systems and responsible public interpretation.", "Museum experience brief"],
  ["Education + community", "School learning, research capability, guide and supplier development, enterprise and participation systems.", "Capability programme"],
  ["Pre-opening + operations", "Staffing, maintenance, security, utilities, programming, marketing, visitor safety and lifecycle renewal.", "Operating readiness plan"],
];

const assuranceCommitments = [
  ["Restricted purpose", "Tie support to an agreed workstream, scope boundary and permitted use."],
  ["Milestone evidence", "Release or recognise support against defined outputs and acceptance criteria."],
  ["Procurement integrity", "Document conflicts, tender decisions, changes, approvals and audit access."],
  ["Rights + safeguards", "Protect cultural authority, collections rights, research ethics, access and community grievance routes."],
  ["Correction rights", "Make assumptions, limitations and changed evidence visible rather than protecting promotional claims."],
  ["Public-value reporting", "Agree indicators, baselines, owners and reporting schedules before publishing targets."],
];

const commitmentPath = [
  ["01", "Define the contribution", "Select a partner role, workstream, intended outcome and scope boundary."],
  ["02", "Verify authority", "Confirm the entity, rights-holders, land, decision owners and required permissions."],
  ["03", "Review the evidence pack", "Inspect relevant gates, records, costs, risks and independent checks."],
  ["04", "Agree safeguards", "Set restrictions, procurement controls, milestones, change rules and reporting duties."],
  ["05", "Authorise a work package", "Document responsibilities, resources, acceptance criteria and review dates."],
  ["06", "Report and learn", "Track evidence, outcomes, exceptions and corrective decisions through the public record."],
];

const grants = [
  { name: "UNESCO IFCD", status: "2026 call closed", fit: "Creative-industry policy and structural impact; not pure construction", href: "https://www.unesco.org/creativity/en/ifcd/apply" },
  { name: "African World Heritage Fund", status: "2026 cycle closed", fit: "Fit depends on official heritage status and government linkage", href: "https://awhf.net/grants/" },
  { name: "EUNIC Spaces of Culture", status: "2026 call closed", fit: "Requires a multi-partner cultural cooperation structure", href: "https://eunic.eu/news/spaces-of-culture-2026" },
  { name: "GEF Small Grants Ghana", status: "Cited 2026 call closed", fit: "The cited geography did not include Abetifi; monitor future calls", href: "https://www.undp.org/ghana/press-releases/2026-call-proposals-gef-small-grant-programme-ghana" },
  { name: "HerMaP Africa small grants", status: "Monitor / reconfirm", fit: "Potential heritage-management and organisational-development pathway", href: "https://heritagemanagement.org/call-for-applications-small-grants-for-african-heritage-projects/" },
];

const faqs = [
  ["Is this an investment offer?", "No. The current material supports partnership, sponsorship, grant and technical discussions. It does not provide a financial instrument, valuation, return forecast or verified repayment case."],
  ["Is GHS 8.882 million the final project cost?", "No. It is the sum of supplied BOQ summary packages. The estimate contains inconsistencies and omits important cost areas; independent remeasurement and a complete cost plan are required."],
  ["Can a partner fund one component?", "Potentially. The preferred approach is a defined workstream with scope boundaries, restrictions, milestones, acceptance evidence and reporting responsibilities."],
  ["Are the named grant programmes currently available?", "Most cited 2026 calls are closed. The watchlist is for monitoring and eligibility planning, not proof of an open call, application or award."],
  ["What is the first practical step?", "Generate a scoping brief below, then use the Project Office to identify the evidence and decision gates relevant to that proposed contribution."],
];

export default function InvestPage() {
  const dashboard = [
    [deliveryGates.length, "development gates", "Authority through impact"],
    [documentRegister.length, "controlled records", "Owners, status and references"],
    [decisionRegister.length, "formal decisions", "Conditions before authorisation"],
    [riskScreening.length, "principal risks", "Controls and required evidence"],
    [impactDimensions.length, "impact dimensions", "Public-value measurement"],
    [evidenceRecords.length, "evidence records", "Claims linked to sources"],
  ];

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          index="04"
          eyebrow="A stage-gated heritage partnership"
          title={<>Help protect<br /><em>12,000 years of evidence</em></>}
          description="Partner in a conservation-led museum, learning and community-development programme for Bosumpra. Every contribution should be tied to defined evidence, safeguards, decisions and public-value outcomes."
          stat="PARTNER WITH PROOF"
          statLabel="No return promise · no manufactured readiness · no unbounded ask"
          media={pageVisuals.invest}
          nextHref="#case"
          nextLabel="Explore the partnership case"
        />

        <section className="partnership-proof" aria-label="Partnership case at a glance">
          <div className="page-shell">
            {[
              ["12,000+", "years of human activity", "Published archaeological sequence"],
              ["4", "proposed museum levels", "Conservation to public outlook"],
              [deliveryGates.length, "development gates", "A controlled path to readiness"],
              [evidenceRecords.length, "source-linked records", "Claims with visible limits"],
            ].map(([value, label, note], index) => <article key={label}><span>0{index + 1}</span><strong>{value}</strong><div><b>{label}</b><small>{note}</small></div></article>)}
          </div>
        </section>

        <section className="section partnership-case-section" id="case">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker">The partnership case</span><h2>One place. Four forms of public value.</h2></div><p>Bosumpra’s archaeological depth is the reason to act carefully. The proposed institution can connect conservation, learning, community benefit and long-term operating capability—if these outcomes are governed together.</p></Reveal>
            <div className="public-value-grid">
              {publicValue.map(([title, copy], index) => <Reveal className="public-value-card" key={title} delay={index * 60}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true" /></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section partner-pathways-section" id="pathways">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker kicker-light">Choose a pathway</span><h2>The right contribution begins with the right evidence.</h2></div><p>Select a partner profile to see the potential role, information required before commitment and the first accountable milestone.</p></Reveal>
            <Reveal><PartnershipPathways /></Reveal>
          </div>
        </section>

        <section className="section workstreams-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker">Fundable workstreams</span><h2>Fund a defined outcome—not an unbounded promise.</h2></div><p>Each workstream should become a controlled package with authority, scope, deliverables, restrictions, cost, milestones, risks and reporting obligations.</p></Reveal>
            <div className="workstream-grid">
              {workstreams.map(([title, copy, output], index) => <Reveal className="workstream-card" key={title} delay={(index % 3) * 60}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><small>First pack · {output}</small></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section diligence-section" id="diligence">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker">Diligence dashboard</span><h2>Readiness must be demonstrated—not advertised.</h2></div><p>The public workspace shows what exists, what remains open and which independent confirmations are needed before commitment.</p></Reveal>
            <div className="diligence-dashboard">
              {dashboard.map(([value, label, note], index) => <Reveal key={label} delay={(index % 3) * 50}><span>0{index + 1}</span><strong>{value}</strong><h3>{label}</h3><p>{note}</p></Reveal>)}
            </div>
            <div className="diligence-grid diligence-grid--expanded">
              <Reveal><span className="kicker">Six decision domains</span><h2>Requirements before commitment.</h2><p>Every requirement should produce controlled documents with an accountable owner, decision authority and review date.</p><Link href="/record" className="button button-dark">Inspect all {deliveryGates.length} gates <span aria-hidden="true">↗</span></Link></Reveal>
              <div>
                {[
                  ["G1", "Authority", "Legal entity, land and tenure, decision rights and cultural-custodian approval"],
                  ["G2", "Conservation", "Condition baseline, significance, carrying limits and collections agreement"],
                  ["G3", "Design", "Coordinated professional design, approvals, safety, access and operating brief"],
                  ["G4", "Economics", "Demand, revenue, operating cost, complete capital cost, funding gap and sensitivity"],
                  ["G5", "Delivery", "Procurement, programme, cost control, risks, safeguards and owner capability"],
                  ["G6", "Impact", "Community benefit, environment, learning, reporting and independent oversight"],
                ].map(([gate, title, copy], index) => <Reveal className="diligence-row" key={gate} delay={index * 40}><span>{gate}</span><div><h3>{title}</h3><p>{copy}</p></div><i>Evidence gate</i></Reveal>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section budget-section">
          <div className="page-shell">
            <Reveal className="section-heading"><span className="kicker kicker-light">Cost transparency</span><h2>A starting reference—not a final budget or funding gap.</h2><p className="heading-note">The supplied GHS 8,882,218 BOQ summary contains material arithmetic inconsistencies and important omissions. It should be independently remeasured and reissued before fundraising or procurement relies on it.</p></Reveal>
            <Reveal><BudgetExplorer /></Reveal>
            <Reveal className="budget-caveats">
              {[
                ["Not priced clearly", "VAT, contingency, escalation, professional fees and pre-opening costs"],
                ["Programme gaps", "Exhibition fit-out, museum cases and media, collections controls and complete external works"],
                ["Status gaps", "QS attribution and sign-off, price-base date, secured capital and the actual funding gap"],
                ["Technical risk", "Basement is provisional; major item and subtotal discrepancies require correction"],
              ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
            </Reveal>
          </div>
        </section>

        <section className="section assurance-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker kicker-light">Partner assurance framework</span><h2>Support should be governable from day one.</h2></div><p>These are proposed control principles for future agreements. Their legal form, accountable owners and monitoring arrangements must be established before commitment.</p></Reveal>
            <div className="assurance-grid">
              {assuranceCommitments.map(([title, copy], index) => <Reveal key={title} delay={(index % 3) * 50}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section commitment-section">
          <div className="page-shell commitment-layout">
            <Reveal><span className="kicker">From interest to accountable action</span><h2>Six steps to a serious partnership.</h2><p>No contribution should move faster than the authority, evidence and safeguards required to govern it.</p></Reveal>
            <div className="commitment-path">
              {commitmentPath.map(([number, title, copy], index) => <Reveal key={number} delay={index * 40}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><i aria-hidden="true">{index === commitmentPath.length - 1 ? "●" : "↓"}</i></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section grant-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker">Programme watchlist</span><h2>Monitor eligibility—do not assume availability.</h2></div><p>Status checked against official programme pages on 6 August 2026. This list is not proof of an open call, application, award or project eligibility.</p></Reveal>
            <details className="grant-watchlist">
              <summary><span>Review five monitored programmes</span><i aria-hidden="true">+</i></summary>
              <div className="grant-table" role="table" aria-label="Target grant programme watchlist">
                {grants.map((grant, index) => <div className="grant-row" key={grant.name}><span>0{index + 1}</span><strong>{grant.name}</strong><i>{grant.status}</i><p>{grant.fit}</p><a href={grant.href} target="_blank" rel="noreferrer">Official programme ↗</a></div>)}
              </div>
            </details>
          </div>
        </section>

        <section className="section builder-section">
          <div className="page-shell"><Reveal className="builder-intro"><span className="kicker kicker-light">Build your starting point</span><h2>A serious partnership begins with a scoped contribution and the evidence needed to govern it.</h2><p>Create a stakeholder-specific brief linked to workstreams, gates and a first-meeting agenda. Nothing is transmitted and no commitment is implied.</p></Reveal><Reveal><PartnershipBuilder /></Reveal></div>
        </section>

        <section className="section partnership-faq-section">
          <div className="page-shell faq-layout">
            <Reveal><span className="kicker">Partnership questions</span><h2>Clear answers before the first conversation.</h2><Link href="/record" className="button button-dark">Review the public record <span aria-hidden="true">↗</span></Link></Reveal>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => <Reveal key={question} delay={index * 40}><details><summary><span>0{index + 1}</span><strong>{question}</strong><i aria-hidden="true">+</i></summary><p>{answer}</p></details></Reveal>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
