import Link from "next/link";
import { navigation } from "../lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="kicker">Abetifi · Kwahu Plateau · Ghana</span>
          <h2>A past this deep deserves a future built with care.</h2>
        </div>
        <Link href="/invest#partner" className="round-link" aria-label="Become a project partner">
          <span>Become a partner</span>
          <b aria-hidden="true">↗</b>
        </Link>
      </div>
      <div className="footer-grid">
        <div className="footer-brand">
          <strong>Abetifi Stone Age</strong>
          <p>Community Development Park LBG</p>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-note">
          <p>
            This platform distinguishes published archaeological evidence from project proposals and concept visualisations.
          </p>
          <Link href="/research">Read the evidence standard →</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Abetifi Stone Age Community Development Park LBG</span>
        <span>Heritage · Learning · Livelihoods</span>
      </div>
    </footer>
  );
}

