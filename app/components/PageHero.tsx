import Link from "next/link";
import Image from "next/image";
import type { VisualAsset } from "../lib/visuals";

export function PageHero({
  index,
  eyebrow,
  title,
  description,
  stat,
  statLabel,
  nextHref,
  nextLabel,
  media,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  stat?: string;
  statLabel?: string;
  nextHref?: string;
  nextLabel?: string;
  media?: VisualAsset;
}) {
  return (
    <section className={`page-hero${media ? " page-hero--media" : ""}`}>
      <div className="page-hero-lines" aria-hidden="true" />
      {media ? (
        <figure className="page-hero-media">
          <Image src={media.src} alt={media.alt} fill sizes="100vw" priority unoptimized />
          <figcaption>
            <strong>{media.label}</strong>
            <span>{media.caption}</span>
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
  );
}

export function InteriorShell({ children }: { children: React.ReactNode }) {
  return <div className="interior-shell">{children}</div>;
}
