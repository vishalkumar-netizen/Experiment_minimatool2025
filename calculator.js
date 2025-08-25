// =======================
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

// =======================
// Procedure Types
// =======================
const PRECISION = ["CAT1", "RNP", "GLS", "PAR", "LPV", "LNAVVNAV"];
const NON_PRECISION = ["LOC","LOCDME","VORDME","LNAV","SRA","LDA","VOR","NDBDME","NDB"];

// =======================
// Dynamic Input Fields
// =======================
document.querySelectorAll(".proc").forEach(cb=>{
  cb.addEventListener("change", ()=>{
    renderProcedureInputs();
  });
});

function renderProcedureInputs(){
  const container = document.getElementById("procedureInputs");
  container.innerHTML = "";
  document.querySelectorAll(".proc:checked").forEach(cb=>{
    const proc = cb.value;
    const box = document.createElement("div");
    box.className="procedure-box";
    box.innerHTML = `<h3>${proc}</h3>`+["A","B","C","D"].map(cat=>{
      let fields="";
      if(proc==="Circling"){
        fields = `<input placeholder="MDA" id="${proc}_${cat}_MDA">
                  <input placeholder="MDH" id="${proc}_${cat}_MDH">
                  <input placeholder="VIS" id="${proc}_${cat}_VIS">`;
      } else if(PRECISION.includes(proc)){
        fields = `<input placeholder="DA" id="${proc}_${cat}_DA">
                  <input placeholder="DH" id="${proc}_${cat}_DH">
                  <input placeholder="RVR" id="${proc}_${cat}_RVR">`;
      } else {
        fields = `<input placeholder="MDA" id="${proc}_${cat}_MDA">
                  <input placeholder="MDH" id="${proc}_${cat}_MDH">
                  <input placeholder="RVR" id="${proc}_${cat}_RVR">`;
      }
      return `<div class="cat-row"><label>CAT ${cat}</label>${fields}</div>`;
    }).join("");
    container.appendChild(box);
  });
}

// =======================
// Clear All
// =======================
function clearAll(){
  document.getElementById("results").innerHTML="";
  document.getElementById("procedureInputs").innerHTML="";
  document.querySelectorAll(".proc").forEach(c=>c.checked=false);
}

