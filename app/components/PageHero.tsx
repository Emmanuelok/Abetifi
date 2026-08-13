import Link from "next/link";
import Image from "next/image";
import type { VisualAsset } from "../lib/visuals";
import { navigation } from "../lib/content";

export function PageHero({
  route,
  eyebrow,
  title,
  description,
  stat,
  statLabel,
  nextHref,
  nextLabel,
  media,
}: {
  route: (typeof navigation)[number]["href"];
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  stat?: string;
  statLabel?: string;
  nextHref?: string;
  nextLabel?: string;
  media?: VisualAsset;
}) {
  const index = navigation.find((item) => item.href === route)?.index ?? "—";

  return (
    <>
      <section className={`page-hero${media ? " page-hero--media" : ""}`}>
        <div className="page-hero-lines" aria-hidden="true" />
        {media ? (
          <figure className="page-hero-media" data-visual-class="ai-generated">
            <Image src={media.src} alt={media.alt} fill sizes="100vw" priority unoptimized />
            <figcaption>
              <strong>{media.label}</strong>
              <span>{media.caption}</span>
              <small className="visual-boundary">Illustration only · not documentary or project evidence</small>
              {media.credit ? <small>{media.credit}</small> : null}
            </figcaption>
          </figure>
        ) : null}
        <div className="page-shell page-hero-inner">
          <div className="page-hero-index">
            <span>{index}</span>
            <i />
            <small>{eyebrow}</small>
          </div>
          <div className="page-hero-title">
            <h1>{title}</h1>
          </div>
          <div className="page-hero-aside">
            <p>{description}</p>
            {nextHref && nextLabel ? (
              <Link href={nextHref} className="text-link text-link-light">
                {nextLabel} <span aria-hidden="true">↓</span>
              </Link>
            ) : null}
          </div>
          {stat && statLabel ? (
            <div className="page-hero-stat">
              <strong>{stat}</strong>
              <span>{statLabel}</span>
            </div>
          ) : null}
        </div>
      </section>
      <nav className="evidence-boundary-rail" aria-label="Information standards">
        <div className="page-shell">
          <span>How to read this platform</span>
          <Link href="/research#library"><b>A</b><strong>Published evidence</strong><small>Named source, claim and stated limit</small></Link>
          <Link href="/project"><b>B</b><strong>Supplied proposal</strong><small>A project concept—not approval or current status</small></Link>
          <Link href="/research#visual-provenance"><b>C</b><strong>AI-generated media</strong><small>Illustration only—not documentary evidence</small></Link>
          <Link href="/record#development-gates"><b>D</b><strong>Verification required</strong><small>Current authority, approvals and funding need confirmation</small></Link>
        </div>
      </nav>
    </>
  );
}

export function InteriorShell({ children }: { children: React.ReactNode }) {
  return <div className="interior-shell">{children}</div>;
}
