import {
  deliveryGates,
  developmentGateDefinition,
  developmentGateSourceBoundary,
  documentRegister,
  type DeliveryGate,
} from "../lib/record-data";

const gateGroups: DeliveryGate["group"][] = [
  "Authority",
  "Conservation",
  "Design",
  "Economics",
  "Delivery",
  "Impact",
];

export function DevelopmentGates() {
  return (
    <section className="section development-gates-section" id="development-gates" aria-labelledby="development-gates-title">
      <div className="page-shell">
        <header className="development-gates__intro">
          <div>
            <span className="kicker kicker-light">Trackable readiness framework</span>
            <h2 id="development-gates-title">What the 18 proposed development gates mean.</h2>
          </div>
          <div className="development-gates__definition">
            <strong>Definition</strong>
            <p>{developmentGateDefinition}</p>
            <strong>Source boundary</strong>
            <p>{developmentGateSourceBoundary}</p>
          </div>
        </header>

        <div className="development-gates__summary" aria-label="Development gate groups">
          {gateGroups.map((group) => {
            const count = deliveryGates.filter((gate) => gate.group === group).length;
            return <span key={group}><b>{count}</b>{group}</span>;
          })}
        </div>

        <div className="development-gates__groups">
          {gateGroups.map((group, groupIndex) => {
            const gates = deliveryGates.filter((gate) => gate.group === group);

            return (
              <details key={group} open={groupIndex === 0}>
                <summary>
                  <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                  <strong>{group}</strong>
                  <small>{gates.length} proposed {gates.length === 1 ? "gate" : "gates"}</small>
                  <i aria-hidden="true">+</i>
                </summary>
                <div className="development-gates__list">
                  {gates.map((gate) => {
                    const linkedRecords = documentRegister.filter((record) => record.linkedGate === gate.id);

                    return (
                      <article key={gate.id} id={`gate-${gate.id}`}>
                        <div className="development-gate__heading">
                          <span>{gate.code}</span>
                          <small>Stable ID · {gate.id}</small>
                        </div>
                        <h3>{gate.title}</h3>
                        <dl>
                          <div><dt>Question to resolve</dt><dd>{gate.requirement}</dd></div>
                          <div><dt>Evidence to review</dt><dd>{gate.evidence}</dd></div>
                          <div><dt>Current public-pack position</dt><dd>{gate.packStatus}</dd></div>
                          <div><dt>Linked record requirements</dt><dd>{linkedRecords.map((record) => `${record.id} · ${record.title} · ${record.status}`).join("; ") || "No linked record requirement defined"}</dd></div>
                        </dl>
                      </article>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