// =======================
// Calculation Engine
// =======================
function calculateAll(){
  const adElev = parseInt(document.getElementById("adElev").value)||0;
  const thrElev = parseInt(document.getElementById("thrElev").value)||0;
  const light = document.getElementById("lightType").value;
  const cdfaMode = document.querySelector("input[name=cdfa]:checked").value;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML="";

  let circlingData=null;
  let results=[];

  document.querySelectorAll(".proc:checked").forEach(cb=>{
    const proc=cb.value;
    let procResult={proc:proc,cats:{}};

    ["A","B","C","D"].forEach(cat=>{
      if(proc==="Circling"){
        let mdh=parseInt(document.getElementById(`${proc}_${cat}_MDH`)?.value)||({A:400,B:500,C:600,D:700}[cat]);
        let mda=parseInt(document.getElementById(`${proc}_${cat}_MDA`)?.value)||mdh+adElev;
        let vis=parseFloat(document.getElementById(`${proc}_${cat}_VIS`)?.value)||({A:1.5,B:1.6,C:2.4,D:3.6}[cat]);
        procResult.cats[cat]={MDH:mdh,MDA:Math.ceil((mdh+adElev)/10)*10,VIS:vis};
      }
      else if(PRECISION.includes(proc)){
        let dh=parseInt(document.getElementById(`${proc}_${cat}_DH`)?.value)||0;
        if(proc==="LNAVVNAV") dh=Math.max(dh,250); else dh=Math.max(dh,200);
        let da=parseInt(document.getElementById(`${proc}_${cat}_DA`)?.value)||0;
        let rvrInput=parseInt(document.getElementById(`${proc}_${cat}_RVR`)?.value)||0;
        let rvrFromTable=lookupRVR(dh,light);
        let rvr=Math.max(rvrFromTable,rvrInput);
        if(cdfaMode==="CDFA"){
          if(cat==="A"||cat==="B") rvr=Math.min(rvr,1500);
          if(cat==="C"||cat==="D") rvr=Math.min(rvr,2400);
        }
        procResult.cats[cat]={DA:da,DH:dh,RVR:rvr};
      }
      else if(NON_PRECISION.includes(proc)){
        let mdh=parseInt(document.getElementById(`${proc}_${cat}_MDH`)?.value)||0;
        let mda=parseInt(document.getElementById(`${proc}_${cat}_MDA`)?.value)||0;
        let rvrInput=parseInt(document.getElementById(`${proc}_${cat}_RVR`)?.value)||0;
        if(mdh>1200){
          procResult.cats[cat]={MDA:mda,MDH:mdh,RVR:5000,forced:true};
        } else {
          let minRvr= (cdfaMode==="CDFA")?750:((cat==="A"||cat==="B")?1000:1200);
          let rvrFromTable=lookupRVR(mdh,light);
          let rvr=Math.max(minRvr,rvrFromTable,rvrInput);
          if(cdfaMode==="CDFA"){
            if(cat==="A"||cat==="B") rvr=Math.min(rvr,1500);
            if(cat==="C"||cat==="D") rvr=Math.min(rvr,2400);
          }
          procResult.cats[cat]={MDA:Math.ceil((mdh+adElev)/10)*10,MDH:mdh,RVR:rvr};
        }
      }
    });
    results.push(procResult);
    if(proc==="Circling") circlingData=procResult;
  });

  // Circling Raise Logic
  if(circlingData){
    results.forEach(pr=>{
      if(pr.proc!=="Circling"){
        ["A","B","C","D"].forEach(cat=>{
          const cir=circlingData.cats[cat];
          const p=pr.cats[cat];
          if(!p||!cir) return;
          let trigger=false;
          let newMdh=cir.MDH;
          let newVis=cir.VIS;
          if(p.DH && p.DH>cir.MDH){ newMdh=p.DH; trigger=true; }
          if(p.MDH && p.MDH>cir.MDH){ newMdh=p.MDH; trigger=true; }
          if(p.RVR && (p.RVR/1000)>cir.VIS){ newVis=p.RVR/1000; trigger=true; }
          if(trigger){
            results.push({proc:`Circling raise for ${pr.proc} (CAT ${cat})`,cats:{[cat]:{
              MDH:newMdh,
              MDA:Math.ceil((newMdh+adElev)/10)*10,
              VIS:newVis
            }}});
          }
        });
      }
    });
  }

  // Render Results
  results.forEach(r=>{
    const card=document.createElement("div");
    card.className="result-card";
    card.innerHTML=`<h4>${r.proc}</h4>`+["A","B","C","D"].map(cat=>{
      const d=r.cats[cat]; if(!d) return "";
      let line="";
      if(r.proc==="Circling"||r.proc.includes("Circling raise")){
        line=`CAT ${cat}: MDH ${d.MDH}, MDA ${d.MDA}, VIS ${d.VIS}km`;
      } else if(PRECISION.includes(r.proc)){
        line=`CAT ${cat}: DA ${d.DA}, DH ${d.DH}, RVR ${d.RVR}m`;
      } else {
        line=`CAT ${cat}: MDA ${d.MDA}, MDH ${d.MDH}, RVR ${d.RVR}m ${d.forced?"(Forced Non-CDFA)":""}`;
      }
      return `<div class="result-line">${line}</div>`;
    }).join("");
    resultsDiv.appendChild(card);
  });
}

// =======================
// RVR Lookup
// =======================
function lookupRVR(dh,light){
  for(let r of RVR_TABLE_RANGES){
    if(dh>=r.low && dh<=r.high) return r[light];
  }
  return 9999;
}
