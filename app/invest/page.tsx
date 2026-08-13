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
  description: "Explore proposed partnership pathways, candidate workstreams, safeguards, cost limitations and due-diligence requirements for Bosumpra.",
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
  ["06", "Report and learn", "Track evidence, outcomes, exceptions and corrective decisions through an agreed reporting record."],
];

const grants = [
  { name: "UNESCO IFCD", status: "Closed 6 May 2026", fit: "The official call focused on structural cultural-policy and creative-sector outcomes; this link is not evidence of project eligibility.", href: "https://www.unesco.org/creativity/en/ifcd/apply" },
  { name: "African World Heritage Fund", status: "Not eligible under cited 2026 criteria", fit: "Bosumpra was not on Ghana’s UNESCO World Heritage or Tentative Lists when checked, and the published applicant restrictions also apply. The 31 July deadline has passed.", href: "https://awhf.net/grants/" },
  { name: "EUNIC Spaces of Culture", status: "Closed 21 June 2026", fit: "The official call required a qualifying multi-partner cultural-cooperation structure; this page does not establish project eligibility.", href: "https://eunic.eu/news/spaces-of-culture-2026" },
  { name: "GEF Small Grants Ghana", status: "Closed 13 March 2026", fit: "The cited call targeted Ghana’s Black Volta landscape, not Abetifi in the Eastern Region.", href: "https://www.undp.org/ghana/press-releases/2026-call-proposals-gef-small-grant-programme-ghana" },
  { name: "HerMaP Africa small grants", status: "Archived 2023 call", fit: "No current call was verified. This is retained only as a historic programme example—not as an available opportunity.", href: "https://heritagemanagement.org/call-for-applications-small-grants-for-african-heritage-projects/" },
];

const faqs = [
  ["Is this an investment offer?", "No. The current material supports partnership, sponsorship, grant and technical discussions. It does not provide a financial instrument, valuation, return forecast or verified repayment case."],
  ["Is GHS 8.882 million the final project cost?", "No. It is the arithmetic sum of six transcribed BOQ summary values. The preliminary BOQ has not been independently reconciled and important cost areas are omitted or unclear; independent remeasurement and a complete cost plan are required."],
  ["Can a partner fund one component?", "Potentially. The preferred approach is a defined workstream with scope boundaries, restrictions, milestones, acceptance evidence and reporting responsibilities."],
  ["Are the named grant programmes currently available?", "No. All five links shown are closed, expired or historical. The watchlist records prior programme criteria; it is not proof of a current call, eligibility, application or award."],
  ["What is the first practical step?", "Generate a scoping brief below, then use the Readiness Workspace to identify proposed evidence and decision requirements relevant to that contribution."],
];

