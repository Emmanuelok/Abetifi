"use client";

import { useEffect, useMemo, useState } from "react";
import { boqSummary, formatGhs } from "../lib/content";
import {
  decisionRegister,
  decisionRights,
  deliveryGates,
  developmentGateSourceBoundary,
  documentRegister,
  evidenceRecords,
  evidenceSources,
  programmeSequence,
  riskScreening,
  stakeholderRoutes,
  visitConfirmations,
} from "../lib/record-data";

type OfficeView = "overview" | "programme" | "finance" | "governance" | "evidence" | "resources";
type CapitalInputs = {
  exhibition: number;
  externalWorks: number;
  fees: number;
  contingency: number;
  escalation: number;
  taxes: number;
  preOpening: number;
};
type OperatingInputs = {
  annualVisitors: number;
  admission: number;
  otherEarned: number;
  grants: number;
  staffing: number;
  conservation: number;
  facilities: number;
  programmes: number;
  securityAdmin: number;
};
type SavedScenario = {
  id: string;
  name: string;
  savedAt: string;
  capital: CapitalInputs;
  operating: OperatingInputs;
  totalCapital: number;
  annualGap: number;
};

const officeViews: Array<{ id: OfficeView; label: string; description: string }> = [
  { id: "overview", label: "Overview", description: "Supplied evidence and proposed framework" },
  { id: "programme", label: "Programme", description: "Dependencies, gates, risks and decisions" },
  { id: "finance", label: "Financial planning", description: "Capital and operating scenarios" },
  { id: "governance", label: "Governance", description: "Proposed record and decision requirements" },
  { id: "evidence", label: "Evidence", description: "Claim-to-source register" },
  { id: "resources", label: "Decision packs", description: "Exportable review materials" },
];

const capitalDefaults: CapitalInputs = {
  exhibition: 0,
  externalWorks: 0,
  fees: 0,
  contingency: 0,
  escalation: 0,
  taxes: 0,
  preOpening: 0,
};

const operatingDefaults: OperatingInputs = {
  annualVisitors: 0,
  admission: 0,
  otherEarned: 0,
  grants: 0,
  staffing: 0,
  conservation: 0,
  facilities: 0,
  programmes: 0,
  securityAdmin: 0,
};

const baseCapital = boqSummary.reduce((sum, item) => sum + item.value, 0);
const storageKey = "abetifi-project-office-scenarios-v1";

