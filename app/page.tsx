import Link from "next/link";
import { CinematicHero } from "./components/CinematicHero";
import { DeepTimeStage } from "./components/DeepTimeStage";
import { EvidenceLens } from "./components/EvidenceLens";
import { Footer } from "./components/Footer";
import { MuseumAscent } from "./components/MuseumAscent";
import { RoleConstellation } from "./components/RoleConstellation";
import { SiteHeader } from "./components/SiteHeader";
import { navigation, projectPrinciples } from "./lib/content";
import { deliveryGates } from "./lib/record-data";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <CinematicHero />

        <nav className="landing-page-map" id="page-map" aria-label="Seven-page site map">
          <div className="page-shell">
            <div className="landing-page-map__intro">
              <span>First visit?</span>
              <strong>Choose a direct page or continue through the cinematic story.</strong>
              <small>Swipe or tap a numbered page.</small>
            </div>
            <div className="landing-page-map__links">
              {navigation.map((item) => (
                <Link href={item.href} key={item.href}>
                  <span>{item.index}</span>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <section className="scale-threshold" aria-labelledby="scale-title">
          <div className="scale-threshold__word" aria-hidden="true">BOSUMPRA</div>
          <div className="scale-threshold__grid page-shell">
            <div className="scale-threshold__index">
              <span>A</span>
              <i />
              <small>Landing story · Archaeological scale</small>
            </div>
            <div className="scale-threshold__statement">
              <p>Approximate sheltered area<br /><em>and chronological range</em></p>
              <h2 id="scale-title">Approximate sheltered interior: <strong>240 m²</strong> Archaeological sequence: <strong>12,000+ years</strong></h2>
            </div>
            <div className="scale-threshold__note">
              <span>Interpretation</span>
              <p>The record documents changes in tools, plant use and relationships with place, including periods of episodic activity across millennia.</p>
              <a href="#deep-time" className="text-link text-link-light">Review the evidence sequence <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="scale-threshold__ticker" aria-hidden="true">
            <div>
              <span>QUARTZ</span><i>◆</i><span>OIL PALM</span><i>◆</i><span>MICROLITHS</span><i>◆</i><span>RADIOCARBON</span><i>◆</i><span>LIVING LANDSCAPE</span><i>◆</i>
              <span>QUARTZ</span><i>◆</i><span>OIL PALM</span><i>◆</i><span>MICROLITHS</span><i>◆</i><span>RADIOCARBON</span><i>◆</i><span>LIVING LANDSCAPE</span><i>◆</i>
            </div>
          </div>
        </section>

        <DeepTimeStage />
        <EvidenceLens />
        <MuseumAscent />

        <section className="trust-manifesto" aria-labelledby="trust-title">
          <div className="trust-manifesto__ghost" aria-hidden="true">TRUST</div>
          <div className="page-shell">
            <div className="trust-manifesto__lead">
              <span>Landing story E · Before construction</span>
              <h2 id="trust-title">Project governance and<br /><em>development principles</em></h2>
              <p>Advancement requires documented conservation controls, community-benefit arrangements, evidence standards and delivery approvals.</p>
            </div>
            <p className="landing-rail-cue" aria-hidden="true"><span>Four project principles</span><strong>Swipe to review →</strong></p>
            <div className="trust-manifesto__list">
              {projectPrinciples.map((principle) => (
                <article key={principle.number}>
                  <span>{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                  <Link href="/project" aria-label={`Review ${principle.title}`}>↗</Link>
                </article>
              ))}
            </div>
            <div className="trust-manifesto__footer">
              <span>Conservation</span><i />
              <span>Community</span><i />
              <span>Evidence</span><i />
              <span>Delivery</span>
              <Link href="/project" className="text-link">Review the development requirements <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <RoleConstellation />

        <section className="office-portal" aria-labelledby="office-portal-title">
          <div className="office-portal__grid" aria-hidden="true" />
          <div className="page-shell office-portal__shell">
            <div className="office-portal__copy">
              <span>Landing story G · Development readiness</span>
              <h2 id="office-portal-title">Programme, governance,<br /><em>finance and evidence</em></h2>
              <p>Review the platform’s proposed review gates and record requirements alongside supplied cost information, project dependencies and claim-to-source relationships. These registers are planning tools—not approvals or proof that records exist.</p>
              <div className="office-portal__actions">
                <Link href="/record" className="button button-light">Open the Readiness Workspace <span aria-hidden="true">↗</span></Link>
                <Link href="/research" className="text-link text-link-light">Review research standards <span aria-hidden="true">→</span></Link>
              </div>
            </div>

            <div className="office-console" aria-label="Readiness Workspace capabilities">
              <div className="office-console__bar">
                <span>ABETIFI / READINESS WORKSPACE</span>
                <i>EDITORIAL PLANNING FRAMEWORK</i>
              </div>
              {[
                ["01", "Programme", `${deliveryGates.length} proposed review gates`, "Platform-defined · not approvals", "/record#development-gates"],
                ["02", "Governance", "22 proposed record requirements", "Framework-defined · existence not implied", "/record#workspace"],
                ["03", "Financial planning", "Scenario-led", "Capital · operating · sensitivity", "/record#workspace"],
                ["04", "Evidence", "Claim-to-source", "Basis · limitation · reference", "/record#workspace"],
              ].map(([number, title, value, note, href]) => (
                <article key={title}>
                  <span>{number}</span>
                  <div><small>{title}</small><strong>{value}</strong></div>
                  <p>{note}</p>
                  <Link href={href} aria-label={`Open ${title} in the Readiness Workspace`}>→</Link>
                </article>
              ))}
              <div className="office-console__status"><i /><span>Public review information; formal due diligence remains required</span></div>
            </div>
          </div>
        </section>

        <section className="capital-gateway" aria-labelledby="capital-title">
          <div className="capital-gateway__number" aria-hidden="true">8.882</div>
          <div className="page-shell capital-gateway__shell">
            <div className="capital-gateway__lead">
              <span>Landing story H · Partnerships</span>
              <h2 id="capital-title">Partnership and<br /><em>funding requirements</em></h2>
              <p>Partnership decisions require verified conservation planning, design resolution, cost validation, governance, operations and an agreed funding structure.</p>
              <div className="capital-gateway__actions">
                <Link href="/invest" className="button button-light">Review partnership requirements <span aria-hidden="true">↗</span></Link>
                <Link href="/record" className="text-link text-link-light">Inspect delivery gates <span aria-hidden="true">→</span></Link>
              </div>
            </div>

            <div>
              <p className="landing-rail-cue landing-rail-cue--light" aria-hidden="true"><span>Partnership evidence</span><strong>Swipe to review →</strong></p>
              <div className="capital-gateway__facts">
                <article>
                  <span>Arithmetic sum of six transcribed BOQ package totals</span>
                  <strong>GHS 8.882m</strong>
                  <p>The supplied preliminary BOQ has not been independently reconciled and includes provisional or unclear scope. This is not a final cost, funding target, valuation or return forecast. Source: PROP-BOQ-01; locator not yet verified.</p>
                </article>
                <article>
                  <span>Project-land extent</span>
                  <strong>Unreconciled</strong>
                  <p>The architectural site plan states 50.37 acres; the supplied manuscript states approximately 50.54 acres. Title, survey, boundary and legal-use confirmation are required. Sources: PROP-ARC-01 and PROP-MAN-01; claim-level locators not yet verified.</p>
                </article>
                <article>
                  <span>Proposed review framework</span>
                  <strong>{deliveryGates.length} gates</strong>
                  <p>Platform-defined evidence checkpoints covering conservation, design, governance, cost, operations and funding. They are not official approvals.</p>
                  <Link href="/record#development-gates" className="capital-gateway__fact-link">View all {deliveryGates.length} proposed gates <span aria-hidden="true">→</span></Link>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="legacy-return" aria-labelledby="legacy-title">
          <div className="legacy-return__veil" />
          <p className="legacy-return__visual-disclosure">AI-generated illustration · not documentary or project evidence.</p>
          <div className="page-shell legacy-return__content">
            <span>Landing story I · Long-term stewardship</span>
            <h2 id="legacy-title">Long-term stewardship<br /><em>and public accountability</em></h2>
            <p>Long-term protection depends on conservation outcomes, community benefit, evidence review and accountable stage-gate decisions.</p>
            <div>
              <Link href="/record" className="button button-light">Open the Readiness Workspace <span aria-hidden="true">↗</span></Link>
              <Link href="/community" className="text-link text-link-light">Review community arrangements <span aria-hidden="true">→</span></Link>
              <Link href="/visit" className="text-link text-link-light">Review visitor information <span aria-hidden="true">→</span></Link>
            </div>
            <small>Published archaeology · Proposed museum centre · Community development · Transparent delivery</small>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
