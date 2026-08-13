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
            Published research documents more than 12,000 years of human activity at Bosumpra. The record is episodic—not evidence of continuous residence. This platform separates that research from the proposed museum programme and from claims still requiring verification.
          </p>
          <div className="hero-actions">
            <a href="#deep-time" className="button button-light">
              Start the guided story <span aria-hidden="true">↓</span>
            </a>
            <a href="#page-map" className="text-link text-link-light">
              View the seven-page map <span aria-hidden="true">↓</span>
            </a>
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
        AI-generated illustrative footage · not a photograph, site record or archaeological reconstruction of Bosumpra.
      </p>
    </section>
  );
}
