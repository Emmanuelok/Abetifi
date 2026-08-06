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
            <span>12,000 years</span>
            <span>beneath our feet.</span>
            <em>The next chapter in our hands.</em>
          </h1>
          <p className="hero-deck">
            A living heritage destination connecting Bosumpra’s deep human record with conservation, learning, community enterprise and a new museum vision.
          </p>
          <div className="hero-actions">
            <a href="#deep-time" className="button button-light">
              Enter the story <span aria-hidden="true">↓</span>
            </a>
            <Link href="/project" className="text-link text-link-light">
              Explore the development <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

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
        <span>Scroll through deep time</span>
        <i />
      </div>
      <p className="hero-disclosure">
        Interpretive visual inspired by the Kwahu Plateau—not documentary footage of Bosumpra.
      </p>
    </section>
  );
}
