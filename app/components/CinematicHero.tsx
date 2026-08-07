import Link from "next/link";
import { headlineFacts } from "../lib/content";

export function CinematicHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/abetifi-hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/media/abetifi-hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-topography" aria-hidden="true" />

      <div className="hero-content page-shell">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span /> Abetifi · Kwahu Plateau · Ghana
          </p>
          <h1 id="hero-title">
            <span>Bosumpra</span>
            <span>Rockshelter</span>
            <em>Archaeology, conservation and museum development</em>
          </h1>
          <p className="hero-deck">
            Bosumpra preserves approximately 12,500 years of archaeological evidence. This platform presents the research record, conservation requirements and proposed museum programme.
          </p>
          <div className="hero-actions">
            <a href="#deep-time" className="button button-light">
              Review the archaeological evidence <span aria-hidden="true">↓</span>
            </a>
            <Link href="/record" className="text-link text-link-light">
              Open the Project Office <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <p className="hero-facts-cue" aria-hidden="true">
          <span>Project facts</span>
          <strong>Swipe to explore →</strong>
        </p>
        <div className="hero-facts" aria-label="Project facts">
          {headlineFacts.map((fact) => (
            <article key={fact.value}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
              <small>{fact.note}</small>
            </article>
          ))}
        </div>
      </div>

      <div className="hero-edge" aria-hidden="true">
        <span>Continue to the archaeological overview</span>
        <i />
      </div>
      <a className="hero-mobile-cue" href="#scale-title">
        <span>Begin the story</span>
        <i aria-hidden="true">↓</i>
      </a>
      <p className="hero-disclosure">
        Illustrative landscape footage; not a site record of Bosumpra.
      </p>
    </section>
  );
}
