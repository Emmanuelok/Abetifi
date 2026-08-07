"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { museumProgramme } from "../lib/content";

const floorCodes = ["B", "G", "01", "02"];

export function MuseumAscent() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const inViewRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      frameRef.current = null;
      if (!inViewRef.current) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const nextIndex = Math.min(
        museumProgramme.length - 1,
        Math.round(progress * (museumProgramme.length - 1)),
      );

      section.style.setProperty("--museum-progress", `${progress * 100}%`);
      if (nextIndex !== activeRef.current) {
        activeRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const queue = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) queue();
      },
      { rootMargin: "35% 0px 35% 0px" },
    );

    observer.observe(section);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    queue();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const moveToFloor = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    activeRef.current = index;
    setActiveIndex(index);

    const staticLayout = window.matchMedia(
      "(max-width: 820px), (prefers-reduced-motion: reduce)",
    ).matches;
    if (staticLayout) return;

    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (index / (museumProgramme.length - 1)) * scrollable,
      behavior: "smooth",
    });
  }, []);

  const activeFloor = museumProgramme[activeIndex];

  return (
    <section ref={sectionRef} className="museum-ascent" aria-labelledby="museum-ascent-title">
      <div className="museum-ascent__sticky">
        <div className="museum-ascent__trace" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="museum-ascent__topline page-shell">
          <span>04 · Proposed museum centre</span>
          <span>Concept programme · not an approved construction design</span>
        </div>

        <div className="museum-ascent__grid page-shell">
          <div className="museum-model" data-floor={activeIndex} aria-label="Interactive exploded view of the proposed four-level museum programme">
            <div className="museum-model__halo" aria-hidden="true" />
            <div className="museum-model__axis" aria-hidden="true"><span /><i /></div>
            <div className="museum-model__stack">
              {museumProgramme.map((floor, index) => (
                <button
                  key={floor.level}
                  type="button"
                  className={activeIndex === index ? "is-active" : undefined}
                  style={{ "--floor-order": index } as CSSProperties}
                  aria-controls="museum-ascent-panel"
                  aria-pressed={activeIndex === index}
                  onClick={() => moveToFloor(index)}
                >
                  <span>{floorCodes[index]}</span>
                  <small>{floor.level}</small>
                </button>
              ))}
            </div>
            <div className="museum-model__caption" aria-hidden="true">
              <span>Radial concept</span>
              <i />
              <span>Exploded programme</span>
            </div>
          </div>

          <div id="museum-ascent-panel" className="museum-ascent__content">
            <p className="museum-ascent__eyebrow">{floorCodes[activeIndex]} · {activeFloor.level}</p>
            <h2 id="museum-ascent-title" key={`museum-title-${activeIndex}`}>{activeFloor.title}</h2>
            <p className="museum-ascent__intro">
              The proposed programme allocates conservation and collections functions below ground, public reception and exhibitions at ground level, education and assembly above, and hospitality and viewing functions at the upper level.
            </p>
            <ul key={`museum-list-${activeIndex}`}>
              {activeFloor.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="museum-ascent__actions">
              <Link href="/project" className="button button-light">Review the proposal <span aria-hidden="true">↗</span></Link>
              <Link href="/record" className="text-link text-link-light">Inspect delivery gates <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>

        <nav className="museum-ascent__nav page-shell" aria-label="Museum levels">
          {museumProgramme.map((floor, index) => (
            <button
              key={floor.level}
              type="button"
              aria-controls="museum-ascent-panel"
              aria-current={activeIndex === index ? "step" : undefined}
              onClick={() => moveToFloor(index)}
            >
              <span>{floorCodes[index]}</span>
              <small>{floor.level}</small>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
