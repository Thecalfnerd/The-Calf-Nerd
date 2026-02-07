# Calf Math Engine

## Purpose
Performs all calf nutrition calculations with consistent units, rounding rules, and solids logic. Prevents mixing errors by enforcing "mixing into" vs "mixing onto" distinction and handling volume expansion correctly.

## Scope
- Unit conversions (lb/oz, qt/gal, °F/°C, Brix/IgG, solids %)
- Mixing calculations (powder + water → final volume + final solids)
- Volume expansion handling
- Per-calf and batch totals
- Rounding and formatting

---

## Core Rules

### 1. Unit System
**US units only:**
- Weight: pounds (lb), ounces (oz)
- Volume: gallons (gal), quarts (qt)
- Temperature: Fahrenheit (°F)
- Solids: percentage (%)

### 2. Mixing Methods

#### "Mix Into" (Target Volume Method)
- **Definition:** Powder + water = target final volume
- **Logic:** Powder displaces liquid, so you use LESS than target volume of water
- **Volume displacement:** 1 lb powder ≈ 0.24 qt volume
- **Formula:**
  ```
  Water needed (qt) = Target volume (qt) - [Powder (lb) × 0.24]
  Final volume (qt) = Target volume (exactly)
  ```
- **Example:** To make 2 qt at 15% solids
  - Powder: 4.8 oz (0.3 lb)
  - Water: 2 - (0.3 × 0.24) = 1.93 qt
  - Final: 2.0 qt at 15.0% solids

#### "Mix Onto" (Full Water Method)
- **Definition:** Powder added to full water volume → expanded final volume
- **Logic:** Powder adds volume on top of water
- **Formula:**
  ```
  Water (qt) = specified water amount
  Final volume (qt) = Water (qt) + [Powder (lb) × 0.24]
  ```
- **Example:** 4.8 oz powder onto 2 qt water
  - Powder: 4.8 oz (0.3 lb)
  - Water: 2.0 qt
  - Final: 2.07 qt at 14.5% solids

### 3. Solids Calculation
```
Solids % = (Powder weight / Final volume weight) × 100

Where:
- Powder weight in lb
- Final volume weight in lb (1 qt ≈ 2 lb for milk/colostrum)
- Formula: (Powder_lb / (Final_qt × 2)) × 100
```

### 4. Rounding Rules
- **Ounces:** nearest 0.5 oz
- **Quarts:** nearest 0.25 qt
- **Gallons:** nearest 0.1 gal
- **Solids %:** nearest 0.1%
- **Pounds (powder):** nearest 0.1 lb for batches

### 5. Standard Conversions
```
Weight:
- 1 lb = 16 oz

Volume:
- 1 gal = 4 qt
- 1 qt = 32 fl oz

Milk/Colostrum density:
- 1 qt ≈ 2 lb
- 1 gal ≈ 8 lb

Temperature:
- °F = (°C × 9/5) + 32
- °C = (°F - 32) × 5/9
```

---

## Inputs

### Required
- **Mixing method:** "into" or "onto"
- **Target solids %:** (8–20%, typical 12–15%)
- **Target volume per calf (qt):** (typical 1.5–3.0 qt)
- **Number of calves:** (integer ≥ 1)

### Optional
- **Powder protein %:** (default 20% for typical MR)
- **Powder fat %:** (default 20% for typical MR)
- **Water temperature (°F):** (default 110°F)

---

## Outputs

### Per-Calf Display
```
Per Calf:
- Powder: X.X oz
- Water: X.XX qt
- Total Volume: X.XX qt
- Solids: XX.X%
- Mixing: [into/onto] method
```

### Batch Totals Display
```
Batch (Y calves):
- Powder: X.X lb (YY.Y oz)
- Water: X.X gal (XX.X qt)
- Total Volume: X.X gal (XX.X qt)
- Solids: XX.X%
```

### Additional Context (when relevant)
- Water temperature for mixing
- Feeding temperature target (100–105°F)
- Protein and fat content (if specified)

---

## Calculation Steps

### Step 1: Calculate Powder Needed
```
For target solids % and volume:
Powder (lb) = (Target_solids% / 100) × Final_volume_qt × 2
Powder (oz) = Powder_lb × 16
```

### Step 2: Calculate Water Needed

**If "mix into":**
```
Water (qt) = Target_volume_qt - (Powder_lb × 0.24)
```

**If "mix onto":**
```
Water (qt) = Target_volume_qt
Final_volume (qt) = Water_qt + (Powder_lb × 0.24)
```

