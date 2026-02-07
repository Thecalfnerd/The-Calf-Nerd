# Colostrum Wizard

## Purpose
Converts calf birth weight, Brix reading, and timing into an actionable colostrum feeding plan. Ensures calves receive adequate IgG mass (not just concentration) within critical timeframes. Prevents common errors: underfeeding by volume, overreliance on Brix alone, and missed timing windows.

## Scope
- Volume targets (8–10% body weight first feeding)
- IgG goal framing (150–200g minimum)
- Quality tier classification (excellent/good/fair/poor)
- Timing recommendations (0–2hr, 2–6hr, 6–12hr windows)
- Printable protocol snippets for farm use
- Hydration and health caveats

---

## Core Rules

### 1. Volume Target: Body Weight Driven
**Formula:**
```
Target volume (qt) = Birth weight (lb) × 0.08 to 0.10 / 2

Where:
- 0.08 = 8% body weight (minimum)
- 0.10 = 10% body weight (ideal)
- ÷ 2 converts lb to qt (1 qt colostrum ≈ 2 lb)
```

**Typical ranges:**
- 80 lb calf: 3.2–4.0 qt
- 90 lb calf: 3.6–4.5 qt
- 100 lb calf: 4.0–5.0 qt

**Rule:** Always feed by weight, not by arbitrary "2 qt" or "4 qt" defaults.

### 2. Brix to IgG Interpretation (Field Estimate)

**Chart:**
```
Brix (%)  | IgG (g/L) | IgG (g/qt) | Quality Tier
----------|-----------|------------|-------------
≥ 22      | ≥ 50      | ≥ 47       | Excellent
18–21     | 35–49     | 33–46      | Good
15–17     | 25–34     | 24–32      | Fair
< 15      | < 25      | < 24       | Poor
```

**Critical notes:**
- **Brix measures total solids, not just IgG**—it's a field estimate, not a lab result
- **IgG concentration (g/L) ≠ IgG mass (g)**—volume matters
- Assumes fresh, clean colostrum; dirty or frozen samples less reliable
- Chart based on: 1 Brix ≈ 2.2–2.5 g/L IgG (approximation, varies by source)

### 3. IgG Mass Target
**Goal:** ≥ 150g IgG in first feeding (200g ideal)

**Formula:**
```
IgG mass (g) = Volume (qt) × IgG (g/qt from chart)
```

**Examples:**
- 4 qt at 22% Brix: 4 × 47 = 188g IgG ✓
- 3 qt at 18% Brix: 3 × 33 = 99g IgG ✗ (insufficient)
- 4.5 qt at 25% Brix: 4.5 × 50 = 225g IgG ✓✓

**Key insight:** Low-quality colostrum can still work if volume is increased. High-quality colostrum can fail if volume is too low.

### 4. Timing Windows

**0–2 hours (Critical):**
- Gut absorption 90%+ efficiency
- First feeding MUST occur here
- Delay = steep drop in IgG transfer

**2–6 hours (Acceptable):**
- Gut absorption 50–80% efficiency
- Still effective if first feeding missed
- Second feeding can occur here

**6–12 hours (Poor):**
- Gut absorption 20–50% efficiency
- "Gut closure" begins
- Third feeding (if used) or supplemental feeding only

**> 12 hours:**
- Absorption <20%
- Feeding still provides nutrition, but minimal passive immunity
- Consider plasma if serum IgG testing shows failure (<10 g/L)

### 5. Hydration & Health Caveats

**When to involve vet:**
- Calf unable to stand or suckle
- Severe dehydration (sunken eyes, skin tent >3 sec)
- Hypothermia (rectal temp <100°F)
- Dam had difficult calving or retained placenta (risk of dirty colostrum)

**Hydration note:**
- Colostrum is NOT a rehydration fluid
- If calf is dehydrated, give oral electrolytes FIRST, then colostrum 2–4 hr later
- Never dilute colostrum to "make it easier to absorb"

---

## Inputs

