"use client";

import { useMemo, useState } from "react";

const roles = ["Institution / government", "Funder / sponsor", "Research / education", "Community enterprise", "Technical partner", "Diaspora / advocate"];
const interests = ["Heritage conservation", "Museum construction", "Exhibitions + digital", "Education + research", "Community livelihoods", "Landscape + sustainability", "Accessibility + visitor services"];

export function PartnershipBuilder() {
  const [role, setRole] = useState(roles[0]);
  const [selected, setSelected] = useState<string[]>([interests[0]]);
  const [status, setStatus] = useState("Copy interest note");

  const brief = useMemo(
    () => [
      "ABETIFI STONE AGE — PARTNERSHIP INTEREST BRIEF",
      `Partner profile: ${role}`,
      `Priority areas: ${selected.length ? selected.join(", ") : "To be discussed"}`,
      "Requested next step: project briefing, governance/rights check and scoped due diligence.",
      "Note: This is an expression of interest, not a commitment, booking or investment offer.",
    ].join("\n"),
    [role, selected],
  );

  const toggleInterest = (interest: string) => {
    setSelected((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest],
    );
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setStatus("Interest note copied");
      window.setTimeout(() => setStatus("Copy interest note"), 1800);
    } catch {
      setStatus("Select and copy the text below");
    }
  };

  return (
    <div className="partnership-builder" id="partner">
      <div className="builder-controls">
        <span className="kicker">Partnership interest note</span>
        <h3>Specify the proposed contribution.</h3>
        <label htmlFor="partner-role">I represent</label>
        <select id="partner-role" value={role} onChange={(event) => setRole(event.target.value)}>
          {roles.map((item) => <option key={item}>{item}</option>)}
        </select>
        <fieldset>
          <legend>Area of interest</legend>
          <div className="interest-grid">
            {interests.map((interest) => (
              <label key={interest}>
                <input
                  type="checkbox"
                  checked={selected.includes(interest)}
                  onChange={() => toggleInterest(interest)}
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="builder-output">
        <span>Draft interest note</span>
        <pre tabIndex={0}>{brief}</pre>
        <button type="button" className="button button-light" onClick={copyBrief}>
          {status} <span aria-hidden="true">↗</span>
        </button>
        <p>
          No public project contact has been verified. Information entered here remains in this browser.
        </p>
      </div>
    </div>
  );
}
