import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Visit Abetifi",
  description: "Preview the intended visitor journey at Bosumpra and understand what must be confirmed before travelling.",
};

export default function VisitPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          index="05"
          eyebrow="Visitor experience"
          title={<>Come for the view.<br /><em>Leave with deep time.</em></>}
          description="The future visitor experience connects landscape, archaeology, living meaning, community enterprise and the proposed museum—at a pace that protects the rockshelter."
          stat="240 m²"
          statLabel="Approximate sheltered interior area"
          nextHref="#journey"
          nextLabel="Preview the journey"
        />

        <section className="section visit-readiness-section">
          <div className="page-shell visit-alert">
            <Reveal><span className="status-pill status-review">Plan carefully</span><h2>Visitor information is not yet publication-ready.</h2></Reveal>
            <Reveal delay={80}><p>The supplied files do not confirm current opening hours, tickets, booking contacts, guide availability, road/access conditions, mobility access, facilities or emergency arrangements. This page therefore presents the intended experience—not a confirmed booking service.</p></Reveal>
          </div>
        </section>

        <section className="section visitor-journey-section" id="journey">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker">The intended journey</span><h2>Five encounters. One respectful arc.</h2></div><p>A strong visit should reveal evidence progressively and make the community, landscape and research process visible.</p></Reveal>
            <div className="visitor-journey">
              {[
                ["Arrive", "Orient to Abetifi and the Kwahu Plateau", "Understand the landscape, community protocols and why conservation shapes the visit."],
                ["Approach", "Read geology before archaeology", "Follow sandstone, water, vegetation and topography toward the rockshelter."],
                ["Encounter", "Enter a living heritage landscape", "Experience the shelter quietly with guided interpretation and carrying limits."],
                ["Interpret", "Move from object to evidence", "Use the proposed museum to connect tools, plant remains, stratigraphy, dating and open questions."],
                ["Share value", "Meet the contemporary place", "Choose local food, craft, learning and wider Kwahu experiences that retain value locally."],
              ].map(([verb, title, copy], index) => <Reveal className="journey-stop" key={verb} delay={index * 70}><span>{String(index + 1).padStart(2, "0")}</span><small>{verb}</small><h3>{title}</h3><p>{copy}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section visit-modes-section">
          <div className="page-shell">
            <Reveal className="section-heading"><span className="kicker kicker-light">Future visit modes</span><h2>Different visitors need different depths.</h2></Reveal>
            <div className="visit-modes-grid">
              {[
                ["First encounter", "Families + general visitors", "Landscape orientation, guided shelter encounter and museum highlights."],
                ["Learning day", "Schools + youth groups", "Curriculum-linked activity, practical archaeology, plant-use story and facilitated reflection."],
                ["Evidence intensive", "Universities + researchers", "Pre-arranged research briefing, methods, collections questions and field-learning possibilities."],
                ["Community + culture", "Diaspora + organised groups", "History, contemporary community, local enterprise and wider Kwahu connections."],
              ].map(([title, audience, copy], index) => <Reveal className="visit-mode" key={title} delay={index * 60}><span>0{index + 1}</span><small>{audience}</small><h3>{title}</h3><p>{copy}</p><i>Expression of interest only</i></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section before-travel-section">
          <div className="page-shell before-travel-grid">
            <Reveal><span className="kicker">Before travelling</span><h2>Confirm, do not assume.</h2></Reveal>
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

        <section className="section visit-next-section"><div className="page-shell visit-next-grid"><Reveal><h2>Planning a school, research or institutional visit?</h2></Reveal><Reveal delay={80}><p>Use the partnership brief builder to prepare your request while the official contact route is being confirmed.</p><Link href="/invest#partner" className="button button-dark">Prepare an enquiry brief <span aria-hidden="true">↗</span></Link></Reveal></div></section>
      </main>
      <Footer />
    </>
  );
}