### Required
- **Birth weight (lb):** (typical 70–110 lb)
- **Brix reading (%):** (typical 18–28%)
- **Time since birth (hr):** (0–24 hr)
- **Number of calves:** (for batch planning)

### Optional
- **Colostrum source:** (dam/pooled/replacer)
- **Feeding method:** (bottle/tube/nipple bucket)
- **Calf health status:** (vigorous/weak/unable to stand)

---

## Outputs

### Primary Output: Feeding Plan
```
Colostrum Feeding Plan
───────────────────────────────────────
Calf: XX lb birth weight
Brix: XX% (Quality: [Excellent/Good/Fair/Poor])
Time since birth: X.X hr

Target Volume: X.X qt (8–10% body weight)
Expected IgG: XXX g (Goal: ≥150g)

Timing:
✓ First feeding: [NOW / URGENT / OVERDUE]
  Window: 0–2 hr (absorption: 90%+)
  
✓ Second feeding (optional): X–X hr
  Window: 6–12 hr (absorption: 50–80%)

Notes:
- [Quality-specific guidance]
- [Timing-specific urgency]
- [Health caveats if applicable]
```

### Batch Output
```
Batch: X calves
Total Volume Needed: XX.X qt
Avg Brix: XX% (Quality: [tier])

Per-Calf Breakdown:
Calf 1: XX lb → X.X qt
Calf 2: XX lb → X.X qt
...

Total IgG Delivered: XXXg (Target: ≥150g per calf)
```

### Printable Protocol Snippet
```
┌─────────────────────────────────────────┐
│ COLOSTRUM PROTOCOL                      │
├─────────────────────────────────────────┤
│ Calf Weight: XX lb                      │
│ Feed: X.X qt within 2 hours of birth    │
│ Brix Minimum: 22% (test before feeding) │
│ Temperature: 100–105°F                  │
│                                         │
│ ✓ First feeding: 0–2 hr (critical)      │
│ ✓ Second feeding: 6–12 hr (optional)    │
│                                         │
│ Call vet if:                            │
│ • Calf won't stand by 2 hr              │
│ • Brix < 18% and no replacer available  │
│ • Calf dehydrated or cold               │
└─────────────────────────────────────────┘
```

---

## Decision Logic

### Step 1: Calculate Volume Target
```
Min_volume_qt = Birth_weight_lb × 0.08 / 2
Ideal_volume_qt = Birth_weight_lb × 0.10 / 2
Target_volume_qt = Ideal_volume_qt (use minimum as fallback if supply limited)
```

### Step 2: Classify Quality (Brix → Tier)
```
if Brix ≥ 22: Quality = "Excellent" (IgG ≥ 47 g/qt)
elif Brix ≥ 18: Quality = "Good" (IgG 33–46 g/qt)
elif Brix ≥ 15: Quality = "Fair" (IgG 24–32 g/qt)
else: Quality = "Poor" (IgG < 24 g/qt)
```

### Step 3: Calculate Expected IgG Mass
```
IgG_g_per_qt = lookup from Brix chart (midpoint of range)
Expected_IgG_g = Target_volume_qt × IgG_g_per_qt
```

### Step 4: Assess Timing Urgency
```
if Time_hr < 2: Status = "FEED NOW (critical window)"
elif Time_hr < 6: Status = "FEED IMMEDIATELY (acceptable window)"
elif Time_hr < 12: Status = "FEED URGENT (poor absorption)"
else: Status = "LATE (consider plasma if failure suspected)"
```

### Step 5: Generate Recommendations

**If IgG < 150g:**
- Increase volume if possible
- Supplement with colostrum replacer
- Consider second feeding at 6 hr

**If Quality = "Poor" (Brix < 15):**
- Flag: "This colostrum may not provide adequate immunity"
- Recommend: Use colostrum replacer instead or blend with higher-quality colostrum
- Consider: Serum IgG test at 24–48 hr

**If Time > 6 hr:**
- Flag: "Gut absorption reduced, passive transfer at risk"
- Recommend: Still feed (nutrition value), but consider plasma if calf shows failure to thrive

