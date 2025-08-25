// Conversion factor
const M_TO_FT = 3.28084;

// RVR TABLE
// Fill in all RVR ranges from your full table here!
const RVR_TABLE_RANGES = [
    {low: 200, high: 210, FALS: 550, IALS: 750, BALS: 1000, NALS: 1200},
    {low: 211, high: 220, FALS: 550, IALS: 800, BALS: 1000, NALS: 1200},
    {low: 221, high: 230, FALS: 550, IALS: 800, BALS: 1000, NALS: 1200},
    {low: 231, high: 240, FALS: 550, IALS: 800, BALS: 1000, NALS: 1200},
    {low: 241, high: 250, FALS: 550, IALS: 800, BALS: 1000, NALS: 1300},
    {low: 251, high: 260, FALS: 600, IALS: 800, BALS: 1100, NALS: 1300},
    {low: 261, high: 280, FALS: 600, IALS: 900, BALS: 1100, NALS: 1300},
    {low: 281, high: 300, FALS: 650, IALS: 900, BALS: 1200, NALS: 1400},
    {low: 301, high: 320, FALS: 700, IALS: 1000, BALS: 1200, NALS: 1400},
    {low: 321, high: 340, FALS: 800, IALS: 1100, BALS: 1300, NALS: 1500},
    {low: 341, high: 360, FALS: 900, IALS: 1200, BALS: 1400, NALS: 1600},
    {low: 361, high: 380, FALS: 1000, IALS: 1300, BALS: 1500, NALS: 1700},
    {low: 381, high: 400, FALS: 1100, IALS: 1400, BALS: 1600, NALS: 1800},
    {low: 401, high: 420, FALS: 1200, IALS: 1500, BALS: 1700, NALS: 1900},
    {low: 421, high: 440, FALS: 1300, IALS: 1600, BALS: 1800, NALS: 2000},
    {low: 441, high: 460, FALS: 1400, IALS: 1700, BALS: 1900, NALS: 2100},
    {low: 461, high: 480, FALS: 1500, IALS: 1800, BALS: 2000, NALS: 2200},
    {low: 481, high: 500, FALS: 1500, IALS: 1800, BALS: 2100, NALS: 2300},
    {low: 501, high: 520, FALS: 1600, IALS: 1900, BALS: 2100, NALS: 2400},
    {low: 521, high: 540, FALS: 1700, IALS: 2000, BALS: 2200, NALS: 2400},
    {low: 541, high: 560, FALS: 1800, IALS: 2100, BALS: 2300, NALS: 2500},
    {low: 561, high: 580, FALS: 1900, IALS: 2200, BALS: 2400, NALS: 2600},
    {low: 581, high: 600, FALS: 2000, IALS: 2300, BALS: 2500, NALS: 2700},
    {low: 601, high: 620, FALS: 2100, IALS: 2400, BALS: 2600, NALS: 2800},
    {low: 621, high: 640, FALS: 2200, IALS: 2500, BALS: 2700, NALS: 2900},
    {low: 641, high: 660, FALS: 2300, IALS: 2600, BALS: 2800, NALS: 3000},
    {low: 661, high: 680, FALS: 2400, IALS: 2700, BALS: 2900, NALS: 3100},
    {low: 681, high: 700, FALS: 2500, IALS: 2800, BALS: 3000, NALS: 3200},
    {low: 701, high: 720, FALS: 2600, IALS: 2900, BALS: 3100, NALS: 3300},
    {low: 721, high: 740, FALS: 2700, IALS: 3000, BALS: 3200, NALS: 3400},
    {low: 741, high: 760, FALS: 2700, IALS: 3000, BALS: 3300, NALS: 3500},
    {low: 761, high: 800, FALS: 2900, IALS: 3200, BALS: 3400, NALS: 3600},
    {low: 801, high: 850, FALS: 3100, IALS: 3400, BALS: 3600, NALS: 3800},
    {low: 851, high: 900, FALS: 3300, IALS: 3600, BALS: 3800, NALS: 4000},
    {low: 901, high: 950, FALS: 3600, IALS: 3900, BALS: 4100, NALS: 4300},
    {low: 951, high: 1000, FALS: 3800, IALS: 4100, BALS: 4300, NALS: 4500},
    {low: 1001, high: 1100, FALS: 4100, IALS: 4400, BALS: 4600, NALS: 4900},
    {low: 1101, high: 1200, FALS: 4600, IALS: 4900, BALS: 5000, NALS: 5000},
    {low: 1201, high: 9999, FALS: 5000, IALS: 5000, BALS: 5000, NALS: 5000}
];

