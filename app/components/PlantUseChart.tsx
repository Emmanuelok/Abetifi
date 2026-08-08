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
        <h3>Change in incense-tree and oil-palm endocarp weight by phase</h3>
        <p>Rounded percentage of total endocarp weight reported for each archaeological phase. The pattern is gradual, not an abrupt replacement.</p>
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
      <p className="chart-source">Source: Oas, D’Andrea & Watson (2015), Table 3 and Figure 5, pp. 642–643. Values are rounded percentages by endocarp weight; the remaining 1–2% is unidentified endocarp.</p>
    </figure>
  );
}