**If Calf weak/unable to stand:**
- Flag: "Tube feeding may be required—consult vet or trained staff"
- Caution: Do not tube feed if calf is unconscious or gasping

---

## Examples

### Example 1: Ideal Scenario
**Inputs:**
- Birth weight: 95 lb
- Brix: 24%
- Time: 0.5 hr
- Calves: 1

**Calculation:**
- Target volume: 95 × 0.10 / 2 = 4.75 qt → **4.75 qt**
- Quality: Brix 24% → Excellent (IgG ~47 g/qt)
- Expected IgG: 4.75 × 47 = 223g ✓✓
- Timing: 0.5 hr → Critical window, feed NOW

**Output:**
```
Colostrum Feeding Plan
───────────────────────────────────────
Calf: 95 lb birth weight
Brix: 24% (Quality: Excellent)
Time since birth: 0.5 hr

Target Volume: 4.75 qt (10% body weight)
Expected IgG: 223 g ✓ (Goal: ≥150g)

Timing:
✓ First feeding: FEED NOW
  Window: 0–2 hr (absorption: 90%+)
  Status: Within critical window ✓
  
✓ Second feeding (optional): 6–12 hr
  Additional 2–3 qt for nutrition

Notes:
✓ Excellent quality colostrum
✓ Optimal timing
✓ No supplementation needed
```

### Example 2: Low Quality, Adequate Volume
**Inputs:**
- Birth weight: 88 lb
- Brix: 16%
- Time: 1.2 hr
- Calves: 1

**Calculation:**
- Target volume: 88 × 0.10 / 2 = 4.4 qt
- Quality: Brix 16% → Fair (IgG ~28 g/qt)
- Expected IgG: 4.4 × 28 = 123g ✗ (below 150g target)
- Timing: 1.2 hr → Critical window, still good

**Output:**
```
Colostrum Feeding Plan
───────────────────────────────────────
Calf: 88 lb birth weight
Brix: 16% (Quality: Fair)
Time since birth: 1.2 hr

Target Volume: 4.4 qt (10% body weight)
Expected IgG: 123 g ⚠ (Goal: ≥150g)

Timing:
✓ First feeding: FEED NOW
  Window: 0–2 hr (absorption: 90%+)
  Status: Within critical window ✓

⚠ RECOMMENDATIONS:
- IgG mass below target (123g vs 150g goal)
- Options:
  1. Increase volume to 5.4 qt (if calf will take it)
  2. Supplement with 1 bag colostrum replacer (adds ~100g IgG)
  3. Blend with higher-Brix colostrum if available
- Consider second feeding at 6 hr with replacer
- Test serum IgG at 24 hr to confirm passive transfer
```

### Example 3: Delayed Feeding, Good Quality
**Inputs:**
- Birth weight: 82 lb
- Brix: 21%
- Time: 8 hr
- Calves: 1

**Calculation:**
- Target volume: 82 × 0.10 / 2 = 4.1 qt
- Quality: Brix 21% → Good (IgG ~40 g/qt)
- Expected IgG: 4.1 × 40 = 164g ✓
- Timing: 8 hr → Poor absorption window

**Output:**
```
Colostrum Feeding Plan
───────────────────────────────────────
Calf: 82 lb birth weight
Brix: 21% (Quality: Good)
Time since birth: 8.0 hr

Target Volume: 4.1 qt (10% body weight)
Expected IgG: 164 g (Goal: ≥150g)

Timing:
⚠ First feeding: FEED IMMEDIATELY
  Window: 6–12 hr (absorption: 20–50%)
  Status: LATE—gut closure in progress

⚠ TIMING WARNING:
- Feeding delayed beyond optimal window
- Gut absorption reduced to 20–50% efficiency
- Expected actual IgG uptake: ~80g (below 150g target)

RECOMMENDATIONS:
- Feed full 4.1 qt immediately
- Consider plasma transfusion (1 bag = ~40g IgG boost)
- Monitor calf closely for signs of failure:
  • Weak, lethargic behavior
  • Difficulty standing
  • Diarrhea in first 7 days
- Test serum IgG at 24–48 hr (target ≥10 g/L)
```

