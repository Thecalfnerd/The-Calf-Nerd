import { useState } from 'react';

// ============================================================================
// 🐄 THE CALF NERD - LOGO INSTRUCTIONS
// ============================================================================
// To add your logo:
// 1. Convert your logo image to base64 at: https://www.base64-image.de/
// 2. Copy the full base64 string (starts with "data:image/...")
// 3. Replace YOUR_BASE64_LOGO_HERE below with your base64 string
// ============================================================================

const LOGO_BASE64 = "YOUR_BASE64_LOGO_HERE";
const HAS_CUSTOM_LOGO = false;

const MILK_WEIGHT_PER_GALLON = 8.6;
const WATER_WEIGHT_PER_GALLON = 8.34;

// Colostrum Brix to IgG conversion chart
// Data from Crystal Creek chart - using g/L values as g/quart (practical field approximation)
const BRIX_TO_IGG_CHART = [
  { brix: 18.0, iggPerQuart: 0, quality: 'inadequate' },
  { brix: 18.2, iggPerQuart: 0, quality: 'inadequate' },
  { brix: 18.4, iggPerQuart: 0, quality: 'inadequate' },
  { brix: 18.6, iggPerQuart: 0, quality: 'inadequate' },
  { brix: 18.8, iggPerQuart: 0, quality: 'inadequate' },
  { brix: 19.0, iggPerQuart: 15.0, quality: 'poor' },
  { brix: 19.2, iggPerQuart: 16.8, quality: 'poor' },
  { brix: 19.4, iggPerQuart: 18.8, quality: 'poor' },
  { brix: 19.6, iggPerQuart: 20.9, quality: 'poor' },
  { brix: 19.8, iggPerQuart: 22.9, quality: 'poor' },
  { brix: 20.0, iggPerQuart: 24.9, quality: 'average' },
  { brix: 20.2, iggPerQuart: 26.9, quality: 'average' },
  { brix: 20.4, iggPerQuart: 29.0, quality: 'average' },
  { brix: 20.6, iggPerQuart: 31.0, quality: 'average' },
  { brix: 20.8, iggPerQuart: 33.0, quality: 'average' },
  { brix: 21.0, iggPerQuart: 35.1, quality: 'average' },
  { brix: 21.2, iggPerQuart: 37.1, quality: 'average' },
  { brix: 21.4, iggPerQuart: 39.1, quality: 'average' },
  { brix: 21.6, iggPerQuart: 41.2, quality: 'average' },
  { brix: 21.8, iggPerQuart: 43.2, quality: 'average' },
  { brix: 22.0, iggPerQuart: 45.2, quality: 'average' },
  { brix: 22.2, iggPerQuart: 47.3, quality: 'average' },
  { brix: 22.4, iggPerQuart: 49.3, quality: 'average' },
  { brix: 22.6, iggPerQuart: 51.3, quality: 'average' },
  { brix: 22.8, iggPerQuart: 53.3, quality: 'average' },
  { brix: 23.0, iggPerQuart: 55.4, quality: 'good' },
  { brix: 23.2, iggPerQuart: 57.4, quality: 'good' },
  { brix: 23.4, iggPerQuart: 59.4, quality: 'good' },
  { brix: 23.6, iggPerQuart: 61.5, quality: 'good' },
  { brix: 23.8, iggPerQuart: 63.5, quality: 'good' },
  { brix: 24.0, iggPerQuart: 65.5, quality: 'good' },
  { brix: 24.2, iggPerQuart: 67.6, quality: 'good' },
  { brix: 24.4, iggPerQuart: 69.6, quality: 'good' },
  { brix: 24.6, iggPerQuart: 71.6, quality: 'good' },
  { brix: 24.8, iggPerQuart: 73.7, quality: 'good' },
  { brix: 25.0, iggPerQuart: 75.7, quality: 'good' },
  { brix: 25.2, iggPerQuart: 77.7, quality: 'good' },
  { brix: 25.4, iggPerQuart: 79.7, quality: 'good' },
  { brix: 25.6, iggPerQuart: 81.8, quality: 'good' },
  { brix: 25.8, iggPerQuart: 83.8, quality: 'good' },
  { brix: 26.0, iggPerQuart: 85.8, quality: 'good' },
  { brix: 26.2, iggPerQuart: 87.9, quality: 'good' },
  { brix: 26.4, iggPerQuart: 89.9, quality: 'good' },
  { brix: 26.6, iggPerQuart: 91.9, quality: 'good' },
  { brix: 26.8, iggPerQuart: 94.0, quality: 'good' },
  { brix: 27.0, iggPerQuart: 96.0, quality: 'good' },
  { brix: 27.2, iggPerQuart: 98.0, quality: 'good' },
  { brix: 27.4, iggPerQuart: 100.0, quality: 'good' },
  { brix: 27.6, iggPerQuart: 102.1, quality: 'good' },
  { brix: 27.8, iggPerQuart: 104.1, quality: 'good' },
  { brix: 28.0, iggPerQuart: 106.1, quality: 'good' },
  { brix: 28.2, iggPerQuart: 108.2, quality: 'good' },
  { brix: 28.4, iggPerQuart: 110.2, quality: 'good' },
  { brix: 28.6, iggPerQuart: 112.2, quality: 'good' },
  { brix: 28.8, iggPerQuart: 114.3, quality: 'good' },
  { brix: 29.0, iggPerQuart: 116.3, quality: 'good' },
  { brix: 29.2, iggPerQuart: 118.3, quality: 'good' },
  { brix: 29.4, iggPerQuart: 120.4, quality: 'good' },
  { brix: 29.6, iggPerQuart: 122.4, quality: 'good' },
  { brix: 29.8, iggPerQuart: 124.4, quality: 'good' },
  { brix: 30.0, iggPerQuart: 126.4, quality: 'good' },
  { brix: 30.2, iggPerQuart: 128.5, quality: 'good' },
  { brix: 30.4, iggPerQuart: 130.5, quality: 'good' },
  { brix: 30.6, iggPerQuart: 132.5, quality: 'good' },
  { brix: 30.8, iggPerQuart: 134.6, quality: 'good' },
  { brix: 31.0, iggPerQuart: 136.6, quality: 'good' },
  { brix: 31.2, iggPerQuart: 138.6, quality: 'good' },
  { brix: 31.4, iggPerQuart: 140.7, quality: 'good' },
  { brix: 31.6, iggPerQuart: 142.7, quality: 'good' },
  { brix: 31.8, iggPerQuart: 144.7, quality: 'good' },
  { brix: 32.0, iggPerQuart: 146.8, quality: 'good' },
  { brix: 32.2, iggPerQuart: 148.8, quality: 'good' },
  { brix: 32.4, iggPerQuart: 150.8, quality: 'good' },
  { brix: 32.6, iggPerQuart: 152.8, quality: 'good' },
  { brix: 32.8, iggPerQuart: 154.9, quality: 'good' },
  { brix: 33.0, iggPerQuart: 156.9, quality: 'good' },
  { brix: 33.2, iggPerQuart: 158.9, quality: 'good' },
  { brix: 33.4, iggPerQuart: 161.0, quality: 'good' },
  { brix: 33.6, iggPerQuart: 163.0, quality: 'good' },
  { brix: 33.8, iggPerQuart: 165.0, quality: 'good' },
  { brix: 34.0, iggPerQuart: 167.1, quality: 'good' },
];

// Placeholder logo component
const PlaceholderLogo = () => (
  <svg style={styles.logoSvg} viewBox="0 0 280 120">
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4a5568"/>
        <stop offset="50%" stopColor="#3a4553"/>
        <stop offset="100%" stopColor="#2d3748"/>
      </linearGradient>
    </defs>
    <path d="M20 60 Q20 25 60 20 L140 12 Q180 10 220 20 L250 30 Q270 40 268 60 Q270 80 250 90 L220 100 Q180 110 140 108 L60 100 Q20 95 20 60 Z" 
          fill="url(#bgGradient)" stroke="#000" strokeWidth="5"/>
    <path d="M25 60 Q25 30 62 25 L140 17 Q178 15 218 25 L245 33 Q262 42 260 60 Q262 78 245 87 L218 95 Q178 105 140 103 L62 95 Q25 90 25 60 Z" 
          fill="none" stroke="#14b8a6" strokeWidth="2"/>
    <path d="M95 22 Q140 15 185 22 L180 38 Q140 32 100 38 Z" fill="#14b8a6" stroke="#000" strokeWidth="1"/>
    <text x="140" y="35" textAnchor="middle" fill="#fff" style={{fontSize: '14px', fontFamily: 'Arial Black, sans-serif', fontWeight: 900}}>THE</text>
    <text x="140" y="72" textAnchor="middle" fill="#fff" stroke="#000" strokeWidth="4" paintOrder="stroke" 
          style={{fontSize: '42px', fontFamily: 'Arial Black, sans-serif', fontWeight: 900, letterSpacing: '-1px'}}>CALF</text>
    <path d="M85 82 Q140 78 195 82 L190 102 Q140 108 90 102 Z" fill="#14b8a6" stroke="#000" strokeWidth="1"/>
    <text x="140" y="98" textAnchor="middle" fill="#fff" style={{fontSize: '18px', fontFamily: 'Arial Black, sans-serif', fontWeight: 900, letterSpacing: '2px'}}>NERD</text>
  </svg>
);