### Step 3: Calculate Actual Solids %
```
Solids% = (Powder_lb / (Final_volume_qt × 2)) × 100
```

### Step 4: Scale to Batch
```
Batch_powder_lb = Per_calf_powder_oz × Num_calves / 16
Batch_water_qt = Per_calf_water_qt × Num_calves
Batch_water_gal = Batch_water_qt / 4
Batch_volume_qt = Per_calf_volume_qt × Num_calves
Batch_volume_gal = Batch_volume_qt / 4
```

### Step 5: Round and Format
- Apply rounding rules (section 4)
- Display per-calf and batch in clean format

---

## Examples

### Example 1: Standard Milk Replacer (Mix Into)
**Inputs:**
- Method: mix into
- Target: 2.0 qt at 15.0% solids
- Calves: 10

**Calculation:**
- Powder needed: 0.15 × 2.0 × 2 = 0.6 lb = 9.6 oz → **9.5 oz**
- Water needed: 2.0 - (0.6 × 0.24) = 1.856 qt → **1.75 qt**
- Final volume: 2.0 qt
- Actual solids: (0.6 / 4.0) × 100 = 15.0%

**Output:**
```
Per Calf:
- Powder: 9.5 oz
- Water: 1.75 qt
- Total Volume: 2.0 qt
- Solids: 15.0%
- Mixing: INTO target volume

Batch (10 calves):
- Powder: 6.0 lb (96.0 oz)
- Water: 4.4 gal (17.5 qt)
- Total Volume: 5.0 gal (20.0 qt)
- Solids: 15.0%
```

### Example 2: Higher Solids Colostrum Replacer (Mix Onto)
**Inputs:**
- Method: mix onto
- Target: 2.0 qt water at 18.0% solids
- Calves: 5

**Calculation:**
- For 18% in expanded volume, work backwards:
  - Let P = powder_lb, W = 2.0 qt
  - Final_vol = 2.0 + (P × 0.24)
  - 0.18 = P / (Final_vol × 2)
  - 0.18 = P / ((2.0 + 0.24P) × 2)
  - Solve: P ≈ 0.78 lb = 12.5 oz
- Water: 2.0 qt (full amount)
- Final volume: 2.0 + (0.78 × 0.24) = 2.19 qt
- Actual solids: (0.78 / (2.19 × 2)) × 100 = 17.8%

**Output:**
```
Per Calf:
- Powder: 12.5 oz
- Water: 2.0 qt (full)
- Total Volume: 2.25 qt
- Solids: 17.8%
- Mixing: ONTO full water volume

Batch (5 calves):
- Powder: 3.9 lb (62.5 oz)
- Water: 2.5 gal (10.0 qt)
- Total Volume: 2.8 gal (11.25 qt)
- Solids: 17.8%
```

### Example 3: Low Solids Transition (Mix Into)
**Inputs:**
- Method: mix into
- Target: 2.5 qt at 12.0% solids
- Calves: 15

**Calculation:**
- Powder: 0.12 × 2.5 × 2 = 0.6 lb = 9.6 oz → **9.5 oz**
- Water: 2.5 - (0.6 × 0.24) = 2.356 qt → **2.25 qt**
- Final: 2.5 qt
- Solids: (0.6 / 5.0) × 100 = 12.0%

**Output:**
```
Per Calf:
- Powder: 9.5 oz
- Water: 2.25 qt
- Total Volume: 2.5 qt
- Solids: 12.0%
- Mixing: INTO target volume

Batch (15 calves):
- Powder: 8.9 lb (142.5 oz)
- Water: 8.4 gal (33.75 qt)
- Total Volume: 9.4 gal (37.5 qt)
- Solids: 12.0%
```

---

## Guardrails

### Must NOT
1. **Mix unit systems** (never use metric in output)
2. **Assume mixing method** (always require user to specify)
3. **Ignore volume expansion** (0.24 qt/lb is non-negotiable)
4. **Show excessive precision** (follow rounding rules)
5. **Calculate for calves < 1** (batch size minimum = 1)
6. **Accept solids < 8% or > 25%** (flag as outside normal range)

### Must Always
1. **Show both per-calf and batch**
2. **Display solids % in every output**
3. **Label mixing method clearly** (INTO vs ONTO)
4. **Apply rounding rules consistently**
5. **Flag unusual inputs** (e.g., "12% solids is low for colostrum")

