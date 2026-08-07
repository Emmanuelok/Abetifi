"use client";

import { useState } from "react";
import { museumProgramme } from "../lib/content";

export function MuseumExplorer() {
  const [active, setActive] = useState(0);
  const current = museumProgramme[active];

  return (
    <div className="floor-explorer">
      <div className="floor-visual" aria-hidden="true">
        <div className="floor-disc">
          <span className={`floor-ring floor-ring-1 ${active === 3 ? "active" : ""}`} />
          <span className={`floor-ring floor-ring-2 ${active === 2 ? "active" : ""}`} />
          <span className={`floor-ring floor-ring-3 ${active === 1 ? "active" : ""}`} />
          <span className={`floor-ring floor-ring-4 ${active === 0 ? "active" : ""}`} />
          <i className="floor-axis floor-axis-a" />
          <i className="floor-axis floor-axis-b" />
          <b>{String(active + 1).padStart(2, "0")}</b>
        </div>
        <p>Diagrammatic summary<br />of the proposed floor programme</p>
      </div>
      <div className="floor-content">
        <div className="floor-tabs" role="tablist" aria-label="Museum level">
          {museumProgramme.map((level, index) => (
            <button
              key={level.level}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {level.level}
            </button>
          ))}
        </div>
        <div className="floor-details" role="tabpanel" aria-live="polite">
          <span className="status-pill status-proposed">Proposed programme</span>
          <h3>{current.title}</h3>
          <ul>
            {current.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p>
            Programme descriptions come from the project manuscript and drawings. Capacities, approvals, accessibility, fire strategy and technical coordination require professional confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
