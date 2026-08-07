"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heritageMoments } from "../lib/content";

const depthLabels = ["Surface", "Layer II", "Layer IV", "Layer VI", "Deep record"];

export function DeepTimeStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const inViewRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateScene = () => {
      frameRef.current = null;
      if (!inViewRef.current) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const nextIndex = Math.min(
        heritageMoments.length - 1,
        Math.round(progress * (heritageMoments.length - 1)),
      );

      section.style.setProperty("--time-progress", `${progress * 100}%`);
      section.style.setProperty("--time-shift", `${progress * -42}%`);

      if (nextIndex !== activeRef.current) {
        activeRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const queueUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateScene);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) queueUpdate();
      },
      { rootMargin: "35% 0px 35% 0px" },
    );

    observer.observe(section);
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate, { passive: true });
    queueUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const moveToChapter = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    activeRef.current = index;
    setActiveIndex(index);

    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: sectionTop + (index / (heritageMoments.length - 1)) * scrollable,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, []);

  const activeMoment = heritageMoments[activeIndex];

  return (
    <section ref={sectionRef} id="deep-time" className="time-stage" aria-labelledby="time-stage-title">
      <div className="time-stage__sticky">
        <div className="time-stage__topline page-shell">
          <span>02 · Archaeological sequence</span>
          <span>Interpretive stratigraphic visualisation</span>
        </div>

        <div className="time-stage__backdrop" aria-hidden="true">
          <span>BOSUMPRA</span>
        </div>

        <div className="time-stage__grid page-shell">
          <div className="time-stage__rail" aria-hidden="true">
            <span>NOW</span>
            <i><b /></i>
            <span>10K BC</span>
          </div>

          <div className="strata-visual" data-active={activeIndex} aria-hidden="true">
            <div className="strata-visual__depth">
              {depthLabels.map((label, index) => (
                <span key={label} className={`strata-band strata-band--${index + 1}`}>
                  <i>{label}</i>
                </span>
              ))}
            </div>
            <div className="strata-specimen">
              <span className="strata-specimen__facet facet-a" />
              <span className="strata-specimen__facet facet-b" />
              <span className="strata-specimen__facet facet-c" />
              <small>QUARTZ<br />EVIDENCE</small>
            </div>
            <div className="strata-coordinate">06°40′N · 00°45′W</div>
          </div>

          <div id="deep-time-panel" className="time-stage__content">
            <p className="time-stage__era">{activeMoment.era}</p>
            <div className="time-stage__counter" aria-hidden="true">
              {String(activeIndex + 1).padStart(2, "0")}<span>/05</span>
            </div>
            <h2 id="time-stage-title" key={`title-${activeIndex}`}>{activeMoment.title}</h2>
            <p key={`copy-${activeIndex}`} className="time-stage__copy">{activeMoment.copy}</p>
            <div className="time-stage__status">
              <span>Evidence status</span>
              <strong>{activeIndex === 4 ? "Living relationship" : "Published research"}</strong>
            </div>
            <Link href="/heritage" className="text-link text-link-light">
              Review the full chronology <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <nav className="time-stage__chapters page-shell" aria-label="Archaeological sequence periods">
          {heritageMoments.map((moment, index) => (
            <button
              key={moment.title}
              type="button"
              aria-controls="deep-time-panel"
              aria-current={activeIndex === index ? "step" : undefined}
              onClick={() => moveToChapter(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{moment.title}</small>
            </button>
          ))}
        </nav>
      </div>

      <div className="time-stage__mobile-list page-shell">
        {heritageMoments.map((moment, index) => (
          <article key={moment.title}>
            <span>{String(index + 1).padStart(2, "0")} · {moment.era}</span>
            <h3>{moment.title}</h3>
            <p>{moment.copy}</p>
          </article>
        ))}
        <Link href="/heritage" className="button button-light">Review the full chronology <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
