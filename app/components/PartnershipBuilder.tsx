"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const roles = [
  { name: "Public institution / government", priority: "Authority, heritage protection and enabling infrastructure", gates: "Authority · Conservation · Design" },
  { name: "Heritage funder / philanthropy", priority: "Conservation, collections, interpretation and public value", gates: "Conservation · Impact · Authority" },
  { name: "Corporate sponsor", priority: "A restricted programme with measurable outcomes and transparent reporting", gates: "Delivery · Impact · Economics" },
  { name: "University / research institution", priority: "Research, collections care, education and knowledge exchange", gates: "Conservation · Design · Impact" },
  { name: "Technical / professional partner", priority: "Design, cost, safety, environment, operations and skill transfer", gates: "Design · Economics · Delivery" },
  { name: "Community / diaspora partner", priority: "Cultural protocols, governance, enterprise and advocacy", gates: "Authority · Impact · Delivery" },
] as const;

const interests = [
  "Authority + project enablement",
  "Conservation + collections",
  "Coordinated design + accessibility",
  "Museum + digital interpretation",
  "Education + research",
  "Community capability + livelihoods",
  "Landscape + sustainability",
  "Pre-opening + operations",
];

const contributionTypes = ["Grant / philanthropy", "Programme sponsorship", "Professional expertise", "Research collaboration", "Equipment / in-kind support", "Public coordination"];
const stages = ["Explore strategic fit", "Review evidence and rights", "Scope a work package", "Prepare a formal agreement"];

export function PartnershipBuilder() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([interests[1]]);
  const [contribution, setContribution] = useState<string>(contributionTypes[0]);
  const [stage, setStage] = useState<string>(stages[0]);
  const [status, setStatus] = useState("Copy scoping brief");
  const role = roles[roleIndex];

  const brief = useMemo(
    () => [
      "ABETIFI STONE AGE — PARTNERSHIP SCOPING BRIEF",
      "",
      `Partner profile: ${role.name}`,
      `Engagement stage: ${stage}`,
      `Proposed contribution: ${contribution}`,
      `Priority workstreams: ${selected.length ? selected.join("; ") : "To be defined"}`,
      `Strategic fit: ${role.priority}`,
      `Relevant proposed review gates: ${role.gates}`,
      "",
      "REQUIRED FIRST REVIEW",
      "1. Confirm entity authority, rights-holders and decision owners.",
      "2. Review the evidence pack relevant to the selected workstream.",
      "3. Define scope boundaries, restrictions, milestones and acceptance criteria.",
      "4. Agree procurement, conflicts, safeguarding, change-control and reporting rules.",
      "5. Record unresolved assumptions before any commitment is made.",
      "",
      "PROPOSED FIRST MEETING",
      "• Confirm strategic fit and contribution boundaries.",
      "• Formally appoint owners for the relevant proposed review gates.",
      "• Identify missing documents and independent checks.",
      "• Agree the next decision, evidence required and review date.",
      "",
      "Status: Expression of interest only. This is not a commitment, investment offer, booking or proof of project readiness.",
    ].join("\n"),
    [contribution, role, selected, stage],
  );

  const toggleInterest = (interest: string) => {
    setSelected((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]);
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setStatus("Scoping brief copied");
      window.setTimeout(() => setStatus("Copy scoping brief"), 1800);
    } catch {
      setStatus("Select and copy the brief");
    }
  };

  const downloadBrief = () => {
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "abetifi-partnership-scoping-brief.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="partnership-builder" id="partner">
      <div className="builder-controls">
        <span className="kicker">Interactive partnership brief</span>
        <h3>Turn an interest into a review-ready starting point.</h3>

        <fieldset className="role-picker">
          <legend>01 · Partner profile</legend>
          <div>
            {roles.map((item, index) => (
              <button key={item.name} type="button" className={roleIndex === index ? "active" : undefined} onClick={() => setRoleIndex(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>{item.name}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="builder-selects">
          <label htmlFor="partner-contribution"><span>02 · Contribution type</span><select id="partner-contribution" value={contribution} onChange={(event) => setContribution(event.target.value)}>{contributionTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label htmlFor="partner-stage"><span>03 · Engagement stage</span><select id="partner-stage" value={stage} onChange={(event) => setStage(event.target.value)}>{stages.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>

        <fieldset>
          <legend>04 · Priority workstreams</legend>
          <div className="interest-grid">
            {interests.map((interest) => (
              <label key={interest}>
                <input type="checkbox" checked={selected.includes(interest)} onChange={() => toggleInterest(interest)} />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="builder-output">
        <div className="builder-output__status"><span>Generated scoping note</span><i>Nothing is transmitted</i></div>
        <div className="builder-fit"><span>Current fit</span><strong>{role.priority}</strong><small>{role.gates}</small></div>
        <pre tabIndex={0}>{brief}</pre>
        <div className="builder-actions">
          <button type="button" className="button button-light" onClick={copyBrief}>{status} <span aria-hidden="true">↗</span></button>
          <button type="button" className="button button-ghost" onClick={downloadBrief}>Download .txt <span aria-hidden="true">↓</span></button>
          <Link href="/record" className="text-link text-link-light">Open the Readiness Workspace <span aria-hidden="true">→</span></Link>
        </div>
        <p>No verified public project contact is available in the supplied records. Save this brief for a future authorised project conversation.</p>
      </div>
    </div>
  );
}
