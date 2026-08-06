import Link from "next/link";

export function PageHero({
  index,
  eyebrow,
  title,
  description,
  stat,
  statLabel,
  nextHref,
  nextLabel,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  stat?: string;
  statLabel?: string;
  nextHref?: string;
  nextLabel?: string;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-lines" aria-hidden="true" />
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