function csvCell(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function downloadFile(filename: string, content: string, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function statusClass(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function OfficeHeader({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description: string; actions?: React.ReactNode }) {
  return (
    <div className="office-section-header">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {actions ? <div className="office-header-actions">{actions}</div> : null}
    </div>
  );
}

function Metric({ value, label, note }: { value: string | number; label: string; note: string }) {
  return (
    <article className="office-metric">
      <strong>{value}</strong>
      <span>{label}</span>
      <p>{note}</p>
    </article>
  );
}

function NumberField({ label, value, onChange, suffix, help, currency = true }: { label: string; value: number; onChange: (value: number) => void; suffix?: string; help?: string; currency?: boolean }) {
  return (
    <label className="office-number-field">
      <span>{label}</span>
      <div>
        {suffix !== "%" && currency ? <b>GHS</b> : null}
        <input min="0" step={suffix === "%" ? "0.5" : currency ? "1000" : "1"} type="number" value={value} onChange={(event) => onChange(toNumber(event.target.value))} />
        {suffix === "%" ? <b>%</b> : null}
      </div>
      {help ? <small>{help}</small> : null}
    </label>
  );
}

export function ProjectOffice() {
  const [view, setView] = useState<OfficeView>("overview");
  const [gateGroup, setGateGroup] = useState("All");
  const [selectedGateId, setSelectedGateId] = useState(deliveryGates[0].id);
  const [documentQuery, setDocumentQuery] = useState("");
  const [documentStatus, setDocumentStatus] = useState("All");
  const [evidenceQuery, setEvidenceQuery] = useState("");
  const [evidenceDomain, setEvidenceDomain] = useState("All");
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(evidenceRecords[0].id);
  const [capital, setCapital] = useState<CapitalInputs>(capitalDefaults);
  const [operating, setOperating] = useState<OperatingInputs>(operatingDefaults);
  const [scenarioName, setScenarioName] = useState("Working scenario");
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [scenariosHydrated, setScenariosHydrated] = useState(false);
  const [roleId, setRoleId] = useState(stakeholderRoutes[0].id);
  const [briefContext, setBriefContext] = useState("");
  const [resourceSections, setResourceSections] = useState(["Programme requirements", "Evidence standard", "Required documents"]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        const parsed: unknown = saved ? JSON.parse(saved) : [];
        setSavedScenarios(Array.isArray(parsed) ? parsed.slice(0, 3) as SavedScenario[] : []);
      } catch {
        setSavedScenarios([]);
      }
      setScenariosHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!scenariosHydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(savedScenarios));
    } catch {
      // Scenario persistence is optional and remains device-local.
    }
  }, [savedScenarios, scenariosHydrated]);

  const visibleGates = useMemo(
    () => deliveryGates.filter((gate) => gateGroup === "All" || gate.group === gateGroup),
    [gateGroup],
  );
  const selectedGate = visibleGates.find((gate) => gate.id === selectedGateId) ?? visibleGates[0] ?? deliveryGates[0];

  const visibleDocuments = useMemo(() => {
    const query = documentQuery.trim().toLowerCase();
    return documentRegister.filter((record) => {
      const text = [record.id, record.category, record.title, record.ownerRole, record.purpose].join(" ").toLowerCase();
      return (!query || text.includes(query)) && (documentStatus === "All" || record.status === documentStatus);
    });
  }, [documentQuery, documentStatus]);

  const visibleEvidence = useMemo(() => {
    const query = evidenceQuery.trim().toLowerCase();
    return evidenceRecords.filter((record) => {
      const text = [record.period, record.title, record.summary, record.status, record.domain].join(" ").toLowerCase();
      return (!query || text.includes(query)) && (evidenceDomain === "All" || record.domain === evidenceDomain);
    });
  }, [evidenceDomain, evidenceQuery]);
  const selectedEvidence = visibleEvidence.find((record) => record.id === selectedEvidenceId) ?? visibleEvidence[0] ?? evidenceRecords[0];

  const capitalResults = useMemo(() => {
    const coordinatedScope = baseCapital + capital.exhibition + capital.externalWorks;
    const fees = coordinatedScope * (capital.fees / 100);
    const contingency = (coordinatedScope + fees) * (capital.contingency / 100);
    const escalation = (coordinatedScope + fees + contingency) * (capital.escalation / 100);
    const beforeTax = coordinatedScope + fees + contingency + escalation + capital.preOpening;
    const taxes = capital.taxes;
    return { coordinatedScope, fees, contingency, escalation, taxes, total: beforeTax + taxes };
  }, [capital]);

  const operatingResults = useMemo(() => {
    const earnedIncome = operating.annualVisitors * operating.admission + operating.otherEarned;
    const totalResources = earnedIncome + operating.grants;
    const totalCost = operating.staffing + operating.conservation + operating.facilities + operating.programmes + operating.securityAdmin;
    const annualGap = Math.max(0, totalCost - totalResources);
    return {
      earnedIncome,
      totalResources,
      totalCost,
      annualGap,
      coverage: totalCost ? (totalResources / totalCost) * 100 : 0,
      costPerVisitor: operating.annualVisitors ? totalCost / operating.annualVisitors : 0,
    };
  }, [operating]);

  const selectedRole = stakeholderRoutes.find((role) => role.id === roleId) ?? stakeholderRoutes[0];
  const roleBrief = useMemo(() => {
    const lines = [
      "ABETIFI STONE AGE COMMUNITY DEVELOPMENT — PROJECT NAME USED IN SUPPLIED MANUSCRIPT",
      "STAKEHOLDER SCOPING NOTE",
      "",
      `Stakeholder category: ${selectedRole.label}`,
      `Proposed purpose: ${selectedRole.outcome}`,
      briefContext.trim() ? `Context supplied by preparer: ${briefContext.trim()}` : "Context supplied by preparer: None",
      "",
    ];
    if (resourceSections.includes("Programme requirements")) {
      lines.push("PROGRAMME REQUIREMENTS", ...selectedRole.actions.map((action, index) => `${index + 1}. ${action}`), "");
    }
    if (resourceSections.includes("Evidence standard")) {
      lines.push("EVIDENCE STANDARD", "Claims must identify their source, evidence status, limitation and responsible reviewer.", "Unverified permissions, services, funding and institutional positions must not be presented as confirmed.", "");
    }
    if (resourceSections.includes("Required documents")) {
      const related = documentRegister.slice(0, 8);
      lines.push("PRIORITY DOCUMENTS", ...related.map((record) => `- ${record.id}: ${record.title} — ${record.status}`), "");
    }
    if (resourceSections.includes("Visit controls")) {
      lines.push("VISITOR CONFIRMATIONS", ...visitConfirmations.map((item) => `- ${item}`), "");
    }
    lines.push("STATUS", "This note was prepared locally and has not been submitted, endorsed or approved.");
    return lines.join("\n");
  }, [briefContext, resourceSections, selectedRole]);

  function changeCapital<K extends keyof CapitalInputs>(key: K, value: CapitalInputs[K]) {
    setCapital((current) => ({ ...current, [key]: value }));
  }

  function changeOperating<K extends keyof OperatingInputs>(key: K, value: OperatingInputs[K]) {
    setOperating((current) => ({ ...current, [key]: value }));
  }

  function saveScenario() {
    if (savedScenarios.length >= 3) {
      setNotice("Remove an existing scenario before saving another.");
      return;
    }
    const next: SavedScenario = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      name: scenarioName.trim() || `Scenario ${savedScenarios.length + 1}`,
      savedAt: new Date().toISOString(),
      capital,
      operating,
      totalCapital: capitalResults.total,
      annualGap: operatingResults.annualGap,
    };
    setSavedScenarios((current) => [...current, next]);
    setNotice(`${next.name} saved on this device.`);
  }

  function loadScenario(scenario: SavedScenario) {
    setCapital(scenario.capital);
    setOperating(scenario.operating);
    setScenarioName(scenario.name);
    setNotice(`${scenario.name} loaded.`);
  }

  function exportProgramme() {
    const rows = [
      ["NOTICE", "", "", "", "", "", "", developmentGateSourceBoundary],
      ["Gate code", "Stable ID", "Group", "Question", "Evidence required", "Current public-pack position", "Linked record IDs", "Source boundary"],
      ...deliveryGates.map((gate) => [
        gate.code,
        gate.id,
        gate.group,
        gate.requirement,
        gate.evidence,
        gate.packStatus,
        documentRegister.filter((record) => record.linkedGate === gate.id).map((record) => record.id).join("; "),
        developmentGateSourceBoundary,
      ]),
    ];
    downloadFile("abetifi-programme-gates.csv", rows.map((row) => row.map(csvCell).join(",")).join("\n"), "text/csv;charset=utf-8");
  }

  function exportDocuments() {
    const rows = [
      ["NOTICE", "Website-authored record definitions and proposed roles; not evidence of appointments, adopted governance, approvals or document existence.", "", "", "", "", ""],
      ["Record ID", "Workstream", "Proposed document", "Purpose", "Proposed accountable role", "Linked gate", "Evidence status"],
      ...documentRegister.map((record) => [record.id, record.category, record.title, record.purpose, record.ownerRole, record.linkedGate, record.status]),
    ];
    downloadFile("abetifi-proposed-record-requirements.csv", rows.map((row) => row.map(csvCell).join(",")).join("\n"), "text/csv;charset=utf-8");
  }

  function exportEvidence() {
    const rows = [
      ["Claim ID", "Period", "Domain", "Status", "Claim", "Summary", "Limitation", "Source IDs"],
      ...evidenceRecords.map((record) => [record.id, record.period, record.domain, record.status, record.title, record.summary, record.caution, record.sources.join("; ")]),
    ];
    downloadFile("bosumpra-evidence-register.csv", rows.map((row) => row.map(csvCell).join(",")).join("\n"), "text/csv;charset=utf-8");
  }

  function exportBibliography() {
    const ris = evidenceSources.map((source) => [
      "TY  - GEN",
      `AU  - ${source.author}`,
      ...(/^\d{4}$/.test(source.year) ? [`PY  - ${source.year}`] : []),
      `TI  - ${source.title}`,
      `UR  - ${source.href}`,
      `N1  - ${source.scope} ${source.checked}`,
      "ER  - ",
    ].join("\n")).join("\n\n");
    downloadFile("bosumpra-bibliography.ris", ris, "application/x-research-info-systems;charset=utf-8");
  }

  function exportScenarioMemo() {
    const memo = [
      "ABETIFI PROJECT FINANCIAL PLANNING NOTE",
      `Scenario: ${scenarioName || "Working scenario"}`,
      `Prepared: ${new Date().toLocaleDateString("en-GB")}`,
      "",
      `Documented preliminary BOQ base: ${formatGhs(baseCapital)}`,
      `Exhibition allowance: ${formatGhs(capital.exhibition)}`,
      `External works allowance: ${formatGhs(capital.externalWorks)}`,
      `Professional fees: ${capital.fees}% (${formatGhs(capitalResults.fees)})`,
      `Contingency: ${capital.contingency}% (${formatGhs(capitalResults.contingency)})`,
      `Escalation: ${capital.escalation}% (${formatGhs(capitalResults.escalation)})`,
      `Taxes and statutory charges allowance: ${formatGhs(capitalResults.taxes)}`,
      `Pre-opening allowance: ${formatGhs(capital.preOpening)}`,
      `Illustrative scenario total: ${formatGhs(capitalResults.total)}`,
      "Calculation basis: fees are applied to coordinated scope; contingency to scope plus fees; escalation to scope plus fees and contingency; taxes are a fixed user-entered allowance.",
      "",
      `Annual visitors: ${operating.annualVisitors.toLocaleString("en-GB")}`,
      `Annual operating resources: ${formatGhs(operatingResults.totalResources)}`,
      `Annual operating cost: ${formatGhs(operatingResults.totalCost)}`,
      `Illustrative operating shortfall under entered assumptions: ${formatGhs(operatingResults.annualGap)}`,
      "",
      "STATUS AND LIMITATION",
      "This user-defined calculation is for option appraisal. It is not a forecast, approved budget, funding commitment, valuation or investment recommendation. All inputs require independent validation.",
    ].join("\n");
    downloadFile("abetifi-financial-planning-note.txt", memo);
  }

  function toggleResourceSection(section: string) {
    setResourceSections((current) => current.includes(section) ? current.filter((item) => item !== section) : [...current, section]);
  }

  return (
    <div className="project-office">
      <aside className="office-navigation" aria-label="Readiness Workspace views">
        <div>
          <span>Readiness Workspace</span>
          <strong>Proposed editorial review framework</strong>
          <small>Information and external-source check: 7 August 2026</small>
        </div>
        <nav aria-label="Workspace views">
          {officeViews.map((item, index) => (
            <button key={item.id} type="button" className={view === item.id ? "active" : ""} aria-label={`Workspace view ${String(index + 1).padStart(2, "0")}: ${item.label}`} aria-current={view === item.id ? "page" : undefined} onClick={() => setView(item.id)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </button>
          ))}
        </nav>
        <p>Formal permissions, approvals, appointments and funding remain subject to written confirmation by the responsible authorities and organisations.</p>
      </aside>

      <div className="office-content">
        {view === "overview" ? (
          <section className="office-panel" aria-labelledby="office-overview-title">
            <OfficeHeader eyebrow="Editorial planning position" title="Project information and proposed readiness controls" description="A website-authored framework connecting supplied evidence with decisions and records that would be needed before implementation." />
            <div className="office-alert" role="note">
              <strong>Framework boundary</strong>
              <p>The gates, record IDs, decision sequence, roles, risk screen and indicators were created for this website. They are not adopted project governance, official approvals, appointments or evidence that the named documents exist.</p>
            </div>
            <div className="office-metrics">
              <Metric value={evidenceRecords.length} label="Evidence claims" note="Each claim identifies its status, sources and limitation." />
              <Metric value={deliveryGates.length} label="Proposed review gates" note="Platform-defined requirements across six workstreams." />
              <Metric value={documentRegister.length} label="Proposed record requirements" note="Framework-defined document types; no existing documents are implied." />
              <Metric value="Not evidenced" label="Approvals in supplied material" note="No approval records were supplied; this does not assert whether records exist elsewhere." />
            </div>
            <div className="office-two-column">
              <div className="office-block">
                <div className="office-block-heading"><span>Dependency sequence</span><small>Each workstream depends on documented outputs from earlier decisions.</small></div>
                <ol className="programme-sequence">
                  {programmeSequence.map((stage) => (
                    <li key={stage.id}>
                      <b>{stage.id}</b>
                      <div><strong>{stage.workstream}</strong><span>{stage.decision}</span><small>Required output: {stage.output}</small></div>
                      <i>{stage.dependsOn === "None" ? "Starting stage" : `Depends on ${stage.dependsOn}`}</i>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="office-block">
                <div className="office-block-heading"><span>Priority decision queue</span><small>The first decisions establish authority and the conservation boundary.</small></div>
                <div className="decision-queue">
                  {decisionRegister.slice(0, 5).map((item) => (
                    <article key={item.id}>
                      <span>{item.id}</span>
                      <strong>{item.decision}</strong>
                      <p>{item.prerequisites}</p>
                      <small>{item.ownerRole}</small>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="office-next-actions">
              <strong>Recommended next documentation sequence</strong>
              <ol>
                <li>Confirm the accountable entity, decision authorities and cultural governance arrangements.</li>
                <li>Obtain independent land, boundary and heritage-status records.</li>
                <li>Issue a coordinated design brief before independent cost and operating review.</li>
              </ol>
            </div>
          </section>
        ) : null}

        {view === "programme" ? (
          <section className="office-panel" aria-labelledby="office-programme-title">
            <OfficeHeader eyebrow="Proposed programme controls" title="Review-gate and decision-requirement register" description="This website-authored register links each requirement to evidence needed for review. Its status labels are not approval statuses." actions={<button type="button" className="office-action" onClick={exportProgramme}>Export proposed gate register</button>} />
            <div className="office-filter-row">
              <span>Workstream</span>
              {["All", "Authority", "Conservation", "Design", "Economics", "Delivery", "Impact"].map((group) => (
                <button key={group} type="button" className={gateGroup === group ? "active" : ""} onClick={() => setGateGroup(group)}>{group}</button>
              ))}
            </div>
            <div className="programme-register">
              <div className="programme-table" role="list" aria-label="Proposed review gates">
                {visibleGates.map((gate) => (
                  <button key={gate.id} type="button" role="listitem" className={selectedGate.id === gate.id ? "selected" : ""} onClick={() => setSelectedGateId(gate.id)}>
                    <span>{gate.group}</span>
                    <strong>{gate.title}</strong>
                    <small>{gate.packStatus}</small>
                  </button>
                ))}
              </div>
              <article className="programme-detail" aria-live="polite">
                <div><span>{selectedGate.group}</span><b className={`office-status ${statusClass(selectedGate.packStatus)}`}>{selectedGate.packStatus}</b></div>
                <h3>{selectedGate.title}</h3>
                <dl>
                  <div><dt>Required position</dt><dd>{selectedGate.requirement}</dd></div>
                  <div><dt>Review evidence</dt><dd>{selectedGate.evidence}</dd></div>
                  <div><dt>Linked proposed record requirements</dt><dd>{documentRegister.filter((record) => record.linkedGate === selectedGate.id).map((record) => `${record.id} · ${record.title}`).join("; ") || "Record definition pending"}</dd></div>
                </dl>
              </article>
            </div>
            <div className="office-block programme-decisions">
              <div className="office-block-heading"><span>Decision register</span><small>Decision owners are proposed roles and require formal appointment.</small></div>
              <div className="office-table-wrap">
                <table className="office-table">
                  <thead><tr><th>Ref.</th><th>Decision</th><th>Responsible authority</th><th>Prerequisites</th><th>Record</th></tr></thead>
                  <tbody>{decisionRegister.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.decision}</td><td>{item.ownerRole}</td><td>{item.prerequisites}</td><td>{item.requiredRecord}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
            <div className="office-block risk-register-block">
              <div className="office-block-heading"><span>Preliminary risk and control register</span><small>This is a qualitative screen, not a quantified risk assessment.</small></div>
              <div className="office-table-wrap">
                <table className="office-table">
                  <thead><tr><th>Area</th><th>Risk statement</th><th>Control requirement</th><th>Required evidence</th></tr></thead>
                  <tbody>{riskScreening.map((item) => <tr key={item.area}><td>{item.area}</td><td>{item.risk}</td><td>{item.response}</td><td>{item.evidence}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </section>
        ) : null}

        {view === "finance" ? (
          <section className="office-panel" aria-labelledby="office-finance-title">
            <OfficeHeader eyebrow="Option appraisal" title="Capital and operating scenario model" description="Apply explicit allowances to the documented preliminary BOQ and test annual operating assumptions. All values remain user-defined until independently validated." actions={<button type="button" className="office-action" onClick={exportScenarioMemo}>Download planning note</button>} />
            <div className="finance-boundary"><strong>Planning calculation only</strong><span>This model is not a forecast, approved budget, funding commitment, valuation or investment recommendation.</span></div>
            <div className="finance-layout">
              <div className="finance-inputs">
                <div className="finance-card">
                  <div className="finance-card-heading"><span>Capital inputs</span><strong>{formatGhs(baseCapital)}</strong><small>Documented preliminary BOQ base</small></div>
                  <div className="finance-field-grid">
                    <NumberField label="Exhibition and interpretation allowance" value={capital.exhibition} onChange={(value) => changeCapital("exhibition", value)} help="Not included in the documented base unless confirmed by the cost adviser." />
                    <NumberField label="External works and site infrastructure" value={capital.externalWorks} onChange={(value) => changeCapital("externalWorks", value)} />
                    <NumberField label="Professional fees" value={capital.fees} onChange={(value) => changeCapital("fees", value)} suffix="%" />
                    <NumberField label="Design and construction contingency" value={capital.contingency} onChange={(value) => changeCapital("contingency", value)} suffix="%" />
                    <NumberField label="Escalation allowance" value={capital.escalation} onChange={(value) => changeCapital("escalation", value)} suffix="%" />
                    <NumberField label="Taxes and statutory charges allowance" value={capital.taxes} onChange={(value) => changeCapital("taxes", value)} />
                    <NumberField label="Pre-opening and mobilisation" value={capital.preOpening} onChange={(value) => changeCapital("preOpening", value)} />
                  </div>
                </div>
                <div className="finance-card">
                  <div className="finance-card-heading"><span>Annual operating inputs</span><strong>{formatGhs(operatingResults.totalCost)}</strong><small>Calculated annual operating cost</small></div>
                  <div className="finance-field-grid">
                    <NumberField label="Annual visitors" value={operating.annualVisitors} onChange={(value) => changeOperating("annualVisitors", value)} help="Enter a tested scenario, not a target presented as fact." currency={false} />
                    <NumberField label="Average admission income per visitor" value={operating.admission} onChange={(value) => changeOperating("admission", value)} />
                    <NumberField label="Other annual earned income" value={operating.otherEarned} onChange={(value) => changeOperating("otherEarned", value)} />
                    <NumberField label="Annual grants and operating support" value={operating.grants} onChange={(value) => changeOperating("grants", value)} />
                    <NumberField label="Staffing and training" value={operating.staffing} onChange={(value) => changeOperating("staffing", value)} />
                    <NumberField label="Conservation and collections" value={operating.conservation} onChange={(value) => changeOperating("conservation", value)} />
                    <NumberField label="Facilities, utilities and maintenance" value={operating.facilities} onChange={(value) => changeOperating("facilities", value)} />
                    <NumberField label="Learning, exhibitions and marketing" value={operating.programmes} onChange={(value) => changeOperating("programmes", value)} />
                    <NumberField label="Security, insurance and administration" value={operating.securityAdmin} onChange={(value) => changeOperating("securityAdmin", value)} />
                  </div>
                </div>
              </div>
              <aside className="finance-results">
                <span>User-defined calculation</span>
                <strong>{formatGhs(capitalResults.total)}</strong>
                <small>Illustrative scenario total · not a professional estimate</small>
                <dl>
                  <div><dt>Coordinated scope before allowances</dt><dd>{formatGhs(capitalResults.coordinatedScope)}</dd></div>
                  <div><dt>Professional fees</dt><dd>{formatGhs(capitalResults.fees)}</dd></div>
                  <div><dt>Contingency</dt><dd>{formatGhs(capitalResults.contingency)}</dd></div>
                  <div><dt>Escalation</dt><dd>{formatGhs(capitalResults.escalation)}</dd></div>
                  <div><dt>Taxes and charges</dt><dd>{formatGhs(capitalResults.taxes)}</dd></div>
                </dl>
                <div className="operating-summary">
                  <div><span>Annual earned income</span><strong>{formatGhs(operatingResults.earnedIncome)}</strong></div>
                  <div><span>Annual operating resources</span><strong>{formatGhs(operatingResults.totalResources)}</strong></div>
                  <div><span>Annual operating cost</span><strong>{formatGhs(operatingResults.totalCost)}</strong></div>
                  <div><span>Illustrative operating shortfall</span><strong>{formatGhs(operatingResults.annualGap)}</strong></div>
                  <div><span>Operating cost coverage</span><strong>{operatingResults.coverage.toFixed(1)}%</strong></div>
                  <div><span>Operating cost per visitor</span><strong>{operating.annualVisitors ? formatGhs(operatingResults.costPerVisitor) : "Enter visitors"}</strong></div>
                </div>
                <div className="scenario-save">
                  <label><span>Scenario name</span><input value={scenarioName} onChange={(event) => setScenarioName(event.target.value)} /></label>
                  <button type="button" onClick={saveScenario}>Save scenario ({savedScenarios.length}/3)</button>
                  {notice ? <p aria-live="polite">{notice}</p> : null}
                </div>
              </aside>
            </div>
            <div className="scenario-comparison">
              <div className="office-block-heading"><span>Saved scenario comparison</span><small>Saved scenarios remain on this device.</small></div>
              {savedScenarios.length ? (
                <div className="office-table-wrap"><table className="office-table"><thead><tr><th>Scenario</th><th>Capital</th><th>Annual operating gap</th><th>Visitors</th><th>Actions</th></tr></thead><tbody>{savedScenarios.map((scenario) => <tr key={scenario.id}><td><strong>{scenario.name}</strong><small>{new Date(scenario.savedAt).toLocaleDateString("en-GB")}</small></td><td>{formatGhs(scenario.totalCapital)}</td><td>{formatGhs(scenario.annualGap)}</td><td>{scenario.operating.annualVisitors.toLocaleString("en-GB")}</td><td><button type="button" onClick={() => loadScenario(scenario)}>Load</button><button type="button" onClick={() => setSavedScenarios((current) => current.filter((item) => item.id !== scenario.id))}>Remove</button></td></tr>)}</tbody></table></div>
              ) : <p className="office-empty">No scenarios have been saved. Complete the inputs and save up to three comparable cases.</p>}
            </div>
          </section>
        ) : null}

        {view === "governance" ? (
          <section className="office-panel" aria-labelledby="office-governance-title">
            <OfficeHeader eyebrow="Proposed institutional controls" title="Record-requirement and decision-rights template" description="This website-authored template identifies proposed records, accountable functions and review dependencies. It does not evidence appointments or adopted governance." actions={<button type="button" className="office-action" onClick={exportDocuments}>Export record requirements</button>} />
            <div className="office-filter-fields">
              <label><span>Search proposed record requirements</span><input type="search" value={documentQuery} onChange={(event) => setDocumentQuery(event.target.value)} placeholder="Search title, role or reference" /></label>
              <label><span>Evidence status</span><select value={documentStatus} onChange={(event) => setDocumentStatus(event.target.value)}><option>All</option><option>Supplied source reference available</option><option>Not evidenced in supplied material</option><option>Independent confirmation required</option></select></label>
              <div><strong>{visibleDocuments.length}</strong><span>of {documentRegister.length} records</span></div>
            </div>
            <div className="office-table-wrap"><table className="office-table document-table"><thead><tr><th>Ref.</th><th>Proposed record</th><th>Purpose</th><th>Proposed accountable role</th><th>Evidence status</th></tr></thead><tbody>{visibleDocuments.map((record) => <tr key={record.id}><td>{record.id}</td><td><strong>{record.title}</strong><small>{record.category} · proposed gate {record.linkedGate}</small></td><td>{record.purpose}</td><td>{record.ownerRole}</td><td><span className={`office-status ${statusClass(record.status)}`}>{record.status}</span></td></tr>)}</tbody></table></div>
            <div className="office-block decision-rights-block">
              <div className="office-block-heading"><span>Proposed decision-rights matrix</span><small>Roles are indicative and require adoption through valid governance instruments.</small></div>
              <div className="office-table-wrap"><table className="office-table"><thead><tr><th>Matter</th><th>Recommends</th><th>Consulted parties</th><th>Approval authority</th><th>Required record</th></tr></thead><tbody>{decisionRights.map((item) => <tr key={item.matter}><td>{item.matter}</td><td>{item.recommends}</td><td>{item.consults}</td><td>{item.approves}</td><td>{item.evidence}</td></tr>)}</tbody></table></div>
            </div>
          </section>
        ) : null}

        {view === "evidence" ? (
          <section className="office-panel" aria-labelledby="office-evidence-title">
            <OfficeHeader eyebrow="Research controls" title="Evidence and source relationship register" description="Select a claim to review its evidence status, source relationships and interpretation limit." actions={<><button type="button" className="office-action" onClick={exportEvidence}>Export claims</button><button type="button" className="office-action secondary" onClick={exportBibliography}>Export RIS</button></>} />
            <div className="office-filter-fields evidence-filter-fields">
              <label><span>Search claims</span><input type="search" value={evidenceQuery} onChange={(event) => setEvidenceQuery(event.target.value)} placeholder="Search period, subject or status" /></label>
              <label><span>Domain</span><select value={evidenceDomain} onChange={(event) => setEvidenceDomain(event.target.value)}><option>All</option>{Array.from(new Set(evidenceRecords.map((record) => record.domain))).map((domain) => <option key={domain}>{domain}</option>)}</select></label>
              <div><strong>{visibleEvidence.length}</strong><span>of {evidenceRecords.length} claims</span></div>
            </div>
            <div className="evidence-relationship">
              <div className="evidence-list" role="list" aria-label="Evidence claims">
                {visibleEvidence.map((record) => <button key={record.id} type="button" role="listitem" className={selectedEvidence.id === record.id ? "selected" : ""} onClick={() => setSelectedEvidenceId(record.id)}><span>{record.period}</span><strong>{record.title}</strong><small>{record.domain} · {record.status}</small></button>)}
              </div>
              <article className="evidence-detail" aria-live="polite">
                <div><span>{selectedEvidence.domain}</span><b className={`office-status ${statusClass(selectedEvidence.status)}`}>{selectedEvidence.status}</b></div>
                <small>{selectedEvidence.period}</small>
                <h3>{selectedEvidence.title}</h3>
                <p>{selectedEvidence.summary}</p>
                <div className="evidence-limitation"><strong>Interpretation limit</strong><p>{selectedEvidence.caution}</p></div>
                <div className="source-links"><span>Linked sources</span>{selectedEvidence.sources.map((sourceId) => { const source = evidenceSources.find((item) => item.id === sourceId); return source ? <a key={source.id} href={source.href} target="_blank" rel="noopener noreferrer"><strong>{source.author} · {source.year}</strong><small>{source.title}</small><small>{source.scope}</small><i aria-hidden="true">↗</i></a> : null; })}</div>
              </article>
            </div>
            <div className="evidence-standard"><div><strong>Claim status</strong><p>States whether the record is directly supported, interpretive, documented research history or an open question.</p></div><div><strong>Source relationship</strong><p>Identifies the published or institutional record used to support the public statement.</p></div><div><strong>Interpretation limit</strong><p>Records what the evidence does not establish and prevents unsupported conclusions.</p></div></div>
          </section>
        ) : null}

        {view === "resources" ? (
          <section className="office-panel" aria-labelledby="office-resources-title">
            <OfficeHeader eyebrow="Review materials" title="Stakeholder and diligence pack generator" description="Prepare a structured scoping note and download the website-authored review registers. Generated notes remain on this device and are not submitted." />
            <div className="resource-layout">
              <div className="resource-controls">
                <label><span>Stakeholder category</span><select value={roleId} onChange={(event) => setRoleId(event.target.value as typeof roleId)}>{stakeholderRoutes.map((role) => <option key={role.id} value={role.id}>{role.label}</option>)}</select></label>
                <label><span>Organisation, capability or review context</span><textarea rows={5} value={briefContext} onChange={(event) => setBriefContext(event.target.value)} placeholder="Optional context for the scoping note" /></label>
                <fieldset><legend>Include sections</legend>{["Programme requirements", "Evidence standard", "Required documents", "Visit controls"].map((section) => <label key={section}><input type="checkbox" checked={resourceSections.includes(section)} onChange={() => toggleResourceSection(section)} /><span>{section}</span></label>)}</fieldset>
                <div className="resource-downloads">
                  <button type="button" onClick={() => downloadFile("abetifi-stakeholder-scoping-note.txt", roleBrief)}>Download scoping note</button>
                  <button type="button" onClick={exportDocuments}>Download diligence index</button>
                  <button type="button" onClick={exportProgramme}>Download gate register</button>
                  <button type="button" onClick={exportEvidence}>Download evidence register</button>
                </div>
              </div>
              <div className="resource-preview"><span>Document preview</span><pre tabIndex={0}>{roleBrief}</pre><p>No data entered here is transmitted or stored by the platform.</p></div>
            </div>
            <div className="resource-library">
              <article><span>01</span><strong>Programme gate register</strong><p>Development requirements, required evidence and public-pack position across six workstreams.</p><button type="button" onClick={exportProgramme}>CSV</button></article>
              <article><span>02</span><strong>Proposed record-requirement register</strong><p>Twenty-two website-authored record definitions with proposed roles, linked gates and evidence status.</p><button type="button" onClick={exportDocuments}>CSV</button></article>
              <article><span>03</span><strong>Evidence register</strong><p>Claim-level records with periods, status, source references and interpretation limits.</p><button type="button" onClick={exportEvidence}>CSV</button></article>
              <article><span>04</span><strong>Research bibliography</strong><p>Machine-readable reference records for the sources used by this platform.</p><button type="button" onClick={exportBibliography}>RIS</button></article>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
