const plantData = [
  { phase: "Phase I", canarium: 80, palm: 18, note: "Early emphasis on incense-tree fruit" },
  { phase: "Phase II", canarium: 68, palm: 31, note: "Oil palm increases while Canarium remains prominent" },
  { phase: "Phase III", canarium: 27, palm: 72, note: "Oil palm becomes dominant" },
];

export function PlantUseChart() {
  return (
    <figure className="plant-chart">
      <figcaption>
        <span className="kicker">Archaeobotanical evidence</span>
        <h3>Change in identified incense-tree and oil-palm remains by phase</h3>
        <p>Share of identified endocarp by archaeological phase. The change is gradual, not an abrupt replacement.</p>
      </figcaption>
      <div className="plant-legend" aria-hidden="true">
        <span><i className="legend-canarium" /> Incense tree</span>
        <span><i className="legend-palm" /> Oil palm</span>
      </div>
      <div className="plant-bars">
        {plantData.map((item) => (
          <div className="plant-row" key={item.phase}>
            <div>
              <strong>{item.phase}</strong>
              <small>{item.note}</small>
            </div>
            <div className="plant-track">
              <span className="plant-canarium" style={{ width: `${item.canarium}%` }}><b>{item.canarium}%</b></span>
              <span className="plant-palm" style={{ width: `${item.palm}%` }}><b>{item.palm}%</b></span>
            </div>
          </div>
        ))}
      </div>
      <p className="chart-source">Source: Oas, D’Andrea & Watson (2015), pp. 642–643. Percentages do not sum to exactly 100 in every phase because trace taxa are omitted.</p>
    </figure>
  );
}
