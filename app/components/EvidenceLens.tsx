"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { landingVisuals } from "../lib/visuals";

const lenses = [
  {
    id: "material",
    label: "Material record",
    metric: "10,280 ± 70 BP",
    title: "Material evidence and analytical limits.",
    copy: "Quartz-working, specialised microliths, ground-stone tools and plant remains document changing technical and subsistence choices across a long, uneven record.",
    note: "Earliest robust radiocarbon determination reported by Watson (2017)",
    href: "/heritage",
    action: "Review the evidence",
  },
  {
    id: "enquiry",
    label: "Research history",
    metric: "1943 → 2017",
    title: "Research record, 1943–2017.",
    copy: "Pioneering excavation established the site’s importance. Radiocarbon dating created a chronological framework. Re-excavation and archaeobotany later refined the sequence and plant-use record.",
    note: "Shaw · Smith · Oas, D’Andrea & Watson · Watson",
    href: "/research",
    action: "Trace the published sources",
  },
  {
    id: "living",
    label: "Living landscape",
    metric: "PAST ↔ PRESENT",
    title: "Recent religious use and contemporary significance.",
    copy: "Bosumpra is an archaeological place and a setting with local traditional and Christian meaning. Conservation policy must address the material record and current community relationships.",
    note: "Archaeological evidence, community knowledge and religious meaning remain distinct",
    href: "/community",
    action: "Review community arrangements",
  },
] as const;

export function EvidenceLens() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeLens = lenses[activeIndex];

  const moveFocus = (index: number, direction: 1 | -1) => {
    const next = (index + direction + lenses.length) % lenses.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="evidence-lens" data-lens={activeLens.id} aria-labelledby="evidence-lens-title">
      <div className="evidence-lens__visual">
        {lenses.map((lens) => {
          const asset = landingVisuals.evidence[lens.id];
          return (
            <figure key={lens.id} className={lens.id === activeLens.id ? "is-active" : undefined} aria-hidden={lens.id !== activeLens.id}>
              <Image
                src={asset.src}
                alt={lens.id === activeLens.id ? asset.alt : ""}
                fill
                sizes="(max-width: 820px) 100vw, 52vw"
                unoptimized
              />
              <figcaption><strong>{asset.label}</strong><span>{asset.caption}</span></figcaption>
            </figure>
          );
        })}
        <div className="evidence-lens__metric" aria-hidden="true"><span>{activeLens.metric}</span></div>
      </div>

      <div className="evidence-lens__shell page-shell">
        <div className="evidence-lens__lead">
          <span>03 · Evidence framework</span>
          <p>Archaeological evidence, research history and contemporary relationships require distinct forms of documentation.</p>
        </div>

        <div
          id="evidence-lens-panel"
          className="evidence-lens__content"
          role="tabpanel"
          aria-labelledby={`evidence-lens-tab-${activeLens.id}`}
          key={activeLens.id}
        >
          <small>{activeLens.label}</small>
          <h2 id="evidence-lens-title">{activeLens.title}</h2>
          <p>{activeLens.copy}</p>
          <div className="evidence-lens__note">
            <span>Context</span>
            <strong>{activeLens.note}</strong>
          </div>
          <Link href={activeLens.href} className="button button-light">{activeLens.action} <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="evidence-lens__tabs" role="tablist" aria-label="Evidence perspectives">
          {lenses.map((lens, index) => (
            <button
              key={lens.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              id={`evidence-lens-tab-${lens.id}`}
              type="button"
              role="tab"
              aria-controls="evidence-lens-panel"
              aria-selected={activeIndex === index}
              tabIndex={activeIndex === index ? 0 : -1}
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
                  tabRefs.current[0]?.focus();
                }
                if (event.key === "End") {
                  event.preventDefault();
                  const last = lenses.length - 1;
                  setActiveIndex(last);
                  tabRefs.current[last]?.focus();
                }
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{lens.label}</strong>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className="evidence-lens__mobile-cue" aria-hidden="true">Swipe perspectives <span>→</span></p>
      </div>
    </section>
  );
}
