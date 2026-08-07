"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  deliveryGates,
  evidenceRecords,
  evidenceSources,
  knowledgeCheck,
  learningLevels,
  learningMethods,
  riskScreening,
  stakeholderRoutes,
  visitConfirmations,
  visitProfiles,
} from "../lib/record-data";

type RecordView = "evidence" | "delivery" | "participate" | "visit" | "learn";

const views: { id: RecordView; label: string; note: string }[] = [
  { id: "evidence", label: "Evidence", note: "Search claims and sources" },
  { id: "delivery", label: "Delivery", note: "Review gates and risks" },
  { id: "participate", label: "Participate", note: "Build an action brief" },
  { id: "visit", label: "Visit", note: "Prepare a responsible request" },
  { id: "learn", label: "Learn", note: "Use the evidence lab" },
];

const evidenceDomains = ["All", ...Array.from(new Set(evidenceRecords.map((record) => record.domain)))];
const evidenceStatuses = ["All", ...Array.from(new Set(evidenceRecords.map((record) => record.status)))];
const deliveryGroups = ["All", ...Array.from(new Set(deliveryGates.map((gate) => gate.group)))];

function statusSlug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(href);
}

export function LivingRecord() {
  const [view, setView] = useState<RecordView>("evidence");
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [evidenceStatus, setEvidenceStatus] = useState("All");
  const [gateGroup, setGateGroup] = useState("All");
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [roleId, setRoleId] = useState<(typeof stakeholderRoutes)[number]["id"]>(stakeholderRoutes[0].id);
  const [roleNote, setRoleNote] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy brief");
  const [visitId, setVisitId] = useState<(typeof visitProfiles)[number]["id"]>(visitProfiles[0].id);
  const [visitDate, setVisitDate] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [accessNeeds, setAccessNeeds] = useState("");
  const [confirmed, setConfirmed] = useState<string[]>([]);
  const [levelId, setLevelId] = useState<(typeof learningLevels)[number]["id"]>(learningLevels[0].id);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem("abetifi-living-record-review-v1");
        if (stored) setReviewed(JSON.parse(stored) as string[]);
      } catch {
        // Local progress is optional; the workspace remains fully usable without it.
      }
      setStorageReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("abetifi-living-record-review-v1", JSON.stringify(reviewed));
    } catch {
      // Ignore private-mode or storage-policy failures.
    }
  }, [reviewed, storageReady]);

  const filteredEvidence = useMemo(() => {
    const term = query.trim().toLowerCase();
    return evidenceRecords.filter((record) => {
      const matchesQuery =
        !term ||
        [record.title, record.summary, record.period, record.domain, record.status]
          .join(" ")
          .toLowerCase()
          .includes(term);
      const matchesDomain = domain === "All" || record.domain === domain;
      const matchesStatus = evidenceStatus === "All" || record.status === evidenceStatus;
      return matchesQuery && matchesDomain && matchesStatus;
    });
  }, [domain, evidenceStatus, query]);

  const visibleGates = useMemo(
    () => deliveryGates.filter((gate) => gateGroup === "All" || gate.group === gateGroup),
    [gateGroup],
  );

  const selectedRole = stakeholderRoutes.find((role) => role.id === roleId) ?? stakeholderRoutes[0];
  const selectedVisit = visitProfiles.find((profile) => profile.id === visitId) ?? visitProfiles[0];
  const selectedLevel = learningLevels.find((level) => level.id === levelId) ?? learningLevels[0];
  const reviewPercent = Math.round((reviewed.length / deliveryGates.length) * 100);
  const confirmationPercent = Math.round((confirmed.length / visitConfirmations.length) * 100);

  const roleBrief = useMemo(
    () =>
      [
        "ABETIFI STONE AGE — STAKEHOLDER ACTION BRIEF",
        `Perspective: ${selectedRole.label}`,
        `Intended outcome: ${selectedRole.outcome}`,
        "",
        "Priority actions:",
        ...selectedRole.actions.map((action, index) => `${index + 1}. ${action}`),
        roleNote.trim() ? `\nContext supplied by user: ${roleNote.trim()}` : "",
        "",
        "Required next step: verify the accountable project contact, relevant authority and evidence before treating this brief as submitted or agreed.",
        "Privacy note: this brief was generated on this device and was not transmitted.",
      ]
        .filter(Boolean)
        .join("\n"),
    [roleNote, selectedRole],
  );

  const visitBrief = useMemo(
    () =>
      [
        "ABETIFI STONE AGE — VISIT ENQUIRY PREPARATION",
        `Visit profile: ${selectedVisit.label} — ${selectedVisit.audience}`,
        `Preferred date: ${visitDate || "To be discussed"}`,
        `Group size: ${groupSize || "To be confirmed"}`,
        `Access or support needs: ${accessNeeds.trim() || "None stated"}`,
        `Learning / visit focus: ${selectedVisit.focus.join("; ")}`,
        "",
        "Items already confirmed by the organiser:",
        ...(confirmed.length ? confirmed.map((item) => `- ${item}`) : ["- None yet"]),
        "",
        "This document prepares an enquiry. It does not confirm opening, access, a guide, a booking, fees or site conditions.",
      ].join("\n"),
    [accessNeeds, confirmed, groupSize, selectedVisit, visitDate],
  );

  const copy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus("Copy brief"), 1600);
    } catch {
      setCopyStatus("Use download");
    }
  };

  const toggleReviewed = (id: string) => {
    setReviewed((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleConfirmed = (item: string) => {
    setConfirmed((current) =>
      current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item],
    );
  };

  const submitQuiz = () => {
    const score = knowledgeCheck.reduce(
      (total, item, index) => total + (quizAnswers[index] === item.answer ? 1 : 0),
      0,
    );
    setQuizScore(score);
  };

  return (
    <div className="living-record">
      <div className="record-tabs" role="tablist" aria-label="Living Record workspaces">
        {views.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={view === item.id}
            id={`record-tab-${item.id}`}
            aria-controls={`record-panel-${item.id}`}
            className={view === item.id ? "active" : ""}
            onClick={() => setView(item.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.label}</strong>
            <small>{item.note}</small>
          </button>
        ))}
      </div>

      {view === "evidence" && (
        <section id="record-panel-evidence" role="tabpanel" aria-labelledby="record-tab-evidence" className="record-panel evidence-workspace">
          <div className="workspace-heading">
            <div>
              <span className="kicker">Claim-level evidence register</span>
              <h2>Find the source behind the story.</h2>
            </div>
            <p>
              Every record states what is supported, what remains interpretation and what should not be inferred.
            </p>
          </div>

          <div className="record-filters">
            <label className="record-search">
              <span>Search the record</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try oil palm, pottery, 1943…"
              />
            </label>
            <label>
              <span>Domain</span>
              <select value={domain} onChange={(event) => setDomain(event.target.value)}>
                {evidenceDomains.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span>Evidence status</span>
              <select value={evidenceStatus} onChange={(event) => setEvidenceStatus(event.target.value)}>
                {evidenceStatuses.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <div className="filter-result" aria-live="polite">
              <strong>{filteredEvidence.length}</strong>
              <span>of {evidenceRecords.length} records</span>
            </div>
          </div>

          <div className="evidence-records">
            {filteredEvidence.map((record, index) => (
              <article className="evidence-record" key={record.id}>
                <div className="record-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i>{record.domain}</i>
                  <b className={`record-status status-${statusSlug(record.status)}`}>{record.status}</b>
                </div>
                <p className="record-period">{record.period}</p>
                <h3>{record.title}</h3>
                <p>{record.summary}</p>
                <div className="record-caution">
                  <strong>Do not overclaim</strong>
                  <span>{record.caution}</span>
                </div>
                <div className="record-sources">
                  {record.sources.map((sourceId) => {
                    const source = evidenceSources.find((item) => item.id === sourceId);
                    return source ? (
                      <a key={source.id} href={source.href} target="_blank" rel="noreferrer">
                        {source.author} · {source.year} <span aria-hidden="true">↗</span>
                      </a>
                    ) : null;
                  })}
                </div>
              </article>
            ))}
          </div>
          {!filteredEvidence.length && (
            <div className="record-empty">
              <strong>No record matches those filters.</strong>
              <button type="button" onClick={() => { setQuery(""); setDomain("All"); setEvidenceStatus("All"); }}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      )}

      {view === "delivery" && (
        <section id="record-panel-delivery" role="tabpanel" aria-labelledby="record-tab-delivery" className="record-panel delivery-workspace">
          <div className="workspace-heading">
            <div>
              <span className="kicker">Project-readiness review</span>
              <h2>Evidence before commitment.</h2>
            </div>
            <p>
              The status shown describes the supplied public pack—not the current legal or regulatory position. Formal verification remains essential.
            </p>
          </div>

          <div className="review-progress">
            <div>
              <span>Your review progress</span>
              <strong>{reviewed.length} / {deliveryGates.length} gates read</strong>
            </div>
            <div className="progress-track" aria-label={`${reviewPercent}% of gates reviewed`}>
              <i style={{ "--progress": `${reviewPercent}%` } as CSSProperties} />
            </div>
            <button type="button" onClick={() => setReviewed([])} disabled={!reviewed.length}>
              Reset my review
            </button>
          </div>

          <div className="gate-filter" aria-label="Filter readiness gates">
            {deliveryGroups.map((item) => (
              <button
                type="button"
                key={item}
                className={gateGroup === item ? "active" : ""}
                onClick={() => setGateGroup(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="delivery-gates">
            {visibleGates.map((gate) => (
              <article className={reviewed.includes(gate.id) ? "reviewed" : ""} key={gate.id}>
                <button
                  type="button"
                  className="gate-review"
                  aria-pressed={reviewed.includes(gate.id)}
                  onClick={() => toggleReviewed(gate.id)}
                >
                  <span aria-hidden="true">{reviewed.includes(gate.id) ? "✓" : ""}</span>
                  <small>{reviewed.includes(gate.id) ? "Reviewed by me" : "Mark as read"}</small>
                </button>
                <div className="gate-copy">
                  <div><span>{gate.group}</span><i>{gate.packStatus}</i></div>
                  <h3>{gate.title}</h3>
                  <p>{gate.requirement}</p>
                  <small>Evidence needed · {gate.evidence}</small>
                </div>
              </article>
            ))}
          </div>

          <div className="risk-screen">
            <div className="workspace-heading compact">
              <div><span className="kicker">Pre-diligence risk screen</span><h2>Eight failure modes to design against.</h2></div>
              <p>This is a governance prompt, not a quantified risk assessment.</p>
            </div>
            <div className="risk-table">
              {riskScreening.map((item, index) => (
                <article key={item.area}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.area}</strong>
                  <div><small>Risk</small><p>{item.risk}</p></div>
                  <div><small>Control direction</small><p>{item.response}</p></div>
                  <i>{item.evidence}</i>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {view === "participate" && (
        <section id="record-panel-participate" role="tabpanel" aria-labelledby="record-tab-participate" className="record-panel planner-workspace">
          <div className="workspace-heading">
            <div><span className="kicker">Role-aware participation</span><h2>Turn interest into a useful first brief.</h2></div>
            <p>The tool prepares a document on this device. It does not submit, store or imply project approval.</p>
          </div>
          <div className="planner-grid">
            <div className="planner-controls">
              <label>
                <span>I am participating as</span>
                <select value={roleId} onChange={(event) => setRoleId(event.target.value as typeof roleId)}>
                  {stakeholderRoutes.map((role) => <option key={role.id} value={role.id}>{role.label}</option>)}
                </select>
              </label>
              <div className="planner-outcome">
                <small>Useful outcome</small>
                <strong>{selectedRole.outcome}</strong>
              </div>
              <label>
                <span>Context or contribution I want to add</span>
                <textarea
                  value={roleNote}
                  onChange={(event) => setRoleNote(event.target.value)}
                  placeholder="Optional: organisation, capability, question or local priority…"
                  rows={5}
                />
              </label>
              <p className="privacy-note">Nothing entered here leaves this browser.</p>
            </div>
            <div className="planner-output">
              <span>Generated action brief</span>
              <pre tabIndex={0}>{roleBrief}</pre>
              <div>
                <button type="button" className="button button-light" onClick={() => copy(roleBrief)}>
                  {copyStatus} <span aria-hidden="true">↗</span>
                </button>
                <button type="button" className="button button-ghost" onClick={() => downloadText("abetifi-action-brief.txt", roleBrief)}>
                  Download .txt <span aria-hidden="true">↓</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {view === "visit" && (
        <section id="record-panel-visit" role="tabpanel" aria-labelledby="record-tab-visit" className="record-panel visit-workspace">
          <div className="workspace-heading">
            <div><span className="kicker">Visit-readiness planner</span><h2>Prepare first. Travel only when confirmed.</h2></div>
            <p>Public information does not yet establish current opening, bookings, routes, facilities or guide availability.</p>
          </div>

          <div className="visit-planner-grid">
            <div className="visit-form">
              <label>
                <span>Type of visit</span>
                <select value={visitId} onChange={(event) => setVisitId(event.target.value as typeof visitId)}>
                  {visitProfiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>{profile.label} · {profile.audience}</option>
                  ))}
                </select>
              </label>
              <div className="form-pair">
                <label><span>Preferred date</span><input type="date" value={visitDate} onChange={(event) => setVisitDate(event.target.value)} /></label>
                <label><span>Estimated group size</span><input type="number" min="1" value={groupSize} onChange={(event) => setGroupSize(event.target.value)} placeholder="e.g. 24" /></label>
              </div>
              <label>
                <span>Access, supervision or support needs</span>
                <textarea value={accessNeeds} onChange={(event) => setAccessNeeds(event.target.value)} rows={4} placeholder="Optional planning information…" />
              </label>
              <div className="visit-focus">
                <small>Suggested focus</small>
                {selectedVisit.focus.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>

            <div className="confirmation-list">
              <div>
                <span>Confirmation checklist</span>
                <strong>{confirmationPercent}% prepared</strong>
              </div>
              {visitConfirmations.map((item) => (
                <label key={item}>
                  <input type="checkbox" checked={confirmed.includes(item)} onChange={() => toggleConfirmed(item)} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="visit-brief">
            <div>
              <span>Prepared enquiry</span>
              <pre tabIndex={0}>{visitBrief}</pre>
            </div>
            <div>
              <button type="button" className="button button-dark" onClick={() => copy(visitBrief)}>
                {copyStatus} <span aria-hidden="true">↗</span>
              </button>
              <button type="button" className="button button-outline" onClick={() => downloadText("abetifi-visit-enquiry.txt", visitBrief)}>
                Download .txt <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {view === "learn" && (
        <section id="record-panel-learn" role="tabpanel" aria-labelledby="record-tab-learn" className="record-panel learning-workspace">
          <div className="workspace-heading">
            <div><span className="kicker">Evidence literacy lab</span><h2>Learn how we know—not only what we know.</h2></div>
            <p>Original activities translate archaeological reasoning without reproducing copyrighted paper figures.</p>
          </div>

          <div className="method-grid">
            {learningMethods.map((method, index) => (
              <details key={method.id} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{method.title}</strong></summary>
                <div>
                  <small>{method.question}</small>
                  <p>{method.explanation}</p>
                  <div><b>Try it</b><span>{method.activity}</span></div>
                </div>
              </details>
            ))}
          </div>

          <div className="lesson-builder">
            <div className="lesson-levels">
              <span className="kicker">Learning-path builder</span>
              <h3>Choose the learner level.</h3>
              {learningLevels.map((level) => (
                <button key={level.id} type="button" className={levelId === level.id ? "active" : ""} onClick={() => setLevelId(level.id)}>
                  {level.label}
                </button>
              ))}
            </div>
            <div className="lesson-plan">
              <span>{selectedLevel.label}</span>
              <article><small>Learning objective</small><p>{selectedLevel.objective}</p></article>
              <article><small>Core activity</small><p>{selectedLevel.activity}</p></article>
              <article><small>Assessment prompt</small><p>{selectedLevel.assessment}</p></article>
              <button type="button" className="button button-light" onClick={() => window.print()}>
                Print learning path <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>

          <div className="knowledge-check">
            <div><span className="kicker">Knowledge check</span><h3>Can you keep evidence and inference apart?</h3></div>
            <div className="quiz-list">
              {knowledgeCheck.map((item, index) => (
                <fieldset key={item.question}>
                  <legend><span>Q{index + 1}</span>{item.question}</legend>
                  {item.options.map((option, optionIndex) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name={`knowledge-${index}`}
                        checked={quizAnswers[index] === optionIndex}
                        onChange={() => setQuizAnswers((current) => ({ ...current, [index]: optionIndex }))}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                  {quizScore !== null && <p className={quizAnswers[index] === item.answer ? "correct" : "review"}>{item.explanation}</p>}
                </fieldset>
              ))}
              <div className="quiz-result">
                <button type="button" className="button button-dark" onClick={submitQuiz}>Check my answers <span aria-hidden="true">→</span></button>
                {quizScore !== null && <strong aria-live="polite">{quizScore} / {knowledgeCheck.length} correct</strong>}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