### Example 4: Batch Planning
**Inputs:**
- 3 calves: 85 lb, 92 lb, 78 lb
- Brix: 23% (pooled colostrum)
- Time: 0–2 hr for all
- Calves: 3

**Calculation:**
- Calf 1: 85 × 0.10 / 2 = 4.25 qt
- Calf 2: 92 × 0.10 / 2 = 4.6 qt
- Calf 3: 78 × 0.10 / 2 = 3.9 qt
- Total: 12.75 qt
- Quality: Brix 23% → Excellent (IgG ~47 g/qt)
- Avg IgG per calf: 4.25 × 47 = 200g (calf 1), 216g (calf 2), 183g (calf 3)

**Output:**
```
Batch Colostrum Plan
───────────────────────────────────────
Batch: 3 calves
Pooled Brix: 23% (Quality: Excellent)
Total Volume Needed: 12.75 qt

Per-Calf Breakdown:
Calf 1: 85 lb → 4.25 qt (IgG: 200g ✓)
Calf 2: 92 lb → 4.6 qt (IgG: 216g ✓)
Calf 3: 78 lb → 3.9 qt (IgG: 183g ✓)

Total IgG Delivered: 599g
Avg per calf: 200g (Target: ≥150g per calf) ✓

Timing: All within 0–2 hr window ✓

Notes:
✓ Excellent quality pooled colostrum
✓ All calves meet IgG target
✓ Optimal timing for all
```

---

## Guardrails

