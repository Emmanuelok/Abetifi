"use client";

import Link from "next/link";
import { useState } from "react";
import { stakeholderPaths } from "../lib/content";

export function StakeholderCompass() {
  const [active, setActive] = useState(stakeholderPaths[0].id);
  const current = stakeholderPaths.find((item) => item.id === active) ?? stakeholderPaths[0];

  return (
    <div className="stakeholder-compass">
      <div className="stakeholder-tabs" role="tablist" aria-label="Select stakeholder group">
        {stakeholderPaths.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === item.id}
            aria-controls={`stakeholder-${item.id}`}
            onClick={() => setActive(item.id)}
          >
            <span>{item.short}</span>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        className="stakeholder-panel"
        id={`stakeholder-${current.id}`}
        role="tabpanel"
        aria-live="polite"
      >
        <span className="stakeholder-metric">{current.metric}</span>
        <h3>{current.title}</h3>
        <p>{current.copy}</p>
        <Link href={current.href} className="button button-dark">
          {current.action} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
