"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "../lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Abetifi Stone Age home">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="brand-copy">
            <strong>ABETIFI</strong>
            <small>STONE AGE · KWAHU</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/invest#partner" className="header-cta">
          Partnership information <span aria-hidden="true">↗</span>
        </Link>

        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <p>Bosumpra Rockshelter · Abetifi, Ghana.</p>
      </div>
    </header>
  );
}