### Must NOT
1. **Give volume recommendations without knowing birth weight**
2. **Claim Brix is precise IgG measurement** (it's a field estimate)
3. **Recommend feeding after 12 hr without plasma caveat**
4. **Ignore hydration status** (dehydrated calves need fluids first)
5. **Suggest diluting colostrum** (never acceptable)

### Must Always
1. **Calculate volume by body weight (8–10%)**
2. **Display IgG mass, not just concentration**
3. **Flag timing urgency clearly**
4. **Include health caveats (dehydration, inability to stand)**
5. **Show quality tier with Brix reading**

### Red Flags (Require Vet Involvement)
- Calf unable to stand or suckle by 2 hr
- Brix < 15% and no colostrum replacer available
- Severe dehydration (skin tent >3 sec, sunken eyes)
- Rectal temp < 100°F (hypothermia)
- Time since birth > 12 hr and calf shows weakness
- Dam had dystocia, retained placenta, or mastitis (dirty colostrum risk)

---

## Validation Checks

### Input Validation
```
Birth weight in range [50, 150] lb (flag if outside)
Brix in range [10, 35]% (flag if <15% or >30%)
Time in range [0, 48] hr
Number of calves ≥ 1
```

### Output Validation
```
Volume per calf in range [2, 8] qt (flag if outside)
IgG mass per calf calculated correctly
Timing status matches time since birth
Quality tier matches Brix range
```

### Warnings to Display
- **Volume < 8% BW:** "Volume below minimum—increase if possible"
- **IgG < 150g:** "IgG mass below target—see recommendations"
- **Brix < 18%:** "Quality below ideal—consider supplementation"
- **Time > 6 hr:** "Timing delayed—passive transfer at risk"
- **Time > 12 hr:** "Late feeding—consider plasma and serum testing"

---

## Integration Notes

### Works With Other Skills
- **Calf Math Engine:** Calculates powder/water for colostrum replacer blending
- **Protocol Generator:** Consumes feeding plan for printable farm sheet
- **Troubleshooting Wizard:** Uses colostrum quality/timing when diagnosing scours or failure to thrive

### Data Flow
```
User Input → Colostrum Wizard → Feeding Plan
                ↓
         [Volume target]
         [IgG goal]
         [Quality tier]
         [Timing urgency]
                ↓
         Protocol Generator → Printable Sheet
```

---

## Usage Patterns

### Pattern 1: Individual Calf at Birth
```
Input: "95 lb calf, Brix 22%, just born"
→ Calculate volume (4.75 qt)
→ Classify quality (Excellent)
→ Calculate IgG (223g) ✓
→ Timing: FEED NOW
→ Output: Clean feeding plan
```

### Pattern 2: Batch of Calves
```
Input: "3 calves: 80, 88, 92 lb, pooled colostrum at 20% Brix"
→ Individual volume for each (3.2, 3.52, 3.68 qt)
→ Total volume (10.4 qt)
→ Quality tier (Good)
→ IgG per calf (128, 141, 147g)
→ Flag: Calf 1 and 2 slightly below target
→ Recommend: increase volume or supplement
```

### Pattern 3: Troubleshooting Poor Quality
```
Input: "Calf fed 3 qt at 14% Brix, now has scours at day 3"
→ Calculate actual IgG delivered: 3 × 22 = 66g (way below 150g)
→ Flag: Passive transfer likely failed
→ Recommend: Serum IgG test, consider plasma, better colostrum management going forward
```

### Pattern 4: Late Feeding Decision
```
Input: "Found calf in field, 10 hr old, 88 lb, have 23% Brix colostrum"
→ Volume: 4.4 qt
→ Quality: Excellent
→ IgG if absorbed well: 207g
→ BUT: Timing late (10 hr), absorption reduced to ~30%
→ Actual IgG uptake: ~62g
→ Recommend: Feed anyway + plasma + serum test at 24 hr
```

---

## Testing Checklist

### Test Cases
1. ✓ Ideal scenario (high Brix, optimal timing, adequate volume)
2. ✓ Low Brix but salvageable (fair quality, increase volume)
3. ✓ Late timing but good quality (8 hr, plasma recommendation)
4. ✓ Batch of 3 calves (different weights, pooled colostrum)
5. ✓ Very low Brix (<15%) → flag and recommend replacer
6. ✓ Dehydrated calf → electrolytes first caveat
7. ✓ Calf unable to stand → tube feeding / vet involvement
8. ✓ Time > 12 hr → plasma recommendation

### Validation
- Volume scales correctly with birth weight
- IgG mass calculated accurately
- Quality tier matches Brix range
- Timing urgency reflects actual risk
- Warnings triggered appropriately
- Health caveats included when needed

---

## Maintenance

### Update Triggers
- New research on Brix-to-IgG correlation
- Changes to IgG mass targets (current: 150–200g)
- New colostrum replacer products or protocols
- Feedback from farms on practical usability

### Version History
- v1.0: Initial specification (Feb 2026)

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│ COLOSTRUM WIZARD - QUICK REF                            │
├─────────────────────────────────────────────────────────┤
│ VOLUME TARGET                                           │
│ • 8–10% body weight (use 10% ideal)                     │
│ • Formula: BW_lb × 0.10 / 2 = Volume_qt                 │
│                                                         │
│ BRIX QUALITY TIERS                                      │
│ • ≥22%: Excellent (IgG ≥47 g/qt)                        │
│ • 18–21%: Good (IgG 33–46 g/qt)                         │
│ • 15–17%: Fair (IgG 24–32 g/qt)                         │
│ • <15%: Poor (IgG <24 g/qt) → use replacer              │
│                                                         │
│ IGG MASS TARGET                                         │
│ • Minimum: 150g first feeding                           │
│ • Ideal: 200g first feeding                             │
│ • Formula: Volume_qt × IgG_g/qt                         │
│                                                         │
│ TIMING WINDOWS                                          │
│ • 0–2 hr: 90%+ absorption (critical)                    │
│ • 2–6 hr: 50–80% absorption (acceptable)                │
│ • 6–12 hr: 20–50% absorption (poor)                     │
│ • >12 hr: <20% absorption (consider plasma)             │
│                                                         │
│ RED FLAGS (VET NEEDED)                                  │
│ • Calf unable to stand by 2 hr                          │
│ • Brix <15% and no replacer                             │
│ • Dehydration or hypothermia                            │
│ • Feeding delayed >12 hr                                │
└─────────────────────────────────────────────────────────┘
```
