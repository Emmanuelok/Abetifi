import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PlantUseChart } from "../components/PlantUseChart";
import { Reveal } from "../components/Reveal";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Bosumpra Heritage",
  description: "Published chronology, technologies, plant-use evidence and contemporary significance of Bosumpra Rockshelter at Abetifi.",
};

const timeline = [
  ["10,439–9,825 cal BC", "Earliest robust date", "A calibrated AMS determination places human activity at Bosumpra in the mid-11th millennium BC.", "Established"],
  ["9,871–9,282 cal BC", "Early technological change", "Ground-stone and ceramic material occurs in early associated contexts; the early-pottery interpretation remains debated.", "Interpretation"],
  ["7,573–7,447 cal BC", "Oil palm directly dated", "Oil-palm endocarp provides direct evidence for early Holocene fruit use.", "Established"],
  ["5,326–5,216 cal BC", "Incense-tree fruit directly dated", "Canarium schweinfurthii became a major part of the preserved plant-use record.", "Established"],
  ["c. 1,907–1,696 cal BC", "Contacts and crops", "Tiny quantities of cowpea and pearl millet suggest contact, exchange or off-site growing—not proof of farming at the shelter.", "Interpretation"],
  ["Late 1st millennium BC–17th c. AD", "Technologies overlap", "Stone, ceramic and emerging metal technologies changed over centuries rather than through a simple replacement event.", "Established"],
  ["Recent history–present", "A living sacred landscape", "Archaeological evidence of recent shrine and church use joins community memory and contemporary worship.", "Established"],
];

export default function HeritagePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          index="01"
          eyebrow="Bosumpra heritage"
          title={<>Bosumpra<br /><em>archaeological evidence</em></>}
          description="Published research records changes in activity, technology, plant use and site significance across approximately 12,500 years."
          stat="613 m"
          statLabel="Approximate elevation above sea level"
          nextHref="#chronology"
          nextLabel="Review the sequence"
        />

        <section className="section evidence-standard-section">
          <div className="page-shell evidence-standard-grid">
            <Reveal>
              <span className="kicker">Claim-status definitions</span>
              <h2>Claims are classified by evidence status.</h2>
            </Reveal>
            <Reveal className="evidence-status-list" delay={80}>
              <article><span className="status-pill status-established">Established</span><p>Directly supported by the supplied published research.</p></article>
              <article><span className="status-pill status-interpretation">Interpretation</span><p>A reasoned reading advanced by researchers, presented with its limits.</p></article>
              <article><span className="status-pill status-proposed">Proposed</span><p>A future project element, not a present facility or approved outcome.</p></article>
              <article><span className="status-pill status-open">Open question</span><p>A claim or relationship requiring more evidence.</p></article>
            </Reveal>
          </div>
        </section>

        <section className="section chronology-section" id="chronology">
          <div className="page-shell">
            <Reveal className="section-heading split-heading">
              <div><span className="kicker">Selected dated evidence</span><h2>Selected evidence from the archaeological sequence.</h2></div>
              <p>The dates are calibrated ranges from the supplied scholarship. They indicate activity in dated contexts—not uninterrupted residence.</p>
            </Reveal>
            <div className="chronology-list">
              {timeline.map(([date, title, copy, status], index) => (
                <Reveal className="chronology-row" key={date} delay={index * 55}>
                  <span className="chronology-number">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{date}</strong>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                  <span className={`status-pill status-${status.toLowerCase()}`}>{status}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section plant-section">
          <div className="page-shell"><Reveal><PlantUseChart /></Reveal></div>
        </section>

        <section className="section research-history-section">
          <div className="page-shell">
            <Reveal className="section-heading"><span className="kicker kicker-light">History of archaeological investigation</span><h2>Archaeological fieldwork, 1943–2011.</h2></Reveal>
            <div className="research-history-grid">
              {[
                ["1943", "Thurstan Shaw", "Pioneering excavation established a deep sequence of quartz-working, celts, pottery and later iron-related material."],
                ["1973/74", "Andrew B. Smith", "A new trench supplied the first radiocarbon framework and an early account of the plant remains."],
                ["2008–11", "Forest Occupations of Ghana Project", "Twelve units and connecting trenches strengthened the stratigraphy, dating and interpretation."],
                ["2015–17", "Oas, D’Andrea & Watson", "Archaeobotanical analysis and a comprehensive reappraisal placed Bosumpra in wider West African debates."],
              ].map(([year, title, copy], index) => (
                <Reveal className="history-card" key={year} delay={index * 70}>
                  <span>{year}</span><h3>{title}</h3><p>{copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section open-questions-section">
          <div className="page-shell open-questions-grid">
            <Reveal><span className="kicker">Research questions</span><h2>Questions requiring further investigation.</h2></Reveal>
            <div>
              {[
                "Were the earliest associated ceramics as early as the dated contexts suggest?",
                "How seasonal or episodic was shelter use in different periods?",
                "How were non-local greenstone and other materials obtained?",
                "What relationships linked foragers, food producers and later plateau communities?",
                "How should conservation respect archaeological, traditional and current Christian meanings together?",
              ].map((question, index) => <Reveal className="question-row" key={question} delay={index * 55}><span>Q{index + 1}</span><p>{question}</p></Reveal>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