export default function InvestPage() {
  const dashboard = [
    [deliveryGates.length, "proposed review gates", "Platform-defined; not approvals"],
    [documentRegister.length, "record requirements", "Proposed, supplied reference or not evidenced"],
    [decisionRegister.length, "proposed decision records", "Website-authored conditions before authorisation"],
    [riskScreening.length, "editorially identified risk themes", "Proposed controls and required evidence"],
    [impactDimensions.length, "impact dimensions", "Public-value measurement"],
    [evidenceRecords.length, "evidence records", "Claims linked to sources"],
  ];

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          route="/invest"
          eyebrow="A proposed evidence-gated partnership approach"
          title={<>Help protect<br /><em>12,000 years of evidence</em></>}
          description="Explore a potential contribution to a conservation-led museum, learning and community-development proposal for Bosumpra. Any contribution should be tied to verified authority, evidence, safeguards, decisions and public-value outcomes."
          stat="PARTNER WITH PROOF"
          statLabel="No return promise · no manufactured readiness · no unbounded ask"
          media={pageVisuals.invest}
          nextHref="#case"
          nextLabel="Explore the partnership case"
        />

        <section className="partnership-proof" aria-label="Partnership case at a glance">
          <div className="page-shell">
            {[
              ["12,000+", "years spanned by the published record", "Human activity is episodic, not continuous residence"],
              ["4", "proposed museum levels", "Conservation to public outlook"],
              [deliveryGates.length, "proposed review gates", "A platform-defined readiness framework"],
              [evidenceRecords.length, "source-linked claim records", "Public claims with visible limits"],
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
            <Reveal className="section-heading split-heading"><div><span className="kicker">Potential partnership workstreams</span><h2>Scope a defined outcome—not an unbounded promise.</h2></div><p>These are proposed work areas, not authorised funding packages. Any workstream should become a documented package with authority, scope, deliverables, restrictions, cost, milestones, risks and reporting obligations.</p></Reveal>
            <div className="workstream-grid">
              {workstreams.map(([title, copy, output], index) => <Reveal className="workstream-card" key={title} delay={(index % 3) * 60}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><small>First pack · {output}</small></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section diligence-section" id="diligence">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker">Diligence dashboard</span><h2>Readiness must be demonstrated—not advertised.</h2></div><p>The public workspace is a platform-defined review framework. It shows supplied source material and requirements still open; it is not a formal data room, approval register or confirmation of project readiness.</p></Reveal>
            <div className="diligence-dashboard">
              {dashboard.map(([value, label, note], index) => <Reveal key={label} delay={(index % 3) * 50}><span>0{index + 1}</span><strong>{value}</strong><h3>{label}</h3><p>{note}</p></Reveal>)}
            </div>
            <div className="diligence-grid diligence-grid--expanded">
              <Reveal><span className="kicker">Six proposed decision domains</span><h2>Requirements before commitment.</h2><p>Every requirement should produce verified records with a formally appointed accountable owner, valid decision authority and review date.</p><Link href="/record" className="button button-dark">Inspect all {deliveryGates.length} proposed gates <span aria-hidden="true">↗</span></Link></Reveal>
              <div>
                {[
                  ["D1", "Authority", "Legal entity, land and tenure, decision rights and cultural-custodian approval"],
                  ["D2", "Conservation", "Condition baseline, significance, carrying limits and collections agreement"],
                  ["D3", "Design", "Coordinated professional design, approvals, safety, access and operating brief"],
                  ["D4", "Economics", "Demand, revenue, operating cost, complete capital cost, funding gap and sensitivity"],
                  ["D5", "Delivery", "Procurement, programme, cost control, risks, safeguards and owner capability"],
                  ["D6", "Impact", "Community benefit, environment, learning, reporting and independent oversight"],
                ].map(([domain, title, copy], index) => <Reveal className="diligence-row" key={domain} delay={index * 40}><span>{domain}</span><div><h3>{title}</h3><p>{copy}</p></div><i>Decision domain</i></Reveal>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section budget-section">
          <div className="page-shell">
            <Reveal className="section-heading"><span className="kicker kicker-light">Cost transparency</span><h2>A starting reference—not a final budget or funding gap.</h2><p className="heading-note">GHS 8,882,218 is the arithmetic sum of six transcribed values in the supplied preliminary BOQ summary. The BOQ has not been independently reconciled and omits or does not clearly state important cost areas. It must be remeasured, priced to a stated date and signed by a qualified cost adviser before reliance. Source: PROP-BOQ-01; claim-level page or line locator not yet verified.</p></Reveal>
            <Reveal><BudgetExplorer /></Reveal>
            <Reveal className="budget-caveats">
              {[
                ["Not priced clearly", "VAT, contingency, escalation, professional fees and pre-opening costs"],
                ["Programme gaps", "Exhibition fit-out, museum cases and media, collections controls and complete external works"],
                ["Status gaps", "QS attribution and sign-off, price-base date, secured capital and the actual funding gap"],
                ["Technical risk", "The basement is marked provisional; item and subtotal reconciliation remains part of the required independent review"],
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
            <Reveal className="section-heading split-heading"><div><span className="kicker">Programme watchlist</span><h2>Archived and closed programmes—not available funding.</h2></div><p>Status checked against official programme pages on 7 August 2026. Every listed call is closed, expired or archived. A link is not proof of eligibility, application, award, endorsement or a future call.</p></Reveal>
            <details className="grant-watchlist">
              <summary><span>Review five monitored programmes</span><i aria-hidden="true">+</i></summary>
              <div className="grant-table" role="table" aria-label="Target grant programme watchlist">
                {grants.map((grant, index) => <div className="grant-row" key={grant.name}><span>0{index + 1}</span><strong>{grant.name}</strong><i>{grant.status}</i><p>{grant.fit}</p><a href={grant.href} target="_blank" rel="noopener noreferrer">Official programme page ↗</a></div>)}
              </div>
            </details>
          </div>
        </section>

        <section className="section builder-section">
          <div className="page-shell"><Reveal className="builder-intro"><span className="kicker kicker-light">Build your starting point</span><h2>A serious partnership begins with a scoped contribution and the evidence needed to govern it.</h2><p>Create a stakeholder-specific brief linked to workstreams, gates and a first-meeting agenda. Nothing is transmitted and no commitment is implied.</p></Reveal><Reveal><PartnershipBuilder /></Reveal></div>
        </section>

        <section className="section partnership-faq-section">
          <div className="page-shell faq-layout">
            <Reveal><span className="kicker">Partnership questions</span><h2>Clear answers before the first conversation.</h2><Link href="/record" className="button button-dark">Review the Readiness Workspace <span aria-hidden="true">↗</span></Link></Reveal>
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
