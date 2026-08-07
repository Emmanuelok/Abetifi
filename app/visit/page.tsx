import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Visit Abetifi",
  description: "Proposed visitor programme, access limitations and information requiring confirmation before travel to Bosumpra.",
};

export default function VisitPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          index="05"
          eyebrow="Visitor experience"
          title={<>Visitor information<br /><em>and access planning</em></>}
          description="This page describes the proposed visitor programme and conservation controls. Current access arrangements are not verified."
          stat="240 m²"
          statLabel="Approximate sheltered interior area"
          nextHref="#journey"
          nextLabel="Review the proposed itinerary"
        />

        <section className="section visit-readiness-section">
          <div className="page-shell visit-alert">
            <Reveal><span className="status-pill status-review">Access status</span><h2>Current visitor access has not been verified.</h2></Reveal>
            <Reveal delay={80}><p>The supplied files do not confirm current opening hours, tickets, booking contacts, guide availability, road/access conditions, mobility access, facilities or emergency arrangements. This page therefore presents the intended experience—not a confirmed booking service.</p></Reveal>
          </div>
        </section>

        <section className="section visitor-journey-section" id="journey">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker">Proposed itinerary</span><h2>Proposed five-stage visitor itinerary.</h2></div><p>The sequence introduces landscape, site protocols, archaeological evidence and community services.</p></Reveal>
            <div className="visitor-journey">
              {[
                ["Arrive", "Orient to Abetifi and the Kwahu Plateau", "Understand the landscape, community protocols and why conservation shapes the visit."],
                ["Approach", "Landscape and geology briefing", "Follow sandstone, water, vegetation and topography toward the rockshelter."],
                ["Encounter", "Guided rockshelter access", "Enter the shelter with agreed interpretation, cultural protocols and carrying limits."],
                ["Interpret", "Museum interpretation", "Connect tools, plant remains, stratigraphy, dating and open research questions."],
                ["Local services", "Community context", "Review verified local food, craft, learning and wider Kwahu services."],
              ].map(([verb, title, copy], index) => <Reveal className="journey-stop" key={verb} delay={index * 70}><span>{String(index + 1).padStart(2, "0")}</span><small>{verb}</small><h3>{title}</h3><p>{copy}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section visit-modes-section">
          <div className="page-shell">
            <Reveal className="section-heading"><span className="kicker kicker-light">Proposed visit formats</span><h2>Formats by audience.</h2></Reveal>
            <div className="visit-modes-grid">
              {[
                ["First encounter", "Families + general visitors", "Landscape orientation, guided shelter encounter and museum highlights."],
                ["Learning day", "Schools + youth groups", "Curriculum-linked activity, practical archaeology, plant-use evidence and facilitated review."],
                ["Evidence intensive", "Universities + researchers", "Pre-arranged research briefing, methods, collections questions and field-learning possibilities."],
                ["Community + culture", "Diaspora + organised groups", "History, contemporary community, local enterprise and wider Kwahu connections."],
              ].map(([title, audience, copy], index) => <Reveal className="visit-mode" key={title} delay={index * 60}><span>0{index + 1}</span><small>{audience}</small><h3>{title}</h3><p>{copy}</p><i>Expression of interest only</i></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section before-travel-section">
          <div className="page-shell before-travel-grid">
            <Reveal><span className="kicker">Before travelling</span><h2>Information to confirm before travel.</h2></Reveal>
            <div className="travel-checklist">
              {[
                "Current opening status and an official contact",
                "Guide requirement and group-size limit",
                "Weather, footwear and site-access conditions",
                "Mobility, washroom and rest-area access",
                "Photography, worship and culturally sensitive areas",
                "School safeguarding and supervision requirements",
              ].map((item) => <Reveal className="travel-check" key={item}><span>□</span><p>{item}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section location-section">
          <div className="page-shell location-grid">
            <Reveal><span className="kicker kicker-light">Location context</span><h2>Abetifi, Kwahu East District, Eastern Region, Ghana.</h2><p>Bosumpra lies on the northeastern edge of Abetifi at approximately 613 metres above sea level.</p></Reveal>
            <Reveal className="location-card" delay={80}><span>6.85° N · 0.80° W</span><strong>Approximate scholarly location context</strong><p>Use the official visitor contact and confirmed map pin once published. The coordinates shown are contextual and should not replace on-the-ground directions.</p><a href="https://www.google.com/maps/search/?api=1&query=Abetifi+Stone+Age+Park+Ghana" target="_blank" rel="noreferrer" className="button button-light">Open map search <span aria-hidden="true">↗</span></a></Reveal>
          </div>
        </section>

        <section className="section visit-next-section"><div className="page-shell visit-next-grid"><Reveal><h2>Planning a school, research or institutional visit?</h2></Reveal><Reveal delay={80}><p>Prepare a visit-information request and record the operating details that require confirmation. The document is not a booking.</p><Link href="/record#workspace" className="button button-dark">Prepare visit enquiry <span aria-hidden="true">↗</span></Link></Reveal></div></section>
      </main>
      <Footer />
    </>
  );
}
