"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useState } from "react";
import { navigation } from "../lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const currentIndex = navigation.findIndex((item) => item.href === pathname);
  const journeyTarget = currentIndex < 0
    ? navigation[0]
    : currentIndex < navigation.length - 1
      ? navigation[currentIndex + 1]
      : { index: null, href: "/", label: "Overview", description: "Return to the landing-page journey" };
  const journeyPrefix = currentIndex < 0 ? "Start" : currentIndex < navigation.length - 1 ? "Next" : "Return";
  const journeyStep = journeyTarget.index ? `${journeyPrefix} · ${journeyTarget.index}` : journeyPrefix;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""}`}
      style={{ "--scroll-progress": `${progress}%` } as CSSProperties}
    >
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
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <span aria-hidden="true">{item.index}</span>
              <strong>{item.label}</strong>
            </Link>
          ))}
        </nav>

        <Link href={journeyTarget.href} className="header-cta" aria-label={`${journeyPrefix}: ${journeyTarget.label}`}>
          <small>{journeyStep}</small>
          <strong>{journeyTarget.label}</strong>
          <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <small>{open ? "Close" : "Menu"}</small>
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">{item.index}</span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <p>Follow the numbered path from published heritage evidence to the proposed programme, readiness checks and ways to participate.</p>
          <Link href={journeyTarget.href} onClick={() => setOpen(false)}>
            {journeyStep} {journeyTarget.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <span className="header-progress" aria-hidden="true" />
    </header>
  );
}
