import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Community & Livelihoods",
  description: "See how stewardship, training, jobs, enterprise and accountable benefit-sharing can place Abetifi's community at the centre of the project.",
};

const pathways = [
  ["Heritage stewards", "Community guides, site care, interpretation support, oral-history work and visitor safeguarding."],
  ["Creative enterprise", "Craft, design, publishing, performance and responsibly interpreted heritage products."],
  ["Visitor economy", "Local food, accommodation, transport, events, maintenance and supply-chain opportunities."],
  ["Youth + schools", "Clubs, camps, practical learning, internships, digital heritage and teacher-supported activities."],
  ["Conservation skills", "Collections care, documentation, landscape restoration and technical apprenticeship pathways."],
  ["Research participation", "Field schools, community researchers, archives, translation, monitoring and co-authored knowledge."],
];

export default function CommunityPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          index="03"
          eyebrow="Community + livelihoods"
          title={<>The community is<br /><em>not the backdrop.</em></>}
          description="Abetifi’s people, traditional leadership, schools, enterprises and living relationships with the site must shape what is protected, how it is interpreted and who benefits."
          stat="6"
          statLabel="Proposed local opportunity pathways"
          nextHref="#compact"
          nextLabel="Read the compact"
        />

        <section className="section community-compact-section" id="compact">
          <div className="page-shell compact-grid">
            <Reveal>
              <span className="kicker">The community compact</span>
              <h2>Ownership is a system of decisions, not a slogan.</h2>
              <p>A credible heritage project must make local voice, opportunity, protection and accountability visible in its governance and reporting.</p>
            </Reveal>
            <div className="compact-principles">
              {[
                ["Voice", "Traditional leaders, community groups, women, youth, schools, congregations and enterprises have defined channels into decisions."],
                ["Value", "Jobs, contracts, training and enterprise opportunities use clear, fair and locally accessible processes."],
                ["Care", "Sacred, archaeological and environmental sensitivities set the limits of visitor growth."],
                ["Proof", "Benefits, complaints, incidents, procurement and conservation outcomes are reported regularly."],
              ].map(([title, copy], index) => <Reveal className="compact-row" key={title} delay={index * 60}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section opportunity-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker kicker-light">Opportunity architecture</span><h2>Six routes from heritage to livelihood.</h2></div><p>These are programme pathways to design and validate with the community. They are not promises of immediate employment.</p></Reveal>
            <div className="opportunity-grid">
              {pathways.map(([title, copy], index) => <Reveal className="opportunity-card" key={title} delay={index * 55}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section safeguards-section">
          <div className="page-shell safeguards-grid">
            <Reveal><span className="kicker">Safeguards before scale</span><h2>Growth must not cost the place its meaning.</h2></Reveal>
            <div>
              {[
                "Define no-go zones, carrying limits and conservation monitoring before increasing visitation.",
                "Agree protocols for photography, worship, research, artefact stories and sensitive cultural knowledge.",
                "Publish transparent procurement and conflict-of-interest rules.",
                "Create accessible complaints, response and remedy channels.",
                "Protect children and vulnerable visitors through safeguarding, guide vetting and programme standards.",
                "Track who gains access to training, contracts and leadership—not only total participation.",
              ].map((item, index) => <Reveal className="safeguard-row" key={item} delay={index * 45}><span>✓</span><p>{item}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section measurement-section">
          <div className="page-shell">
            <Reveal className="section-heading"><span className="kicker">A public-benefit dashboard to build</span><h2>Measure what communities can actually feel.</h2></Reveal>
            <div className="measurement-grid">
              {[
                ["Opportunity", "Local hires · apprenticeships · paid training · supplier spend"],
                ["Stewardship", "Conservation condition · incidents · restoration · carrying pressure"],
                ["Learning", "School visits · teacher participation · research outputs · archive use"],
                ["Enterprise", "Local vendors · repeat contracts · visitor spend retained locally"],
                ["Voice", "Advisory participation · complaints resolved · public reporting cadence"],
              ].map(([title, metrics], index) => <Reveal className="measurement-card" key={title} delay={index * 60}><span>0{index + 1}</span><h3>{title}</h3><p>{metrics}</p><small>Baseline required</small></Reveal>)}
            </div>
            <Reveal className="community-cta"><div><span className="kicker">Institutional or community partner?</span><h3>Help turn these pathways into governed programmes.</h3></div><Link href="/invest#partner" className="button button-dark">Build a partnership brief <span aria-hidden="true">↗</span></Link></Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

