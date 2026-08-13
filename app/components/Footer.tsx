import Link from "next/link";
import { navigation } from "../lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="kicker">Abetifi · Kwahu Plateau · Ghana</span>
          <h2>Bosumpra Rockshelter: research, conservation and development information.</h2>
        </div>
        <Link href="/invest#partner" className="round-link" aria-label="Review proposed partnership pathways">
          <span>Review partnership options</span>
          <b aria-hidden="true">↗</b>
        </Link>
      </div>
      <div className="footer-grid">
        <div className="footer-brand">
          <strong>Abetifi Stone Age</strong>
          <p>Community Development · project name from supplied manuscript; legal status unverified</p>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              <span aria-hidden="true">{item.index}</span>
              <strong>{item.label}</strong>
            </Link>
          ))}
        </nav>
        <div className="footer-note">
          <p>
            This platform distinguishes published Bosumpra research, supplied project documents, external general guidance, proposals and unresolved claims. External sources were checked on 7 August 2026; a link does not imply endorsement, eligibility, approval or partnership.
          </p>
          <Link href="/research#editorial-integrity">Review the editorial integrity statement →</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Project name used in the supplied manuscript: Abetifi Stone Age Community Development Park LBG · legal status unverified</span>
        <span>Research · Conservation · Development</span>
      </div>
    </footer>
  );
}
