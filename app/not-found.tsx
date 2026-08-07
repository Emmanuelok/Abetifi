import Link from "next/link";
import { Footer } from "./components/Footer";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="not-found-page">
        <span className="kicker">404 · Page not found</span>
        <h1>The requested page is unavailable.</h1>
        <p>Use the homepage to review the Bosumpra research, conservation and project information.</p>
        <Link href="/" className="button button-dark">
          Return to the homepage <span aria-hidden="true">→</span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
