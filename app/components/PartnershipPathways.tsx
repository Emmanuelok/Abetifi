"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const pathways = [
  {
    id: "public",
    label: "Public institutions",
    title: "Coordinate lawful authority, protection and enabling infrastructure.",
    summary: "Public partners could align heritage protection, planning, education, tourism, access, sanitation and district-level enterprise support through a formally adopted programme.",
    contribution: "Mandate, statutory coordination, infrastructure alignment and accountable public oversight.",
    evidence: "Entity authority, land and boundary records, heritage status, approvals route and decision-rights matrix.",
    milestone: "A written inter-agency mandate with named owners, decisions and review dates.",
    gates: ["Authority", "Conservation", "Design"],
  },
  {
    id: "heritage",
    label: "Heritage funders",
    title: "Protect the evidence before expanding the visitor proposition.",
    summary: "Philanthropic and heritage partners can support conservation baselines, documentation, collections care, interpretation and community-centred stewardship.",
    contribution: "Restricted grant or philanthropic support, conservation expertise and independent review.",
    evidence: "Significance and condition baseline, conservation plan, cultural protocols, collections rights and measurable outputs.",
    milestone: "A scoped conservation work package with restrictions, milestones and reporting duties.",
    gates: ["Conservation", "Impact", "Authority"],
  },
  {
    id: "corporate",
    label: "Corporate sponsors",
    title: "Back a defined public-value programme with visible accountability.",
    summary: "Corporate participation can focus on accessibility, learning, landscape restoration, digital interpretation or community capability—not an unbounded construction promise.",
    contribution: "Programme sponsorship, in-kind capability, equipment, professional services or matched funding.",
    evidence: "Approved scope, brand and ethics rules, procurement route, outcome measures and public reporting schedule.",
    milestone: "A ring-fenced sponsorship brief linked to a delivery gate and named outcome owner.",
    gates: ["Delivery", "Impact", "Economics"],
  },
  {
    id: "research",
    label: "Universities + research",
    title: "Strengthen knowledge, collections care and public learning.",
    summary: "Universities, museums and education partners can contribute conservation science, archive design, curricula, field learning and peer-reviewed interpretation, subject to permissions.",
    contribution: "Research collaboration, equipment access, curriculum development, training and knowledge exchange.",
    evidence: "Research permissions, collections agreement, ethics and data rules, publication protocol and teaching scope.",
    milestone: "A research and learning protocol that protects rights while defining shared outputs.",
    gates: ["Conservation", "Design", "Impact"],
  },
  {
    id: "technical",
    label: "Technical partners",
    title: "Resolve the design, cost, safety and operating evidence.",
    summary: "Design, engineering, quantity-surveying, museum, environment and operating specialists can turn concept material into coordinated, reviewable decisions.",
    contribution: "Professional services, peer review, cost validation, systems design, skill transfer and delivery controls.",
    evidence: "Defined appointment, responsibility matrix, standards, deliverables, professional assurance and conflicts declaration.",
    milestone: "A coordinated evidence package that closes an identified design or economics gate.",
    gates: ["Design", "Economics", "Delivery"],
  },
  {
    id: "community",
    label: "Community + diaspora",
    title: "Make stewardship, cultural authority and local value foundational.",
    summary: "Community organisations, traditional leadership, enterprises and diaspora advocates can shape protocols, governance, supplier development and responsible visibility.",
    contribution: "Local knowledge, cultural protocol, advisory participation, enterprise pathways, advocacy and network access.",
    evidence: "Representative mandate, participation rules, benefit framework, grievance route and transparent selection criteria.",
    milestone: "An endorsed community compact with responsibilities, protections and measurable benefit pathways.",
    gates: ["Authority", "Impact", "Delivery"],
  },
] as const;

export function PartnershipPathways() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = pathways[activeIndex];

  const move = (index: number, delta: 1 | -1) => {
    const next = (index + delta + pathways.length) % pathways.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="partner-pathways">
      <div className="partner-pathways__tabs" role="tablist" aria-label="Partnership pathways">
        {pathways.map((pathway, index) => (
          <button
            key={pathway.id}
            ref={(node) => { tabRefs.current[index] = node; }}
            type="button"
            role="tab"
            id={`partner-tab-${pathway.id}`}
            aria-controls="partner-pathway-panel"
            aria-selected={activeIndex === index}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); move(index, 1); }
              if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); move(index, -1); }
              if (event.key === "Home") { event.preventDefault(); setActiveIndex(0); tabRefs.current[0]?.focus(); }
              if (event.key === "End") { event.preventDefault(); const last = pathways.length - 1; setActiveIndex(last); tabRefs.current[last]?.focus(); }
            }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{pathway.label}</strong>
            <i aria-hidden="true">↗</i>
          </button>
        ))}
      </div>

      <div
        id="partner-pathway-panel"
        className="partner-pathways__panel"
        role="tabpanel"
        aria-labelledby={`partner-tab-${active.id}`}
        key={active.id}
      >
        <span className="kicker">{active.label}</span>
        <h3>{active.title}</h3>
        <p className="partner-pathways__summary">{active.summary}</p>
        <dl>
          <div><dt>Potential contribution</dt><dd>{active.contribution}</dd></div>
          <div><dt>Evidence before commitment</dt><dd>{active.evidence}</dd></div>
          <div><dt>First accountable milestone</dt><dd>{active.milestone}</dd></div>
        </dl>
        <div className="partner-pathways__footer">
          <div aria-label="Relevant proposed review gates">
            {active.gates.map((gate) => <span key={gate}>{gate}</span>)}
          </div>
          <div>
            <Link href="#partner" className="button button-dark">Build a scoped brief <span aria-hidden="true">↓</span></Link>
            <Link href="/record" className="text-link">Open the Readiness Workspace <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
