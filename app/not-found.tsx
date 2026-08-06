import Link from "next/link";
import { Footer } from "./components/Footer";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="not-found-page">
        <span className="kicker">404 · Off the path</span>
        <h1>This layer has not been uncovered.</h1>
        <p>The page may have moved, but the story of Bosumpra is still here.</p>
        <Link href="/" className="button button-dark">
          Return to the landscape <span aria-hidden="true">→</span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
