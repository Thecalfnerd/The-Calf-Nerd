# Calf Math Engine

## Purpose
Performs all calf nutrition calculations with consistent units, rounding rules, and solids logic. Prevents mixing errors by enforcing "mixing into" vs "mixing onto" distinction and handling volume expansion correctly.

## Scope
- Unit conversions (lb/oz, qt/gal, °F/°C, Brix/IgG, solids %)
- Mixing calculations (powder + water → target final volume + solids %)
- Volume displacement handling (powder displaces liquid)
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

### 2. Mixing Method (Mix Into Target Volume)

**How it works:**
- Powder + water = exact target volume
- Powder displaces liquid, so you use LESS water than target volume
- **Volume displacement factor:** 1 lb powder ≈ 0.24 qt volume

**Formula:**
```
Water needed (qt) = Target volume (qt) - [Powder (lb) × 0.24]
Final volume (qt) = Target volume (exactly as specified)
```

**Example:** To make 2 qt at 15% solids
- Powder: 4.8 oz (0.3 lb)
- Water: 2 - (0.3 × 0.24) = 1.93 qt → rounds to **1.75 qt**
- Final: 2.0 qt at 15.0% solids

**Why this matters:**
If you ignore displacement and add 2 qt water + powder, you'll end up with >2 qt total and lower solids % than intended.

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
Powder (lb) = (Target_solids% / 100) × Target_volume_qt × 2
Powder (oz) = Powder_lb × 16
```

### Step 2: Calculate Water Needed
```
Water (qt) = Target_volume_qt - (Powder_lb × 0.24)
```

### Step 3: Verify Solids %
```
Solids% = (Powder_lb / (Target_volume_qt × 2)) × 100
(Should match target solids %)
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

### Example 1: Standard Milk Replacer
**Inputs:**
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

Batch (10 calves):
- Powder: 6.0 lb (96.0 oz)
- Water: 4.4 gal (17.5 qt)
- Total Volume: 5.0 gal (20.0 qt)
- Solids: 15.0%
```

### Example 2: High Solids Colostrum Replacer
**Inputs:**
- Target: 2.0 qt at 18.0% solids
- Calves: 5

**Calculation:**
- Powder needed: 0.18 × 2.0 × 2 = 0.72 lb = 11.5 oz → **11.5 oz**
- Water needed: 2.0 - (0.72 × 0.24) = 1.827 qt → **1.75 qt**
- Final volume: 2.0 qt
- Actual solids: (0.72 / 4.0) × 100 = 18.0%

**Output:**
```
Per Calf:
- Powder: 11.5 oz
- Water: 1.75 qt
- Total Volume: 2.0 qt
- Solids: 18.0%

Batch (5 calves):
- Powder: 3.6 lb (57.5 oz)
- Water: 2.2 gal (8.75 qt)
- Total Volume: 2.5 gal (10.0 qt)
- Solids: 18.0%
```

### Example 3: Low Solids Transition
**Inputs:**
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
2. **Ignore volume displacement** (0.24 qt/lb is non-negotiable)
3. **Show excessive precision** (follow rounding rules)
4. **Calculate for calves < 1** (batch size minimum = 1)
5. **Accept solids < 8% or > 25%** (flag as outside normal range)

### Must Always
1. **Show both per-calf and batch**
2. **Display solids % in every output**
3. **Account for powder displacement in water calculation**
4. **Apply rounding rules consistently**
5. **Flag unusual inputs** (e.g., "12% solids is low for colostrum")

### Validation Checks
```
Before calculating:
- Solids % in range [8, 25]
- Volume per calf in range [0.5, 6.0] qt
- Number of calves ≥ 1

After calculating:
- Water volume is positive
- Final volume matches target
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

### Negative Water Error
```
❌ Error: Cannot achieve X.X qt at Y.Y% solids.
Powder volume (Z.Z qt) exceeds target volume.

Solutions:
1. Increase target volume
2. Reduce solids %
```

---

## Usage Patterns

### Pattern 1: Standard Feeding Program Setup
```
Input: "10 calves, 2 qt per calf at 15% solids"
→ Provides per-calf recipe + batch totals
→ Farm can tape batch recipe to mixing cart
```

### Pattern 2: Troubleshooting Existing Program
```
Input: "We're using 8 oz powder + 2 qt water per calf. What solids are we getting?"
→ Calculate actual solids
→ Show that 8 oz in 2 qt = ~13.0% (if they want 15%, need 9.6 oz)
→ Flag discrepancy if exists
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
1. ✓ Standard MR at 15% (2 qt target)
2. ✓ Low solids transition at 12% (2.5 qt target)
3. ✓ High solids CR at 18% (2 qt target)
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
- New product types with different displacement properties

### Version History
- v1.0: Initial specification (Feb 2026)

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│ CALF MATH ENGINE - QUICK REF                            │
├─────────────────────────────────────────────────────────┤
│ MIXING METHOD                                           │
│ • Powder + water = target volume (exact)                │
│ • Powder displaces liquid → use less water              │
│                                                         │
│ VOLUME DISPLACEMENT                                     │
│ • 1 lb powder = 0.24 qt volume                          │
│ • Water = Target_qt - (Powder_lb × 0.24)                │
│                                                         │
│ SOLIDS FORMULA                                          │
│ • Solids% = (Powder_lb / Target_qt × 2) × 100           │
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