// ============================================================================
// MILK REPLACER TAB
// ============================================================================
function MilkReplacerTab() {
  const [numCalves, setNumCalves] = useState(10);
  const [numCalvesInput, setNumCalvesInput] = useState('10');
  const [volumePerCalf, setVolumePerCalf] = useState(0.75);
  const [volumePerCalfInput, setVolumePerCalfInput] = useState('0.75');
  const [volumeUnit, setVolumeUnit] = useState('gallons');
  const [targetSolids, setTargetSolids] = useState(12.5);
  const [targetSolidsInput, setTargetSolidsInput] = useState('12.5');
  const [feedingsPerDay, setFeedingsPerDay] = useState(2);
  const [costPer50lb, setCostPer50lb] = useState(0);
  const [costPer50lbInput, setCostPer50lbInput] = useState('');

  const totalVolume = numCalves * volumePerCalf;
  const totalSolutionWeight = totalVolume * MILK_WEIGHT_PER_GALLON;
  const totalPowderNeeded = totalSolutionWeight * (targetSolids / 100);
  const waterWeight = totalVolume * WATER_WEIGHT_PER_GALLON;
  const totalBatchWeight = waterWeight + totalPowderNeeded;
  const powderPerCalf = numCalves > 0 ? totalPowderNeeded / numCalves : 0;
  const dailyPowderPerCalf = powderPerCalf * feedingsPerDay;
  const totalPowderOz = totalPowderNeeded * 16;
  const powderPerCalfOz = powderPerCalf * 16;
  
  // Cost calculations - ensure proper recalculation
  const costPerLb = costPer50lb > 0 ? costPer50lb / 50 : 0;
  const costPerCalfPerBatch = costPerLb > 0 ? powderPerCalf * costPerLb : 0;
  const costPerCalfDaily = costPerLb > 0 ? dailyPowderPerCalf * costPerLb : 0;
  const totalBatchCost = costPerLb > 0 ? totalPowderNeeded * costPerLb : 0;

  const handleUnitToggle = (newUnit) => {
    if (newUnit === volumeUnit) return;
    if (newUnit === 'quarts') {
      const quartsValue = volumePerCalf * 4;
      setVolumePerCalfInput(quartsValue.toFixed(2));
    } else {
      setVolumePerCalfInput(volumePerCalf.toFixed(2));
    }
    setVolumeUnit(newUnit);
  };

  const handleVolumeChange = (value) => {
    setVolumePerCalfInput(value);
    const parsed = parseFloat(value);
    if (volumeUnit === 'quarts') {
      const gallons = parsed / 4;
      if (!isNaN(gallons) && gallons >= 0.25 && gallons <= 2) {
        setVolumePerCalf(gallons);
      }
    } else {
      if (!isNaN(parsed) && parsed >= 0.25 && parsed <= 2) {
        setVolumePerCalf(parsed);
      }
    }
  };

  const handleVolumeBlur = () => {
    const parsed = parseFloat(volumePerCalfInput);
    if (volumeUnit === 'quarts') {
      const gallons = parsed / 4;
      if (isNaN(gallons) || gallons < 0.25) {
        setVolumePerCalfInput('1');
        setVolumePerCalf(0.25);
      } else if (gallons > 2) {
        setVolumePerCalfInput('8');
        setVolumePerCalf(2);
      } else {
        setVolumePerCalfInput(parsed.toFixed(2));
      }
    } else {
      if (isNaN(parsed) || parsed < 0.25) {
        setVolumePerCalfInput('0.25');
        setVolumePerCalf(0.25);
      } else if (parsed > 2) {
        setVolumePerCalfInput('2');
        setVolumePerCalf(2);
      } else {
        setVolumePerCalfInput(parsed.toFixed(2));
      }
    }
  };

  const getSolidsStatus = () => {
    if (targetSolids < 10) return { message: 'Low solids - may not meet nutritional needs', color: '#f59e0b' };
    if (targetSolids < 12) return { message: 'Acceptable range (10-12%)', color: '#4ade80' };
    if (targetSolids <= 13) return { message: 'Optimal range (12-13%)', color: '#4ade80' };
    if (targetSolids <= 15) return { message: 'Higher solids - ensure water access', color: '#f59e0b' };
    return { message: 'Maximum range reached', color: '#f59e0b' };
  };

  const solidsStatus = getSolidsStatus();

  return (
    <div style={styles.mainGrid}>
      <div style={styles.inputColumn}>
        {/* Cost Tracking */}
        <div style={styles.costCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>💰</span>
            <span>Cost Tracking (Optional)</span>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Milk Replacer Cost per 50 lb Bag</label>
            <span style={styles.hint}>Enter to track feeding costs</span>
            <div style={styles.inputRow}>
              <span style={styles.dollarSign}>$</span>
              <input
                type="number"
                min="0"
                max="9999"
                step="0.01"
                value={costPer50lbInput}
                placeholder="0.00"
                onChange={(e) => {
                  const val = e.target.value;
                  setCostPer50lbInput(val);
                  const parsed = parseFloat(val);
                  if (!isNaN(parsed) && parsed >= 0) {
                    setCostPer50lb(parsed);
                  } else if (val === '') {
                    setCostPer50lb(0);
                  }
                }}
                onBlur={(e) => {
                  const parsed = parseFloat(e.target.value);
                  if (isNaN(parsed) || parsed < 0) {
                    setCostPer50lbInput('');
                    setCostPer50lb(0);
                  } else {
                    setCostPer50lbInput(parsed.toFixed(2));
                  }
                }}
                style={styles.input}
              />
              <span style={styles.unit}>/ 50 lbs</span>
            </div>
            {costPer50lb > 0 && (
              <div style={styles.costBreakdown}>
                <div style={styles.costItem}>
                  <span>$/lb:</span>
                  <span style={styles.costValue}>${costPerLb.toFixed(2)}</span>
                </div>
                <div style={styles.costItem}>
                  <span>$/calf/batch:</span>
                  <span style={styles.costValue}>${costPerCalfPerBatch.toFixed(2)}</span>
                </div>
                <div style={styles.costItem}>
                  <span>$/calf/day:</span>
                  <span style={styles.costValue}>${costPerCalfDaily.toFixed(2)}</span>
                </div>
                <div style={{...styles.costItem, ...styles.costItemTotal}}>
                  <span>Batch total:</span>
                  <span style={styles.costValueTotal}>${totalBatchCost.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feedings Per Day */}
        <div style={styles.feedingsCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>📅</span>
            <span>Feedings per Day</span>
          </div>
          <div style={styles.buttonRow}>
            {[1, 2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => setFeedingsPerDay(n)}
                style={{
                  ...styles.toggleBtn,
                  ...(feedingsPerDay === n ? styles.toggleBtnActive : {})
                }}
              >
                {n}x daily
              </button>
            ))}
          </div>
        </div>

        {/* Batch Parameters */}
        <div style={styles.inputCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>⚙️</span>
            <span>Batch Parameters</span>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Number of Calves</label>
            <span style={styles.hint}>How many calves per feeding (0-999)</span>
            <div style={styles.inputRow}>
              <input
                type="number"
                min="0"
                max="999"
                value={numCalvesInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setNumCalvesInput(val);
                  const parsed = parseInt(val);
                  if (!isNaN(parsed) && parsed >= 0 && parsed <= 999) {
                    setNumCalves(parsed);
                  }
                }}
                onBlur={(e) => {
                  const parsed = parseInt(e.target.value);
                  if (isNaN(parsed) || parsed < 0) {
                    setNumCalvesInput('0');
                    setNumCalves(0);
                  } else if (parsed > 999) {
                    setNumCalvesInput('999');
                    setNumCalves(999);
                  }
                }}
                style={styles.input}
              />
              <span style={styles.unit}>calves</span>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Volume per Calf</label>
            <span style={styles.hint}>Typical: 0.5-1.0 gallons (2-4 quarts)</span>
            
            <div style={styles.unitToggleRow}>
              <button
                onClick={() => handleUnitToggle('gallons')}
                style={{
                  ...styles.unitToggleBtn,
                  ...(volumeUnit === 'gallons' ? styles.unitToggleBtnActive : {})
                }}
              >
                Gallons
              </button>
              <button
                onClick={() => handleUnitToggle('quarts')}
                style={{
                  ...styles.unitToggleBtn,
                  ...(volumeUnit === 'quarts' ? styles.unitToggleBtnActive : {})
                }}
              >
                Quarts
              </button>
            </div>
            
            <div style={styles.inputRow}>
              <input
                type="number"
                min={volumeUnit === 'gallons' ? '0.25' : '1'}
                max={volumeUnit === 'gallons' ? '2' : '8'}
                step={volumeUnit === 'gallons' ? '0.125' : '0.5'}
                value={volumePerCalfInput}
                onChange={(e) => handleVolumeChange(e.target.value)}
                onBlur={handleVolumeBlur}
                style={styles.input}
              />
              <span style={styles.unit}>{volumeUnit}</span>
            </div>
            <div style={styles.conversion}>
              {volumeUnit === 'gallons' 
                ? `= ${(volumePerCalf * 4).toFixed(1)} quarts = ${(volumePerCalf * 128).toFixed(0)} fl oz`
                : `= ${volumePerCalf.toFixed(2)} gallons = ${(volumePerCalf * 128).toFixed(0)} fl oz`
              }
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Target Milk Solids</label>
            <span style={styles.hint}>Selectable range: 9-15%</span>
            <div style={styles.inputRow}>
              <input
                type="number"
                min="9"
                max="15"
                step="0.5"
                value={targetSolidsInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setTargetSolidsInput(val);
                  const parsed = parseFloat(val);
                  if (!isNaN(parsed) && parsed >= 9 && parsed <= 15) {
                    setTargetSolids(parsed);
                  }
                }}
                onBlur={(e) => {
                  const parsed = parseFloat(e.target.value);
                  if (isNaN(parsed) || parsed < 9) {
                    setTargetSolidsInput('9');
                    setTargetSolids(9);
                  } else if (parsed > 15) {
                    setTargetSolidsInput('15');
                    setTargetSolids(15);
                  } else {
                    setTargetSolidsInput(parsed.toString());
                    setTargetSolids(parsed);
                  }
                }}
                style={styles.input}
              />
              <span style={styles.unit}>%</span>
            </div>
            <div style={styles.solidsBar}>
              <div style={styles.solidsTrack}>
                <div style={styles.solidsOptimal}></div>
                <div style={{
                  ...styles.solidsMarker,
                  left: `${((targetSolids - 9) / 6) * 100}%`,
                  backgroundColor: solidsStatus.color,
                  boxShadow: `0 0 10px ${solidsStatus.color}`
                }}></div>
              </div>
              <div style={styles.solidsLabels}>
                <span>9%</span><span>11%</span><span>13%</span><span>15%</span>
              </div>
            </div>
            <div style={{...styles.statusMsg, color: solidsStatus.color}}>● {solidsStatus.message}</div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div style={styles.resultsColumn}>
        <div style={styles.resultsCard}>
          <div style={styles.resultsHeader}>
            <span>Per Batch</span>
            <span style={styles.badge}>Single Feeding</span>
          </div>
          <div style={styles.resultsGrid}>
            <div style={styles.resultItem}>
              <div style={styles.resultLabel}>Total Volume</div>
              <div style={styles.resultValue}>
                <span style={styles.bigNum}>{totalVolume.toFixed(2)}</span>
                <span style={styles.resultUnit}>gal</span>
              </div>
              <div style={styles.resultAlt}>{(totalVolume * 4).toFixed(1)} quarts</div>
            </div>
            <div style={styles.resultItem}>
              <div style={styles.resultLabel}>Batch Weight</div>
              <div style={styles.resultValue}>
                <span style={styles.bigNum}>{totalBatchWeight.toFixed(1)}</span>
                <span style={styles.resultUnit}>lbs</span>
              </div>
              <div style={styles.resultAlt}>{(totalBatchWeight * 16).toFixed(0)} oz</div>
            </div>
            <div style={styles.resultItem}>
              <div style={styles.resultLabel}>Total Powder</div>
              <div style={styles.resultValue}>
                <span style={styles.bigNum}>{totalPowderNeeded.toFixed(2)}</span>
                <span style={styles.resultUnit}>lbs</span>
              </div>
              <div style={styles.resultAlt}>{totalPowderOz.toFixed(1)} oz</div>
            </div>
            <div style={styles.resultItemWide}>
              <div style={styles.resultLabel}>Powder per Calf</div>
              <div style={styles.resultValue}>
                <span style={styles.bigNum}>{powderPerCalf.toFixed(2)}</span>
                <span style={styles.resultUnit}>lbs</span>
                <span style={styles.resultAltInline}>({powderPerCalfOz.toFixed(1)} oz)</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.dailyCard}>
          <div style={styles.dailyHeader}>Daily Totals ({feedingsPerDay}x feeding)</div>
          <div style={styles.dailyGrid}>
            <div style={styles.dailyItem}>
              <div style={styles.dailyNum}>{(totalPowderNeeded * feedingsPerDay).toFixed(1)}</div>
              <div style={styles.dailyLabel}>lbs powder</div>
            </div>
            <div style={styles.dailyItem}>
              <div style={styles.dailyNum}>{dailyPowderPerCalf.toFixed(2)}</div>
              <div style={styles.dailyLabel}>lbs/calf</div>
            </div>
            <div style={styles.dailyItem}>
              <div style={styles.dailyNum}>{(totalVolume * feedingsPerDay).toFixed(1)}</div>
              <div style={styles.dailyLabel}>gal total</div>
            </div>
          </div>
        </div>

        <div style={styles.stepsCard}>
          <div style={styles.stepsHeader}>📋 Mixing Steps</div>
          <div style={styles.stepsList}>
            <div style={styles.step}>
              <span style={styles.stepNum}>1</span>
              <span>Start with <strong style={styles.hl}>{(totalVolume * 0.75).toFixed(1)} gal</strong> warm water (120-130°F)</span>
            </div>
            <div style={styles.step}>
              <span style={styles.stepNum}>2</span>
              <span>Add <strong style={styles.hl}>{totalPowderNeeded.toFixed(2)} lbs</strong> milk replacer powder</span>
            </div>
            <div style={styles.step}>
              <span style={styles.stepNum}>3</span>
              <span>Mix with slow, circular motion until dissolved</span>
            </div>
            <div style={styles.step}>
              <span style={styles.stepNum}>4</span>
              <span>Add water to reach <strong style={styles.hl}>{totalVolume.toFixed(2)} gal</strong> total volume</span>
            </div>
            <div style={styles.step}>
              <span style={styles.stepNum}>5</span>
              <span>Feed at <strong style={styles.hl}>102-105°F</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WHOLE MILK TAB
// ============================================================================
function WholeMilkTab() {
  const [mode, setMode] = useState('extension'); // 'extension' or 'balancing'
  const [numCalves, setNumCalves] = useState(10);
  const [numCalvesInput, setNumCalvesInput] = useState('10');
  const [feedingsPerDay, setFeedingsPerDay] = useState(2);
  const [volumePerFeeding, setVolumePerFeeding] = useState(2); // quarts per feeding
  const [volumePerFeedingInput, setVolumePerFeedingInput] = useState('2');
  
  // Whole milk properties
  const [wholeMilkSolids, setWholeMilkSolids] = useState(12.5);
  const [wholeMilkSolidsInput, setWholeMilkSolidsInput] = useState('12.5');
  const [targetSolids, setTargetSolids] = useState(13.5);
  const [targetSolidsInput, setTargetSolidsInput] = useState('13.5');
  
  // Optional component mode
  const [useComponentMode, setUseComponentMode] = useState(false);
  const [wholeMilkFat, setWholeMilkFat] = useState(3.5);
  const [wholeMilkProtein, setWholeMilkProtein] = useState(3.2);
  
  // Powder properties
  const [powderProteinDM, setPowderProteinDM] = useState(mode === 'balancing' ? 48 : 20);
  const [powderFatDM, setPowderFatDM] = useState(mode === 'balancing' ? 8 : 15);
  
  // Calculations
  const volumePerFeedingGal = volumePerFeeding / 4; // Convert quarts to gallons
  const totalVolumePerFeeding = numCalves * volumePerFeedingGal; // gallons
  
  // Whole milk weight and dry matter
  const wholeMilkWeight = totalVolumePerFeeding * MILK_WEIGHT_PER_GALLON; // lbs
  const wholeMilkDM = wholeMilkWeight * (wholeMilkSolids / 100); // lbs of dry matter in whole milk
  
  // Solve for powder needed to hit target solids
  // Formula: (wholeMilkDM + powderWeight) / (wholeMilkWeight + powderWeight + waterWeight) = targetSolids/100
  // For balancing mode: minimal water, so waterWeight ≈ 0
  // For extension mode: may add water
  
  // Rearranging: powderWeight = (targetSolids/100 * wholeMilkWeight - wholeMilkDM) / (1 - targetSolids/100)
  const powderNeeded = (targetSolids/100 * wholeMilkWeight - wholeMilkDM) / (1 - targetSolids/100);
  const powderNeededPerCalf = numCalves > 0 ? powderNeeded / numCalves : 0;
  const powderNeededPerCalfPerDay = powderNeededPerCalf * feedingsPerDay;
  
  // Final solution weight
  const finalSolutionWeight = wholeMilkWeight + powderNeeded;
  const finalSolutionVolume = finalSolutionWeight / MILK_WEIGHT_PER_GALLON;
  
  // Verify total solids calculation
  const actualTotalSolids = ((wholeMilkDM + powderNeeded) / finalSolutionWeight) * 100;
  
  // Component mode calculations
  let finalProteinPercent = 0;
  let finalFatPercent = 0;
  if (useComponentMode) {
    const wholeMilkProteinLbs = wholeMilkWeight * (wholeMilkProtein / 100);
    const wholeMilkFatLbs = wholeMilkWeight * (wholeMilkFat / 100);
    const powderProteinLbs = powderNeeded * (powderProteinDM / 100);
    const powderFatLbs = powderNeeded * (powderFatDM / 100);
    
    const totalProtein = wholeMilkProteinLbs + powderProteinLbs;
    const totalFat = wholeMilkFatLbs + powderFatLbs;
    const totalDM = wholeMilkDM + powderNeeded;
    
    finalProteinPercent = (totalProtein / totalDM) * 100;
    finalFatPercent = (totalFat / totalDM) * 100;
  }
  
  // Warnings
  const warnings = [];
  if (actualTotalSolids > 17.5) {
    warnings.push({ type: 'danger', msg: 'WARNING: Total solids > 17.5% - High osmotic pressure may cause scours!' });
  }
  if (actualTotalSolids < 10) {
    warnings.push({ type: 'warning', msg: 'WARNING: Total solids < 10% - May not meet nutritional needs' });
  }
  if (powderNeeded < 0) {
    warnings.push({ type: 'error', msg: 'ERROR: Target solids below whole milk solids - cannot achieve with added powder' });
  }
  
  // Quick estimate note
  const quickEstimate = 1.5 * totalVolumePerFeeding; // 1.5 oz powder per gallon ≈ +1% solids
  
  return (
    <div>
      {/* Mode Selection */}
      <div style={styles.modeSelector}>
        <button
          onClick={() => setMode('extension')}
          style={{
            ...styles.modeBtn,
            ...(mode === 'extension' ? styles.modeBtnActive : {})
          }}
        >
          🥛 Extension Mode
          <div style={styles.modeBtnSub}>Whole milk + water + powder</div>
        </button>
        <button
          onClick={() => setMode('balancing')}
          style={{
            ...styles.modeBtn,
            ...(mode === 'balancing' ? styles.modeBtnActive : {})
          }}
        >
          ⚖️ Balancing Mode
          <div style={styles.modeBtnSub}>Whole milk + balancer powder</div>
        </button>
      </div>
      
      <div style={styles.mainGrid}>
        {/* Inputs */}
        <div style={styles.inputColumn}>
          <div style={styles.inputCard}>
            <div style={styles.cardHeader}>
              <span style={styles.cardIcon}>⚙️</span>
              <span>Batch Parameters</span>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Number of Calves</label>
              <div style={styles.inputRow}>
                <input
                  type="number"
                  min="0"
                  max="999"
                  value={numCalvesInput}
                  onChange={(e) => {
                    setNumCalvesInput(e.target.value);
                    const parsed = parseInt(e.target.value);
                    if (!isNaN(parsed) && parsed >= 0 && parsed <= 999) {
                      setNumCalves(parsed);
                    }
                  }}
                  style={styles.input}
                />
                <span style={styles.unit}>calves</span>
              </div>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Feedings per Day</label>
              <div style={styles.buttonRow}>
                {[1, 2, 3, 4].map(n => (
                  <button
                    key={n}
                    onClick={() => setFeedingsPerDay(n)}
                    style={{
                      ...styles.toggleBtn,
                      ...(feedingsPerDay === n ? styles.toggleBtnActive : {})
                    }}
                  >
                    {n}x
                  </button>
                ))}
              </div>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Volume per Feeding (per calf)</label>
              <span style={styles.hint}>Typical: 2-4 quarts</span>
              <div style={styles.inputRow}>
                <input
                  type="number"
                  min="1"
                  max="8"
                  step="0.5"
                  value={volumePerFeedingInput}
                  onChange={(e) => {
                    setVolumePerFeedingInput(e.target.value);
                    const parsed = parseFloat(e.target.value);
                    if (!isNaN(parsed) && parsed >= 1 && parsed <= 8) {
                      setVolumePerFeeding(parsed);
                    }
                  }}
                  style={styles.input}
                />
                <span style={styles.unit}>quarts</span>
              </div>
              <div style={styles.conversion}>= {volumePerFeedingGal.toFixed(2)} gallons</div>
            </div>
          </div>
          
          <div style={styles.inputCard}>
            <div style={styles.cardHeader}>
              <span style={styles.cardIcon}>🥛</span>
              <span>Whole Milk Properties</span>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Whole Milk Total Solids</label>
              <span style={styles.hint}>Typical: 12.0-13.0% (test your milk!)</span>
              <div style={styles.inputRow}>
                <input
                  type="number"
                  min="10"
                  max="15"
                  step="0.1"
                  value={wholeMilkSolidsInput}
                  onChange={(e) => {
                    setWholeMilkSolidsInput(e.target.value);
                    const parsed = parseFloat(e.target.value);
                    if (!isNaN(parsed) && parsed >= 10 && parsed <= 15) {
                      setWholeMilkSolids(parsed);
                    }
                  }}
                  style={styles.input}
                />
                <span style={styles.unit}>%</span>
              </div>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Target Total Solids</label>
              <span style={styles.hint}>Typical: 13.0-15.0%</span>
              <div style={styles.inputRow}>
                <input
                  type="number"
                  min="10"
                  max="17.5"
                  step="0.5"
                  value={targetSolidsInput}
                  onChange={(e) => {
                    setTargetSolidsInput(e.target.value);
                    const parsed = parseFloat(e.target.value);
                    if (!isNaN(parsed) && parsed >= 10 && parsed <= 17.5) {
                      setTargetSolids(parsed);
                    }
                  }}
                  style={styles.input}
                />
                <span style={styles.unit}>%</span>
              </div>
            </div>
            
            <div style={styles.componentToggle}>
              <button
                onClick={() => setUseComponentMode(!useComponentMode)}
                style={{
                  ...styles.componentButton,
                  ...(useComponentMode ? styles.componentButtonActive : {})
                }}
              >
                <span style={styles.componentButtonIcon}>
                  {useComponentMode ? '✅' : '⚪'}
                </span>
                <span style={styles.componentButtonText}>
                  Click here to enable WHOLE MILK Components Settings
                </span>
              </button>
            </div>
            
            {useComponentMode && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Whole Milk Fat %</label>
                  <div style={styles.inputRow}>
                    <input
                      type="number"
                      min="2"
                      max="6"
                      step="0.1"
                      value={wholeMilkFat}
                      onChange={(e) => setWholeMilkFat(parseFloat(e.target.value))}
                      style={styles.input}
                    />
                    <span style={styles.unit}>%</span>
                  </div>
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Whole Milk Protein %</label>
                  <div style={styles.inputRow}>
                    <input
                      type="number"
                      min="2"
                      max="5"
                      step="0.1"
                      value={wholeMilkProtein}
                      onChange={(e) => setWholeMilkProtein(parseFloat(e.target.value))}
                      style={styles.input}
                    />
                    <span style={styles.unit}>%</span>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div style={styles.inputCard}>
            <div style={styles.cardHeader}>
              <span style={styles.cardIcon}>🔬</span>
              <span>Powder Properties</span>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Powder Protein % (DM basis)</label>
              <span style={styles.hint}>{mode === 'balancing' ? 'Balancer: 40-50%' : 'Extender: 18-24%'}</span>
              <div style={styles.inputRow}>
                <input
                  type="number"
                  min="10"
                  max="60"
                  step="1"
                  value={powderProteinDM}
                  onChange={(e) => setPowderProteinDM(parseFloat(e.target.value))}
                  style={styles.input}
                />
                <span style={styles.unit}>%</span>
              </div>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Powder Fat % (DM basis)</label>
              <span style={styles.hint}>{mode === 'balancing' ? 'Balancer: 5-10%' : 'Extender: 12-18%'}</span>
              <div style={styles.inputRow}>
                <input
                  type="number"
                  min="0"
                  max="25"
                  step="1"
                  value={powderFatDM}
                  onChange={(e) => setPowderFatDM(parseFloat(e.target.value))}
                  style={styles.input}
                />
                <span style={styles.unit}>%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div style={styles.resultsColumn}>
          {warnings.length > 0 && (
            <div style={styles.warningsCard}>
              {warnings.map((w, i) => (
                <div key={i} style={{
                  ...styles.warning,
                  backgroundColor: w.type === 'error' ? '#dc2626' : w.type === 'danger' ? '#f59e0b' : '#eab308',
                }}>
                  {w.msg}
                </div>
              ))}
            </div>
          )}
          
          <div style={styles.resultsCard}>
            <div style={styles.resultsHeader}>
              <span>Per Batch Results</span>
              <span style={styles.badge}>Single Feeding</span>
            </div>
            <div style={styles.resultsGrid}>
              <div style={styles.resultItem}>
                <div style={styles.resultLabel}>Whole Milk Used</div>
                <div style={styles.resultValue}>
                  <span style={styles.bigNum}>{totalVolumePerFeeding.toFixed(2)}</span>
                  <span style={styles.resultUnit}>gal</span>
                </div>
                <div style={styles.resultAlt}>{(totalVolumePerFeeding * 4).toFixed(1)} quarts</div>
              </div>
              
              <div style={styles.resultItem}>
                <div style={styles.resultLabel}>Powder Needed</div>
                <div style={styles.resultValue}>
                  <span style={styles.bigNum}>{powderNeeded.toFixed(2)}</span>
                  <span style={styles.resultUnit}>lbs</span>
                </div>
                <div style={styles.resultAlt}>{(powderNeeded * 16).toFixed(1)} oz</div>
              </div>
              
              <div style={styles.resultItem}>
                <div style={styles.resultLabel}>Final Volume</div>
                <div style={styles.resultValue}>
                  <span style={styles.bigNum}>{finalSolutionVolume.toFixed(2)}</span>
                  <span style={styles.resultUnit}>gal</span>
                </div>
                <div style={styles.resultAlt}>{(finalSolutionVolume * 4).toFixed(1)} quarts</div>
              </div>
              
              <div style={styles.resultItemWide}>
                <div style={styles.resultLabel}>Actual Total Solids</div>
                <div style={styles.resultValue}>
                  <span style={styles.bigNum}>{actualTotalSolids.toFixed(2)}</span>
                  <span style={styles.resultUnit}>%</span>
                </div>
              </div>
              
              {useComponentMode && (
                <>
                  <div style={styles.resultItem}>
                    <div style={styles.resultLabel}>Final Protein (DM)</div>
                    <div style={styles.resultValue}>
                      <span style={styles.bigNum}>{finalProteinPercent.toFixed(1)}</span>
                      <span style={styles.resultUnit}>%</span>
                    </div>
                  </div>
                  
                  <div style={styles.resultItem}>
                    <div style={styles.resultLabel}>Final Fat (DM)</div>
                    <div style={styles.resultValue}>
                      <span style={styles.bigNum}>{finalFatPercent.toFixed(1)}</span>
                      <span style={styles.resultUnit}>%</span>
                    </div>
                  </div>
                  
                  <div style={styles.resultItem}>
                    <div style={styles.resultLabel}>Protein:Fat Ratio</div>
                    <div style={styles.resultValue}>
                      <span style={styles.bigNum}>{(finalProteinPercent / finalFatPercent).toFixed(2)}</span>
                      <span style={styles.resultUnit}>:1</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div style={styles.dailyCard}>
            <div style={styles.dailyHeader}>Per Calf Totals</div>
            <div style={styles.dailyGrid}>
              <div style={styles.dailyItem}>
                <div style={styles.dailyNum}>{powderNeededPerCalf.toFixed(2)}</div>
                <div style={styles.dailyLabel}>lbs/feeding</div>
              </div>
              <div style={styles.dailyItem}>
                <div style={styles.dailyNum}>{powderNeededPerCalfPerDay.toFixed(2)}</div>
                <div style={styles.dailyLabel}>lbs/day</div>
              </div>
              <div style={styles.dailyItem}>
                <div style={styles.dailyNum}>{(powderNeededPerCalfPerDay * actualTotalSolids / 100).toFixed(2)}</div>
                <div style={styles.dailyLabel}>DM intake/day</div>
              </div>
            </div>
          </div>
          
          <div style={styles.stepsCard}>
            <div style={styles.stepsHeader}>📋 Mixing Instructions</div>
            <div style={styles.stepsList}>
              <div style={styles.step}>
                <span style={styles.stepNum}>1</span>
                <span>Start with <strong style={styles.hl}>{totalVolumePerFeeding.toFixed(2)} gal</strong> whole milk</span>
              </div>
              <div style={styles.step}>
                <span style={styles.stepNum}>2</span>
                <span>Add <strong style={styles.hl}>{powderNeeded.toFixed(2)} lbs</strong> {mode === 'balancing' ? 'balancer' : 'extender'} powder</span>
              </div>
              <div style={styles.step}>
                <span style={styles.stepNum}>3</span>
                <span>Mix thoroughly until powder is dissolved</span>
              </div>
              <div style={styles.step}>
                <span style={styles.stepNum}>4</span>
                <span>Feed at <strong style={styles.hl}>102-105°F</strong></span>
              </div>
            </div>
            
            <div style={styles.quickEstimate}>
              💡 <strong>Quick Estimate:</strong> ~1.5 oz powder per gallon of whole milk adds ~1% solids<br/>
              For this batch: {quickEstimate.toFixed(1)} oz ≈ {(quickEstimate / 16).toFixed(2)} lbs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COLOSTRUM MANAGEMENT TAB
// ============================================================================
function ColostrumTab() {
  const [brixPercent, setBrixPercent] = useState(22.0);
  const [brixPercentInput, setBrixPercentInput] = useState('22.0');
  const [maxSingleFeeding, setMaxSingleFeeding] = useState(3);
  const [calfWeight, setCalfWeight] = useState(0);
  const [calfWeightInput, setCalfWeightInput] = useState('');
  const [calfWeightUnit, setCalfWeightUnit] = useState('lb');
  const [liquidDensity, setLiquidDensity] = useState(8.6);
  const [showInterpolation, setShowInterpolation] = useState(false);
  
  // Convert Brix to IgG using chart with linear interpolation
  const getIgGFromBrix = (brix) => {
    if (brix < 18.0) {
      return { iggPerQuart: null, quality: 'inadequate', interpolated: false };
    }
    if (brix < 19.0) {
      return { iggPerQuart: 0, quality: 'inadequate', interpolated: false };
    }
    if (brix > 34.0) {
      return { iggPerQuart: 167.1, quality: 'good', interpolated: false };
    }
    
    // Find surrounding data points
    let lowerPoint = null;
    let upperPoint = null;
    
    for (let i = 0; i < BRIX_TO_IGG_CHART.length; i++) {
      if (BRIX_TO_IGG_CHART[i].brix === brix) {
        return { 
          iggPerQuart: BRIX_TO_IGG_CHART[i].iggPerQuart, 
          quality: BRIX_TO_IGG_CHART[i].quality,
          interpolated: false 
        };
      }
      if (BRIX_TO_IGG_CHART[i].brix < brix) {
        lowerPoint = BRIX_TO_IGG_CHART[i];
      }
      if (BRIX_TO_IGG_CHART[i].brix > brix && !upperPoint) {
        upperPoint = BRIX_TO_IGG_CHART[i];
        break;
      }
    }
    
    if (!lowerPoint || !upperPoint) {
      return { iggPerQuart: null, quality: 'inadequate', interpolated: false };
    }
    
    // Linear interpolation between chart points
    const fraction = (brix - lowerPoint.brix) / (upperPoint.brix - lowerPoint.brix);
    const iggPerQuart = lowerPoint.iggPerQuart + fraction * (upperPoint.iggPerQuart - lowerPoint.iggPerQuart);
    
    return {
      iggPerQuart,
      quality: lowerPoint.quality,
      interpolated: true,
      lowerPoint,
      upperPoint
    };
  };
  
  const result = getIgGFromBrix(brixPercent);
  const iggPerQuart = result.iggPerQuart || 0;
  
  // Quality classification
  let qualityCategory = 'Inadequate';
  let qualityColor = '#dc2626';
  let qualityDescription = 'Do Not Use - IgG too low';
  
  if (brixPercent >= 18.0 && brixPercent <= 19.8) {
    qualityCategory = 'Poor Quality';
    qualityColor = '#f59e0b';
    qualityDescription = 'Do Not Use';
  } else if (brixPercent >= 20.0 && brixPercent <= 22.8) {
    qualityCategory = 'Average Quality';
    qualityColor = '#eab308';
    qualityDescription = 'Acceptable - Meets Minimum';
  } else if (brixPercent >= 23.0) {
    qualityCategory = 'Good Quality';
    qualityColor = '#4ade80';
    qualityDescription = 'Excellent - Optimal Quality';
  }
  
  // IgG delivery calculations
  const iggIn2Qt = iggPerQuart * 2;
  const iggIn3Qt = iggPerQuart * 3;
  const iggIn4Qt = iggPerQuart * 4;
  
  // Calf weight-based recommendations
  const calfWeightLb = calfWeightUnit === 'kg' ? calfWeight * 2.20462 : calfWeight;
  const lbPerQuart = liquidDensity / 4;
  const targetQuarts8Pct = calfWeightLb > 0 ? (calfWeightLb * 0.08) / lbPerQuart : 0;
  const targetQuarts9Pct = calfWeightLb > 0 ? (calfWeightLb * 0.09) / lbPerQuart : 0;
  const targetQuarts10Pct = calfWeightLb > 0 ? (calfWeightLb * 0.10) / lbPerQuart : 0;
  const targetGallons8Pct = targetQuarts8Pct / 4;
  const targetGallons9Pct = targetQuarts9Pct / 4;
  const targetGallons10Pct = targetQuarts10Pct / 4;
  const targetLiters8Pct = targetQuarts8Pct * 0.946;
  const targetLiters9Pct = targetQuarts9Pct * 0.946;
  const targetLiters10Pct = targetQuarts10Pct * 0.946;
  
  // IgG g/L (chart provides g/quart, which is approximately g/L in practice)
  const iggPerLiter = iggPerQuart;
  
  // Calculate required volumes to hit IgG targets
  const requiredLitersFor150g = brixPercent >= 19.0 && iggPerLiter > 0 ? 150 / iggPerLiter : 0;
  const requiredQuartsFor150g = requiredLitersFor150g / 0.946353;
  const requiredGallonsFor150g = requiredQuartsFor150g / 4;
  
  const requiredLitersFor200g = brixPercent >= 19.0 && iggPerLiter > 0 ? 200 / iggPerLiter : 0;
  const requiredQuartsFor200g = requiredLitersFor200g / 0.946353;
  const requiredGallonsFor200g = requiredQuartsFor200g / 4;
  
  // IgG delivered for each BW option
  const iggDelivered8Pct = targetQuarts8Pct * iggPerQuart;
  const iggDelivered9Pct = targetQuarts9Pct * iggPerQuart;
  const iggDelivered10Pct = targetQuarts10Pct * iggPerQuart;
  
  return (
    <div>
      <div style={styles.colostrumIntro}>
        <h2 style={styles.colostrumTitle}>📊 Colostrum Quality Assessment</h2>
        <p style={styles.colostrumDesc}>
          Use your refractometer Brix reading to determine colostrum quality and calculate IgG delivery.
          Chart based on Crystal Creek data: 22% Brix = 45.2g/qt (180.9g in 4qt), 24% = 65.5g/qt (262.1g in 4qt).
          Quality calves need 150-200 grams of IgG in the first 6 hours of life.
        </p>
      </div>
      
      <div style={styles.mainGrid}>
        {/* Inputs */}
        <div style={styles.inputColumn}>
          <div style={styles.inputCard}>
            <div style={styles.cardHeader}>
              <span style={styles.cardIcon}>🔬</span>
              <span>Refractometer Reading</span>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Brix Percentage</label>
              <span style={styles.hint}>Read from your refractometer (18.0-34.0%)</span>
              <div style={styles.inputRow}>
                <input
                  type="number"
                  min="15"
                  max="35"
                  step="0.1"
                  value={brixPercentInput}
                  onChange={(e) => {
                    setBrixPercentInput(e.target.value);
                    const parsed = parseFloat(e.target.value);
                    if (!isNaN(parsed)) {
                      setBrixPercent(parsed);
                    }
                  }}
                  onBlur={(e) => {
                    const parsed = parseFloat(e.target.value);
                    if (isNaN(parsed) || parsed < 15) {
                      setBrixPercentInput('15.0');
                      setBrixPercent(15.0);
                    } else if (parsed > 35) {
                      setBrixPercentInput('35.0');
                      setBrixPercent(35.0);
                    } else {
                      setBrixPercentInput(parsed.toFixed(1));
                    }
                  }}
                  style={styles.input}
                />
                <span style={styles.unit}>% Brix</span>
              </div>
              
              {showInterpolation && result.interpolated && (
                <div style={styles.interpolationBox}>
                  <div style={styles.interpolationTitle}>📐 Interpolation Details:</div>
                  <div style={styles.interpolationText}>
                    Linear interpolation between nearest chart points:
                  </div>
                  <div style={styles.interpolationText}>
                    {result.lowerPoint.brix}% = {result.lowerPoint.iggPerQuart.toFixed(1)} g/qt
                  </div>
                  <div style={styles.interpolationText}>
                    {result.upperPoint.brix}% = {result.upperPoint.iggPerQuart.toFixed(1)} g/qt
                  </div>
                  <div style={styles.interpolationText}>
                    Your {brixPercent.toFixed(1)}% = {iggPerQuart.toFixed(1)} g/qt
                  </div>
                </div>
              )}
            </div>
            
            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showInterpolation}
                  onChange={(e) => setShowInterpolation(e.target.checked)}
                  style={styles.checkbox}
                />
                <span>Show interpolation details</span>
              </label>
            </div>
          </div>
          
          <div style={styles.inputCard}>
            <div style={styles.cardHeader}>
              <span style={styles.cardIcon}>🎯</span>
              <span>Feeding Limits</span>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Max Single Feeding</label>
              <span style={styles.hint}>Maximum quarts per feeding</span>
              <div style={styles.buttonRow}>
                {[2, 3, 4].map(val => (
                  <button
                    key={val}
                    onClick={() => setMaxSingleFeeding(val)}
                    style={{
                      ...styles.toggleBtn,
                      ...(maxSingleFeeding === val ? styles.toggleBtnActive : {})
                    }}
                  >
                    {val} qt
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div style={styles.inputCard}>
            <div style={styles.cardHeader}>
              <span style={styles.cardIcon}>🐄</span>
              <span>Calf Weight (Optional)</span>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Calf Birth Weight</label>
              <span style={styles.hint}>For body weight-based recommendations</span>
              
              <div style={styles.unitToggleRow}>
                <button
                  onClick={() => setCalfWeightUnit('lb')}
                  style={{
                    ...styles.unitToggleBtn,
                    ...(calfWeightUnit === 'lb' ? styles.unitToggleBtnActive : {})
                  }}
                >
                  Pounds
                </button>
                <button
                  onClick={() => setCalfWeightUnit('kg')}
                  style={{
                    ...styles.unitToggleBtn,
                    ...(calfWeightUnit === 'kg' ? styles.unitToggleBtnActive : {})
                  }}
                >
                  Kilograms
                </button>
              </div>
              
              <div style={styles.inputRow}>
                <input
                  type="number"
                  min="0"
                  max={calfWeightUnit === 'lb' ? 200 : 100}
                  step={calfWeightUnit === 'lb' ? 5 : 2}
                  value={calfWeightInput}
                  placeholder="0"
                  onChange={(e) => {
                    setCalfWeightInput(e.target.value);
                    const parsed = parseFloat(e.target.value);
                    if (!isNaN(parsed) && parsed >= 0) {
                      setCalfWeight(parsed);
                    } else if (e.target.value === '') {
                      setCalfWeight(0);
                    }
                  }}
                  style={styles.input}
                />
                <span style={styles.unit}>{calfWeightUnit}</span>
              </div>
              
              {calfWeight > 0 && (
                <div style={styles.conversion}>
                  = {calfWeightLb.toFixed(1)} lbs = {(calfWeightLb / 2.20462).toFixed(1)} kg
                </div>
              )}
            </div>
          </div>
          
          {/* BW + Brix Results Table */}
          {calfWeight > 0 && brixPercent >= 19.0 && (
            <div style={styles.resultsTable}>
              <div style={styles.resultsTableHeader}>
                📊 {calfWeightLb.toFixed(0)} lb calf @ {brixPercent.toFixed(1)}% Brix
              </div>
              
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeaderRow}>
                      <th style={styles.th}>Option</th>
                      <th style={styles.th}>Wt (lb)</th>
                      <th style={styles.th}>Qts</th>
                      <th style={styles.th}>Gal</th>
                      <th style={styles.th}>IgG g/L</th>
                      <th style={styles.th}>IgG Del</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={styles.tableRow}>
                      <td style={styles.td}><strong>8% BW</strong></td>
                      <td style={styles.td}>{(calfWeightLb * 0.08).toFixed(1)}</td>
                      <td style={styles.td}>{targetQuarts8Pct.toFixed(1)}</td>
                      <td style={styles.td}>{targetGallons8Pct.toFixed(2)}</td>
                      <td style={styles.td}>{iggPerLiter.toFixed(1)}</td>
                      <td style={styles.td}><strong>{iggDelivered8Pct.toFixed(0)}g</strong></td>
                      <td style={styles.td}>
                        {iggDelivered8Pct >= 200 ? '✅ 200g' : iggDelivered8Pct >= 150 ? '✅ 150g ⚠️' : '⚠️ <150g'}
                      </td>
                    </tr>
                    <tr style={styles.tableRow}>
                      <td style={styles.td}><strong>9% BW</strong></td>
                      <td style={styles.td}>{(calfWeightLb * 0.09).toFixed(1)}</td>
                      <td style={styles.td}>{targetQuarts9Pct.toFixed(1)}</td>
                      <td style={styles.td}>{targetGallons9Pct.toFixed(2)}</td>
                      <td style={styles.td}>{iggPerLiter.toFixed(1)}</td>
                      <td style={styles.td}><strong>{iggDelivered9Pct.toFixed(0)}g</strong></td>
                      <td style={styles.td}>
                        {iggDelivered9Pct >= 200 ? '✅ 200g' : iggDelivered9Pct >= 150 ? '✅ 150g ⚠️' : '⚠️ <150g'}
                      </td>
                    </tr>
                    <tr style={{...styles.tableRow, ...styles.tableRowHighlight}}>
                      <td style={styles.td}><strong>10% BW ⭐</strong></td>
                      <td style={styles.td}>{(calfWeightLb * 0.10).toFixed(1)}</td>
                      <td style={styles.td}>{targetQuarts10Pct.toFixed(1)}</td>
                      <td style={styles.td}>{targetGallons10Pct.toFixed(2)}</td>
                      <td style={styles.td}>{iggPerLiter.toFixed(1)}</td>
                      <td style={styles.td}><strong>{iggDelivered10Pct.toFixed(0)}g</strong></td>
                      <td style={styles.td}>
                        {iggDelivered10Pct >= 200 ? '✅ 200g' : iggDelivered10Pct >= 150 ? '✅ 150g ⚠️' : '⚠️ <150g'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div style={styles.targetVolumes}>
                <div style={styles.targetVolumeRow}>
                  <span style={styles.targetLabel}>For 150g IgG:</span>
                  <span style={styles.targetValue}>
                    {requiredQuartsFor150g.toFixed(1)} qt ({requiredGallonsFor150g.toFixed(2)} gal)
                  </span>
                </div>
                <div style={styles.targetVolumeRow}>
                  <span style={styles.targetLabel}>For 200g IgG:</span>
                  <span style={styles.targetValue}>
                    {requiredQuartsFor200g.toFixed(1)} qt ({requiredGallonsFor200g.toFixed(2)} gal)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results */}
        <div style={styles.resultsColumn}>
          {/* Quality Card */}
          <div style={{...styles.qualityCard, borderColor: qualityColor}}>
            <div style={styles.qualityBadge}>
              <div style={{...styles.qualityDot, backgroundColor: qualityColor}}></div>
              <div style={styles.qualityText}>
                <div style={styles.qualityCategory}>{qualityCategory}</div>
                <div style={styles.qualityDesc}>{qualityDescription}</div>
              </div>
            </div>
            
            {brixPercent >= 19.0 ? (
              <div style={styles.iggDisplay}>
                <div style={styles.iggLabel}>IgG Concentration</div>
                <div style={styles.iggValue}>
                  <span style={styles.iggBigNum}>{iggPerQuart.toFixed(1)}</span>
                  <span style={styles.iggUnit}>g/quart</span>
                </div>
                <div style={styles.iggAlt}>{iggPerQuart.toFixed(1)} g/liter (approx)</div>
              </div>
            ) : (
              <div style={styles.inadequateMsg}>
                ⚠️ Brix reading below 19.0% indicates inadequate IgG concentration (&lt;15 g/L).
                Do not use this colostrum for first feeding.
              </div>
            )}
          </div>
          
          {/* IgG Delivery */}
          {brixPercent >= 19.0 && (
            <div style={styles.resultsCard}>
              <div style={styles.resultsHeader}>
                <span>IgG Delivery by Volume</span>
              </div>
              <div style={styles.resultsGrid}>
                <div style={styles.resultItem}>
                  <div style={styles.resultLabel}>At 2 Quarts</div>
                  <div style={styles.resultValue}>
                    <span style={styles.bigNum}>{iggIn2Qt.toFixed(0)}</span>
                    <span style={styles.resultUnit}>g IgG</span>
                  </div>
                </div>
                <div style={styles.resultItem}>
                  <div style={styles.resultLabel}>At 3 Quarts</div>
                  <div style={styles.resultValue}>
                    <span style={styles.bigNum}>{iggIn3Qt.toFixed(0)}</span>
                    <span style={styles.resultUnit}>g IgG</span>
                  </div>
                </div>
                <div style={styles.resultItem}>
                  <div style={styles.resultLabel}>At 4 Quarts</div>
                  <div style={styles.resultValue}>
                    <span style={styles.bigNum}>{iggIn4Qt.toFixed(0)}</span>
                    <span style={styles.resultUnit}>g IgG</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Body Weight Summary */}
          {calfWeight > 0 && brixPercent >= 19.0 && (
            <div style={styles.stepsCard}>
              <div style={styles.stepsHeader}>💡 Feeding Recommendation</div>
              <div style={styles.bwNote}>
                <strong>For a {calfWeightLb.toFixed(0)} lb calf with {brixPercent.toFixed(1)}% Brix colostrum:</strong>
                <br/><br/>
                • Feed <strong style={styles.hl}>{targetQuarts10Pct.toFixed(2)} quarts ({targetGallons10Pct.toFixed(2)} gallons)</strong> within 2 hours of birth
                <br/>
                • This delivers <strong style={styles.hl}>{iggDelivered10Pct.toFixed(0)}g of IgG</strong> 
                {iggDelivered10Pct >= 200 ? ' ✅ (exceeds 200g target)' : iggDelivered10Pct >= 150 ? ' ⚠️ (meets 150g minimum, below 200g ideal)' : ' ⚠️ (below 150g minimum - consider higher quality colostrum or supplementation)'}
                <br/>
                • Consider a second feeding of 2 quarts 8-12 hours later for optimal immunity
                {targetQuarts10Pct > maxSingleFeeding && (
                  <>
                    <br/><br/>
                    <strong>⚠️ Volume Alert:</strong> Total volume ({targetQuarts10Pct.toFixed(2)} qt) exceeds your max single feeding ({maxSingleFeeding} qt). 
                    Split into {Math.ceil(targetQuarts10Pct / maxSingleFeeding)} feedings of {(targetQuarts10Pct / Math.ceil(targetQuarts10Pct / maxSingleFeeding)).toFixed(2)} quarts each.
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Guidelines */}
          <div style={styles.stepsCard}>
            <div style={styles.stepsHeader}>📋 Colostrum Management Guidelines</div>
            <div style={styles.stepsList}>
              <div style={styles.step}>
                <span style={styles.stepNum}>1</span>
                <span>Feed colostrum within <strong style={styles.hl}>2 hours</strong> of birth</span>
              </div>
              <div style={styles.step}>
                <span style={styles.stepNum}>2</span>
                <span>Target <strong style={styles.hl}>150-200g IgG</strong> in first 6 hours</span>
              </div>
              <div style={styles.step}>
                <span style={styles.stepNum}>3</span>
                <span>Aim for <strong style={styles.hl}>Good Quality</strong> (≥23% Brix) for optimal immunity</span>
              </div>
              <div style={styles.step}>
                <span style={styles.stepNum}>4</span>
                <span>Feed at <strong style={styles.hl}>102-105°F</strong> for best absorption</span>
              </div>
              <div style={styles.step}>
                <span style={styles.stepNum}>5</span>
                <span>Test serum protein at 24-48 hrs (target ≥5.5 g/dL)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP WITH TABS
// ============================================================================
function FeedCalculator() {
  const [activeTab, setActiveTab] = useState('replacer');

  return (
    <div style={styles.container}>
      {/* Header with Logo */}
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          {HAS_CUSTOM_LOGO ? (
            <img src={LOGO_BASE64} alt="The Calf Nerd" style={styles.logoImg} />
          ) : (
            <PlaceholderLogo />
          )}
        </div>
        <p style={styles.tagline}>Mix it right. Every time.</p>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabContainer}>
        <button
          onClick={() => setActiveTab('replacer')}
          style={{
            ...styles.tab,
            ...(activeTab === 'replacer' ? styles.tabActive : {})
          }}
        >
          🧪 Milk Replacer
        </button>
        <button
          onClick={() => setActiveTab('wholemilk')}
          style={{
            ...styles.tab,
            ...(activeTab === 'wholemilk' ? styles.tabActive : {})
          }}
        >
          🥛 Whole Milk
        </button>
        <button
          onClick={() => setActiveTab('colostrum')}
          style={{
            ...styles.tab,
            ...(activeTab === 'colostrum' ? styles.tabActive : {})
          }}
        >
          🍼 Colostrum
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'replacer' && <MilkReplacerTab />}
      {activeTab === 'wholemilk' && <WholeMilkTab />}
      {activeTab === 'colostrum' && <ColostrumTab />}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerBrand}>🐄 The Calf Nerd</div>
        <div style={styles.footerRef}>References: Michigan State University Extension • Penn State Extension</div>
        <div style={styles.footerDisclaimer}>Always consult with your veterinarian or nutritionist for specific feeding programs.</div>
        <div style={styles.footerDeveloper}>Developer - Contact: Thecalfnerd@gmail.com</div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '16px',
    backgroundColor: '#0d0d12',
    minHeight: '100vh',
    color: '#f0f0f5',
    overflowX: 'hidden',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '2px solid #2a2a3a',
    textAlign: 'center',
  },
  logoContainer: {
    flexShrink: 0,
  },
  logoImg: {
    height: '100px',
    width: 'auto',
    objectFit: 'contain',
  },
  logoSvg: {
    width: '200px',
    height: '86px',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
  },
  tagline: {
    margin: 0,
    fontSize: '14px',
    color: '#8b8b9a',
    fontStyle: 'italic',
  },
  tabContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    borderBottom: '2px solid #2a2a3a',
  },
  tab: {
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: 700,
    border: 'none',
    borderBottom: '3px solid transparent',
    backgroundColor: 'transparent',
    color: '#8b8b9a',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tabActive: {
    color: '#14b8a6',
    borderBottomColor: '#14b8a6',
  },
  modeSelector: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px',
  },
  modeBtn: {
    padding: '20px',
    fontSize: '16px',
    fontWeight: 700,
    border: '2px solid #3a3a4a',
    borderRadius: '12px',
    backgroundColor: '#16161f',
    color: '#8b8b9a',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  modeBtnActive: {
    backgroundColor: '#14b8a6',
    borderColor: '#14b8a6',
    color: '#fff',
  },
  modeBtnSub: {
    fontSize: '12px',
    marginTop: '4px',
    opacity: 0.8,
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.3fr',
    gap: '16px',
    marginBottom: '16px',
    width: '100%',
    maxWidth: '100%',
  },
  inputColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  costCard: {
    backgroundColor: '#16161f',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid #2a2a3a',
  },
  feedingsCard: {
    backgroundColor: '#16161f',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid #2a2a3a',
  },
  inputCard: {
    backgroundColor: '#16161f',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid #2a2a3a',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#8b8b9a',
    marginBottom: '16px',
    paddingBottom: '10px',
    borderBottom: '1px solid #2a2a3a',
  },
  cardIcon: {
    fontSize: '16px',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '15px',
    fontWeight: 700,
    color: '#f0f0f5',
    marginBottom: '4px',
  },
  hint: {
    display: 'block',
    fontSize: '12px',
    color: '#6b6b7a',
    marginBottom: '10px',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  dollarSign: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#14b8a6',
  },
  input: {
    width: '160px',
    padding: '14px 16px',
    fontSize: '20px',
    fontWeight: 700,
    border: '2px solid #3a3a4a',
    borderRadius: '10px',
    backgroundColor: '#1a1a24',
    color: '#fff',
    outline: 'none',
  },
  unit: {
    fontSize: '14px',
    color: '#6b6b7a',
    fontWeight: 600,
  },
  conversion: {
    fontSize: '12px',
    color: '#9b5a7a',
    marginTop: '8px',
    fontFamily: 'monospace',
  },
  costBreakdown: {
    marginTop: '12px',
    padding: '12px',
    backgroundColor: '#1a1a24',
    borderRadius: '10px',
    border: '1px solid #2a2a3a',
  },
  costItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 0',
    fontSize: '12px',
    color: '#8b8b9a',
  },
  costValue: {
    fontWeight: 700,
    fontSize: '14px',
    color: '#14b8a6',
    fontFamily: 'monospace',
  },
  costItemTotal: {
    borderTop: '1px solid #2a2a3a',
    marginTop: '8px',
    paddingTop: '12px',
  },
  costValueTotal: {
    fontWeight: 800,
    fontSize: '18px',
    color: '#14b8a6',
    fontFamily: 'monospace',
  },
  solidsBar: {
    marginTop: '12px',
  },
  solidsTrack: {
    position: 'relative',
    height: '10px',
    backgroundColor: '#2a2a3a',
    borderRadius: '5px',
  },
  solidsOptimal: {
    position: 'absolute',
    left: '50%',
    width: '16.7%',
    height: '100%',
    backgroundColor: 'rgba(74, 222, 128, 0.25)',
    borderRadius: '5px',
  },
  solidsMarker: {
    position: 'absolute',
    top: '-5px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '3px solid #0d0d12',
    transform: 'translateX(-50%)',
    transition: 'left 0.2s',
  },
  solidsLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '10px',
    color: '#5b5b6a',
    marginTop: '6px',
    fontFamily: 'monospace',
  },
  statusMsg: {
    fontSize: '13px',
    fontWeight: 700,
    marginTop: '10px',
  },
  checkboxGroup: {
    marginBottom: '16px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#d0d0da',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  componentToggle: {
    marginBottom: '16px',
  },
  componentButton: {
    width: '100%',
    padding: '16px 20px',
    fontSize: '14px',
    fontWeight: 700,
    border: '3px solid #3a3a4a',
    borderRadius: '12px',
    backgroundColor: '#1a1a24',
    color: '#8b8b9a',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left',
  },
  componentButtonActive: {
    backgroundColor: '#14b8a6',
    borderColor: '#14b8a6',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(20, 184, 166, 0.4)',
  },
  componentButtonIcon: {
    fontSize: '24px',
    flexShrink: 0,
  },
  componentButtonText: {
    flex: 1,
    lineHeight: 1.4,
  },
  buttonRow: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    maxWidth: '280px',
    margin: '0 auto',
  },
  unitToggleRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  unitToggleBtn: {
    flex: 1,
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 700,
    border: '2px solid #3a3a4a',
    borderRadius: '8px',
    backgroundColor: '#1a1a24',
    color: '#8b8b9a',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  unitToggleBtnActive: {
    backgroundColor: '#14b8a6',
    borderColor: '#14b8a6',
    color: '#fff',
  },
  toggleBtn: {
    flex: 1,
    minWidth: '60px',
    maxWidth: '70px',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 700,
    border: '2px solid #3a3a4a',
    borderRadius: '10px',
    backgroundColor: '#1a1a24',
    color: '#8b8b9a',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  toggleBtnActive: {
    backgroundColor: '#14b8a6',
    borderColor: '#14b8a6',
    color: '#fff',
  },
  resultsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  warningsCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  warning: {
    padding: '14px 18px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 700,
    color: '#fff',
  },
  resultsCard: {
    background: 'linear-gradient(145deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #14b8a6',
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    fontSize: '13px',
    fontWeight: 700,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  badge: {
    fontSize: '10px',
    padding: '4px 10px',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '10px',
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  resultItem: {},
  resultItemWide: {
    gridColumn: '1 / -1',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.25)',
  },
  resultLabel: {
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '6px',
  },
  resultValue: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
  },
  bigNum: {
    fontSize: '40px',
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1,
  },
  resultUnit: {
    fontSize: '18px',
    color: '#fff',
    fontWeight: 700,
  },
  resultAlt: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: '4px',
    fontFamily: 'monospace',
  },
  resultAltInline: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'monospace',
    marginLeft: '8px',
  },
  dailyCard: {
    backgroundColor: '#16161f',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #2a2a3a',
  },
  dailyHeader: {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#8b8b9a',
    marginBottom: '16px',
  },
  dailyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
  },
  dailyItem: {
    textAlign: 'center',
    padding: '14px 10px',
    backgroundColor: '#1a1a24',
    borderRadius: '12px',
  },
  dailyNum: {
    fontSize: '26px',
    fontWeight: 800,
    color: '#14b8a6',
  },
  dailyLabel: {
    fontSize: '10px',
    color: '#6b6b7a',
    textTransform: 'uppercase',
    marginTop: '4px',
    letterSpacing: '0.5px',
  },
  stepsCard: {
    backgroundColor: '#16161f',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #2a2a3a',
  },
  stepsHeader: {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#8b8b9a',
    marginBottom: '16px',
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    fontSize: '14px',
    color: '#d0d0da',
    lineHeight: 1.4,
  },
  stepNum: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#14b8a6',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 800,
    flexShrink: 0,
  },
  hl: {
    color: '#14b8a6',
  },
  quickEstimate: {
    marginTop: '16px',
    padding: '14px',
    backgroundColor: '#1a1a24',
    borderRadius: '10px',
    fontSize: '12px',
    color: '#d0d0da',
    lineHeight: 1.5,
  },
  footer: {
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #2a2a3a',
    marginTop: '24px',
  },
  footerBrand: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#14b8a6',
    marginBottom: '10px',
  },
  footerRef: {
    fontSize: '11px',
    color: '#5b5b6a',
    marginBottom: '6px',
  },
  footerDisclaimer: {
    fontSize: '11px',
    color: '#4b4b5a',
    fontStyle: 'italic',
  },
  footerDeveloper: {
    fontSize: '11px',
    color: '#14b8a6',
    marginTop: '10px',
    fontWeight: 600,
  },
  // Colostrum-specific styles
  colostrumIntro: {
    marginBottom: '24px',
    padding: '24px',
    backgroundColor: '#16161f',
    borderRadius: '16px',
    border: '1px solid #2a2a3a',
  },
  colostrumTitle: {
    margin: '0 0 12px 0',
    fontSize: '22px',
    fontWeight: 800,
    color: '#14b8a6',
  },
  colostrumDesc: {
    margin: 0,
    fontSize: '14px',
    color: '#8b8b9a',
    lineHeight: 1.6,
  },
  qualityCard: {
    backgroundColor: '#16161f',
    borderRadius: '16px',
    padding: '24px',
    border: '2px solid',
  },
  qualityBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
  },
  qualityDot: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  qualityText: {
    flex: 1,
  },
  qualityCategory: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#fff',
    marginBottom: '4px',
  },
  qualityDesc: {
    fontSize: '13px',
    color: '#8b8b9a',
  },
  iggDisplay: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#1a1a24',
    borderRadius: '12px',
  },
  iggLabel: {
    fontSize: '11px',
    color: '#8b8b9a',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  iggValue: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '10px',
  },
  iggBigNum: {
    fontSize: '48px',
    fontWeight: 800,
    color: '#14b8a6',
    lineHeight: 1,
  },
  iggUnit: {
    fontSize: '18px',
    color: '#8b8b9a',
    fontWeight: 700,
  },
  iggAlt: {
    fontSize: '12px',
    color: '#6b6b7a',
    marginTop: '8px',
    fontFamily: 'monospace',
  },
  inadequateMsg: {
    padding: '16px',
    backgroundColor: '#dc2626',
    color: '#fff',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.5,
  },
  interpolationBox: {
    marginTop: '12px',
    padding: '12px',
    backgroundColor: '#1a1a24',
    borderRadius: '8px',
    border: '1px solid #2a2a3a',
  },
  interpolationTitle: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#14b8a6',
    marginBottom: '6px',
  },
  interpolationText: {
    fontSize: '11px',
    color: '#8b8b9a',
    fontFamily: 'monospace',
    lineHeight: 1.5,
  },
  feedingSplit: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#1a1a24',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#d0d0da',
    textAlign: 'center',
  },
  bwNote: {
    padding: '16px',
    backgroundColor: 'transparent',
    fontSize: '13px',
    color: '#d0d0da',
    lineHeight: 1.7,
  },
  // Results Table Styles
  resultsTable: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#1a1a24',
    borderRadius: '12px',
    border: '2px solid #14b8a6',
  },
  resultsTableHeader: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#14b8a6',
    marginBottom: '12px',
    textAlign: 'center',
    lineHeight: 1.3,
  },
  tableContainer: {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    maxWidth: '100%',
    margin: '0 -4px',
  },
  table: {
    width: '100%',
    minWidth: '100%',
    borderCollapse: 'collapse',
    fontSize: '11px',
  },
  tableHeaderRow: {
    backgroundColor: '#2a2a3a',
  },
  th: {
    padding: '8px 4px',
    textAlign: 'left',
    fontSize: '9px',
    fontWeight: 700,
    color: '#8b8b9a',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    borderBottom: '2px solid #14b8a6',
    whiteSpace: 'nowrap',
  },
  tableRow: {
    borderBottom: '1px solid #2a2a3a',
  },
  tableRowHighlight: {
    backgroundColor: 'rgba(20, 184, 166, 0.1)',
  },
  td: {
    padding: '10px 4px',
    color: '#d0d0da',
    fontSize: '11px',
    whiteSpace: 'nowrap',
  },
  targetVolumes: {
    marginTop: '12px',
    padding: '10px 12px',
    backgroundColor: '#16161f',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  targetVolumeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    gap: '8px',
  },
  targetLabel: {
    color: '#8b8b9a',
    fontWeight: 600,
    flex: 1,
  },
  targetValue: {
    color: '#14b8a6',
    fontWeight: 700,
    fontFamily: 'monospace',
    flexShrink: 0,
  },
};

// Inject fonts and global styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@500&display=swap');
  
  * { 
    box-sizing: border-box; 
  }
  
  html, body {
    overflow-x: hidden;
    max-width: 100%;
    position: relative;
  }
  
  body {
    margin: 0;
    padding: 0;
  }
  
  input:focus {
    border-color: #14b8a6 !important;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.25) !important;
  }
  
  button:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
  
  button:active {
    transform: translateY(0);
  }
  
  table {
    max-width: 100%;
  }
  
  @media (max-width: 800px) {
    div[style*="grid-template-columns: 1fr 1.3fr"] {
      grid-template-columns: 1fr !important;
    }
    div[style*="grid-template-columns: repeat(3, 1fr)"] {
      grid-template-columns: 1fr !important;
    }
    table {
      font-size: 9px !important;
    }
    th, td {
      padding: 6px 2px !important;
      font-size: 9px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default FeedCalculator;