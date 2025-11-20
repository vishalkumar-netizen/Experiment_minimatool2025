<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aviation Calculator - minimatool2025</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 1300px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.08); }
        h1 { text-align: center; color: #333; margin-bottom: 30px; }
        .top-inputs { display: flex; gap: 20px; margin-bottom: 15px; align-items: center; flex-wrap: wrap; }
        .input-group { display: flex; flex-direction: column; gap: 5px; }
        .input-group label { font-weight: bold; color: #555; }
        .input-group input, .input-group select { padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 120px; }
        .procedure-group { display: flex; align-items: center; gap: 10px; }
        .noncdfa-sub-group { margin-left: 12px; display: flex; gap: 10px;}
        /* Ensure all checkboxes are spaced nicely */
        .proc-checkbox-group { margin: 16px 0 10px 0; display: flex; flex-wrap: wrap; gap: 14px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .calculators { display: flex; gap: 20px; margin-top: 20px; flex-wrap: wrap; }
        .calculator { flex: 1 1 350px; border: 2px solid #ddd; border-radius: 8px; padding: 15px; min-width: 340px; margin-bottom: 15px; }
        .calculator h3 { text-align: center; margin-bottom: 15px; color: #333; background: #f8f8f8; padding: 10px; border-radius: 4px; }
        .cat-row { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; padding: 10px; background: #fafafa; border-radius: 4px; }
        .cat-label { font-weight: bold; width: 55px; color: #555; }
        .cat-row input { width: 75px; padding: 5px; border: 1px solid #ccc; border-radius: 3px; }
        .result { margin-left: 12px; font-weight: bold; color: #0066cc; font-size: 0.96em;}
        .calculate-btn { background: #007bff; color: white; padding: 12px 30px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin: 24px 10px; display: inline-block; }
        .calculate-btn:hover { background: #0056b3; }
        #summaryResults { border-top:1px solid #ccc; padding-top:20px; margin-top:26px;}
        #summaryResults h2 { text-align:center;margin-bottom:8px;}
        #summaryResults h3 { margin-bottom:0;}
        .footer { text-align: center; margin-top: 26px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
        
        /* Toggle Switch Style */
        .toggle-wrapper { border: 1px solid #ccc; padding: 6px 10px; border-radius: 4px; background: #fff; display: flex; flex-direction: column; justify-content: center; }
        .toggle-label { font-size: 0.85em; color: #333; margin-bottom: 4px; font-weight: bold;}
        .toggle-control { display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.9em; }

        @media (max-width: 800px) {
          .calculators { flex-direction: column; }
          .top-inputs { flex-direction: column; align-items: flex-start; }
          .calculate-btn { display: block; width: 100%; margin: 12px 0; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1> Experiment Tool (Only for the experiment purpose) </h1>
        <div class="top-inputs">
            <div class="input-group">
                <label>AD Elev (ft)</label>
                <input type="number" id="adElev" placeholder="0">
            </div>
            <div class="input-group">
                <label>THR Elev (ft)</label>
                <input type="number" id="thrElev" placeholder="0">
            </div>
            
            <div class="toggle-wrapper">
                <span class="toggle-label">Conversion</span>
                <label class="toggle-control">
                    <input type="checkbox" id="meterToFeetToggle">
                    <span>Input in Meters</span>
                </label>
            </div>

            <div class="input-group">
                <label>ALS</label>
                <select id="lightType">
                    <option value="FALS">FALS</option>
                    <option value="IALS">IALS</option>
                    <option value="BALS">BALS</option>
                    <option value="NALS">NALS</option>
                </select>
            </div>
            <div class="procedure-group">
                <label>Procedure:</label>
                <input type="radio" name="procedure" value="CDFA" id="cdfa" checked>
                <label for="cdfa">CDFA</label>
                <input type="radio" name="procedure" value="Non-CDFA" id="noncdfa">
                <label for="noncdfa">NFC</label>
                <div style="display:inline-block;margin-left:8px;">
                    <input type="checkbox" id="noncdfaCheckbox">
                    <label for="noncdfaCheckbox">Non CDFA</label>
                </div>
                <div id="noncdfaSubGroup" class="noncdfa-sub-group" style="display:none;">
                    <label><input type="checkbox" id="noncdfa_ab"> CAT A/B only</label>
                    <label><input type="checkbox" id="noncdfa_cd"> CAT C/D only</label>
                </div>
            </div>
        </div>
        <div class="proc-checkbox-group" id="procedureCheckboxes"></div>
        <div class="calculators" id="calculatorsArea"></div>
        <div style="text-align: center;">
            <button class="calculate-btn" onclick="calculate()">Calculate All</button>
            <button class="calculate-btn" type="button" onclick="clearAllInputs()">Clear All</button>
        </div>
        <div id="summaryResults"></div>
        <div class="footer">
            This tool was created by Vishal Kumar Basson
        </div>
    </div>
    
    <script>
        // === Define Procedures ===
        const PRECISION_PROC = [
            { code: 'cat1', name: 'CAT 1' }, { code: 'rnp', name: 'RNP' }, { code: 'gls', name: 'GLS' },
            { code: 'par', name: 'PAR' }, { code: 'lpv', name: 'LPV' }, { code: 'lnavvnav', name: 'LNAV/VNAV' }
        ];
        const NONPRECISION_PROC_250 = [
            { code: 'loc', name: 'LOC' }, { code: 'locdme', name: 'LOC+DME' }, { code: 'vordme', name: 'VOR+DME' },
            { code: 'lnav', name: 'LNAV' }, { code: 'sra', name: 'SRA' }, { code: 'lda', name: 'LDA' }
        ];
        const NONPRECISION_PROC_300 = [
            { code: 'vor', name: 'VOR' }, { code: 'ndbdme', name: 'NDB+DME' }
        ];
        const NONPRECISION_PROC_350 = [{ code: 'ndb', name: 'NDB' }];
        const CIRCLING_PROC = [{ code: 'circling', name: 'Circling' }];
        const CATS = ['A','B','C','D'];

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

        function getRVRFromTable(dh, lightType) {
            for (let row of RVR_TABLE_RANGES) {
                if (dh >= row.low && dh <= row.high) return row[lightType];
            }
            return RVR_TABLE_RANGES[RVR_TABLE_RANGES.length-1][lightType];
        }
        function roundUpTo10(x) { return Math.ceil(x/10)*10; }

        // --- UI Generation ---
        function renderProcedureCheckboxes() {
            let html = "";
            // All procedures are checked by default
            const allProcedures = [...PRECISION_PROC, ...NONPRECISION_PROC_250, ...NONPRECISION_PROC_300, ...NONPRECISION_PROC_350, ...CIRCLING_PROC];
            
            allProcedures.forEach(p => { 
                html += `<label><input type="checkbox" id="show_${p.code}" checked> ${p.name}</label>`; 
            });
            
            document.getElementById('procedureCheckboxes').innerHTML = html;
        }

        function renderCalculators() {
            let html = "";
            const catRows = (proc, inputTypes) => CATS.map(cat=>{
                let fields = '';
                if(inputTypes.includes('DA'))   fields += `<input type="number" placeholder="DA" id="${proc}_${cat}_da">`;
                if(inputTypes.includes('MDA'))  fields += `<input type="number" placeholder="MDA" id="${proc}_${cat}_mda">`;
                if(inputTypes.includes('DH'))   fields += `<input type="number" placeholder="DH" id="${proc}_${cat}_dh">`;
                if(inputTypes.includes('MDH'))  fields += `<input type="number" placeholder="MDH" id="${proc}_${cat}_mdh">`;
                if(inputTypes.includes('RVR'))  fields += `<input type="number" placeholder="RVR" id="${proc}_${cat}_rvr">`;
                if(inputTypes.includes('VIS'))  fields += `<input type="number" placeholder="VIS" id="${proc}_${cat}_vis" step="0.1">`;
                return `<div class="cat-row"><div class="cat-label">CAT ${cat}</div>${fields}<div class="result" id="${proc}_${cat}_result"></div></div>`;
            }).join('');

            PRECISION_PROC.forEach(proc=>{
                html += `<div class="calculator" id="${proc.code}Calculator">
                    <h3>${proc.name}</h3>
                    ${catRows(proc.code, ['DA','DH','RVR'])}
                </div>`;
            });
            NONPRECISION_PROC_250.forEach(proc=>{
                html += `<div class="calculator" id="${proc.code}Calculator">
                    <h3>${proc.name}</h3>
                    ${catRows(proc.code, ['MDA','MDH','RVR'])}
                </div>`;
            });
            NONPRECISION_PROC_300.forEach(proc=>{
                html += `<div class="calculator" id="${proc.code}Calculator">
                    <h3>${proc.name}</h3>
                    ${catRows(proc.code, ['MDA','MDH','RVR'])}
                </div>`;
            });
            NONPRECISION_PROC_350.forEach(proc=>{
                html += `<div class="calculator" id="${proc.code}Calculator">
                    <h3>${proc.name}</h3>
                    ${catRows(proc.code, ['MDA','MDH','RVR'])}
                </div>`;
            });
            html += `<div class="calculator" id="circlingCalculator">
                <h3>Circling</h3>
                ${catRows('circling', ['MDA','MDH','VIS'])}
            </div>`;
            document.getElementById('calculatorsArea').innerHTML = html;
        }

        function updateCalculatorVisibility() {
            [...PRECISION_PROC, ...NONPRECISION_PROC_250, ...NONPRECISION_PROC_300, ...NONPRECISION_PROC_350, ...CIRCLING_PROC].forEach(proc=>{
                const show = document.getElementById('show_'+proc.code)?.checked;
                const calculatorElement = document.getElementById(proc.code+'Calculator');
                if (calculatorElement) {
                    calculatorElement.style.display = show ? 'block':'none';
                }
            });
        }
        
        // --- MAIN LOGIC incl. ALL FEATURE/EXCEPTION RULES ---
        function calculate() {
            const adElev = parseFloat(document.getElementById('adElev').value)||0;
            const thrElev = parseFloat(document.getElementById('thrElev').value)||0;
            const lightType = document.getElementById('lightType').value;

            // --- Meter to Feet Logic ---
            const useMeters = document.getElementById('meterToFeetToggle').checked;
            const FT_PER_M = 3.28084;

            // Helper: Reads input. If Toggle is ON, converts M -> FT. If OFF, keeps FT.
            const getVal = (id) => {
                const val = parseFloat(document.getElementById(id).value)||0;
                if (!val) return 0;
                // Note: RVR is always handled in meters in the table lookup, so it's excluded from this conversion if it was here.
                return useMeters ? Math.round(val * FT_PER_M) : val;
            };

            // --- CDFA/Non-CDFA conditions ---
            const isNonCDFA = document.getElementById('noncdfa').checked;
            const isNonCDFA_AB = document.getElementById('noncdfa_ab').checked;
            const isNonCDFA_CD = document.getElementById('noncdfa_cd').checked;

            function isNonCDFAForCat(cat){
                if(!isNonCDFA) return false;
                if(!isNonCDFA_AB && !isNonCDFA_CD) return true;
                if(isNonCDFA_AB && isNonCDFA_CD) return true;
                if(isNonCDFA_AB && ['A','B'].includes(cat)) return true;
                if(isNonCDFA_CD && ['C','D'].includes(cat)) return true;
                return false;
            }

            let summary = {};

            // --- PRECISION Approaches ---
            PRECISION_PROC.forEach(proc=>{
                if(!document.getElementById('show_'+proc.code)?.checked) return;
                summary[proc.code] = {};
                CATS.forEach(cat=>{
                    const da = getVal(`${proc.code}_${cat}_da`);
                    const dh = getVal(`${proc.code}_${cat}_dh`);
                    // RVR is always read as meters, so no conversion needed here
                    const rvr = parseFloat(document.getElementById(`${proc.code}_${cat}_rvr`).value)||0; 

                    const dhRaised = (proc.code === "lnavvnav") ? Math.max(dh, 250) : Math.max(dh, 200);
                    const daCalc = thrElev + dhRaised;
                    const daFinal = Math.max(da, daCalc);
                    
                    const rvrTable = getRVRFromTable(dhRaised,lightType);
                    let rvrFinal = Math.max(rvrTable, rvr); 
                    
                    if(!isNonCDFAForCat(cat)) {
                        const maxRVR = ['A','B'].includes(cat)?1500:2400;
                        if(rvrFinal>maxRVR && (!rvr || rvr<=maxRVR)) rvrFinal=maxRVR;
                    }
                    
                    const res = `DA: ${daFinal}(${dhRaised}), RVR: ${rvrFinal}m`;
                    const hasInput = document.getElementById(`${proc.code}_${cat}_da`)?.value || 
                                     document.getElementById(`${proc.code}_${cat}_dh`)?.value || 
                                     document.getElementById(`${proc.code}_${cat}_rvr`)?.value;
                                     
                    const resultEl = document.getElementById(`${proc.code}_${cat}_result`);
                    if (resultEl) resultEl.innerText = hasInput ? res : '';
                    summary[proc.code][cat] = hasInput ? res : '';
                });
            });

            // --- NONPRECISION Approaches ---
            [...NONPRECISION_PROC_250, ...NONPRECISION_PROC_300, ...NONPRECISION_PROC_350].forEach(proc=>{
                if(!document.getElementById('show_'+proc.code)?.checked) return;
                summary[proc.code] = {};
                let minMDH = 250;
                if(NONPRECISION_PROC_300.some(p=>p.code===proc.code)) minMDH=300;
                if(NONPRECISION_PROC_350.some(p=>p.code===proc.code)) minMDH=350;
                
                CATS.forEach(cat=>{
                    const mda = getVal(`${proc.code}_${cat}_mda`);
                    const mdh = getVal(`${proc.code}_${cat}_mdh`);
                    const rvr = parseFloat(document.getElementById(`${proc.code}_${cat}_rvr`)?.value)||0;

                    let mdhUsed = mdh;
                    let calcMDA = mda;
                    
                    if(mdh > 0 && mdh < minMDH) {
                        mdhUsed = minMDH;
                        calcMDA = roundUpTo10(thrElev + mdhUsed);
                        if(mda > calcMDA) calcMDA = mda;
                    } else if(mdh >= minMDH) {
                        // MDH is correct, but MDA needs to be at least calculated from MDH
                        calcMDA = roundUpTo10(thrElev + mdhUsed);
                        if(mda > calcMDA) calcMDA = mda;
                    } else {
                        // No MDA/MDH entered, use minimum MDH for RVR table lookup
                        mdhUsed = minMDH; 
                        calcMDA = 0; // Or leave it to mda=0, depends on preferred display
                    }

                    const resultEl = document.getElementById(`${proc.code}_${cat}_result`);
                    
                    // Rule: If MDH > 1200 => forced Non-CDFA
                    if(mdhUsed > 1200) {
                        const finalMDA = Math.max(mda, roundUpTo10(thrElev + mdhUsed));
                        const msg = `MDA: ${finalMDA}(${mdhUsed}), RVR: 5000m (forced Non-CDFA: MDH > 1200)`;
                        if (resultEl) resultEl.innerText = msg;
                        summary[proc.code][cat] = msg;
                        return; 
                    }

                    const rvrTable = getRVRFromTable(mdhUsed||minMDH, lightType);
                    let rvrFinal;
                    if(!isNonCDFAForCat(cat)) { 
                        rvrFinal = Math.max(750, rvrTable, rvr);
                        const maxRVR = ['A','B'].includes(cat)?1500:2400;
                        if(rvrFinal>maxRVR && (!rvr || rvr<=maxRVR)) rvrFinal=maxRVR;
                    } else { 
                        let minRVR = ['A','B'].includes(cat)?1000:1200;
                        rvrFinal = Math.max(minRVR, rvrTable, rvr);
                    }
                    
                    const res = `MDA: ${calcMDA}(${mdhUsed}), RVR: ${rvrFinal}m`;
                    const hasInput = document.getElementById(`${proc.code}_${cat}_mda`)?.value || 
                                     document.getElementById(`${proc.code}_${cat}_mdh`)?.value || 
                                     document.getElementById(`${proc.code}_${cat}_rvr`)?.value;

                    if (resultEl) resultEl.innerText = hasInput ? res : "";
                    summary[proc.code][cat] = hasInput ? res : "";
                });
            });

            // --- CIRCLING ---
            if(document.getElementById('show_circling')?.checked) {
                summary.circling = {};
                const catMins = {A:400,B:500,C:600,D:700};
                const visDefaults = {A:1.5,B:1.6,C:2.4,D:3.6};
                
                CATS.forEach(cat=>{
                    const mda = getVal(`circling_${cat}_mda`);
                    const mdh = getVal(`circling_${cat}_mdh`);
                    const vis = parseFloat(document.getElementById(`circling_${cat}_vis`)?.value)||0;

                    const mdhUsed = Math.max(mdh, catMins[cat]);
                    const mdaCalc = roundUpTo10(adElev+mdhUsed);
                    const mdaFinal = Math.max(mda, mdaCalc);
                    const visFinal = Math.max(vis||0, visDefaults[cat]);
                    
                    const res = `MDA: ${mdaFinal}(${mdhUsed}), VIS: ${visFinal}km`;
                    const hasInput = document.getElementById(`circling_${cat}_mda`)?.value || 
                                     document.getElementById(`circling_${cat}_mdh`)?.value || 
                                     document.getElementById(`circling_${cat}_vis`)?.value;

                    const resultEl = document.getElementById(`circling_${cat}_result`);
                    if (resultEl) resultEl.innerText = hasInput ? res : "";
                    summary.circling[cat] = hasInput ? res : "";
                });
            }
            updateSummaryResults(summary);
        }

        function updateSummaryResults(results) {
            const blocks = [
                ...PRECISION_PROC,
                ...NONPRECISION_PROC_250,
                ...NONPRECISION_PROC_300,
                ...NONPRECISION_PROC_350,
                ...CIRCLING_PROC
            ].filter(proc =>
                document.getElementById('show_'+proc.code)?.checked
            );
            let html = `<h2>Summary of Results</h2>`;
            blocks.forEach(proc=>{
                if(!results[proc.code])return;
                html += `<div style="margin-bottom:14px;"><h3>${proc.name}</h3>`;
                CATS.forEach(cat=>{
                    if(results[proc.code][cat]) html += `<div>CAT ${cat}: ${results[proc.code][cat]}</div>`;
                });
                html += `</div>`;
            });
            document.getElementById('summaryResults').innerHTML = html;
        }

        function clearAllInputs() {
            document.querySelectorAll('input[type="number"], input[type="text"]').forEach(el => el.value = '');
            document.querySelectorAll('.result').forEach(el => el.innerText = '');
            document.getElementById('summaryResults').innerHTML = '';
            document.getElementById('cdfa').checked = true;
            document.getElementById('noncdfa').checked = false;
            const noncdfaSubGroup = document.getElementById('noncdfaSubGroup');
            if(noncdfaSubGroup) noncdfaSubGroup.style.display = 'none';
            document.getElementById('noncdfa_ab').checked = false;
            document.getElementById('noncdfa_cd').checked = false;
            
            // Reset Meter toggle to off
            document.getElementById('meterToFeetToggle').checked = false;

            // Default check ALL procedures
            [...PRECISION_PROC, ...NONPRECISION_PROC_250, ...NONPRECISION_PROC_300, ...NONPRECISION_PROC_350, ...CIRCLING_PROC].forEach(proc => {
                let el = document.getElementById('show_'+proc.code);
                if(el) el.checked = true;
            });

            updateCalculatorVisibility();
            window.scrollTo(0,0);
        }

        // ---- Top-right Page Zoom Controls ----
        let zoomLevel = 1;
        const minZoom = 0.7;
        const maxZoom = 2;

        function zoomPage(direction) {
            if(direction === '+') {
                zoomLevel = Math.min(maxZoom, zoomLevel + 0.1);
            } else if(direction === '-') {
                zoomLevel = Math.max(minZoom, zoomLevel - 0.1);
            }
            document.body.style.zoom = zoomLevel;
            const indicator = document.getElementById('zoom-indicator');
            if (indicator) indicator.innerText = `Zoom: ${(zoomLevel*100).toFixed(0)}%`;
        }
        window.zoomPage = zoomPage; // Expose to global scope for button click

        // --- Non CDFA custom rule patch (with Meter conversion) ---
        (function(){
            function isNonCDFAActive() {
                return !!document.getElementById('noncdfaCheckbox')?.checked;
            }

            // This function is for the *additional* Non CDFA calculation displayed underneath the main result.
            function calculateNonCDFA(proc, cat, thrElev, lightType) {
                const useMeters = document.getElementById('meterToFeetToggle').checked;
                const FT_PER_M = 3.28084;
                const getVal = (id) => {
                    const val = parseFloat(document.getElementById(id).value)||0;
                    if (!val) return 0;
                    // Only DH/MDH/DA/MDA are converted, RVR is taken as entered
                    return useMeters ? Math.round(val * FT_PER_M) : val;
                };

                const mda = getVal(`${proc.code}_${cat}_mda`);
                const mdh = getVal(`${proc.code}_${cat}_mdh`);
                const rvr = parseFloat(document.getElementById(`${proc.code}_${cat}_rvr`)?.value)||0;

                const rvrTable = getRVRFromTable(mdh, lightType);

                // NON CDFA "extra" block calculation (RVR is increased by a fixed amount)
                let extraRVR = rvrTable + (['A','B'].includes(cat) ? 200 : 400);
                let noncdfaRVR = rvr >= extraRVR ? rvr : extraRVR;

                let finalMDA = Math.max(mda, roundUpTo10(thrElev + mdh));

                return {
                    noncdfa: `MDA: ${finalMDA}(${mdh}), RVR: ${noncdfaRVR}m [NON CDFA]`
                };
            }

            const origCalculate = window.calculate;
            window.calculate = function() {
                origCalculate?.();
                
                [...NONPRECISION_PROC_250, ...NONPRECISION_PROC_300, ...NONPRECISION_PROC_350].forEach(proc=>{
                    if(!document.getElementById('show_'+proc.code)?.checked) return;
                    
                    CATS.forEach(cat=>{
                        const resultEl = document.getElementById(`${proc.code}_${cat}_result`);
                        let resultNonCDFAEl = document.getElementById(`${proc.code}_${cat}_result_noncdfa`);
                        
                        if(isNonCDFAActive()) {
                            const thrElev = parseFloat(document.getElementById('thrElev').value)||0;
                            const lightType = document.getElementById('lightType').value;
                            const result = calculateNonCDFA(proc, cat, thrElev, lightType);

                            if(!resultNonCDFAEl) {
                                resultNonCDFAEl = document.createElement('div');
                                resultNonCDFAEl.id = `${proc.code}_${cat}_result_noncdfa`;
                                resultNonCDFAEl.style.color = "#be2222";
                                if (resultEl) resultEl.parentNode.appendChild(resultNonCDFAEl);
                            }
                            resultNonCDFAEl.innerText = result.noncdfa;
                        } else {
                            if(resultNonCDFAEl) resultNonCDFAEl.remove();
                        }
                    });
                });
            };
            
        })();
        
        // --- Initialization and Event Listeners ---
        window.onload = function() {
            renderProcedureCheckboxes();
            renderCalculators();
            updateCalculatorVisibility();

            document.getElementById('procedureCheckboxes').addEventListener('change', updateCalculatorVisibility);
            
            document.getElementById('noncdfa').addEventListener('change',function(){
                const s = document.getElementById('noncdfa').checked;
                document.getElementById('noncdfaSubGroup').style.display = s ? 'flex':'none';
            });
            document.getElementById('cdfa').addEventListener('change',function(){
                document.getElementById('noncdfaSubGroup').style.display = 'none';
                document.getElementById('noncdfa_ab').checked = false;
                document.getElementById('noncdfa_cd').checked = false;
            });
            
            document.addEventListener('input',function(e){ 
                if(e.target.type==='number' || e.target.type==='checkbox') calculate(); 
            });
            document.addEventListener('change',function(e){
                if(['radio','checkbox','select-one'].includes(e.target.type)) {
                    updateCalculatorVisibility();
                    calculate();
                }
            });
            
            // Initial zoom setup
            document.body.style.zoom = zoomLevel;
            const indicator = document.getElementById('zoom-indicator');
            if (indicator) indicator.innerText = `Zoom: ${(zoomLevel*100).toFixed(0)}%`;
        };
    </script>
    
    <!-- ============ Fixed Top-Right Zoom Controls ============ -->
    <div id="page-zoom-controls" style="
      position: fixed;
      top: 18px; 
      right: 24px; 
      z-index: 2000;
      display: flex; 
      gap: 10px; 
      align-items:center;
      background: rgba(245,245,245,0.96); 
      border-radius:8px;
      padding: 8px 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    ">
      <button type="button" onclick="zoomPage('+')" title="Zoom in" style="font-size:18px;">+</button>
      <button type="button" onclick="zoomPage('-')" title="Zoom out" style="font-size:18px;">-</button>
      <span id="zoom-indicator" style="margin-left:8px;font-size:14px; color:#444;"></span>
    </div>
</body>
</html>