// Circling defaults
const CIRCLING = {
  A: {MDH:400, VIS:1.5},
  B: {MDH:500, VIS:1.6},
  C: {MDH:600, VIS:2.4},
  D: {MDH:700, VIS:3.6}
};

// On page load, add example procedures
window.onload = () => {
  addProcedure("CAT I (Precision)");
  addProcedure("LOC (Non-Precision)");
  addProcedure("Circling");
};

function addProcedure(name) {
  const container = document.getElementById("procedures");
  const div = document.createElement("div");
  div.className = "border p-4 rounded-lg shadow";
  div.innerHTML = `
    <h2 class="font-bold mb-2">${name}</h2>
    <div class="grid grid-cols-5 gap-2">
      ${["A","B","C","D"].map(cat => `
        <div>
          <label class="block text-sm font-semibold">CAT ${cat}</label>
          <input type="number" placeholder="DA/DH/MDA/MDH (m)" class="w-full border p-1" data-proc="${name}" data-cat="${cat}" data-type="dh">
          <input type="number" placeholder="RVR/VIS (m)" class="w-full border p-1 mt-1" data-proc="${name}" data-cat="${cat}" data-type="rvr">
        </div>
      `).join("")}
    </div>
  `;
  container.appendChild(div);
}

function getRVRFromTable(dh, light) {
  for (const row of RVR_TABLE_RANGES) {
    if (dh >= row.low && dh <= row.high) return row[light] || 1200;
  }
  return 5000;
}

function calculate() {
  const adElevation = parseInt(document.getElementById("adElevation").value) || 0;
  const thrElevation = parseInt(document.getElementById("thrElevation").value) || 0;
  const meterToFeet = document.getElementById("meterToFeet").checked;

  let results = [];
  let stateTriggered = false;

  document.querySelectorAll("#procedures > div").forEach(procDiv => {
    const procName = procDiv.querySelector("h2").textContent;
    ["A","B","C","D"].forEach(cat => {
      const dhInput = procDiv.querySelector(`input[data-cat="${cat}"][data-type="dh"]`).value;
      const rvrInput = procDiv.querySelector(`input[data-cat="${cat}"][data-type="rvr"]`).value;

      let dh = parseInt(dhInput) || null;
      let rvr = parseInt(rvrInput) || null;

      // Convert meters → feet if selected
      if (meterToFeet && dh !== null) dh = Math.round(dh * M_TO_FT);

      let minDh, minRvr;
      if (procName.includes("CAT I")) {
        minDh = Math.max(200, dh || 0);
        minRvr = getRVRFromTable(minDh, "FALS");
      } else if (procName.includes("LOC")) {
        minDh = Math.max(250, dh || 0);
        minRvr = Math.max(750, getRVRFromTable(minDh, "FALS"));
      } else if (procName.includes("Circling")) {
        minDh = CIRCLING[cat].MDH;
        minRvr = CIRCLING[cat].VIS * 1000; // in meters
      } else {
        minDh = dh || 0;
        minRvr = 1000;
      }

      // MDA = MDH + AD Elev
      const mda = Math.ceil((minDh + adElevation)/10)*10;

      // Decide STANDARD/STATE
      let highlight = "standard";
      if (rvr !== null && rvr > minRvr) {
        highlight = "state";
        stateTriggered = true;
      }

      results.push({
        procedure: procName,
        cat, mda, mdh:minDh, rvr: rvr || minRvr,
        highlight
      });
    });
  });

  // Update UI highlight boxes
  document.getElementById("standardBox").classList.toggle("hidden", stateTriggered);
  document.getElementById("stateBox").classList.toggle("hidden", !stateTriggered);

  // Display results
  const resDiv = document.getElementById("results");
  resDiv.innerHTML = "";
  results.forEach(r => {
    const row = document.createElement("div");
    row.className = "grid grid-cols-3 gap-4 border-b py-1";
    row.innerHTML = `
      <div class="font-bold">${r.procedure} CAT ${r.cat}</div>
      <div>MDA: ${r.mda}, MDH: ${r.mdh}</div>
      <div class="${r.highlight==="state"?"text-red-600 font-bold":""}">RVR/VIS: ${r.rvr}</div>
    `;
    resDiv.appendChild(row);
  });
}
