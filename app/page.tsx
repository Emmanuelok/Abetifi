import Link from "next/link";
import { CinematicHero } from "./components/CinematicHero";
import { Footer } from "./components/Footer";
import { Reveal } from "./components/Reveal";
import { SiteHeader } from "./components/SiteHeader";
import { StakeholderCompass } from "./components/StakeholderCompass";
import { heritageMoments, museumProgramme, projectPrinciples } from "./lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <CinematicHero />

        <section id="deep-time" className="section deep-time-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading">
              <div>
                <span className="kicker">01 · The evidence</span>
                <h2>One shelter.<br />Many ways of living.</h2>
              </div>
              <p>
                Bosumpra is not a story of a single “Stone Age people.” Its deposits record changing tools, foods and relationships with place across millennia—and periods when the shelter may have been used only episodically.
              </p>
            </Reveal>

            <div className="time-ribbon">
              {heritageMoments.map((moment, index) => (
                <Reveal key={moment.title} className={`time-card tone-${moment.tone}`} delay={index * 70}>
                  <span className="time-index">{String(index + 1).padStart(2, "0")}</span>
                  <p className="time-era">{moment.era}</p>
                  <h3>{moment.title}</h3>
                  <p>{moment.copy}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="evidence-callout">
              <div className="evidence-seal" aria-hidden="true"><span>12K+</span></div>
              <div>
                <span className="kicker">What the evidence supports</span>
                <h3>“More than 12,000 years of human activity” is the durable claim.</h3>
                <p>
                  The record is exceptionally long, but it should not be described as 12,000 years of uninterrupted occupation. The platform keeps evidence, interpretation, oral history and future vision visibly distinct.
                </p>
              </div>
              <Link href="/heritage" className="text-link">Explore the full timeline <span aria-hidden="true">→</span></Link>
            </Reveal>
          </div>
        </section>

        <section className="section museum-section">
          <div className="page-shell museum-layout">
            <Reveal className="museum-copy">
              <span className="kicker kicker-light">02 · The museum vision</span>
              <h2>A circular centre designed around encounter.</h2>
              <p>
                The proposed museum programme turns a radial architectural idea into a complete public journey: conservation below, encounter at ground level, learning above and a panoramic outlook at the top.
              </p>
              <Link href="/project" className="button button-light">Walk through the proposal <span aria-hidden="true">↗</span></Link>
            </Reveal>

            <div className="museum-orbit" aria-label="Proposed museum programme by level">
              <div className="orbit-core"><span>PAST</span><i>↕</i><span>FUTURE</span></div>
              {museumProgramme.map((level, index) => (
                <Reveal key={level.level} className={`orbit-item orbit-${index + 1}`} delay={index * 90}>
                  <small>{level.level}</small>
                  <strong>{level.title}</strong>
                </Reveal>
              ))}
              <span className="orbit-line orbit-line-a" aria-hidden="true" />
              <span className="orbit-line orbit-line-b" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="section principles-section">
          <div className="page-shell">
            <Reveal className="section-heading">
              <span className="kicker">03 · How the future is built</span>
              <h2>Four commitments before one new brick.</h2>
            </Reveal>
            <div className="principles-grid">
              {projectPrinciples.map((principle, index) => (
                <Reveal key={principle.number} className="principle" delay={index * 80}>
                  <span>{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section stakeholder-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading">
              <div>
                <span className="kicker">04 · Find your role</span>
                <h2>One place.<br />Many stakeholders.</h2>
              </div>
              <p>
                Choose the perspective closest to yours. Each path leads to the facts, responsibilities, opportunities and next actions that matter to you.
              </p>
            </Reveal>
            <Reveal><StakeholderCompass /></Reveal>
          </div>
        </section>

        <section className="section final-portal">
          <div className="page-shell portal-grid">
            <Reveal>
              <span className="kicker kicker-light">The shared proposition</span>
              <h2>Protect deep history.<br />Create present value.<br />Pass both forward.</h2>
            </Reveal>
            <Reveal className="portal-actions" delay={100}>
              <Link href="/invest" className="portal-card">
                <span>Capital + partnership</span>
                <strong>Open the investor gateway</strong>
                <i aria-hidden="true">↗</i>
              </Link>
              <Link href="/community" className="portal-card">
                <span>People + place</span>
                <strong>Read the community compact</strong>
                <i aria-hidden="true">↗</i>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
