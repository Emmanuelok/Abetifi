"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { stakeholderPaths } from "../lib/content";

export function RoleConstellation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activePath = stakeholderPaths[activeIndex];

  const moveFocus = (index: number, direction: 1 | -1) => {
    const next = (index + direction + stakeholderPaths.length) % stakeholderPaths.length;
    setActiveIndex(next);
    buttonRefs.current[next]?.focus();
  };

  return (
    <section className="role-constellation" aria-labelledby="role-constellation-title">
      <div className="role-constellation__lines" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
      <div className="role-constellation__header page-shell">
        <span>06 · Stakeholder information</span>
        <h2 id="role-constellation-title">Information by<br /><em>stakeholder group</em></h2>
        <p>Select a category to review the relevant responsibilities, evidence and project information.</p>
      </div>

      <div className="role-constellation__stage page-shell">
        <div
          id="role-stakeholder-panel"
          className="role-constellation__core"
          role="tabpanel"
          aria-labelledby={`role-tab-${activePath.id}`}
          key={activePath.id}
        >
          <span>{activePath.metric}</span>
          <h3>{activePath.title}</h3>
          <p>{activePath.copy}</p>
          <Link href={activePath.href} className="button button-light">
            {activePath.action} <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="role-constellation__orbit" role="tablist" aria-label="Stakeholder categories">
          {stakeholderPaths.map((path, index) => (
            <button
              key={path.id}
              ref={(node) => { buttonRefs.current[index] = node; }}
              id={`role-tab-${path.id}`}
              type="button"
              role="tab"
              aria-controls="role-stakeholder-panel"
              aria-selected={activeIndex === index}
              tabIndex={activeIndex === index ? 0 : -1}
              className={`role-node role-node--${index}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  moveFocus(index, 1);
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  moveFocus(index, -1);
                }
                if (event.key === "Home") {
                  event.preventDefault();
                  setActiveIndex(0);
                  buttonRefs.current[0]?.focus();
                }
                if (event.key === "End") {
                  event.preventDefault();
                  const last = stakeholderPaths.length - 1;
                  setActiveIndex(last);
                  buttonRefs.current[last]?.focus();
                }
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{path.short}</strong>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
