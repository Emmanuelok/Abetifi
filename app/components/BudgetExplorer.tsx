"use client";

import { useState } from "react";
import { boqSummary, formatGhs } from "../lib/content";

const total = boqSummary.reduce((sum, item) => sum + item.value, 0);

export function BudgetExplorer() {
  const [active, setActive] = useState(boqSummary.length - 1);
  const selected = boqSummary[active];

  return (
    <div className="budget-explorer">
      <div className="budget-lead">
        <span className="status-pill status-review">Preliminary · independent cost review required</span>
        <p>Arithmetic sum of six transcribed BOQ package totals</p>
        <strong>{formatGhs(total)}</strong>
        <small>
          This is the arithmetic sum of the six supplied summary values shown here—not a verified final budget, secured amount, funding target or current funding gap. Source: PROP-BOQ-01; claim-level page or line locator not yet verified.
        </small>
      </div>
      <div className="budget-bars" aria-label="Preliminary BOQ summary by construction bill">
        {boqSummary.map((item, index) => (
          <button
            key={item.name}
            type="button"
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
          >
            <span>{item.name}</span>
            <i style={{ "--bar-size": `${(item.value / Math.max(...boqSummary.map((entry) => entry.value))) * 100}%` } as React.CSSProperties} />
            <b>{formatGhs(item.value)}</b>
          </button>
        ))}
      </div>
      <div className="budget-selection">
        <span>Selected BOQ section</span>
        <h3>{selected.name}</h3>
        <strong>{formatGhs(selected.value)}</strong>
        <p>{((selected.value / total) * 100).toFixed(1)}% of the documented summary total.</p>
      </div>
    </div>
  );
}