### Validation Checks
```
Before calculating:
- Solids % in range [8, 25]
- Volume per calf in range [0.5, 6.0] qt
- Number of calves ≥ 1
- Mixing method specified

After calculating:
- Water volume is positive
- Final volume is reasonable (0.5–6 qt per calf)
- Batch totals scale correctly
```

---

## Error Messages

### Invalid Solids %
```
⚠ Warning: X.X% solids is [below/above] normal range (8–20%).
- Typical milk replacer: 12–15%
- Colostrum replacer: 15–18%
- Whole milk: ~12.5%
```

### Invalid Volume
```
⚠ Warning: X.X qt per calf is [low/high].
- Typical range: 1.5–3.0 qt per feeding
- Newborn calves: 2.0–2.5 qt (8–10% body weight)
```

### Negative Water (Mix Into Error)
```
❌ Error: Cannot mix into X.X qt at Y.Y% solids.
Powder volume (Z.Z qt) exceeds target volume.

Solutions:
1. Increase target volume
2. Reduce solids %
3. Use "mix onto" method instead
```

---

## Usage Patterns

### Pattern 1: Standard Feeding Program Setup
```
Input: "10 calves, 2 qt per calf at 15% solids, mix into"
→ Provides per-calf recipe + batch totals
→ Farm can tape batch recipe to mixing cart
```

### Pattern 2: Troubleshooting Existing Program
```
Input: "We're mixing 8 oz powder onto 2 qt water per calf. What solids are we actually getting?"
→ Calculate actual solids (likely ~13.8%)
→ Compare to intended target
→ Flag if discrepancy exists
```

### Pattern 3: Colostrum Feeding Design
```
Input: "4 qt colostrum replacer for 100 lb calf, need 200g IgG, product is 150g/bag at 18% solids"
→ Calculate powder needed for IgG target
→ Calculate water needed
→ Provide mixing instructions
```

### Pattern 4: Batch Scaling
```
Input: "Scale this recipe from 8 calves to 25 calves"
→ Recalculate batch totals
→ Maintain per-calf amounts and solids %
→ Flag if batch size becomes impractical (>20 gal)
```

---

## Integration Notes

### Works With Other Skills
- **Colostrum Wizard:** supplies solids % targets and volume targets
- **Protocol Generator:** consumes mixing outputs for farm sheets
- **Troubleshooting Wizard:** uses calculations to check if mixing errors exist

### Data Flow
```
User Input → Calf Math Engine → Formatted Output
                ↓
         [Per-calf amounts]
         [Batch totals]
         [Solids %]
                ↓
         Protocol Generator → Printable Sheet
```

---

## Testing Checklist

### Test Cases
1. ✓ Standard MR at 15% (mix into 2 qt)
2. ✓ Low solids transition at 12% (mix into 2.5 qt)
3. ✓ High solids CR at 18% (mix onto 2 qt)
4. ✓ Batch of 1 calf (edge case)
5. ✓ Batch of 50 calves (large batch)
6. ✓ Negative water scenario (error handling)
7. ✓ Solids outside range (warning)
8. ✓ Rounding at boundaries (e.g., 9.6 oz → 9.5 oz)

### Validation
- Per-calf and batch totals match (scaled correctly)
- Solids % consistent across per-calf and batch
- Rounding applied uniformly
- Warnings triggered appropriately
- Error messages actionable

---

## Maintenance

### Update Triggers
- New research on volume displacement factors
- Changes to rounding conventions (user feedback)
- New mixing methods (e.g., automated systems)

### Version History
- v1.0: Initial specification (Feb 2026)

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│ CALF MATH ENGINE - QUICK REF                            │
├─────────────────────────────────────────────────────────┤
│ MIXING METHODS                                          │
│ • INTO: powder + water = target (less water)            │
│ • ONTO: powder + full water = expanded volume           │
│                                                         │
│ VOLUME DISPLACEMENT                                     │
│ • 1 lb powder = 0.24 qt volume                          │
│                                                         │
│ SOLIDS FORMULA                                          │
│ • Solids% = (Powder_lb / Final_qt × 2) × 100            │
│                                                         │
│ ROUNDING                                                │
│ • Ounces: nearest 0.5                                   │
│ • Quarts: nearest 0.25                                  │
│ • Solids%: nearest 0.1                                  │
│                                                         │
│ TYPICAL RANGES                                          │
│ • Milk replacer: 12–15% solids                          │
│ • Colostrum replacer: 15–18% solids                     │
│ • Volume per calf: 1.5–3.0 qt                           │
└─────────────────────────────────────────────────────────┘
```
