import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";
import { pageVisuals } from "../lib/visuals";

export const metadata: Metadata = {
  title: "Community Participation & Proposed Livelihoods",
  description: "Explore proposed stewardship, training, employment and enterprise pathways—and the governance required before any community-benefit claim can be made.",
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
          route="/community"
          eyebrow="Community + livelihoods"
          title={<>Community participation<br /><em>and benefit</em></>}
          description="Abetifi stakeholders and any present-day relationships identified through consultation should shape what is protected, how it is interpreted and how any future benefits are governed."
          stat="6"
          statLabel="Proposed local opportunity pathways"
          media={pageVisuals.community}
          nextHref="#compact"
          nextLabel="Review governance proposals"
        />

        <section className="section community-compact-section" id="compact">
          <div className="page-shell compact-grid">
            <Reveal>
              <span className="kicker">Proposed community governance arrangements</span>
              <h2>Participation requires formal decision rights.</h2>
              <p>A credible heritage project must make local voice, opportunity, protection and accountability visible in its governance and reporting.</p>
            </Reveal>
            <div className="compact-principles">
              {[
                ["Voice", "Traditional leaders, community groups, women, youth, schools, relevant faith communities and enterprises would need defined channels into decisions."],
                ["Value", "Any future jobs, contracts, training and enterprise opportunities should use clear, fair and locally accessible processes."],
                ["Care", "Archaeological, environmental and any currently confirmed cultural or sacred sensitivities should set the limits of visitor growth."],
                ["Proof", "Any benefits, complaints, incidents, procurement and conservation outcomes should be reported regularly."],
              ].map(([title, copy], index) => <Reveal className="compact-row" key={title} delay={index * 60}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section opportunity-section">
          <div className="page-shell">
            <Reveal className="section-heading split-heading"><div><span className="kicker kicker-light">Proposed employment and enterprise pathways</span><h2>Six areas for community programme development.</h2></div><p>These proposals require community review, eligibility rules, accountable programme owners and funding. They do not represent current vacancies or contracts.</p></Reveal>
            <div className="opportunity-grid">
              {pathways.map(([title, copy], index) => <Reveal className="opportunity-card" key={title} delay={index * 55}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section safeguards-section">
          <div className="page-shell safeguards-grid">
            <Reveal><span className="kicker">Safeguards for visitor and programme growth</span><h2>Conservation and cultural protocols.</h2></Reveal>
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
            <Reveal className="section-heading"><span className="kicker">Proposed community-benefit indicators</span><h2>Employment, procurement, participation and conservation measures.</h2></Reveal>
            <div className="measurement-grid">
              {[
                ["Opportunity", "Local hires · apprenticeships · paid training · supplier spend"],
                ["Stewardship", "Conservation condition · incidents · restoration · carrying pressure"],
                ["Learning", "School visits · teacher participation · research outputs · archive use"],
                ["Enterprise", "Local vendors · repeat contracts · visitor spend retained locally"],
                ["Voice", "Advisory participation · complaints resolved · public reporting cadence"],
              ].map(([title, metrics], index) => <Reveal className="measurement-card" key={title} delay={index * 60}><span>0{index + 1}</span><h3>{title}</h3><p>{metrics}</p><small>Baseline required</small></Reveal>)}
            </div>
            <Reveal className="community-cta"><div><span className="kicker">Institutional or community partner</span><h3>Contribute to programme design and governance.</h3></div><Link href="/invest#partner" className="button button-dark">Prepare a partnership interest note <span aria-hidden="true">↗</span></Link></Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
